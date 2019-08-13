<template>
  <div class="order">
    <common-header title="我的订单" v-on:goBack="goBack"></common-header>
    <order-list></order-list>
  </div>
</template>

<script>
    import CommonHeader from "../../components/common/CommonHeader";
    import OrderList from "./child/OrderList"

    export default {
        name: "order",
        components: {CommonHeader,OrderList},
        methods:{
          goBack(){
            this.$router.push({name:'user'})
          }
        }
    }
</script>

<style lang="scss" scoped>
.order{
  background: #f9f9fb;
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
