import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui'

import store from './store/index'
import utils from './util/util'

import './assets/style/reset.css'
import 'mint-ui/lib/style.css'
import './assets/style/common.scss'
import './assets/style/my-mint.scss'

Vue.config.productionTip = false;

Vue.prototype.utils = utils


Vue.use(Mint)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
