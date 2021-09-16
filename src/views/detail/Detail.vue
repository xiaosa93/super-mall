<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" />
    <Scroll class="content" ref="scroll">
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detail-info='detailInfo' @imgLoad='imgLoad' />
      <DetailParamInfo :paramInfo='paramInfo' />
      <DetailCommendInfo :commentInfo='commentInfo' @commentImageLoad='commentImageLoad' />
      <GoodsList :goods='recommendList' />
    </Scroll>
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

import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList'
import { getDetail, Goods, Shop, GoodsParam,getRecommend } from "network/detail";
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
      recommendList:[]
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
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      console.log(res);
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
      console.log(res);
      this.recommendList=res.data.list
    })
  },
  methods: {
      imgLoad(){
          this.$refs.scroll.refresh()
      },
      commentImageLoad(){
          this.$refs.scroll.refresh()
      }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 15;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 19;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px);
}
</style>