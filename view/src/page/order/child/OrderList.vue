<template>
    <div>
      <nav class="nav">
        <ul>
          <li v-for="(item,index) in ORDERNAV" :key="index" :class="{'on':orderStatus==item.id}" @click="setOrderNavActive(item.id)">
            {{item.name}}
            <div class="quantity" v-if="item.id == 0">{{orderCount.pay}}</div>
            <div class="quantity" v-if="item.id == 1">{{orderCount.paid}}</div>
            <div class="quantity" v-if="item.id == 2">{{orderCount.cart}}</div>
            <div class="quantity" v-if="item.id == 3">{{orderCount.receiving}}</div>
          </li>
        </ul>
      </nav>
      <div>
        <div v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="list">
          <div v-if="orderList.length>0">
            <dl v-for="(item,index) in orderList" :key="index">
              <dt class="tit" @click="goDetail(item)">
                <span>{{translateTime(item.createTime)}}</span>
                <em>{{getOrderStatusBy(item.status)}}</em>
              </dt>
              <dd @click="goDetail(item)">
                <div class="order-item">
                  <div v-for="(val,i) in item.pros" class="cover">
                    <img :src="val.imgs" alt="">
                    <div class="img-tag">x{{val.num}}</div>
                  </div>
                  <div v-if="item.pros.length>3" class="more">
                    <div class="more-text">查看更多</div>
                    <div class="more-icon"></div>
                  </div>
                </div>
              </dd>
              <dt class="all">
                总价：<span>￥{{Number(item.totalAmt).toFixed(2)}}</span>
                <div class="btns">
                  <a class="btn red" v-if="item.status == 0" @click="payment(item)">去付款</a>
                  <div v-if="item.status == 2">
                    <a class="btn">查看物流</a>
                    <a class="btn" @click="confirm(item,index)">确认收货</a>
                  </div>
                </div>
              </dt>
            </dl>
            <div class="loading-wrapper">
              <p v-if="!isMore && orderList.length>0">没有更多了</p>
              <mt-spinner v-if="isMore" type="triple-bounce" color="#a9d040"></mt-spinner>
            </div>
          </div>
          <div class="orders-none" v-if="orderList.length == 0">
            <img src="../../../assets/images/change-icon/none_order.png" alt="">
            <p>你没有{{getOrderStatusBy(orderStatus)}}的商品</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {ORDERNAV,ORDERSTATUS} from '../static'
    import {mapState,mapMutations,mapActions} from 'vuex'
    import {orderList,orderConfirm} from '../../../api/order'
    import {getLocalTime} from '../../../common/common'
    import {MessageBox} from 'mint-ui'
    export default {
        name: "OrderList",
        data(){
          return {
            ORDERNAV:ORDERNAV,
            ORDERSTATUS:ORDERSTATUS,
            loading: false,
            isMore: true,
            orderList:[],
            orderListParams: { page: 1, per_page: 5,status:'' },
          }
        },
        created(){
          this.getOrderList();
          this.fetchOrderCount();
        },
        computed:{
          ...mapState({
            orderStatus:state=> state.order.orderStatus,
            orderCount: state=> state.order.orderCount
          })
        },
        methods:{
          ...mapMutations({
            changeStatus:'changeStatus'
          }),
          ...mapActions({
            fetchOrderCount:'fetchOrderCount'
          }),
          getOrderList(){
            let data = this.orderListParams;
            data.status = this.orderStatus;
            orderList(data.status,data.page,data.per_page).then(res=>{
              if(res){
                this.orderList = this.orderList.concat(res.data)
                this.isMore=res.paged.more;
                this.loading= false
              }
            })
          },
          getOrderStatusBy(status){
            let data = this.ORDERSTATUS;
           // console.log(data.length)
            for(let i=0;i<data.length;i++){
              if(data[i].id == status){
                return data[i].name;
              }
            }
          },
          translateTime(val){
            return getLocalTime(Number(val))
          },
          setOrderNavActive(index){
            this.orderListParams.page=1
            this.orderList = [];
            this.changeStatus(index)
            this.getOrderList()
          },
          getMore(){
            this.loading = true;
            this.orderListParams.page = ++this.orderListParams.page
            if (this.isMore) {
              this.loading = false;
              this.getOrderList()
            }
          },
          payment(order){
            this.$router.push({name:'payment',query:{orderNo: order.orderNo,totalPay:order.totalAmt}})
          },
          confirm(item,index){
            MessageBox({
              title:'',
              message:'是否确认收货？',
              showCancelButton: true,
              cancelButtonText: "取消",
              confirmButtonText: '确认收货'
            }).then(action=>{
              console.log(action)
              if (action === 'confirm') {
                this.orderConfirms(item.orderNo,index)
              }
            })
          },
          orderConfirms(orderNo,index){
            orderConfirm(orderNo).then(res=>{
              if(res){
                this.orderList[index].status = res.status;
                this.orderList = [];
                this.getOrderList();
              }
            })
          },
          goDetail(item){
            this.$router.push({name:'orderDetail',query:{
              deal_id: item.orderNo
            }})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .nav{
    font-size: $fontSize;
    border-bottom: 1px solid #ddd;
    background: #fff;
    position: fixed;
    width: 100%;
    top: 80px;
    ul{
      display: flex;
      justify-content: space-between;
      li{
        flex: 1;
        text-align: center;
        line-height: 80px;
        position: relative;
        &.on{
          border-bottom: 2px solid $primaryColor;
          font-weight: 600;
          color: $primaryColor;
        }
        .quantity{
          position: absolute;
          right: 50%;
          top: 8px;
          background-color: #ff6900;
          border-radius: 25px;
          line-height: 30px;
          min-width: 25px;
          padding: 0 5px;
          color: #fff;
          font-size: 22px;
          margin-right: -70px;
        }
      }
    }
  }
  .list{
    width: 100%;
    overflow: auto;
    position: absolute;
    top: 180px;
    bottom: 0;
    dl{
      margin-bottom: 20px;
      background: #fff;
      padding: 0 20px;
      .tit{
        display: flex;
        justify-content: space-between;
        line-height: 80px;
        font-size: $fontSize;
        span{
          color: #999;
        }
        em{
          font-size: 28px;
          font-weight: 700;
        }
      }
      .order-item{
        display: flex;
        font-size: $fontSize;
        .cover{
          position: relative;
          width: 150px;
          height: 150px;
          margin-right: 30px;
          img{
            width: 100%;
            height: 100%;
          }
          .img-tag{
            position: absolute;
            bottom: 0;
            right: 0;
            background: rgba(0,0,0,.5);
            color: #fff;
            padding: 5px 10px;
            font-size: $fontSize;
          }
        }
        .more{
          width: 150px;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .more-icon{
            @include r-allow(10px,5px,#ccc);
            margin: 15px 0 0;
          }
        }
      }
      .all{
        line-height: 54px;
        font-size: $fontSize;
        text-align: right;
        span{
          font-size: $subFontSize;
          font-weight: 700;
        }
        .btns{
          border-top: 1px solid #ddd;
          padding: 18px 0;
          .btn{
            font-size: 22px;
            padding: 10px 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            color: #666;
            margin: 0 5px;
            &.red{
              border: 1px solid #FF6900;
              color: #FF6900;
            }
          }
        }
      }
    }
    .orders-none{
      margin-top: 200px;
      text-align: center;
      line-height: 60px;
      color: #999;
      font-size: $fontSize;
      img{
        width: 99px;
        height: 99px;
      }
    }
  }
  .loading-wrapper{
    text-align: center;
    font-size: 30px;
    color: #777;
    line-height: 48px;
    padding: 20px 0;
  }
</style>
