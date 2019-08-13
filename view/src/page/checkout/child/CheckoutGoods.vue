<template>
  <div class="container">
    <div class="goods-wrapper">
      <ul>
        <li v-for="(item,index) in items">
          <div class="pic">
            <img :src="item.img" alt="">
          </div>
          <div class="info">
            <p class="title">{{item.full_name}}</p>
            <p class="price">￥{{item.price.toFixed(2)}} <span class="num">x{{item.quantity}}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CheckoutGoods",
        props:['items']
    }
</script>

<style lang="scss" scoped>
  .container{
    padding: 0 20px;
    background: #fff;
    margin-top: 30px;
    .goods-wrapper{
      font-size: $fontSize;
      li{
        display: flex;
        padding: 30px 0;
        border-bottom: 1px solid #eee;
        .pic{
          img{
            width: 150px;
            height: 150px;
          }
        }
        .info{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 20px;
          line-height: 1.5;
          .title{
            @include nowrap-clamp(2)
          }
          .price{
            font-size: 28px;
            color: #f00;
          }
          .num{
            color: #c3c3c3;
            font-size: $fontSize;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
