<template>
    <div class="product-body">
      <div class="product-list" @click="goDetail()">
          <div class="product-img">
            <img :src="item.img" alt="">
          </div>
          <div class="product-info" v-for="">
            <div class="product-header">
              <h4>{{item.name}}</h4>
              <h6>{{item.title}}</h6>
            </div>
            <div class="product-bottom">
              <span class="price">￥{{item.price.toFixed(2)}}</span>
              <a class="buy-btn"></a>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ProductListBody",
        props:["item","requestparams"],
        methods:{
          goDetail(){
            this.$router.push({name:'product',query:{id:this.item.id}})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .product-body{
    padding: 0 20px;
    .product-list{
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
      .product-img{
        width: 200px;
        img{
          width: 100%;
        }
      }
      .product-info{
        padding-left: 20px;
        font-size: 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        overflow: hidden;
        h4,h6{
          font-weight: normal;
        }
        h4{
          @include nowrap-clamp(2);
        }
        h6{
          font-size: $fontSize;
          margin-top: 10px;
          color: $mainFontColor;
          @include nowrap();
        }
        .product-bottom{
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .price{
            color: $redColor;
            font-size: 30px;
          }
          .buy-btn{
            display: block;
            width: 50px;
            height: 50px;
            background: url("../../../assets/images/change-icon/buy_btn.png") no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }
</style>
