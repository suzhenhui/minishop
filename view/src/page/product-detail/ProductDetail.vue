<template>
    <div class="product-detail-wrapper">
      <detail-body></detail-body>
      <detail-footer></detail-footer>
    </div>
</template>

<script>
    import DetailBody from './DetailBody'
    import DetailFooter from './DetailFooter'
    import {productGet} from '../../api/products'
    import {mapMutations} from 'vuex'

    export default {
        name: "ProductDetail",
        data(){
          return {
            productId: this.$route.query.id,
            productDetail:{}
          }
        },
        components:{
          DetailBody,
          DetailFooter
        },
        created(){
          this.getProDetail()
        },
        methods:{
          ...mapMutations({
            saveInfo:'saveDetailInfo'
          }),
          getProDetail(){
            productGet(this.productId).then(res=>{
              if(res){
                this.productDetail = res.product;
                this.saveInfo(res.product)
              }
            })
          }
        }
    }
</script>

<style>
  body{
    padding-bottom: 100px;
  }
</style>
