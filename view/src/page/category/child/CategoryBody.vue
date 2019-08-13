<template>
    <div class="category-body">
      <div class="category-flex">
        <div class="category-sidebar">
          <ul>
            <li v-for="item in items" :key="item.id" @click="itemTabClick(item)" :class="{'on': item.id == currentItem.id}">
              <a>{{item.name}}</a>
            </li>

          </ul>
        </div>
        <div class="category-content" v-if="currentItem">
          <ul>

            <li v-for="item in currentItem.children" :key="item.id" @click="goProduct(item.id)">
              <a href="javascript:;">
                <img :src="item.img" alt="">
                <p>{{item.name}}</p>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    export default {
        name: "CategoryBody",
        computed: {
          ...mapState({
            items: state => state.category.items,
            currentItem: state => state.category.currentItem
          })
        },
        mounted(){
          this.fetchCategoryList()
        },
        methods:{
          ...mapMutations({
            saveCurrentItems: "saveCurrentItems"
          }),
          ...mapActions({
            fetchCategoryList:"fetchCategoryList"
          }),
          itemTabClick(item){
            this.saveCurrentItems(item)
          },
          goProduct(id){
            this.$router.push({name: 'products',query:{category:id}})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .category-body{
    @include pd(95px,100px, 0,0);
    width: 100%;
    .category-flex{
      display: flex;
      @include pd(0,0,0,0);
      width: 100%;
      .category-sidebar{
        flex-basis: 260px;
        overflow-y: scroll;
        ul{
          border-right: 10px solid #f9f9fb;
          li{
            padding: 30px 0;
            position: relative;
            a{
              display: block;
              text-align: center;
              font-size: $fontSize;
              border-left: 4px solid #fff;
            }
            &:after{
              content: '';
              display: block;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 1px;
              background: $mainbgColor;
            }
          }
          li.on{
            background-color: #f2f2f2;
            a{
              border-left: 4px solid $primaryColor;
            }
          }
        }
      }
      .category-content{
        width: 100%;
        overflow: auto;
        ul{
          display: flex;
          padding: 10px;
          flex-wrap: wrap;
          box-sizing: border-box;
          li{
            flex: 0 0 33.333%;
            text-align: center;
            padding: 0 10px;
            box-sizing: border-box;
            overflow: hidden;
            margin-bottom: 20px;
            img{
              width: 140px;
              height: 140px;
            }
            p{
              font-size: $fontSize;
              color: $mainFontColor;
              @include nowrap();
            }
          }
        }
      }
    }
  }

</style>
