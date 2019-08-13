<template>
  <div>
    <main-header></main-header>
    <category-body></category-body>
  </div>
</template>

<script>
    import MainHeader from '../../components/common/mHeader'
    import CategoryBody from './child/CategoryBody'

    export default {
        name: "category",
        components:{
          MainHeader,
          CategoryBody
        }
    }
</script>

<style scoped>

</style>
