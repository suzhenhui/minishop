<template>
    <div class="info-detail">
      <div class="info-price" v-if="detailInfo.price">￥ {{detailInfo.price.toFixed(2)}}</div>
      <div class="info-text">
        <div class="info-title">{{detailInfo.fullname}}</div>
        <div class="info-subtitle">{{detailInfo.title}}</div>
      </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "InfoItem",
        computed: {
          ...mapGetters({
            detailInfo: 'detailInfo'
          })
        }
    }
</script>

<style lang="scss">
  body{
    background: #f9f9fb !important;
  }
  .info-detail{
    padding: 10px 20px;
    z-index: 100;
    font-size: $fontSize;
    background: #fff;
    .info-price{
      color: $redColor;
      font-size: 40px;
    }
    .info-text{
      margin: 20px 0;
      .info-title{
        font-size: 30px;
        @include nowrap-clamp(3);
      }
      .info-subtitle{
        font-size: 30px;
        margin-top: 20px;
        font-size: $subFontSize;
        color: #999;
      }
    }

  }
</style>
