<template>
  <div class="container">
    <mt-header class="header" fixed title="注册">
      <header-item slot="left" :isBack=true @click.native="goBack"></header-item>
    </mt-header>

    <div class="signin-wrapper main-wrapper">
      <ul>
        <li class="input-wrapper signin-name">
          <input type="text" placeholder="请输入账号" v-model="username" class="signin-ipt">
        </li>
        <li class="input-wrapper signin-pwd">
          <input type="password" placeholder="请输入密码" v-model="password" class="signin-ipt">
        </li>
        <li class="input-wrapper signin-pwd">
          <input type="password" placeholder="请再次输入密码" v-model="repassword" class="signin-ipt">
        </li>
      </ul>
      <main-button class="button" v-on:click="signup">注册</main-button>
    </div>
  </div>
</template>

<script>
    import HeaderItem from '../../components/common/HeaderItem'
    import MainButton from '../../components/common/comButton'
    import {Toast} from 'mint-ui'
    import {authSignup} from '../../api/auth-base'
    import {mapMutations} from 'vuex'
    export default {
        name: "Signup",
        data(){
          return{
            username: '',
            password: '',
            repassword:''
          }
        },
        components:{
          HeaderItem,
          MainButton
        },
        methods:{
          ...mapMutations({
            saveAuthInfo: 'signin'
          }),
          goBack() {
            this.$router.go(-1)
          },
          signup(){
            let username = this.username;
            let password = this.password;
            let repwd = this.repassword;
            if(username.length == 0){
              Toast('请输入手机号码')
              return;
            }
            if(username.length != 11){
              Toast('手机号码格式不正确')
              return;
            }
            if(password.length == 0){
              Toast('请输入密码')
              return;
            }
            if(password.length < 6){
              Toast('密码至少6位')
              return;
            }
            if(repwd.length == 0){
              Toast('请再次输入密码')
              return;
            }
            if(password !== repwd){
              Toast('两次密码输入不一致')
              return;
            }
            authSignup(username,password).then(res=>{
              if(res.err_code!=0){
                Toast(res.msg)
              }else{
                this.saveAuthInfo({token:res.userToken,username: res.username});
                Toast(res.msg);
                this.$router.push({name:'user'})
              }
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
