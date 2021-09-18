<template>
  <div class="cart">
    <NavBar class="navbar">
      <template v-slot:center>购物车({{cartLength}})</template>
    </NavBar>
    <!-- 商品的列表 -->
    <CartList  />
    <!-- 底部导航 -->
    <BottomBar />
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import BottomBar from './childComps/BottomBar'
import CartList from './childComps/CartList'
import {mapGetters} from 'vuex'
export default {
    name:'cart',
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
}
</script>

<style>
.navbar{
  background-color: var(--color-tint);
  color: #fff;
}
.cart{
  height: 100vh;
  overflow-x: hidden;
}
</style>