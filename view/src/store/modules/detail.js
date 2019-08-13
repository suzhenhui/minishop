const state = {
  detailInfo: {}, //商品详情
  number: 0     //选择商品的数量
}

const mutations = {
  saveDetailInfo(state,items){
    state.detailInfo = items
  },
  saveNumber(state,num){
    state.number = num
  }
}

export default {
  state,
  mutations
}
