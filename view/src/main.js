import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui'

import store from './store/index'

import './assets/style/reset.css'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.use(Mint)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
