<template>
    <div class="ui-product">
      <sub-header :keyword="params.keyword"></sub-header>
      <div class="product-body">
        <div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="3">
          <product-body v-for="(item,index) in productList" :key="index" :item="item" :requestparams="params"></product-body>
          <div class="loading-wrapper" v-if="productList.length>0">
            <p v-if="!isMore">没有更多了</p>
            <mt-spinner v-if="isMore" type="triple-bounce" color="#a9d040"></mt-spinner>
          </div>
          <div class="list-empty" v-if="productList.length <= 0 && !isMore">
            <div>
              <img src="../../assets/images/change-icon/empty_goods.png">
              <p>内容整理中...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import SubHeader from '../../components/common/subHeader'
    import productBody from './child/ProductListBody'
    import {productList,searchProductList} from '../../api/products'
    export default {
        name: "ProductList",
        data(){
          return {
            params:{
              category:this.$route.query.category ? this.$route.query.category : '',
              page: 1,
              per_page: 3,
              keyword: this.$route.query.keywords ? this.$route.query.keywords : ''
            },
            productList:[],
            loading: false, //是否加载更多
            isMore: true //是否有更多
          }
        },
        created(){
          this.getProductList()
        },
        components:{
          SubHeader,
          productBody
        },
        methods:{
          getProductList(){
            let data = this.params;
            //console.log(data)
            if (data.keyword) {
              searchProductList(
                data.category,
                data.page,
                data.per_page,
                data.keyword
              ).then(res=>{
                this.builtData(res)
              })
            }else{
              productList(
                data.category,
                data.page,
                data.per_page
              ).then(res => {
                this.builtData(res)
              })
            }

          },
          builtData(res){
            if(res){
              this.productList = this.productList.concat(res.products);
              this.isMore = res.paged.more;
            }
          },
          getMore(){
            this.params.page = ++this.params.page;
            if(this.isMore){
              this.getProductList()
            }
          }
        }
    }
</script>

<style lang="scss" scoped>
  .loading-wrapper{
    text-align: center;
    font-size: 30px;
    color: #777;
    line-height: 48px;
    padding: 20px 0;
  }
  .list-empty{
    text-align: center;
    font-size: $fontSize;
    color: $mainFontColor;
    img{
      width: 300px;
    }
  }
</style>
