<template>
  <div class="product-info border">
    <img class="product-img" src="http://shop.gxzhenzhi.net/images/201906/goods_img/425_G_1559641703643.jpg" alt="">
    <span class="product-title">楠搏王敞呼吸鼻炎特效草本抑菌液[包邮]</span>
    <div class="product-bottom">
      <span class="product-price">￥ 22.00</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HomeProductBody"
    }
</script>

<style lang="scss" scoped>
  .border{
    border-right: 1px solid #F5F5F5;
  }
  .product-info{
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #F5F5F5;
    .product-img{
      width: 100%;
    }
  }
</style>
