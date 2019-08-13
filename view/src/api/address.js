import {fetchEndpoint} from "../server/network";


export const getProvince = (id) => fetchEndpoint(
  '/address/cities',
  'get',
  {id}
)

export const addressAdd = (id,name,tel,address,area,areaName) => fetchEndpoint(
  '/address/add',
  'post',
  {
    id,name,tel,address,area,areaName
  }
)

export const addressList = () => fetchEndpoint(
  '/address/list',
  'get'
)


export const addressDefault = (id) => fetchEndpoint(
  '/address/default',
  'get',
  {id}
)
