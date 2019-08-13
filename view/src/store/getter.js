export const isOnline = state => {
  return state.auth.isOnline
}

export const token = state =>{
  return state.auth.token
}

export const detailInfo = state => {
  return state.detail.detailInfo
}

export const cartNumber = state => {
  return state.tabBar.cartNumber
}
