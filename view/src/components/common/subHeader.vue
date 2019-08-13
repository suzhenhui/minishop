<template>
  <div class="main-header">
    <div class="header-back" @click="goBack()">
      <span class="back"></span>
    </div>
    <input type="search" :placeholder="keyword" readonly="true">
  </div>
</template>

<script>
  export default {
    name: "mHeader",
    props:["keyword"],
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-header{
    display: flex;
    justify-content: center;
    padding: 15px 30px;
    border-bottom: 1px solid #e8eaed;
    align-items: center;
    .header-back{
      padding: 0 30px 0 10px;
      .back{
        display: block;
        @include l-allow(20px, 2px ,#000)
      }
    }
    input {
      flex: 1;
      flex-basis: 200px;
      border:0;
      border-radius: 32px;
      height: 64px;
      background: url("../../assets/images/change-icon/search.png") 20px no-repeat;
      background-size: 32px;
      background-color: #e9ecf0;
      padding: 0 18px;
      padding-left: 60px;
      font-size: 28px;
    }
  }
</style>
