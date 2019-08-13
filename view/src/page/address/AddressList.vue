<template>
  <div>
    <common-header title="收货地址" v-on:goBack="goBack"></common-header>
    <div class="main-wrapper list">
      <address-item v-for="(item,index) in list" :key="index" :items="item" v-on='{setDefault,goAddAddress}'></address-item>
    </div>
    <div class="all-btns">
      <a class="all-btn-add" @click="goAddAddress('add',null)">新增地址</a>
    </div>
  </div>
</template>

<script>
    import CommonHeader from '../../components/common/CommonHeader'
    import AddressItem from './child/AddressItem'
    import {mapMutations} from 'vuex'
    import {addressList, addressDefault} from '../../api/address'

    export default {
        name: "AddressList",
        data(){
          return {
            list: null
          }
        },
        created(){
          this.getAddressList();
        },
        components:{
          CommonHeader,
          AddressItem
        },
        methods:{
          ...mapMutations({
            saveAreaCode:'saveAreaCode',
            saveAddress:'saveAddress'
          }),
          getAddressList(){
            addressList().then(res=>{
              if(res){
                this.list = res.list
              }
            })
          },
          setDefault(id){
            addressDefault(id).then(res=>{
              if(res){
                this.$router.go(-1)
              }
            })
          },
          goAddAddress(mode,item){
            console.log(mode,item)
            if(item){
              this.saveAreaCode(item.area_code)
              this.saveAddress(item.area_name)
            }
            this.$router.push({name:'addressEdit',query:{
              mode:mode,
              isFormCheckout:true,
              item:item
            }})
          },
          goBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="scss" scoped>
  .list{
    background: #f9f9fb;
    padding-bottom: 150px;
  }
  .all-btns{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 130px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-top: 1px solid #ddd;
    .all-btn-add{
      background: $primaryBgColor;
      display: block;
      line-height: 88px;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      color: #fff;
      font-size: $fontSize;
    }
  }
</style>
