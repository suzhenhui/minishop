<template>
  <div class="container">
    <mt-header class="header" fixed title="购物车">
      <header-item slot="left" :isBack=true @click.native="goBack()"></header-item>
      <header-item @click.native="changeFinishStatus()" slot="right" title="编辑" v-if="!isFinish && !isEmpty"></header-item>
      <header-item @click.native="changeFinishStatus()" slot="right" title="完成" v-if="isFinish && !isEmpty"></header-item>
    </mt-header>
  </div>
</template>

<script>
    import HeaderItem from '../../../components/common/HeaderItem'
    export default {
        name: "CartHeader",
        data(){
          return {
            isFinish: false   //是否在编辑，编辑-完成：false, 完成-编辑：true
          }
        },
        props:["isEmpty"],
        components:{
          HeaderItem
        },
        methods:{
          changeFinishStatus(){
            this.isFinish = !this.isFinish;
            this.$emit('changeListSelected',this.isFinish)
          },
          goBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="scss" scoped>
  .header{
    @include header()
  }
</style>
