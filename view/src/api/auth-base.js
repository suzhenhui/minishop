import {fetchEndpoint} from '../server/network'


export const authSignin = (username,password) =>
 fetchEndpoint('/user/login','post',{
    'username':username,
    'password':password
 })

export const authSignup = (username,password) => fetchEndpoint(
  '/user/reg','post',{
    username,password
  }
)
