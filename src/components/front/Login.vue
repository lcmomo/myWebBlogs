<template>
    <div class="test">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
                <h3 class="title">系统登录</h3>
                <el-form-item prop="account">
                  <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="用户名" status-icon prefix-icon="el-icon-star-on" ></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"status-icon prefix-icon="el-icon-star-on"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox><span class="info">{{info}}</span>
                <input type="hidden" v-model="istrust">
                <el-form-item style="width:100%;text-align:center">
                  <el-button   @click.native.prevent="checkUser()" :loading="logining">创建</el-button>
                  <el-button type="primary" style="width:30%;"  @click="doLogin()">登录</el-button>
                </el-form-item>
  </el-form>

    </div>
</template>

<script>
import api from '../../api/index'
 //import {mapActions} from 'vuex'
 import {set}  from '../../../static/js/cookieUtil'
    export default{
        data(){
            return {

                    logining: false,
                    loginForm: {
                      account: '',
                      checkPass: ''
                    },
                    loginRules: {
                      account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                      ],
                      checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                      ]
                    },
                    checked: true,
                    istrust:false,
                    info:''

            }
        },
        methods:{
          doLogin(){
            const _this=this;
            let param={username:this.loginForm.account,passwd:this.loginForm.checkPass,istrust:this.istrust}
         
            api.Login(param).then(res=>{
              if(res.state==1){
              this.info='登陆成功，进入主页...';
              sessionStorage.setItem('user', JSON.stringify(res.data));
              const date = new Date(Date.now() + 60000 * 30)
              set('user', JSON.stringify(res.data), date, '/', window.location.hostname)
               setTimeout(()=>{
                 _this.$router.push({path:'/home'});
               },3000);
              console.log("finish")
            }else if(res.state==0){
              this.info=res.msg;
            }else if(res.state==2){
            this.info="密码错误,请重试";
            }else{
              this.info="系统错误,请稍后再试"
            }

            });
            // this.login({name:this.loginForm.account,passwd:this.loginForm.checkPass})       
           
          },

          setUp(){
            let param={username:this.loginForm.account,passwd:this.loginForm.checkPass,istrust:this.istrust}
            api.setUp(param).then(res=>{
              console.log(res.msg)
              if(res.state==1){
              this.info=res.msg;

              setTimeout(()=>{
                sessionStorage.setItem('user', JSON.stringify(res.data));
                this.$router.push({path:'/hello'});
              },3000)
            }else{
              this.info="创建失败,请重试";
            }

            })


          },

          checkUser(val){
            let param={username:this.loginForm.account,timestamp:new Date().getTime().toString()};
            console.log(param);
            api.checkUser(param).then((res)=>{
              if(res.msg!=='success'){
                this.loginRules.account[0].message="用户名已存在";
                this.info='用户名已存在'
              }
              else{
                this.setUp()
                
              }
            });
          }
          //...mapActions(['login'])



          
        }
    }
</script>
<style lang="scss" scoped>
$bg:#f00;
.test{
    width:100%;
    height:630px;
    background-color:$bg;
    background:url('../../../static/img/login_bg.jpg') no-repeat;
    opacity:0.8;
    padding-top:100px;



    .login-container {
         
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    opacity: 0.8;
   color:#fff!important;
    font-weight:bolder;
   
    padding: 35px 35px 15px 35px;
    
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      //color: #505458;
    }
    .remember {
        color:#fff;
      margin: 0px 0px 35px 0px;
    }

    .info{
      margin-left:50px;
      color:red;
    }
  }

}
   

</style>