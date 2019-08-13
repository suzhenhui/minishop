<template>
  <div class="container">
    <common-header title="确认订单" v-on:goBack="goBack"></common-header>
    <div class="main-wrapper">
      <checkout-address :address="address"  @click.native="goEditAddress()"></checkout-address>
      <checkout-goods :items="goodsList"></checkout-goods>
      <div class="buy-section">
        <checkout-desc :title="item.title" :operator="item.operator" :amount="item.amount" v-for="(item,index) in priceList" :key="index"></checkout-desc>
      </div>
    </div>
    <checkout-footer :total="totalAmt" v-on:checkout="checkout"></checkout-footer>
  </div>
</template>

<script>
    import CommonHeader from '../../components/common/CommonHeader'
    import CheckoutAddress from './child/CheckoutAddress'
    import CheckoutGoods from './child/CheckoutGoods'
    import CheckoutDesc from './child/CheckoutDesc'
    import CheckoutFooter from './child/CheckoutFooter'
    import {mapState,mapMutations} from 'vuex'
    import {Toast} from 'mint-ui'
    import {orderPrice} from "../../api/order";
    import {cartCheckout,cartQuantity} from "../../api/cart"

    export default {
        name: "checkout",
        data(){
          return {
            goodsList:[],
            priceList:[],
            address:null,
            totalAmt:0
          }
        },
        components:{
          CommonHeader,
          CheckoutAddress,
          CheckoutGoods,
          CheckoutDesc,
          CheckoutFooter
        },
        created(){
          this.getOrderPrice()
        },
        computed:{
          ...mapState({
            cartGoods: state => state.cart.cart_goods
          }),
          getOrderProducts(){
            let cartGoods = this.cartGoods;
            let orderProducts = [];
            for(var key of cartGoods){
              let goods = {};
              goods.goods_id = key.goods_id;
              goods.goods_num=key.goods_number;
              orderProducts.push(goods)
            }
            return orderProducts;
          },
          getCartGoodsIds(){
            let cartGoods = this.cartGoods;
            let goodsIds = [];
            if(cartGoods && cartGoods.length>0){
              goodsIds = cartGoods.map(function (cartGood) {
                console.log(cartGood)
                return cartGood.id
              })
            }
            return goodsIds
          }
        },
        methods:{
          ...mapMutations({
            clearSelectedCartGoods:'clearSelectedCartGoods',
            setCartNumber:'setCartNumber'
          }),
          getOrderPrice(){
            let order_product = this.getOrderProducts?JSON.stringify(this.getOrderProducts):'';
            orderPrice(order_product).then(res=>{
              if(res && res.productList && res.priceList){
                this.goodsList = res.productList;
                this.priceList = res.priceList;
                this.address = res.address;
                this.totalAmt = res.totalAmt
              }
            })
          },
          goBack(){
            this.$router.go(-1)
          },
          goEditAddress(){
            if(this.address){
              this.$router.push({name:'addressList'})
            }else{
              this.$router.push({name:'addressEdit',query:{
                  isFormCheckout:true
              }})
            }
          },
          checkout(){
            let selectAddress = this.address?this.address.id:null;
            let cartGoods = this.getCartGoodsIds ? JSON.stringify(this.getCartGoodsIds) : null;;
           // console.log(cartGoods)
            //console.log(selectAddress)
            if(!selectAddress){
              Toast('请填写收货地址');
              return;
            }

            cartCheckout(selectAddress,cartGoods).then(res=>{
              console.log(res)
              this.clearSelectedCartGoods();
              this.getCartNumber()
              this.$router.push({name:'payment',query:{
                orderNo: res.order.orderNo,
                totalPay:res.order.totalPay
              }})
            },err=>{
              Toast(err)
            })
          },
          getCartNumber(){
            cartQuantity().then(res=>{
              if(res){
                this.setCartNumber(res.quantity);
              }
            })
          },
          goBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    background: $mainbgColor;
  }
  .header{
    @include header()
  }
  .buy-section{
    margin-top: 30px;
    padding: 20px;
    background: #fff;
  }
</style>
