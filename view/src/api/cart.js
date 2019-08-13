import {fetchEndpoint} from "../server/network";

export const cartAdd = (productId, amount) => fetchEndpoint(
    '/cart/add',
    'get',
    {
      productId,amount
    }
)

export const cartQuantity = () => fetchEndpoint(
    '/cart/quantity',
    'get'
  )

export const cartList = function () {
  return fetchEndpoint(
    '/cart/list',
    'get'
  )
}

export const orderPrice = (order_product) => fetchEndpoint(
  '/cart/price',
  'post',
  {
    order_product
  }
)

export const cartDelete = (id) => fetchEndpoint(
  '/cart/delete',
  'post',
  {id}
)

export const cartUpdateNumber = (id,amount) => fetchEndpoint(
  '/cart/update',
    'post',
    {id,amount}
)

export const cartCheckout = (addressId,cartGoodsId) => fetchEndpoint(
  '/cart/checkout',
  'post',
  {
    addressId,
    cartGoodsId
  }
)
