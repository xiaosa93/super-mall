<template>
  <div id="home">
    <NavBar class="home-nav"><template v-slot:center><div>购物街</div></template></NavBar>
    <TabControl
        v-show="isTabFixed"
        ref='tabControl1'
       :titles="['流行','新款','精选']"
       @tabClick='tabClick'
       />
    <Scroll class="content"
      ref='scroll'
     :probe-type='3'
     :pull-up-load='true'
     @scroll="contentScroll"
     @pullingUp='loadMore'>
      <HomeSwiper :bannerList='bannerList' @swiperImageLoad='swiperImageLoad' />
      <RecommendView :recommend='recommend' />
      <FeatureView />
      <TabControl
        ref='tabControl2'
       :titles="['流行','新款','精选']"
       @tabClick='tabClick'
       v-show="!isTabFixed"
       />
      <GoodsList :goods='showGoods' />
      
    </Scroll>

    <BackTop v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import GoodsListItem from 'components/content/goods/GoodsListItem'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata ,getHomeGoods} from "network/home";
import Scroll from 'components/common/scroll/Scroll'
import {itemListenerMixin} from 'common/mixin'

export default {
  name: "home",
  data() {
    return {
      bannerList: [],
      recommend:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop,

  },
  mixins:[itemListenerMixin],
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    // 1.保存y值
    this.saveY=this.$refs.scroll.scroll.y;
    // 2.取消全局事件总线的监听你
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')

  },
  methods: {

    /*
      事件监听相关方法
    */ 
   swiperImageLoad(){
    // 2.获取tabControl的offsetTop
    // 所有组件都有一个属性$el,用来获取组件中的元素
     this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
   },

   tabClick(index){
     this.currentType=Object.keys(this.goods)[index]
     this.$refs.tabControl1.currentIndex=index;
     this.$refs.tabControl2.currentIndex=index;
   },
   contentScroll(position){
    //  1.决定BackTop是否显示
    this.isShowBackTop=position<-1000
    // 2.决定tabControl是否吸顶(position:fixed)
    this.isTabFixed=(-position)>this.tabOffsetTop
   },
  //  上拉加载更多
   loadMore(){
     this.getHomeGoods(this.currentType)
     this.$refs.scroll.finishPullUp()
   },

    /*
      网络请求相关方法
    */ 
    getHomeMultidata(){
       getHomeMultidata().then((res) => {
       this.bannerList = res.data.banner.list;
       this.recommend=res.data.recommend.list
     })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //  重新计算可滚动的高度
        this.$refs.scroll.scroll.refresh()
     })
    }
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* position:relative */
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* overflow: hidden;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>