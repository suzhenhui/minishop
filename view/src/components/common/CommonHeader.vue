<template>
  <mt-header class="header" fixed :title="title">
    <header-item slot="left" :isBack=true @click.native="goBack()"></header-item>
  </mt-header>
</template>

<script>
    import HeaderItem from './HeaderItem'

    export default {
        name: "commonHeader",
        props:['title'],
        components:{
          HeaderItem
        },
        methods:{
          goBack(){
            //this.$router.go(-1)
            this.$emit('goBack')
          }
        }
    }
</script>

<style lang="scss" scoped>
  .header{
    @include header()
  }
</style>
