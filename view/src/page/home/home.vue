<template>
  <div class="container">
    <main-header class="header"></main-header>
    <div class="list">
      <home-banner></home-banner>
      <home-product-list></home-product-list>
      <home-product-list></home-product-list>
      <home-product-list></home-product-list>
    </div>
  </div>
</template>

<script>
    import MainHeader from '../../components/common/mHeader';
    import HomeBanner from './child/HomeBanner'
    import HomeProductList from './child/HomeProductList'

    export default {
        name: "home",
        components:{
          HomeProductList,
          MainHeader,
          HomeBanner,
          HomeProductList
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    position: absolute;
    top: 0;
    bottom: 100px;
    width: 100%;
    .list{
      position: absolute;
      bottom: 0;
      top: 94px;
      width: 100%;
      overflow-y: auto;
      background: $htmlBg;
    }
  }
</style>
