export const ENUM = {
    // 订单状态
    ORDER_STATUS: {
      CREATED: 0,  //  待付款
      PAID: 1,  //  待发货
      DELIVERING: 2,  //  发货中
      DELIVERIED: 3,  //  已收货，待评价
      FINISHED: 4,  //  已完成
      CANCELLED: 5,  //  已取消
      ALL: 10,  //  全部 // TODO: 去除状态ALL
    }
}
