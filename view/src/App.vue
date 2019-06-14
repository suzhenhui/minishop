<template>
  <div id="app">
    <router-view></router-view>
    <v-tab-bar></v-tab-bar>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import tabBar from './components/common/Tabbar'

export default {
  name: 'App',
  components:{
    'v-tab-bar':tabBar
  },
  watch: {
    $route (to,from){
      this.changeTabBar(to.name)
    }
  },
  methods:{
    ...mapMutations({
      changeTabBar:'changeTabBar'
    })
  }
}
</script>

<style>
</style>
