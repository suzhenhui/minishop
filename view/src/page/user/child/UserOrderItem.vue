<template>
  <div class="order-wrapper-item" @click="onclick()">
    <em id="count" v-if="orderNumber>0">{{orderNumber}}</em>
    <img :src="icon" alt="">
    <p>{{title}}</p>
  </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "UserOrderItem",
        props:{
          id:{
            type:String
          },
          icon:{
            type:String
          },
          title:{
            type:String
          },
          orderNumber:{
            type:Number,
            default: 0
          }
        },
        methods:{
          ...mapMutations({
            changeStatus:'changeStatus'
          }),
          onclick(){
            this.changeStatus(this.id)
            this.$router.push({name:'order'})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .order-wrapper-item{
    text-align: center;
    font-size: $fontSize;
    position: relative;
  em{
    position: absolute;
    left: 50%;
    top: 3px;
    background-color: #ff6900;
    margin-left: 6px;
    min-width: 26px;
    line-height: 26px;
    border-radius: 20px;
    color: #fff;
    font-size: 20px;
    padding: 3px;
    border: 1px solid #fff;
  }
  img{
    width: 100px;
    height: 100px;
  }
  }
</style>
