const state = {
  currentTabBar: 'home',
  cartNumber: 0
}

const mutations = {
  changeTabBar(state,value){
    state.currentTabBar = value;
  }
}

export default {
  state,
  mutations
}

