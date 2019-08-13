<template>
    <div class="detail-footer">
      <div class="cart-icon" @click="goCart()">
        <img src="../../assets/images/change-icon/detail_info_cart.png" alt="">
        <span class="num" v-if="cartNumber>0">{{cartNumber}}</span>
      </div>
      <div class="btn" @click="addCart()" v-if="detailInfo.stock>0">
        <span>加入购物车</span>
      </div>
      <div class="btn disabled-card" v-if="detailInfo.stock<=0">
        <span>暂时没货</span>
      </div>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import {cartAdd,cartQuantity} from "../../api/cart";
    import {Toast} from 'mint-ui'

    export default {
        name: "DetailFooter",
        computed:{
          ...mapGetters({
            detailInfo:'detailInfo',
            cartNumber:'cartNumber'
          })
        },
        methods:{
          ...mapMutations({
            setCartNumber:'setCartNumber'
          }),
          addCart(){
            let params ={
              productId:this.detailInfo.id,
              amount: "1"
            }
            cartAdd(params.productId, params.amount).then(res=>{
              if(res.code = '200'){
                Toast('加入购物车成功')
                this.getCarNumber()
              }
            },error => {
              Toast(error)
            })
          },
          getCarNumber(){
            cartQuantity().then(res=>{
                this.setCartNumber(res.quantity)
            })
          },
          goCart(){
            this.$router.push({name:'cart'})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .detail-footer{
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 100px;
    display: flex;
    z-index: 99;
    .cart-icon{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 14px 50px;
      position: relative;
      img{
        width: 60px;
        height: 60px;
      }
      span.num{
        position: absolute;
        right: -5px;
        top: 4px;
        padding: 4px 8px;
        background: $redColor;
        color: #fff;
        border-radius: 20px;
      }
    }
    .btn{
      background: $redColor;
      text-align: center;
      flex: 1;
      line-height: 100px;
      color: #fff;
      font-size: $fontSize;
      &.disabled-card{
        background: #c3c3c3;
      }
    }
  }
</style>
