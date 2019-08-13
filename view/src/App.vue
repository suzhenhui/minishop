<template>
  <div id="app">
    <router-view></router-view>
    <v-tab-bar v-if="this.$route.meta.isshowtabbar"></v-tab-bar>
  </div>
</template>

<script>
  import { mapGetters,mapMutations } from 'vuex'
  import tabBar from './components/common/Tabbar'
  import {cartQuantity} from "./api/cart";

  export default {
  name: 'App',
  components:{
    'v-tab-bar':tabBar
  },
  watch: {
    $route (to,from){
     // console.log(to)
      this.changeTabBar(to.name)
    }
  },
  created(){
    //if(this.isOnline){
      this.getCartNumber()
    //}
  },
  computed:{
    ...mapGetters({
      isOnline:'isOnline'
    })
  },
  methods:{
    ...mapMutations({
      changeTabBar:'changeTabBar',
      setCartNumber:'setCartNumber'
    }),
    getCartNumber(){
      cartQuantity().then(res=>{
        if(res){
          this.setCartNumber(res.quantity)
        }
      })
    }
  }
}
</script>

<style>
</style>
