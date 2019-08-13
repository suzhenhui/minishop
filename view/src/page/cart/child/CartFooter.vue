<template>
    <div class="cart-footer">
      <div class="list-checkbox">
        <input id="checkall" type="checkbox" v-model="isSelected" @change="selectedAll(isSelected)">
        <label class="checkall-icon" for="checkall"></label>
        <label for="checkall">全选</label>
      </div>
      <div class="check-box">
        <div class="total-price" v-if="!isCheckedAll">
          合计：<span class="price">￥ {{total_price.toFixed(2)}}</span>
        </div>
        <div class="check-btn checkout" v-if="!isCheckedAll && total_amount != 0" @click="checkout()">去结算({{total_amount}})</div>
        <div class="check-btn disabled" v-if="!isCheckedAll && total_amount == 0">去结算({{total_amount}})</div>
        <div class="check-btn remove" v-if="isCheckedAll" @click="deleteSeleted()">删除</div>
      </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "CartFooter",
        data(){
          return{
            isSelected: true
          }
        },
        props:["isStatus","isCheckedAll"],
        computed:{
          ...mapState({
            total_amount: state => state.cart.total_amount,
            total_price: state => state.cart.total_price
          })
        },
        watch:{
          isStatus:function(value) {
            this.isSelected = value;
          },
          isCheckedAll:function (value) {
            this.isSelected = !value
          }
        },
        methods:{
          selectedAll(val){
            this.$emit('cartBottomStatus',val)
          },
          deleteSeleted(){
            this.$emit('updateCartList',true)
          },
          checkout(){
            this.$emit('productValidate')
          }
        }
    }
</script>

<style lang="scss" scoped>
.cart-footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f0f2f5;
  background: #fff;
  .list-checkbox{
    display: flex;
    align-items: center;
    font-size: $fontSize;
    .checkall-icon{
      display: inline-block;
      width: 40px;
      height: 40px;
      background: url("../../../assets/images/change-icon/choice.png") no-repeat;
      background-size: cover;
      margin: 0 20px;
    }
    input{
      opacity: 0;
      position: absolute;
      left: 0;
      &:checked + .checkall-icon{
        background: url("../../../assets/images/change-icon/choice_sel.png") no-repeat;
        background-size: cover;
      }
    }
  }
  .check-box{
    display: flex;
    font-size: $fontSize;
    .total-price{
      display: flex;
      align-items: center;
      padding: 0 10px;
      .price{
        color: $redColor;
      }
    }
    .check-btn{
      display: flex;
      width: 200px;
      height: 100px;
      font-size: 28px;
      align-items: center;
      justify-content: center;
      &.checkout{
        background: $redColor;
        color: #fff;
      }
      &.remove,&.disabled{
        background: $mainFontColor;
        color: #fff;
      }
    }
  }
}
</style>
