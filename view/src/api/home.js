import {fetchEndpoint} from "../server/network";

export const homeProductList = () => fetchEndpoint(
  '/home/productlist',
  'get'
)
