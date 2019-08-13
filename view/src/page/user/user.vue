<template>
  <div class="container">
      <div class="top-wrapper">
        <div class="nav-item left-nav-item">
          <img class="nav-icon" src="../../assets/images/change-icon/setup.png" />
        </div>
        <div class="nav-item right-nav-item">
          <img class="nav-icon" src="../../assets/images/change-icon/message.png" />
        </div>
        <div class="top-info-wrapper">
          <div class="avatar-wrapper">
            <!--<img class="avatar" src="../../assets/images/change-icon/head.png" />-->
            <img class="avatar" :src="headimg==''? require('../../assets/images/change-icon/head.png'):headimg" />
            <input type="file" name="file" accept="image/*" class="upload-btn" @change="uploadHeadImg">
          </div>
          <div class="nickname">{{nickname}}</div>
        </div>
      </div>
      <div class="order-header">
        <div class="order-header-item title">
          我的订单
        </div>
        <div @click="goOrder()" class="order-header-item">
          查看全部订单
          <span class="order-header-icon"></span>
        </div>
      </div>
      <div class="order-wrapper">
        <user-order-item
          id="0"
          title="待支付"
          :icon="require('../../assets/images/change-icon/icon_pay.png')"
          :orderNumber = orderCount.pay
        ></user-order-item>
        <user-order-item
          id="1"
          title="待发货"
          :icon="require('../../assets/images/change-icon/icon_paid.png')"
          :orderNumber = orderCount.paid
        ></user-order-item>
        <user-order-item
          id="2"
          title="待收货"
          :icon="require('../../assets/images/change-icon/icon_cart.png')"
          :orderNumber = orderCount.cart
        ></user-order-item>
        <user-order-item
          id="3"
          title="待评价"
          :icon="require('../../assets/images/change-icon/icon_receiving.png')"
          :orderNumber = orderCount.receiving
        ></user-order-item>
        <user-order-item
          title="退换货"
          :icon="require('../../assets/images/change-icon/icon_change.png')"
        ></user-order-item>
      </div>
      <div class="bottom-wrapper">
        <ul>
          <li>
            <img src="../../assets/images/change-icon/icon_sc.png" alt="">
            <span class="tt">我的收藏</span>
            <span class="icon"></span>
          </li>
          <li @click="goAddress()">
            <img src="../../assets/images/change-icon/icon_address.png" alt="">
            <span class="tt">地址管理</span>
            <span class="icon"></span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
    import UserOrderItem from './child/UserOrderItem'
    import {mapState,mapMutations,mapActions} from 'vuex'
    import {orderSubtotal} from '../../api/order'
    import {uploadImgs} from '../../api/user'
    import {Toast} from 'mint-ui'
    export default {
        name: "user",
        data(){
          return{
            headimg:''
          }
        },
        components:{
          UserOrderItem
        },
        computed:{
          ...mapState({
            isOnline: state => state.auth.isOnline,
            username: state => state.auth.username,
            orderCount: state=> state.order.orderCount
          }),
          nickname(){
            let title = '登陆/注册';
            if(this.isOnline){
              title = this.username
            }
            return title
          }
        },
        created(){
          this.fetchOrderCount()
        },
        methods:{
          ...mapMutations({
            changeStatus: 'changeStatus'
          }),
          ...mapActions({
            fetchOrderCount:'fetchOrderCount'
          }),
          goOrder(){
            this.changeStatus(10)
            this.$router.push({name:'order'})
          },
          goAddress(){
            this.$router.push({name:'addressList'})
          },
          uploadHeadImg(e){
            //console.log(window.URL.createObjectURL(e.target.files[0]))
           // console.log(e.target.files[0])
            let file = e.target.files[0]
            let imgSize = file.size
            console.log(imgSize)
            //148016
            if (imgSize > 3 * 1024 * 1024) {
              //console.log('大小不合适')
              Toast('图片不能超过3M')
              return;
            }else{
              let params = new FormData();
              params.append('file', file,file.name);
              // console.log(params.get("file"))
              uploadImgs(params).then(res=>{
                console.log( res.head_url );
                this.headimg = res.head_url;
              })
            }


           }
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction: column;
    .top-wrapper{
      height: 400px;
      background: $primaryBgColor;
      .nav-item{
        position: absolute;
        top: 20px;
        display: flex;
        width: 48px;
        height: 48px;
        .nav-icon{
          width: 100%;
        }
      }
      .left-nav-item{
        left: 20px;
      }
      .right-nav-item{
        right: 20px;
      }
    }
    .top-info-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 400px;
      justify-content: center;
      .avatar-wrapper{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #fff;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .upload-btn{
          position: absolute;
          left: 0;
          top: 0;
          width: 150px;
          height: 150px;
          opacity: 0;
        }
      }
      .nickname{
        font-size: 30px;
        color: #fff;
        margin-top: 30px;
      }
    }
    .order-header{
      display: flex;
      font-size: $fontSize;
      justify-content: space-between;
      padding: 20px 20px 20px 30px;
      border-bottom: 1px solid #e8eaed;
      color: #999;
      .order-header-item{
        display: flex;
        align-items: center;
      }
      .title{
        font-size: 30px;
        font-weight: 700;
        color: #000;
      }
      .order-header-icon{
        @include r-allow(14px, 2px, #ccc)
      }
    }
    .order-wrapper{
      display: flex;
      justify-content: space-around;
    }
    .bottom-wrapper{
      margin-top: 30px;
      border-bottom: 1px solid #e8eaed;
      li{
        display: flex;
        align-items: center;
        font-size: 30px;
        height: 80px;
        line-height: 80px;
        border-top: 1px solid #e8eaed;
        img{
          width: 60px;
          height: 60px;
          margin-left: 36px;
        }
        .tt{
          margin-left: 40px;
          flex: 1;
        }
        .icon{
          @include r-allow(14px, 2px, #ccc)
          margin: 0 36px;
        }
      }
    }
  }

</style>
