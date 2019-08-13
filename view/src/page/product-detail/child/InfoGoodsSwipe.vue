<template>
    <div class="swiper-wrapper comm-swipper">
      <a class="product-detail-back">
        <img src="../../../assets/images/change-icon/navBar_back_bg.png" alt="" @click="goBack()">
      </a>
      <mt-swipe :auto="4000">
        <mt-swipe-item class="comm-swipper" v-for="(item,index) in detailInfo.photos" :key="index" v-if="detailInfo.photos && detailInfo.photos.length>0">
          <img :src="item" alt="">
        </mt-swipe-item>
        <mt-swipe-item class="comm-swipper" v-if="detailInfo.photos && detailInfo.photos.length <= 0">
          <img src="../../../assets/images/change-icon/default_image.png" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "InfoGoodsSwipe",
        computed: {
          ...mapGetters({
            detailInfo: 'detailInfo'
          })
        },
        methods:{
          goBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="scss">
  .comm-swipper{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    z-index: 0;
    position: relative;
    overflow: hidden;
    .product-detail-back{
      position: absolute;
      width: 88px;
      height: 88px;
      left: 0;
      top: 0;
      z-index: 99;
      img{
        width: 100%;
      }
    }
    .mint-swipe ,.mint-swipe-items-wrap {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      z-index: 1;
      .mint-swipe-item {
        text-align: center;
        overflow: hidden;
        img {
          width: 100%;
          z-index: 0;
        }
      }
    }
    .mint-swipe-indicators{
      .mint-swipe-indicator{
        background: #b9b9b9;
        opacity: 1;
        margin: 0 5px;
        &.is-active{
          background: #e93b3d;
        }
      }
    }

  }
</style>
