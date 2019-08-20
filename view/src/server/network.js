import axios from 'axios'
import store from '../store/index'
import { ENUM } from '../const/enum'

axios.interceptors.request.use(config=>{
  let token = null;
  if(store.getters.token){
    token = store.getters.token
    config.headers['token'] = token;
  }

  return config
})

axios.interceptors.response.use(response => {
  if(response){
    if(response.data && !response.data.error_code){
      return response.data;
    }else{
      let errorMessage = response.data.msg;
      let errorCode = response.data.error_code;
      onAuthInvaild(errorCode)
      return Promise.reject({ 'errorCode': errorCode, 'errorMsg': errorMessage });
    }
  }else{
    console.log('网络错误')
  }
})

axios.defaults.withCredentials=true

export function fetchEndpoint(reqUrl, type = 'POST', data = {}) {
  reqUrl = config.API_HOST + reqUrl;

  type = type.toLowerCase()
  if(type == 'get'){
    let dataStr = '';
    if(JSON.stringify(data) != '{}'){
      Object.keys(data).forEach((item,index)=>{
        dataStr += item + '=' + data[item] + '&'
      })

      if(dataStr != ''){
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        reqUrl += '?'+dataStr;
      }
    }


  }

  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: reqUrl,
      data: data
    }).then(res => {
      resolve(res)
    }, error => {
      reject(error);
    })
  })
}

export function fetchUpload(reqUrl, data) {
  reqUrl = config.API_HOST + reqUrl;

  return new Promise((resolve, reject) => {
    axios.post(reqUrl, data).then(res => {
      resolve(res)
    }, error => {
      reject(error);
    })
  })

}

function onAuthInvaild(errorCode) {
  if(errorCode == ENUM.ERROR_CODE.TOKEN_INVALID || errorCode == ENUM.ERROR_CODE.TOKEN_EXPIRED){
    window.router.push({ name: 'signin', params: { isTokenInvalid: true } })
  }
}
