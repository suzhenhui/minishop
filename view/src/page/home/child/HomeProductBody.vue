<template>
  <div class="product-info border" @click="goDetail()">
    <img class="product-img" :src="item.img" alt="">
    <span class="product-title">{{item.name}}</span>
    <div class="product-bottom">
      <span class="product-price">￥ {{item.price}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HomeProductBody",
        props:['item'],
        methods:{
          goDetail(){
            this.$router.push({name:'product',query:{id:this.item.id}})
          }
        }
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
    .product-title{
      display: -webkit-box;
      height: 66px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:2;
      word-break: break-word;
      font-size: $fontSize;
      margin: 16px 0;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .product-bottom{
      display: flex;
      justify-content: space-between;
      .product-price{
        font-size: $fontSize;
      }
    }
  }
</style>
