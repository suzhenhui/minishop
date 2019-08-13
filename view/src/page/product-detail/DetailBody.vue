<template>
    <div>
      <product-info></product-info>
    </div>
</template>

<script>
    import ProductInfo from './child/ProductInfo'

    export default {
        name: "DetailBody",
        components:{
          ProductInfo
        }
    }
</script>

<style scoped>

</style>
