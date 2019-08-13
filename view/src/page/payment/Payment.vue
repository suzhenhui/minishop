<template>
    <div>
      <common-header title="支付订单" v-on:goBack="goBack"></common-header>
      <div class="main-wrapper">
        <div class="orderpay-wrapper">
          <ul>
            <li>
              <span>订单编号：</span>
              <span>{{getOrderNo}}</span>
            </li>
            <li>
              <span>订单金额：</span>
              <span class="amount">¥{{getOrderAmount}}</span>
            </li>
          </ul>
          <dl>
            <dt>支付方式</dt>
            <dd>
              <div class="item" @click="goOrder(0)">
                <img src="../../assets/images/change-icon/alipay.png" alt="">
                <span class="tt">支付宝钱包支付</span>
                <em class="r-arrow"></em>
              </div>
            </dd>
            <dd>
              <div class="item" @click="goOrder(1)">
                <img src="../../assets/images/change-icon/wx.png" alt="">
                <span class="tt">微信支付</span>
                <em class="r-arrow"></em>
              </div>
            </dd>
          </dl>
        </div>

      </div>
      <div></div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui'
    import CommonHeader from '../../components/common/CommonHeader'
    import {payOrder} from '../../api/order'

    export default {
        name: "payment",
        components: {CommonHeader},
        computed:{
          getOrderNo(){
            return this.$route.query.orderNo
          },
          getOrderAmount(){
            let total = Number(this.$route.query.totalPay);
            return total?total.toFixed(2):'';
          }
        },
        methods:{
          goBack(){
            MessageBox({
              title:'',
              message:'确定要离开收银台吗？',
              showCancelButton: true,
              cancelButtonText: "狠心放弃",
              confirmButtonText: '继续支付',
            }).then(action => {
              if (action === 'cancel') {
                this.$router.push({name:'order'})
              }
            })

          },
          goOrder(tid){
            let no = this.getOrderNo;
            payOrder(no,tid).then(res=>{
              if(res){
                this.$router.push({name:'paySuccess',query:{
                    order_id: no
                  }})
              }
            })
          }
        }
    }
</script>

<style lang="scss" scoped>
  .orderpay-wrapper{
    font-size: $subFontSize;
    color: #999;
    ul{
      padding: 0 20px;
      li{
        display: flex;
        justify-content: space-between;
        height: 80px;
        line-height: 80px;
        &:first-child{
          border-bottom: 1px solid #ddd;
        }
        .amount{
          color: #ff6900;
        }
      }
    }
    dl{
      position: relative;
      padding-top: 30px;
      &::before{
        content: '';
        display: block;
        width: 100%;
        height: 30px;
        background: #f9f9fb;
        position: absolute;
        left: 0;
        top: 0;
      }
      dt{
        padding-left: 15px;
        line-height: 88px;
        border-bottom: 1px solid #ddd;
      }
      dd{
        padding: 0 20px;
        box-sizing: border-box;
        .item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          img{
            width: 88px;
            height: 88px;
          }
          .tt{
            flex: 1;
            display: flex;
            justify-content: flex-start;
          }
          .r-arrow{
            @include r-allow(10px,5px,#ccc)
          }
        }
      }
    }
  }
</style>
