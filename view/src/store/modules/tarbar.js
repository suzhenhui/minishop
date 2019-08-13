const state = {
  currentTabBar: 'home',
  cartNumber: 0
}

const mutations = {
  changeTabBar(state,value){
   // console.log(value)
    state.currentTabBar = value;
  },
  setCartNumber(state,value){
    state.cartNumber = value;
  }
}

export default {
  state,
  mutations
}

