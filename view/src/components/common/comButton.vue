<template>
    <button class="button-item default" :class="typeStyle" @click="click">
      <label>
        <slot></slot>
      </label>
    </button>
</template>

<script>
    export default {
        name: "ComButton",
        props:{
          type:{
            type:String,
            default:'default'
          }
        },
        computed:{
          typeStyle: function () {
            return {
              default: this.isItemType('default'),
              negative: this.isItemType('negative')
            }
          }
        },
        methods:{
          isItemType(type){
            if (this.type === type) {
              return true
            }
            return false
          },
          click(){
            this.$emit('click')
          }
        }
    }
</script>

<style lang="scss" scoped>
  .button-item{
    text-align: center;
    font-size: $button-font-size;
    border: 0;
    outline: 0;
  }
  .default{
    color: #fff;
    background: $primaryBgColor;
  }
  .gray {
    color: #fff;
    background-color: #ddd;
  }
  .negative{
    background: #fff;
    border: 1px solid #ccc;
    color: #ccc;
    font-size: $fontSize;
    border-radius: 10px;
  }
</style>
