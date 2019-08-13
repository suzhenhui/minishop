<template>
    <div class="cart-list-wrapper main-wrapper">
      <div class="list" v-for="(item,index) in cartList" :key="index">
        <div class="list-checkbox">
          <input type="checkbox" :id="index" class="checkbox" @change="changeSingleStatus(item.checked,index)" v-model="item.checked">
          <label :for="index"></label>
        </div>
        <div class="list-item">
          <div class="image">
            <img :src="item.img" alt="">
          </div>
        </div>
        <div class="list-info">
          <div class="product-title">{{item.name}}</div>
          <div class="info-price">
            <div class="price">￥ {{item.price}}</div>
            <div class="ui-number">
              <a href="javascript:;" @click="minusNumber(item.id,item.goods_number,item.stock,index)">-</a>
              <input type="number" class="number" v-model="item.goods_number" @blur.prevent="updateNumber(item.id,item.goods_number,item.stock,index)">
              <a href="javascript:;" @click="plusNumber(item.id,item.goods_number,item.stock,index)">+</a>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import {cartList,orderPrice,cartDelete,cartQuantity,cartUpdateNumber} from '../../../api/cart'
    import {mapState,mapMutations} from 'vuex'
    import {Toast}from 'mint-ui'

    export default {
        name: "CartList",
        data(){
          return {
            cartList:[], //购物车列表
            cartGoods:[], //购物车选中的商品
            orderprice:[], //购物车总价
            totalAmount:0 //购物车数量
          }
        },
        created(){
          this.getCartList(true)
        },
        methods:{
          ...mapMutations({
            saveAmount:'calculationAmount',
            savePrice:'calculationPrice',
            saveSelectedCartGoods:'saveSelectedCartGoods',
            setCartNumber:'setCartNumber'
          }),
          //获取购物车列表
          getCartList(status){
            cartList().then(res=>{
              if(res && res.goods.length>0){
                this.cartList = Object.assign([],res.goods);
                this.addChecked(status)
                this.renderCart()
              }else{
                this.cartList=[]
              }
              this.$emit('listIsEmpty',this.cartList)
            })
          },
          //为购物车列表添加checked属性
          addChecked(value){
            let data = this.cartList;
            for(let i=0,len=data.length; i<=len-1; i++){
              if(data[i].stock <= 0){
                this.$set(data[i],'checked',true)
              }else{
                this.$set(data[i],'checked',value)
              }
            }
            this.cartList = Object.assign([],data)
          },
          //获取选中的购物车商品和数量，并请求计算价格
          renderCart(){
            let data = this.cartList;
            this.totalAmount=0;
            this.orderprice=[];
            this.cartGoods=[];
            for(let i=0,len=data.length;i<=len-1;i++){
              let obj = {
                goods_id: data[i].goods_id,
                goods_num: data[i].goods_number
              }
              if(data[i].checked){
                this.orderprice.push(obj)
                this.totalAmount += data[i].goods_number;
                this.cartGoods.push(data[i])
              }
            }
            this.getOrderPrice()
          },
          getOrderPrice(){
            let params = {
              orderprice: ''
            }
            if(this.orderprice.length>0){
              params.orderprice = JSON.stringify(this.orderprice)
            }else{
              this.saveAmount(0)
              this.savePrice(0)
              return;
            }
            orderPrice(params.orderprice).then(res=>{
              if(res){
                let price = res.order_price.total_price;
                this.saveAmount(this.totalAmount)
                this.savePrice(price)
              }
            })
          },
          // 点击checkbox按钮触发全选和重新计算数量价格
          changeSingleStatus(value,index){
            let data = this.cartList,
                status=false,
                length=0;
            for(let i=0,len=data.length; i<=len-1; i++){
              if(data[i].checked){
                length++
              }
            }
            if(length == data.length){
              status=true;
            }else{
              status=false;
            }
            this.$emit('changeFooterStatus',status)
            this.renderCart()
          },
          deleteSelected(){
            let data = this.cartList;
            let deleteGoods = [];
            for(let i=0,len=data.length; i<=len-1; i++){
              if(data[i].checked){
                deleteGoods.push(data[i].goods_id)
              }
            }
            if(deleteGoods.length > 0){
              deleteGoods = JSON.stringify(deleteGoods)
            }else{
              Toast('你还没有选中商品哦')
              return;
            }
            cartDelete(deleteGoods).then(res=>{
              if(res.code=='200'){
                this.getCartNumber();
                this.getCartList(false);
              }
            })
          },
          getCartNumber(){
            cartQuantity().then(res=>{
              if(res){
                this.setCartNumber(res.quantity)
              }
            })
          },
          /*
          *   @params: id  商品id
          *   @params: amount  商品数量
          *   @params: id  商品库存
          *   @params: id  当前商品的index
          * */
          minusNumber(id,amount,stock,index){
            if(amount > stock){
              Toast('商品库存不足')
            }else if(amount<=1) {
              Toast('已经不能再少了')
            }else{
              amount--;
              cartUpdateNumber(id,amount).then(res=>{
                if(res){
                  this.cartList[index].goods_number = amount;
                  this.renderCart()
                  this.getCartNumber()
                }
              })
            }
          },
          plusNumber(id,amount,stock,index){
            if(amount < stock){
              amount++;
              cartUpdateNumber(id,amount).then(res=>{
                if(res){
                  this.cartList[index].goods_number = amount;
                  this.renderCart()
                  this.getCartNumber()
                }
              })
            }else{
              Toast('商品库存不足')
            }
          },
          updateNumber(id,amount,stock,index){
            //console.log(id,amount,stock,index)
            if(amount > stock){
              Toast('商品库存不足')
            }else if(amount<=0){
              Toast('已经不能再少了')
            }else{
              cartUpdateNumber(id,amount).then(res=>{
                if(res){
                  this.cartList[index].goods_number = amount;
                  this.renderCart()
                  this.getCartNumber()
                }
              })
            }
          },
          productValidate(){
              this.saveSelectedCartGoods({cart_goods:this.cartList});
              this.$router.push({name:'checkout',params:{isCart: true}})
          }
        }

    }
</script>

<style lang="scss" scoped>
  .cart-list-wrapper{
    background: $htmlBg;
    overflow: hidden;
  }
  .list{
    display: flex;
    margin: 20px;
    padding: 20px 0;
    background: #fff;
    div.list-checkbox{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      label{
        width: 40px;
        height: 40px;
        display: inline-block;
        background: url("../../../assets/images/change-icon/choice.png") no-repeat;
        background-size: cover;
      }
      input{
        opacity: 0;
        position: absolute;
        left: 0;
        &:checked + label{
          background: url("../../../assets/images/change-icon/choice_sel.png") no-repeat;
          background-size: cover;
        }
      }
    }
    .list-item .image{
      width: 180px;
      img{
        width: 100%;
      }
    }
    .list-info{
      display: flex;
      overflow: hidden;
      padding: 0 20px;
      flex-wrap: wrap;
      width: 100%;
      .product-title{
        font-size: $fontSize;
        height: 80px;
        line-height: 40px;
        @include nowrap-clamp(2);
        font-weight: 700;
      }
      .info-price{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .price{
          font-size: $fontSize;
          color: $redColor;
        }
      }
    }
  }
</style>
