<template>
    <div class="container">
      <p>
        <span>{{title}}</span>
        <span class="num">{{operator}}￥ {{amount.toFixed(2)}}</span>
      </p>
    </div>
</template>

<script>
    export default {
        name: "CheckoutDesc",
        props:['title','operator','amount']
    }
</script>

<style lang="scss" scoped>
  .container{
    font-size: $subFontSize;
    padding: 10px 0;
    background: #fff;
    p{
      display: flex;
      justify-content: space-between;
      span.num{
        color: #f00;
      }
    }
  }
</style>
