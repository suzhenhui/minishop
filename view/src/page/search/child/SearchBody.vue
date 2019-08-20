<template>
    <div class="search-box">
      <dl>
        <dt><p>
          最近搜索
        </p></dt>
        <dd v-if="currenKeywords.length>0">
          <a v-for="(item,index) in currenKeywords" @click="getKey(item)">{{item}}</a>
        </dd>
      </dl>
      <dl>
        <dt><p>
          热门搜索
        </p></dt>
        <dd>
          <a :class="{'on':item.isHighLight=='true'}" v-for="(item,index) in hotKeywords" :key="index">{{item.keyWord}}</a>
        </dd>
      </dl>
    </div>
</template>

<script>
    export default {
        name: "SearchBody",
        data(){
          return{
            query:''
          }
        },
        props:{
          currenKeywords:{
            type:Array,
            default:[]
          },
          hotKeywords:{
            type:Array,
            default:[]
          }
        },
        methods:{
          getKey(item){
            this.$emit('key',item)
          }
        }
    }
</script>

<style lang="scss" scoped>
  .search-box{
    dl{
      padding: 0 20px;
      background: #fff;
      margin-bottom: 20px;
      dt{
        p{
          color: #999;
          font-size: 28px;
          line-height: 88px;
        }
      }
      dd{
        overflow: hidden;
        width: 100%;
        a{
          display: block;
          padding: 0 20px;
          font-size: $fontSize;
          line-height: 44px;
          margin: 0 20px 20px 0;
          float: left;
          border: 1px solid #ddd;
          color: #333;
          box-sizing: border-box;
          border-radius: 4px;
          text-align: center;
          max-width: 100%;
          @include nowrap()
          &.on{
            color: $redColor;
            border: 1px solid $redColor;
          }
        }
      }
    }
  }
</style>
