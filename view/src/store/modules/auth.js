const state = {
  isOnline: false,
  token: null,
  username: null,
  isTokenInvalid: false
}


const mutations = {
  signin(state,payload){
    this.commit('saveUser',payload);
    this.commit('saveToken',payload);
    state.isTokenInvalid = false;
  },
  saveUser(state, payload){
    state.username = payload.username;
  },
  saveToken(state,payload){
    state.isOnline = true;
    state.token = payload.token;
  },
  signout(state){
    this.commit('clearUser')
    this.commit('clearToken')
  },
  clearUser(state){
    state.user = null
  },
  clearToken(state){
    state.isOnline = false
    state.token = null
  }
}

export default {
  state,
  mutations
}
