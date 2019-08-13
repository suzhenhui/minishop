import {categoryList} from '../../api/category'

const state = {
  items: [],
  currentItem: null
}

const mutations = {
  saveItems(state, items){
    state.items = items;
  },
  saveCurrentItems(state, items){
    state.currentItem = items;
  }
}

const actions = {
  fetchCategoryList({commit,state}){
    categoryList().then(res => {
      if(res.length>0){
        commit("saveItems",res)
        if(!state.currentItem){
          commit('saveCurrentItems',res[0])
        }
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
