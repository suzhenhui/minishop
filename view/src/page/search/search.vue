<template>
  <transition name="slide">
    <div class="search-wrapper">
      <search-header :defaultKey="defaultKey" v-on:query="onQueryChange"></search-header>
      <search-body v-on:key="onQueryChange" :hotKeywords="hotKeywords" :currenKeywords="currenKeywords"></search-body>
    </div>
  </transition>
</template>

<script>
    import SearchHeader from './child/SearchHeader'
    import SearchBody from './child/SearchBody'
    import {searchKeywordList} from "../../api/search";

    export default {
        name: "search",
        data(){
          return {
            hotKeywords: [],
            currenKeywords: this.utils.fetch('keyword'),
            defaultKey:''
          }
        },
        components:{
          SearchHeader,
          SearchBody
        },
        created(){
          this.getHotKeywords()
        },
        methods:{
          getHotKeywords(){
            searchKeywordList().then(res=>{
              this.hotKeywords = res.hotKeys
              this.defaultKey = res.defaultKey
            })
          },
          onQueryChange(query){
            this.query = query;
            this.currenKeywords.unshift(query)
            let data = Array.from(new Set(this.currenKeywords))
            this.utils.save('keyword',data)
            this.$router.push({name:'products',query:{
                keywords: query
            }})
          }
        }
    }
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.5s ease;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%,0,0);
  }
  .search-wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #f9f9fb;
  }
</style>
