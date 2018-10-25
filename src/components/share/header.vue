<template>
    <div>
        <header class="headers">
            <div class="logo">
                
            </div>
            <div class="logoName">
                浮生作雪&nbsp;&nbsp;世味成茶
            </div>
            <div class="musicIcon">
                
            </div>
            <div class="userInfo">
                <div class="userImg">
                    
                </div>
                <div class="userName">
                    <el-dropdown>
                      <div class="el-dropdown-link">
                        <span class="name">{{loginUserName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>消息</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item> 
                        </el-dropdown-menu> 
                    </el-dropdown>
                    
                </div>
                <span class="time">
                        {{time}}好
                    </span>
            </div>

            
        </header>
    </div>
</template>
<script>
    export default{
        name:'header',
        data(){
            return {
                loginUserName:''

            }
        },
        computed: {
              time(){
                const hours = new Date().getHours()
                if (hours > 5 && hours < 12)  return '早上'
                if (hours > 11 && hours < 19) return '下午'
                return '晚上'
              },
            },
            mounted(){
                 var user= JSON.parse(sessionStorage.getItem('user'));
               this.loginUserName=user.username;
               console.log(this.loginUserName);
              
            }
    }
</script>
<style scoped lang="scss">
$header-bg-color:#1f1f1f;
$header-font-color:#ddd;
$header-font-family:STXingkai;

    .headers{
        font-family:STXingkai;
        background-color:$header-bg-color;
        color:$header-font-color;
        height:41px;
        weight:100%;
        position: relative;
        .logo{
            width:40px;
            height:40px;
            background-color:red;
            margin-left:100px;
            float:left;

        }
        .logoName{
            font-size:24px;

            color:$header-font-color;
            line-height:40px;
            font-weight:bolder;
            font-family: STXingkai;
            transition: all 1.5s ease;
            float:left;

        }

        .musicIcon{
            width:100px;
            height:40px;
            background-color:red;
            position: absolute;
            left:50%;
            margin-left:-50px;
           float:left;
        }
        .userInfo{
            width:300px;
            height:40px;
            background-color:red;
            position: absolute;
            right:30px;
            .userImg{
                width:40px;
                height:40px;
                border-radius:100%;
                background-color:blue;
                float:left;
            }
            .userName{
                width:150px;
                height:40px;
                float:left;

                .name{
                    display:inline-block;
                    width:100px;
                    text-align:center;
                }

                .el-dropdown-link{
                    width:130px;
                    background-color:blue;
                    font-size:20px;
                    font-weight:bolder;
                    color:$header-font-color;
                    margin-left:15px;
                    line-height:40px;
                    float:left;
                }
            }
            .time{
                font-size:18px;
                line-height:40px;
            }

        }




    }
</style>