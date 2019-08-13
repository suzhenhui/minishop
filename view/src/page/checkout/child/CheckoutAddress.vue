<template>
    <div class="container">
      <div class="address-default address-border">
        <div class="selected-wrapper" v-if="address">
          <ul>
            <li><strong>{{address.contact}} {{address.phone}}</strong></li>
            <li><span class="tag">默认</span> {{address.fullAddress}} </li>
          </ul>
        </div>
        <div v-else class="unselected-wrapper">
          <div class="tt">您还没有收获地址，点击这里添加。</div>
          <div class="r-icon">
            <span class="arrow"></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CheckoutAddress",
        props:['address'],
    }
</script>

<style lang="scss" scoped>
  .address-default{
    font-size: $fontSize;
    padding: 24px 30px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 1.5;
    .unselected-wrapper{
      display: flex;
      color: #c9c9c9;
      flex-direction: row;
      flex: 1;
      align-items: center;
      justify-content: center;
      width: 100%;
      .tt{
        flex: 1;
        text-align: center;
      }
      .r-icon{
        .arrow{
          @include r-allow(20px,4px,#ddd)
        }
      }
    }
    .tag{
      border: 1px solid #f00;
      padding: 5px 12px;
      font-size: 18px;
      border-radius: 6px;
      color: #f00;
    }
    .selected-wrapper{
      font-size: 28px;
      strong{
        font-size: 32px;
      }
    }
  }
  .address-border{
    background:#fff url('../../../assets/images/change-icon/bg_address_line.png') bottom repeat-x;
    background-size: 128px 10px;
  }
</style>
