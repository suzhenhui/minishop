<template>
    <div>
      <common-header :title="getTitle" v-on:goBack="goBack"></common-header>
      <div class="main-wrapper">
        <div class="address_content">
          <from-input-item ref="name" :default="getName" type="text" placeholder="收货人姓名"></from-input-item>
          <from-input-item ref="tel" :default="getPhone" type="tel" placeholder="手机号码"></from-input-item>
          <from-choose-item :userAddress="userAddress" v-on:chooseAddr="chooseAddr"></from-choose-item>
          <from-input-item ref="address" :default="getAddr" type="text" placeholder="详细地址"></from-input-item>
        </div>
          <com-button class="address-btn" @click="submit">确认</com-button>
      </div>
      <from-choose-list ref="chooseList"></from-choose-list>
    </div>
</template>

<script>
    import CommonHeader from "../../components/common/CommonHeader";
    import FromInputItem from "./child/FromInputItem"
    import FromChooseItem from "./child/FromChooseItem"
    import FromChooseList from "./child/FromChooseList"
    import {mapState,mapMutations} from "vuex"
    import {Toast} from 'mint-ui'
    import {addressAdd} from '../../api/address'
    import comButton from '../../components/common/comButton'

    export default {
        name: "AddressEdit",
        data(){
          return {

          }
        },
        components:{
          CommonHeader,
          FromInputItem,
          FromChooseItem,
          FromChooseList,
          comButton
        },
        created(){
        },
        computed:{
          ...mapState({
            userAddress: state => state.address.userAddress,
            province: state => state.address.province,
            city:state => state.address.city,
            district:state => state.address.district
          }),
          getName(){
            if(this.getItem){
              return this.getItem.uname
            }
          },
          getPhone(){
            if(this.getItem){
              return this.getItem.tel
            }
          },
          getAddr(){
            if(this.getItem){
              return this.getItem.address
            }
          },
          getTitle(){
            if (this.isAddMode) {
              return '新增地址'
            } else {
              return '修改地址'
            }
          },
          isAddMode() {
            let mode = this.$route.query.mode;
            // add: 添加地址，edit: 编辑地址
            if (mode === 'add') {
              return true
            } else {
              return false
            }
          },
          getItem() {
            return this.$route.query.item;
          }
        },
        methods:{
          ...mapMutations({
            selectAddressItem:'selectAddressItem'
          }),
          chooseAddr(){
            this.$refs.chooseList.chooseAddress()
          },
          submit(){
            let id = '';
            if(!this.isAddMode){
               id = this.$route.query.item.id ? this.$route.query.item.id:'';
            }
            let name = this.$refs.name.value;
            let tel = this.$refs.tel.value;
            let address = this.$refs.address.value;
            let areaName = this.userAddress;
            let area = '';
            let isDefault = 1;
            if(areaName==''){
              Toast('请正确选择省市区');
              this.chooseAddr();
              return;
            }else{
              area = this.province+','+this.city+','+this.district
            }
            if(name==''){
              Toast('请输入收货人姓名');
              return;
            }
            if(tel==''){
              Toast('请输入联系电话');
              return;
            }
            if(address==''){
              Toast('请输入收货地址');
              return;
            }
            addressAdd(id,name,tel,address,area,areaName,isDefault).then(res=>{
              this.$router.push({name:'checkout'})
            },err=>{
              Toast(err)
            })
          },
          goBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="scss" scoped>
  .address_content{
    padding: 0 20px;
  }
  .address_btn{
    width: 90%;
    height: 88px;
    line-height: 88px;
    text-align: center;
    margin: 50px auto;
    background: $primaryBgColor;
    color: #fff;
    font-size: $fontSize;
    border-radius: 10px;
  }
  .address-btn{
    @include button;
    width: 90%;
    margin-top: 40px;
  }
</style>
