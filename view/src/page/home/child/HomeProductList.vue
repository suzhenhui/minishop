<template>
  <div class="product-list">
    <div class="product-list-header">
      <div class="header-icon"></div>
      <div class="header-title">{{title}}</div>
      <div class="header-icon">
        <i></i>
      </div>
    </div>
    <div class="product-list-body">
      <home-product-body v-for="(item,index) in products" :key="index" :item="item"></home-product-body>
    </div>
  </div>
</template>

<script>
    import HomeProductBody from './HomeProductBody'

    export default {
        name: "HomeProductList",
        components:{
          HomeProductBody
        },
        props:["title","products"]
    }
</script>

<style lang="scss" scoped>
  .product-list{
    margin: 20px 0;
    background: #fff;
    .product-list-header{
      display: flex;
      height: 60px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #F5F5F5;
      .header-title{
        font-size: 32px;
        color: #333;
      }
      .header-icon{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        i{
          display: block;
          width: 14px;
          height: 14px;
          border-right: 1px solid #ccc;
          border-top: 1px solid #ccc;
          transform: rotate(45deg)
        }
      }
    }
    .product-list-body{
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
