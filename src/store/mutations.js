const mutations ={
    addCounter(state,payLoad){
        payLoad.count++;
    },
    addToCart(state,payLoad){
        payLoad.checked=true
        state.cartList.push(payLoad)
    }
  }
  export default mutations