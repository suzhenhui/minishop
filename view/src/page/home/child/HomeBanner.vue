<template>
  <div>
    <mt-swipe :style="getBannerStyle">
      <mt-swipe-item v-for="(data, index) in items" :key="index">
        <img :style="getBannerStyle" :src="data.photo.large" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    import {Swipe,SwipeItem} from 'mint-ui'

    export default {
        name: "HomeBanner",
        props:['items'],
        methods:{

        },
       computed: {
         getBannerStyle(){
           const { width } = window.screen;
           let itemWidth = width;
           let itemHeight = width * (366/750)
           return {
             width: itemWidth + 'px',
             height: itemHeight + 'px'
           }
         }
       }
    }
</script>

<style scoped>

</style>
