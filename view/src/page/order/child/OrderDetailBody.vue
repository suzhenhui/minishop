<template>
  <div class="main-wrapper" v-if="orderDetail">
    <div class="order-status">
      <img src="../../../assets/images/change-icon/ic_cancelled_black.png" alt="">
      <span class="order-status-span"> 订单{{getStatusName}}</span>
    </div>
    <div class="address-info" v-if="orderDetail.address">
      <ul>
        <li>
          <img src="../../../assets/images/change-icon/localhost.png" alt="" class="address-info-img">
          <span class="address-info-span">
                <p class="address-info-title">
                  <i>{{orderDetail.address.contact}}</i>
                  <i>{{orderDetail.address.phone}}</i>
                </p>
                <p class="address-info-text">{{orderDetail.address.fullAddress}}</p>
              </span>
        </li>
      </ul>
    </div>
    <div class="products">
      <h5>共计{{orderDetail.tradeCount}}件商品</h5>
      <ul>
        <li v-for="(item,index) in orderDetail.productList" :key="index">
          <div class="img">
            <img class="pro-img" :src="item.goods_img" alt="">
          </div>
          <div class="info">
            <p class="title">{{item.goods_name}}</p>
            <div class="info-price">
              <span class="price">￥ {{item.goods_price.toFixed(2)}}</span>
              <span class="nums">x{{item.number}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="order-summary">
      <div class="inner-line" v-for="(item,index) in orderDetail.infoLabels" :key="index">
        <span class="title">{{item.title}}：</span>
        <span class="content">{{item.content}}</span>
      </div>
    </div>
    <div class="order-total">
      <div>
        <div class="total-item">
          <span>商品金额</span>
          <span>¥ 105.80</span>
        </div>
        <div class="total-item">
          <span>运费</span>
          <span>¥ 105.80</span>
        </div>
      </div>
      <div class="total">
        实付金额：<span class="price-tip">¥ 99.50</span>
      </div>
    </div>
  </div>
</template>

<script>
    import {ORDERSTATUS} from '../static'
    export default {
        name: "OrderDetailBody",
        props:{
          orderDetail:{
            type:Object,
            default: null
          }
        },
        computed:{
          getStatusName(){
            for(let i=0;i<ORDERSTATUS.length;i++){
              if(ORDERSTATUS[i].id == this.orderDetail.status) {
                return ORDERSTATUS[i].name
              }
            }

          }
        }
    }
</script>

<style lang="scss" scoped>
  .order-status{
    height: 90px;
    line-height: 56px;
    font-size: 32px;
    font-weight: 600;
    padding-top: 20px;
    box-sizing: border-box;
    img{
      display: inline-block;
      float: left;
      width: 48px;
      height: 48px;
      margin: 2px 10px 0 20px;
    }
  }
  .address-info{
    background: #fff;
    .address-info-img{
      float: left;
      display: inline-block;
      width: 56px;
      height: 56px;
      margin: 20px;
    }
    .address-info-span{
      width: calc(100% - 126px);
      display: inline-block;
      padding: 10px 0;
      margin-left: 10px;
      .address-info-title{
        font-size: 32px;
        line-height: 44px;
        display: flex;
        justify-content: space-between;
        i{
          font-style: normal;
        }
      }
      .address-info-text{
        font-size: $subFontSize;
        line-height: 36px;
        padding: 20px 0;
      }
    }
  }
  .products{
    margin-top: 20px;
    background: #fff;
    h5{
      color: #999;
      margin: 0 20px;
      text-align: right;
      line-height: 46px;
      font-size: $fontSize;
      border-bottom: 1px solid #e5e5e5;
      padding: 20px 0;
      font-weight: 400;
    }
    li{
      display: flex;
      padding: 20px;
      .pro-img{
        width: 160px;
        height: 160px;
      }
      .info{
        margin-left: 20px;
        font-size: $fontSize;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
          @include nowrap-clamp(2)
        }
        .info-price{
          display: flex;
          justify-content: space-between;
          .price{
            font-size: 30px;
            color: $redColor;
          }
          .nums{
            color: #999;
          }
        }
      }
    }
  }
  .order-summary{
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    font-size: 28px;
    line-height: 48px;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      height: 1px;
      background: #e5e5e5;
      left: 20px;
      right: 20px;
      bottom: 0;
    }
  }
  .order-total{
    background: #fff;
    padding: 20px;
    font-size: 28px;
    line-height: 48px;
    overflow: hidden;
    .total-item{
      display: flex;
      justify-content: space-between;
    }
    .total{
      float: right;
      padding: 20px 0;
      font-weight: 700;
      color: #333;
      font-size: 32px;
      .price-tip{
        color: $redColor;
      }
    }
  }
</style>
