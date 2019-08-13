const state = {
  province:null,
  city:null,
  district:null,
  userAddress:'',
  selectedItem:null
}

const mutations = {
  saveProvince(state,data){
    state.province=data
  },
  saveCity(state,data){
    state.city=data
  },
  saveDistrict(state,data){
    state.district=data
  },
  clearAddress(state){
    state.city=null;
    state.district=null;
  },
  saveAddress(state,data){
    state.userAddress=data
  },
  selectAddressItem(state,data){
    state.selectedItem = data
  },
  saveAreaCode(stae,code){
    code = code.split(',')
    this.commit('saveProvince',code[0])
    this.commit('saveCity',code[1])
    this.commit('saveDistrict',code[2])
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
