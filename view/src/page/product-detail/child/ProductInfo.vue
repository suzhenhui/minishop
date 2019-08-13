<template>
    <div class="info-wrapper">
      <info-goods-swipe></info-goods-swipe>
      <info-item></info-item>
      <desc-item></desc-item>
    </div>
</template>

<script>
    import InfoGoodsSwipe from './InfoGoodsSwipe'
    import InfoItem from './InfoItem'
    import DescItem from './DescIem'

    export default {
        name: "ProductInfo",
        components:{
          InfoItem,
          InfoGoodsSwipe,
          DescItem
        }
    }
</script>

<style scoped>

</style>
