export const ENUM = {
    ERROR_CODE: {
      OK: 0,  //  正常
      UNKNOWN_ERROR: 10000,  //  内部错误
      TOKEN_INVALID: 10001,  //  Token 无效
      TOKEN_EXPIRED: 10002  //  Token 过期
    },

    // 订单状态
    ORDER_STATUS: {
      CREATED: 0,  //  待付款
      PAID: 1,  //  待发货
      DELIVERING: 2,  //  发货中
      DELIVERIED: 3,  //  已收货，待评价
      FINISHED: 4,  //  已完成
      CANCELLED: 5,  //  已取消
      ALL: 10,  //  全部
    }
}
