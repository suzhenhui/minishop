<template>
  <div class="ui-tabbar-wrapper">
    <div class="tabbar-wrapper">
      <ul>
        <li class="item" v-for="item in staticData" :key="item.key" @click="setCurrentActive(item)" :class="{'currentActive': currentItem == item.link}">
          <img :src="item.bgurl" alt="" v-if="currentItem != item.link">
          <img :src="item.activeBgurl" alt="" v-if="currentItem == item.link">
          <span class="tt">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "Tabbar",
        data(){
            return{
              staticData:[
                {
                  name: '首页',
                  link: 'home',
                  key: 0,
                  bgurl: require('../../assets/images/tabbar-icon/foot_home_icon.png'),
                  activeBgurl: require('../../assets/images/tabbar-icon/foot_home_select_icon.png'),
                  isActive: true
                },
                {
                  name: '分类',
                  link: 'category',
                  key: 1,
                  bgurl: require('../../assets/images/tabbar-icon/foot_type_icon.png'),
                  activeBgurl: require('../../assets/images/tabbar-icon/foot_type_select_icon.png'),
                  isActive: false
                },
                {
                  name: '购物车',
                  link: 'cart',
                  params: { type: 1 },
                  key: 2,
                  bgurl: require('../../assets/images/tabbar-icon/foot_cart_icon.png'),
                  activeBgurl: require('../../assets/images/tabbar-icon/foot_cart_select_icon.png'),
                  isActive: false
                },
                {
                  name: '我的',
                  link: 'user',
                  key: 3,
                  bgurl: require('../../assets/images/tabbar-icon/foot_user_icon.png'),
                  activeBgurl: require('../../assets/images/tabbar-icon/foot_user_select_icon.png'),
                  isActive: false
                }
              ],
              currentItem: this.$store.state.tabBar.currentTabBar?this.$store.state.tabBar.currentTabBar:'home'
            }
        },
        computed:{
          ...mapState({
            currentTabBar: state => state.tabBar.currentTabBar
          })
        },
        methods:{
          setCurrentActive(item){
            this.currentItem = item.link;
            this.$router.push({name:item.link})
          }
        },
        watch:{
          currentTabBar:function (value) {
            let data = this.staticData;
            for(var item of data){
              if(value === item.link){
                this.currentItem = item.link;
              }
            }

          }
        }
    }
</script>

<style scoped lang="scss">
.ui-tabbar-wrapper{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border-top: 1px solid #f0f2f5;
  .tabbar-wrapper{
    ul{
      display: flex;
      width: auto;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      height: 100px;
      li{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        img{
          @include wh(50px,50px);
          @include itc()
        }
        .tt{
          @include sc($fontSize, $mainFontColor)
        }
      }
      li.currentActive .tt{
        color: $primaryColor;
      }
    }
  }
}
</style>
