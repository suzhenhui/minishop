<template>
  <div class="cart-wrapper">
    <cart-header v-on:changeListSelected="changeListSelected" :isEmpty="isEmpty"></cart-header>
    <!--<cart-list ref="list" v-on:changeFooterStatus="changeFooterStatus" v-on:listIsEmpty="listIsEmpty"></cart-list>-->
    <cart-list v-if="!isEmpty" ref="list" v-on='{changeFooterStatus,listIsEmpty}'></cart-list>
    <cart-footer v-if="!isEmpty" v-on='{cartBottomStatus,updateCartList,productValidate}' :isCheckedAll="isFinish" :isStatus="isStatus"></cart-footer>
    <div class="empty-cart" v-if="isEmpty">
      <img src="../../assets/images/change-icon/nosku.png">
      <p>购物车里还没有商品</p>
      <span class="btn" @click="goHome()">回首页逛逛</span>
    </div>
  </div>
</template>

<script>
    import CartHeader from './child/CartHeader'
    import CartList from './child/CartList'
    import CartFooter from './child/CartFooter'

    export default {
        name: "Cart",
        data(){
          return {
            isStatus: true,  //是否默认选中底部的全选按钮
            isEmpty: false,  //购物车是否空
            isFinish: false
          }
        },
        components:{
          CartHeader,
          CartList,
          CartFooter
        },
        created(){
          // this.$on('cartBottomStatus',(status) => {
          //   console.log(123)
          // })
        },
        methods:{
          // 当子组件点击了单项checkbox触发底部全选按钮是否全选
          changeFooterStatus(status){
             this.isStatus = status
           },
          //点击子组件底部的全选按钮，触发另外子组件的checkbox
          cartBottomStatus(status){
            this.$refs.list.addChecked(status)
            this.$refs.list.renderCart();
          },
          listIsEmpty(data){
            if(data.length>0){
              this.isEmpty = false
            }else{
              this.isEmpty = true
            }
          },
          //编辑-完成-编辑
          changeListSelected(status){
            if(!this.isEmpty){
              this.isFinish = status
              if(status){
                this.$refs.list.addChecked(false)
              }else{
                this.$refs.list.addChecked(true)
              }
            }
            this.$refs.list.renderCart();
          },
          // 删除选中
          updateCartList(status){
            if(status){
              this.$refs.list.deleteSelected()
            }
          },
          productValidate(){
              this.$refs.list.productValidate()
          },
          goHome(){
            this.$router.push({name:'home'})
          }
        }
    }
</script>

<style lang="scss" scoped>
.empty-cart{
  text-align: center;
  padding-top: 180px;
  font-size: $fontSize;
  img{
    width: 300px;
  }
  .btn{
    display: inline-block;
    padding: 25px 50px;
    margin-top: 40px;
    border: 1px solid $primaryColor;
    border-radius: 10px;
    color: $primaryColor;
  }
}
</style>
