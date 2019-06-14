import vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import tabBar from './modules/tarbar'

vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tabBar
  },
  plugins:[
    createPersistedState({
      paths:['tabBar']
    })
  ]
})
