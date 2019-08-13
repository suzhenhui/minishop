<template>
  <div class="container">
    <main-header class="header"></main-header>
    <div class="list">
      <home-banner :items="banners" v-if="banners && banners.length > 0"></home-banner>
      <home-product-list :products="goodProducts" title="热门推荐"></home-product-list>
      <home-product-list :products="newProducts" title="新品上架"></home-product-list>
    </div>
  </div>
</template>

<script>
    import MainHeader from '../../components/common/mHeader';
    import HomeBanner from './child/HomeBanner'
    import HomeProductList from './child/HomeProductList'
    import {mapState,mapActions} from 'vuex'
    import {Toast} from 'mint-ui';

    export default {
        name: "home",
        components:{
          HomeProductList,
          MainHeader,
          HomeBanner,
          HomeProductList
        },
        computed:{
          ...mapState({
            banners: state => state.home.banners,
            goodProducts: state => state.home.goodProducts,
            newProducts: state => state.home.newProducts
          })
        },
        methods:{
          ...mapActions({
            fetchHomeBanner:'fetchHomeBanner',
            fetchHomeProduct:'fetchHomeProduct'
          })
        },
        created(){
          this.fetchHomeBanner();
          this.fetchHomeProduct()
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
