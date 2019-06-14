<template>
    <div class="main-header">
      <input type="search" placeholder="音箱" readonly="true">
    </div>
</template>

<script>
    export default {
        name: "mHeader"
    }
</script>

<style lang="scss" scoped>
  .main-header{
    display: flex;
    justify-content: center;
    padding: 15px 0;
    border-bottom: 1px solid #e8eaed;
    input {
      margin: 0 30px;
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
