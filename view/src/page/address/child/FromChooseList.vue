<template>
    <div>
      <section class="address-list" :class="{toggHeight:istoggHeight}">
        <header class="head">
          <span>所在地区</span>
          <a class="close" @click="close()"></a>
        </header>
        <section class="title">
          <div class="title-content">
            <div class="area" :class="showProvince?'active':''" @click="provinceSelected()">{{province?provinceName:'请选择'}}</div>
            <div class="area" :class="showCity?'active':''" @click="citySelected()" v-show="province">{{city?cityName:'请选择'}}</div>
            <div class="area" :class="showDistrict?'active':''" @click="districtSelected()" v-show="city">{{district?districtName:'请选择'}}</div>
          </div>
          <!--<div class="determine">确定</div>-->
        </section>
        <ul v-show="showProvince" class="province ul-wrapper">
          <li class="list" v-for="(item,index) in provinceArr" :key="index" @click="getProvinceId(item,index)">
            <label>{{item.items.name}} <em v-if="item.selected"></em></label>
          </li>
        </ul>
        <ul v-show="showCity" class="ul-wrapper">
          <li class="list" v-for="(item,index) in citiesArr" :key="index" @click="getCityId(item,index)">
            <label>{{item.name}} <em v-if="item.selected"></em></label>
          </li>
        </ul>
        <ul v-show="showDistrict" class="ul-wrapper">
          <li class="list" v-for="(item,index) in districtArr" :key="index" @click="getDistricArrId(item,index)">
            <label>{{item.name}} <em v-if="item.selected"></em></label>
          </li>
        </ul>
      </section>
      <div class="layout" v-if="islayout" @click="close()"></div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import {getProvince} from '../../../api/address'

    export default {
        name: "FromChooseList",
        data(){
          return{
            islayout: false,  //背景层
            istoggHeight: false,   //是否展开弹层
            showProvince: true, // 第一个li默认显示
            showCity: false, // 第二个li默认隐藏
            showDistrict: false, // 第三个li默认隐藏
            provinceArr: [],  // 省份
            citiesArr:[],
            districtArr:[]
          }
        },
        created(){
          this.getAddress();
          //this.getEditDefault()
        },
        computed:{
          ...mapState({
            province : state => state.address.province,
            city: state => state.address.city,
            district: state => state.address.district,
          }),
          provinceName(){
            for(var val of this.provinceArr){
              if(val.items.id == this.province){
                return val.items.name
              }
            }
          },
          cityName(){
            for(var val of this.citiesArr){
              if(val.id == this.city){
                return val.name
              }
            }
          },
          districtName(){
            for(var val of this.districtArr){
              if(val.id == this.district){
                return val.name
              }
            }
          }
        },
        methods:{
          ...mapMutations({
            saveProvince:'saveProvince',
            saveCity:'saveCity',
            saveDistrict:'saveDistrict',
            saveAddress:'saveAddress',
            clearAddress:'clearAddress'
          }),
          getAddress(id){
            return new Promise((resolve,reject)=>{
              getProvince(id).then(res=>{
                if(res){
                  if(id){
                    this.citiesArr = res.data;
                    resolve(this.citiesArr)
                  }else{
                    this.provinceArr = res.data;
                    resolve(this.provinceArr)
                    this.getEditDefault()
                  }
                }
              },err=>{
                reject(err)
              })
            })
            // getProvince(id).then(res=>{
            //   if(res){
            //     if(id){
            //       this.citiesArr = res.data;
            //     }else{
            //       this.provinceArr = res.data
            //       this.getEditDefault()
            //     }
            //   }
            // })
          },
          addChecked(arr){
            arr.forEach(item=>{
              if(item.selected){
                item.selected = false;
              }
            })
          },
          getProvinceId(item,index){
            let data = this.provinceArr;
            this.showUlBox(1);
            if(!item.selected){
              this.saveProvince(item.items.id)
              this.addChecked(data)
              this.$set(data[index],'selected',true);
              this.getAddress(item.items.id)
            }
          },
          getCityId(item,index){
            let data = this.citiesArr;
            this.showUlBox(2);
            this.addChecked(data)
            this.$set(data[index],'selected',true);
            this.districtArr=item.district;
            this.saveCity(item.id)
          },
          getDistricArrId(item,index){
            let data = this.districtArr;
            this.addChecked(data)
            this.$set(data[index],'selected',true);
            this.saveDistrict(item.id)
            let address = this.provinceName +''+ this.cityName +''+ this.districtName;
            this.saveAddress(address);
            this.close();
          },
          provinceSelected(){
            this.clearAddress()
            this.showUlBox(0)
          },
          citySelected(){
            this.showUlBox(1)
          },
          districtSelected(){
            this.showUlBox(2)
          },
          showUlBox(val){
            if(val == 0){
              this.showProvince=true;
              this.showCity=false;
              this.showDistrict=false;
            }else if(val==1){
              this.showProvince=false;
              this.showCity=true;
              this.showDistrict=false;
            }else if(val == 2){
              this.showProvince=false;
              this.showCity=false;
              this.showDistrict=true;
            }
          },
          close(){
            this.islayout=false
            this.istoggHeight=false
          },
          chooseAddress(){
            this.islayout=true
            this.istoggHeight=true
          },
          getEditDefault(){
           // console.log(123)
            let province = this.province, city = this.city, district=this.district;
            if(province && city && district){
              // console.log(province,city,district)
              // console.log(this.provinceArr)

              let proArr = this.provinceArr;
              proArr.forEach(async (item,index) => {
                if(item.items.id == province){
                  this.$set(proArr[index],'selected',true);
                  let cArr = await this.getAddress(province)
                  cArr.forEach((cItem,index)=>{
                    if(cItem.id == city){
                      this.$set(cArr[index],'selected',true);
                      this.districtArr = cItem.district;
                      this.districtArr.forEach((dItem,index)=>{
                        if(dItem.id == district){
                          this.$set(this.districtArr[index],'selected',true);
                          this.showUlBox(2)
                        }
                      })
                    }
                  })
                }
              })

            }
          }
        }
    }
</script>

<style lang="scss" scoped>
  .layout{
    background: rgba(0,0,0,.7);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .address-list{
    position: fixed;
    width: 100%;
    height: 0;
    left: 0;
    bottom: 0;
    font-size: $fontSize;
    box-sizing: border-box;
    z-index: 110;
    background: #fff;
    transition: height .5s;
    .head{
      height: 60px;
      line-height: 60px;
      background: #f3f2f8;
      text-align: center;
      position: relative;
      .close{
        position: absolute;
        background: url("../../../assets/images/change-icon/close.png");
        background-size: 100%;
        right: 10px;
        top: 50%;
        margin-top: -20px;
        width: 40px;
        height: 40px;
      }
    }
    .title{
      display: flex;
      height: 64px;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      .title-content{
        display: flex;
        .area{
          margin-right: 50px;
          line-height: 60px;
          &.active{
            border-bottom: 4px solid $primaryColor;
          }
        }
      }
    }
  }
  .toggHeight{
    height: 770px;
  }
  .ul-wrapper{
    height: calc(100% - 144px);
    padding: 0 20px;
    overflow-y: auto;
    .list{
      height: 88px;
      display: flex;
      align-items: center;
      position: relative;
      &.active{
        color: $primaryColor;
      }
      label{
        width: 100%;
        height: 88px;
        line-height: 88px;
        em{
          display: inline-block;
          width: 88px;
          height:88px;
          background: url('../../../assets/images/change-icon/chooseon.png') no-repeat center;
          background-size: 45px;
          vertical-align: top;
        }
      }

    }
  }
</style>
