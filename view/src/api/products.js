import {fetchEndpoint} from "../server/network";

export const productList =  (category,page,per_page) => fetchEndpoint(
  '/products/list',
  'get',
  {
    category,page,per_page
  }
)

export const searchProductList =  (category,page,per_page,keyword) => fetchEndpoint(
  '/products/list',
  'get',
  {
    category,page,per_page,keyword
  }
)

export const productGet = (productId) => fetchEndpoint(
  '/products/detail',
    'get',
    {
      productId
    }
)
