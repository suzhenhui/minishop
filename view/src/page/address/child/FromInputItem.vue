<template>
    <div class="input-wrapper">
      <input :type="type" class="ipt" :placeholder="placeholder" v-model="value">
    </div>
</template>

<script>
    export default {
        name: "from-input-item",
        data(){
          return {
            value: this.default
          }
        },
        props:["type","placeholder","default"]
    }
</script>

<style lang="scss" scoped>
.input-wrapper{
  position: relative;
  .ipt{
    width: 100%;
    height: 85px;
    line-height: 85px;
    padding: 0;
    font-size: $fontSize;
    color: #333;
    box-sizing: border-box;
    border: 0;
  }
  &:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #ddd;
  }
}
</style>
