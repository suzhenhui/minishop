<template>
    <div class="item-wrapper" :class="items.is_default?'default':''">
      <div class="address" @click="setDefault(items.id)">
        <ul>
          <li>
            <strong>{{items.uname}}</strong>
            <strong>{{items.tel}}</strong>
          </li>
          <li>
            <p class="text">{{items.area_name+items.address}}</p>
          </li>
        </ul>
      </div>
      <div class="edit" @click="goEdit(items)">
        编辑
      </div>
    </div>
</template>

<script>
    export default {
        name: "AddressItem",
        props:['items'],
        methods:{
          setDefault(id){
            this.$emit('setDefault',id)
          },
          goEdit(item){
            //console.log(1)
            this.$emit('goAddAddress','edit',item)
          }
        }
    }
</script>

<style lang="scss" scoped>
  .item-wrapper{
    font-size: $fontSize;
    display: flex;
    align-items: center;
    padding: 30px 0 30px 50px;
    line-height: 1.5;
    margin-top: 20px;
    background: #fff;
    &.default{
      background: #fff url('../../../assets/images/change-icon/ad_list_default.png') no-repeat left top;
      background-size: 72px;
    }
    .address{
      flex:1;
      li{
        font-size: $subFontSize;
        .text{
          margin-top: 20px;
          color: #666;
        }
      }
    }
    .edit{
      flex-basis: 100px;
      text-align: center;
      color: #f00;
    }
  }
</style>
