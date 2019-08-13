<template>
    <div v-if="isBack" class="left-item">
      <a class="arrow"></a>
      <slot name="left"></slot>
    </div>
    <div v-else>
      <div v-if="icon"></div>
      <div v-else-if="title" class="right-item">
        <label class="title">{{title}}</label>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderItem",
        props:{
          isBack:{
            type: Boolean,
            default: false
          },
          title:{
            type:String
          },
          icon:{
            type:String
          }
        }
    }
</script>

<style lang="scss" scoped>
  .left-item{
    .arrow{
      @include l-allow(20px,2px,#ccc)
    }
  }
  .right-item{
    .title{
      font-size: $fontSize;
    }
  }
</style>
