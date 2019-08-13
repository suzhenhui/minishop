import {ENUM} from '../../const/enum'

export const ORDERNAV = [
  {
    'name': '全部',
    'id': ENUM.ORDER_STATUS.ALL
  },
  {
    'name': '待支付',
    'id': ENUM.ORDER_STATUS.CREATED
  },
  {
    'name': '待发货',
    'id': ENUM.ORDER_STATUS.PAID
  },
  {
    'name': '待收货',
    'id': ENUM.ORDER_STATUS.DELIVERING
  },
  {
    'name': '待评价',
    'id': ENUM.ORDER_STATUS.DELIVERIED
  }
]


export const ORDERSTATUS = [
  {
    'name':'已取消',
    'id': ENUM.ORDER_STATUS.CANCELLED
  },
  {
    'name': '已完成',
    'id': ENUM.ORDER_STATUS.FINISHED
  },
  {
    'name': '待评价',
    'id': ENUM.ORDER_STATUS.DELIVERIED
  },
  {
    'name': '配送中',
    'id': ENUM.ORDER_STATUS.DELIVERING
  },
  {
    'name': '待发货',
    'id': ENUM.ORDER_STATUS.PAID
  },
  {
    'name': '待付款',
    'id': ENUM.ORDER_STATUS.CREATED
  }
]

export const CANCELSTATUS = ['送货信息写错了', '付款有问题，付不了', '重复下单/误下单', '东西买错了，需要调整', '就是不想买了', '其他原因']
