<template>
  <div class="product-info border" @click="goDetail()">
    <img ref="img" class="product-img" v-lazy="item.img" alt="">
    <span class="product-title">{{item.name}}</span>
    <div class="product-bottom">
      <span class="product-price">￥ {{item.price}}</span>
    </div>
  </div>
</template>

<script>
    import {Lazyload} from 'mint-ui'
    export default {
        name: "HomeProductBody",
        props:['item'],
        mounted(){
          this.getImgWh()
        },
        methods:{
          goDetail(){
            this.$router.push({name:'product',query:{id:this.item.id}})
          },
          getImgWh(){
            let w = this.$refs.img.width;
            this.$refs.img.style.height = w + 'px';
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
      line-height: 33px;
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
  img[lazy=loading] {
    height: 100px;
    margin: auto;
  }
</style>
