import vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import * as getters from "./getter";
import tabBar from './modules/tarbar'
import auth from './modules/auth'
import home from './modules/home'
import category from './modules/category'
import detail from './modules/detail'
import cart from './modules/cart'
import address from './modules/address'
import order from './modules/order'

vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tabBar,
    auth,
    home,
    category,
    detail,
    cart,
    address,
    order
  },
  getters,
  plugins:[
    createPersistedState({
      paths:['tabBar','auth','cart']
    })
  ]
})
