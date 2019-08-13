import {fetchEndpoint} from '../server/network'


export const authSignin = (username,password) =>
 fetchEndpoint('/user/login','post',{
    'username':username,
    'password':password
 })

