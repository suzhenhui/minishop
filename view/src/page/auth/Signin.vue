<template>
    <div class="container">
      <mt-header class="header" fixed title="登陆">
        <header-item slot="left" :isBack=true @click.native="goHome"></header-item>
        <header-item slot="right" title="注册" @click.native="goReg"></header-item>
      </mt-header>

      <div class="signin-wrapper main-wrapper">
        <ul>
          <li class="input-wrapper signin-name">
            <input type="text" placeholder="请输入账号" v-model="username" class="signin-ipt">
          </li>
          <li class="input-wrapper signin-pwd">
            <input type="password" placeholder="请输入密码" v-model="password" class="signin-ipt">
          </li>
        </ul>
        <main-button class="button" v-on:click="signin">登陆</main-button>
      </div>
    </div>
</template>

<script>
    import HeaderItem from '../../components/common/HeaderItem'
    import MainButton from '../../components/common/comButton'
    import {Toast} from 'mint-ui'
    import {authSignin} from '../../api/auth-base'
    import { mapMutations} from 'vuex'
    export default {
        name: "Signin",
        data(){
          return{
            username: '13726863286',
            password: '123456'
          }
        },
        components:{
          HeaderItem,
          MainButton
        },
        methods:{
          ...mapMutations({
            saveAuthInfo:'signin'
          }),
          goHome() {
            this.$router.push({name:'home'})
          },
          goReg(){
            console.log(2)
            this.$router.push({name:'signup'})
          },
          signin(){
            let username = this.username;
            let password = this.password;
            if(username.length == 0){
              Toast('请输入账号')
              return;
            }
            if(password.length == 0){
              Toast('请输入密码')
              return;
            }
            if (password.length < 6) {
              Toast('至少输入6位密码');
              return;
            }
           authSignin(username,password).then(res => {
              this.saveAuthInfo({token:res.userToken,username: res.data.username});
              this.$router.push({name: 'home'})
           },error=>{
             console.log(error)
             Toast(error.errorMsg);
           })
          }
        }
    }
</script>

<style lang="scss" scoped>
  .header{
    @include header()
  }
  .signin-wrapper{
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    li.input-wrapper{
      position: relative;
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      &:before{
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 22px;
        width: 30px;
        height: 36px;
        background: url("../../assets/images/change-icon/login_ico.png") no-repeat;
        background-size: 30px;
      }
      .signin-ipt{
        width: 100%;
        padding: 10px 52px;
        box-sizing: border-box;
        height: 56px;
        border: 0;
        font-size: $fontSize;
      }
    }
    li.signin-name{
      &:before{
        background-position: center -64px;
      }
    }
    li.signin-pwd{
      &:before{
        background-position: center -192px;
      }
    }
    .button{
      @include button();
      margin-top: 80px;
      width: 100%;
    }
  }
</style>
