const state={
  total_amount: 0,
  total_price: 0,
  cart_goods:[] //购物车选中商品
}

const mutations = {
  calculationAmount(state,value){
    state.total_amount = value
  },
  calculationPrice(state,price){
    state.total_price = price
  },
  saveSelectedCartGoods(state,playload){
    state.cart_goods = playload.cart_goods
  },
  clearSelectedCartGoods(state){
    state.cart_goods=[]
  }
}

export default {
  state,mutations
}
