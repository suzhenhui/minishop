<template>
    <div class="container">
      <div class="checkout-footer">
        <div class="checkout-total">
          <span>应付金额：</span>
          <span class="num">￥ {{total.toFixed(2)}}</span>
        </div>
        <div class="checkout-btn" @click="checkout()">
          提交订单
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CheckoutFooter",
        props:['total'],
        methods:{
          checkout(){
            this.$emit('checkout')
          }
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    background: #fff;
    border-top: 1px solid #ddd;
    .checkout-footer{
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      font-size: $subFontSize;
      .checkout-total{
        padding: 0 20px;
        .num{
          color: #f00;
        }
      }
      .checkout-btn{
        width: 200px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: $redColor;
      }
    }
  }
</style>
