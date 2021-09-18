export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      // 查找之前数组是否有此商品
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
      if (oldProduct) {
        // oldProduct.count++
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payLoad.count = 1;
        context.commit('addToCart', payLoad)
        resolve('添加新的商品')
      }
    })
  }
}
