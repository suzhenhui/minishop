import {orderSubtotal} from '../../api/order'

const state = {
  orderStatus : 10,
  orderCount : {}
}

const mutations = {
  changeStatus(state,active){
    state.orderStatus = active
  },
  changeCount(state,item){
    state.orderCount = item
  }
}

const actions = {
  fetchOrderCount({commit,state}){
    return new Promise((resolve,reject) => {
      orderSubtotal().then(res => {
        if(res){
          commit('changeCount',res.subtotal)
          resolve(res)
        }
      },err=>{
        reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
