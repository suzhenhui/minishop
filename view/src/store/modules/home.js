import {bannerList} from '../../api/banners'
import {homeProductList} from '../../api/home'

const state = {
  banners: null,
  goodProducts: null,
  newProducts: null
}

const mutations = {
  saveHomeBanners(state, items){
    state.banners = items
  },
  saveHomeProduct(state,items){
    state.goodProducts = items.goodProducts;
    state.newProducts = items.newProducts
  }
}

const actions = {
  fetchHomeBanner({commit,state}){
    return new Promise((resolve,reject) => {
      bannerList().then(res => {
        if(res && res.banners){
          commit('saveHomeBanners',res.banners)
        }
        resolve(res)
      },err => {
        reject(err)
      })
    })
  },

  fetchHomeProduct({commit,state}){
    homeProductList().then(res=>{
      if(res.code=='200'){
        commit('saveHomeProduct',res)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
