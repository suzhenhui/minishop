import {fetchEndpoint} from "../server/network";

export const orderPrice = (order_product) => fetchEndpoint(
  '/order/orderprice',
  'post',
  {order_product}
)

export const payOrder = (orderNo,tid) => fetchEndpoint(
  '/order/payorder',
  'post',
  {orderNo,tid}
)

export const orderList = (status,page,per_page) => fetchEndpoint(
  '/order/list',
  'get',
  {
    status,page,per_page
  }
)

export const orderConfirm = (orderNo) => fetchEndpoint(
  '/order/confirm',
  'post',
  {orderNo}
)

export const orderSubtotal = () => fetchEndpoint(
  '/order/subtotal',
  'post'
)

export const orderGet = (order) => fetchEndpoint(
  '/order/get',
  'post',
  {order}
)

export const orderCancel = (order,cancelValue) => fetchEndpoint(
  '/order/cancel',
  'post',
  {order,cancelValue}
)
