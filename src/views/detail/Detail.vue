<template>
  <div id="detail">
    <DetailNavBar @itemClick='itemClick' class="detail-nav" ref="nav" />
    <Scroll class="content" ref="scroll" @scroll='titleScroll' :probeType='3'> 
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detail-info='detailInfo' @imgLoad='imgLoad' />
      <DetailParamInfo ref="params" :paramInfo='paramInfo' />
      <DetailCommendInfo ref="commend" :commentInfo='commentInfo' @commentImageLoad='commentImageLoad' />
      <GoodsList ref="recommend" :goods='recommendList' />
    </Scroll>
    <Toast :message='message':show='show'> </Toast>
    <BackTop v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addCart='addInCart' />
    
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommendInfo from './childComps/DetailCommendInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'

import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList'
import { getDetail, Goods, Shop, GoodsParam,getRecommend } from "network/detail";
import Toast from 'components/common/toast/Toast'

import {itemListenerMixin} from 'common/mixin'

import {mapActions} from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendList:[],
      themeTopYs:[],
      currentIndex:0,
      isShowBackTop:false,
      message:'',
      show:false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommendInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast,
  },
  mixins:[itemListenerMixin],
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      //2.1获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;
      //2.2获取商品信息
      const data = res.result;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //2.3创建商铺对象
      this.shop = new Shop(data.shopInfo);
      //2.4保存商品的详情数据
      this.detailInfo=data.detailInfo  
      //2.5获取参数的信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //2.6获取评论数据
      if(data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0]
        }
    })    
    //3.请求推荐数据
    getRecommend().then(res=>{
      this.recommendList=res.data.list
    })
  },
  updated() {
    setTimeout(() => {
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.commend.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },100);
  },
  methods: {
    ...mapActions(['addCart']),

      imgLoad(){
        this.$refs.scroll.refresh()
      },
      commentImageLoad(){
        this.$refs.scroll.refresh()
      },
      itemClick(index){
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      titleScroll(position){
        // 对比y值
        // console.log(-position);
        for(let i=this.themeTopYs.length;i>=0;i--){
          // if(-position<this.themeTopYs[i]&&-position>this.themeTopYs[i-1]){
          //   console.log(i);
          // }
          let length=this.themeTopYs.length
          // if(this.currentIndex!==i && ((i<length-1&& -position>=this.themeTopYs[i]
          // && -position<this.themeTopYs[i+1])
          // ||(i===length-1 && -position>=this.themeTopYs[i]))){
          //   this.currentIndex=i
          //   this.$refs.nav.currentIndex=this.currentIndex
          // }
          for(let i=0;i<length-1;i++){
            if(this.currentIndex!==i &&(-position>=this.themeTopYs[i]&& -position<this.themeTopYs[i+1]) ){
                this.currentIndex=i
                this.$refs.nav.currentIndex=this.currentIndex
            }
          }
          this.isShowBackTop=position<-1000
        }
      },
      // 添加购物车 
      addInCart(){
        // 1.获取购物车要展示的信息
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        product.count=0
        // 2.将商品添加到购物车
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })
        this.addCart(product).then(res=>{
          this.$toast.show(res)

        })
      }
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 18;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 19;
    background-color: #fff;
}
.content{
    height: calc(100% - 93px);
    background-color: #fff;
}
</style>