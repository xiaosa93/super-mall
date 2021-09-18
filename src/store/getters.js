export default{
    cartLength(state){
        return state.cartList.length
    },
    cartList(state){
        return state.cartList
    },
    cartCount(state){
        return state.cartList.filter(item=>{
            return item.checked
        }).length
    },
    // isCheckAll(state){
    //     return state.cartList.length===state.cartList.filter(item=>{
    //         return item.checked
    //     }).length
    // }
}