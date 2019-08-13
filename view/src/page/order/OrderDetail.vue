<template>
    <div class="detail">
      <common-header title="订单详情" v-on:goBack="goBack"></common-header>
      <order-detail-body :orderDetail="orderDetail"></order-detail-body>
      <div class="order-btn">
        <a v-if="orderDetail.status < 3 || orderDetail.status != 5" @click="chooseCancel()">取消订单</a>
        <a v-if="orderDetail.status > 2" @click="deleteOrder()">删除订单</a>
        <a class="buyagain" @click="goPay()" v-if="orderDetail.status == 0">去支付</a>
        <a class="buyagain" v-if="orderDetail.status > 2">再次购买</a>
      </div>
      <mt-popup
        v-model="popupVisible"
        position="bottom" class="poppicker">
        <div >
          <div class="popp-header">
            <button @click="close()">取消</button>
            <button @click="cacelOrder()">确定</button>
          </div>
          <mt-picker :slots="slots"  @change="onValuesChange"></mt-picker>
        </div>
      </mt-popup>
    </div>
</template>

<script>
    import CommonHeader from "../../components/common/CommonHeader";
    import OrderDetailBody from "./child/OrderDetailBody"
    import {orderGet,orderCancel} from "../../api/order"
    import {CANCELSTATUS} from "./static"
    import {Popup,Picker  } from 'mint-ui'

    export default {
        name: "OrderDetail",
        data(){
          return {
            orderDetail:{},
            popupVisible : false,
            order_id:this.$route.query.deal_id,
            slots: [
              {
                flex: 1,
                values: CANCELSTATUS,
                textAlign: 'center',
                showToolbar: true
              }
            ],
            chooseCancelValue:''
          }
        },
        components:{
          CommonHeader,
          OrderDetailBody
        },
        created(){
          if(!this.order_id){
            this.$router.push({name:'order'})
          }
          this.orderInfo(this.order_id)
        },
        methods:{
          goBack(){
            this.$router.go(-1)
          },
          orderInfo(order){
            orderGet(order).then(res=>{
              if(res){
                this.orderDetail = res;
              }
            })
          },
          cacelOrder(){
            orderCancel(this.order_id,this.chooseCancelValue).then(res=>{
              if(res){
                this.orderInfo(this.order_id)
              }
            })
          },
          goPay(){
            this.$router.push({name:'payment',query:{
                orderNo: this.orderDetail.orderNo,
                totalPay: this.orderDetail.totalAmt
            }})
          },
          onValuesChange (picker, values) {
            this.chooseCancelValue = values
          },
          chooseCancel(){
            this.popupVisible = true;
          },
          close(){
            this.popupVisible = false;
            this.chooseCancelValue = '';
          }
        }
    }
</script>

<style lang="scss" scoped>
 .detail{
   background: #f9f9fb;
   .order-btn{
     position: fixed;
     bottom: 0;
     left: 0;
     background: #fff;
     width: 100%;
     height: 100px;
     line-height: 100px;
     padding: 0 20px;
     box-sizing: border-box;
     text-align: right;
     box-shadow: 0 -4px 8px 0 rgba(0,0,0,.07);
     a{
       width: 150px;
       height: 60px;
       line-height: 60px;
       display: inline-block;
       border: 1px solid #BBB;
       border-radius: 5px;
       text-align: center;
       font-size: $fontSize;
       margin: 0 10px;
       &.buyagain{
         border: 0;
         background: $redColor;
         color: #fff;
       }
     }
   }
 }
  .poppicker{
    width: 100%;
    font-size: $fontSize;
  }
  .popp-header{
    background: #eee;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    button{
      padding: 10px 20px;
    }
  }
</style>
