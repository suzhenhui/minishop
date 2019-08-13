<template>
    <div class="desc-detail">
      <div class="desc-header">
        <img src="../../../assets/images/change-icon/all_tit_pic.png" alt="">
      </div>
      <div class="desc-view" v-html="detailInfo.detail">
      </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "DescIem",
        computed:{
          ...mapGetters({
            detailInfo:'detailInfo'
          })
        }
    }
</script>

<style scoped>
  .desc-detail{
    padding-bottom: 20px;
  }
  .desc-detail .desc-header{
    text-align: center;
  }
  .desc-detail .desc-header img{
    height: 112px;
  }
  .desc-detail .desc-view{
    width: 100%;
    overflow: hidden;
    display: table;
    font-size: 30px;
  }
  .desc-detail .desc-view >>> img{
    display: block;
    max-width: 100%;
  }

</style>
