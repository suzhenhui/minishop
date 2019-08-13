<template>
  <div class="selected-wrapper">
    <div class="selected-area">
      <input type="text" class="ipt" placeholder="省 市 区" v-model="userAddress" readonly @click="chooseAddress()">
      <span class="arrow"></span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FromChooseItem",
        props:['userAddress'],
        methods:{
          chooseAddress(){
            this.$emit('chooseAddr')
          }
        }
    }
</script>

<style lang="scss" scoped>
  .selected-area{
    position: relative;
    .ipt{
      width: 100%;
      height: 88px;
      line-height: 88px;
      box-sizing: border-box;
      font-size: $fontSize;
      border: 0;
    }
    .arrow{
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -15px;
      @include r-allow(15px,3px,#ccc)
    }
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #ddd;
    }
  }
</style>
