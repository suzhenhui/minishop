<template>
  <div>
    <mt-swipe :style="getBannerStyle">
      <mt-swipe-item>
        <img :style="getBannerStyle" src="http://shop.gxzhenzhi.net/data/afficheimg/20190430odmzej.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img :style="getBannerStyle" src="http://shop.gxzhenzhi.net/data/afficheimg/20190531febkgn.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    import {Swipe,SwipeItem} from 'mint-ui'

    export default {
        name: "HomeBanner",
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
