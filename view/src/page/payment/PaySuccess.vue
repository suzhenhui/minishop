<template>
  <div>
    <common-header title="购买成功" v-on:goBack="goBack"></common-header>
    <div class="main-wrapper">
      <div class="animation-ok">
        <div class="box">
          <div class="box-item right">
            <div class="circleProgress rightcircle"></div>
          </div>
          <div class="box-item left">
            <div class="circleProgress leftcircle"></div>
          </div>
          <div class="box-ok"></div>
        </div>
      </div>
      <div class="text-box">
        <div class="title">订单提交成功</div>
        <com-button class="button" type="negative" @click="click">订单详情</com-button>
      </div>
    </div>
  </div>
</template>

<script>
    import CommonHeader from '../../components/common/CommonHeader'
    import comButton from '../../components/common/comButton'
    export default {
        name: "PaySuccess",
        components: {CommonHeader,comButton},
        methods:{
          goBack(){
            this.$router.push({name:'order'})
          },
          click(){
            let order_id = this.$route.query.order_id
            this.$router.push({name:'orderDetail',query:{
                deal_id:order_id
              }})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .box{
    margin: 100px auto 40px;
    width: 200px;
    height: 200px;
    position: relative;
    .box-ok{
      width: 100px;
      height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: rotate(-45deg);
      margin: -25px 0 0 -50px;
      overflow: hidden;
      &::before,&::after{
        content: '';
        position:absolute;
        background:#4dc71f;
        border-radius:4px;
      }
      &::before{
        width:6px;
        height:50px;
        left:0;
        animation:dgLeft 0.2s linear both
      }
      &::after{
        width:100px;
        height:6px;
        bottom:0;
        animation:dgRight 0.2s linear .2s both;
      }
    }
    .box-item{
      width: 100px;
      height: 200px;
      overflow: hidden;
      position: absolute;
      top: 0;
      .circleProgress{
        width: 188px;
        height: 188px;
        border: 6px solid transparent;
        border-radius: 50%;
        position: absolute;
        top: 0;
        transform: rotate(-135deg);
      }
      .rightcircle{
        border-top:6px solid #4dc71f;
        border-right:6px solid #4dc71f;
        right:0;
        animation: circleProgressLoad_right .5s linear .4s  forwards;
      }
      .leftcircle{
        border-bottom:6px solid #4dc71f;
        border-left:6px solid #4dc71f;
        left:0;
        animation: circleProgressLoad_left .5s linear .9s forwards;
      }
    }
    .right{
      right: 0;
    }
    .left{
      left: 0;
    }
  }
  .text-box{
    .title{
      text-align: center;
      font-size: $subFontSize;
      color: #4dc71f;
    }
    .button{
      margin: 40px auto;
      display: block;
      padding: 10px 50px;
    }
  }

  @-webkit-keyframes dgLeft{
    0%{
      top:-100%
    }
    100%{
      top:0%
    }
  }
  @-webkit-keyframes dgRight{
    0%{
      left: -100%;
    }
    100%{
      left: 0;
    }
  }
  @-webkit-keyframes circleProgressLoad_right {
    0%{
      transform: rotate(-135deg);
    }
    100%{
      transform: rotate(45deg);
    }
  }
  @keyframes circleProgressLoad_left{
    0%{
      transform: rotate(-135deg);
    }
    100%{
      transform: rotate(45deg);
    }
  }
</style>
