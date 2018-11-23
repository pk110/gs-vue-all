<template>
  <div class="login" @keyup.13="submitForm">
    <img class="login_left" src="./../assets/login.png" />
    <div class="login_right">
      <img class="login_logo" src="./../assets/logo.png" />
      <el-tabs stretch v-model="activeName" class="login_tabs">
        <el-tab-pane label="账号登录" name="login">
          <div class="login_form">
            <div class="login_user">
              <img src="./../assets/login_user.png" />
              <el-input v-model="phone" placeholder="点击输入手机号"></el-input>
            </div>
            <div class="login_user">
              <img src="./../assets/suo.png" />
              <el-input type="password" v-model="password" placeholder="点击输入密码"></el-input>
            </div>
            <el-button v-dbClick class="login_button" @click="submitForm">
              <i class="el-icon-loading" v-if="comfired"></i>
              <span>登录</span>
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="扫描登录" name="ddLogin">
          <div id="login_dd"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
    data () {
      return {
        activeName:'ddLogin',
        phone:'',
        password:'',
        comfired:false
      }
    },
    mounted() {
      var url = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoacfpjp0vai0jlebkm&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=https://management.yanss.cn/manager/index')
      var obj = DDLogin({
            id:"login_dd",//这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
            goto: url,
            style: "border:none;background-color:#FFFFFF;",
            width : "365",
            height: "400"
        })
        var hanndleMessage = function (event) {
          var origin = event.origin;
          // console.log("origin", event.origin);
          if( origin == "https://login.dingtalk.com" ) { //判断是否来自ddLogin扫码事件。
              var loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
              // console.log("loginTmpCode", loginTmpCode);
              const loginTmpCode = loginTmpCode
              window.location.href = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoacfpjp0vai0jlebkm&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=https://management.yanss.cn/manager/index&loginTmpCode='+loginTmpCode
          }
        }

        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', hanndleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', hanndleMessage);
        }  
    },
    methods:{
      // 登陆按钮
      submitForm(){
        if(this.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/) == null){
          this.$message.error('请输入正确的手机号!');
        }else if(this.password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/) == null){
          this.$message.error('请输入6-16位数字和字母的组合密码!');
        }else{
          this.comfired = true
          this.$api.login.login({        
              adminLogin: this.phone,
              adminPass:md5(this.password)
          }).then(res=> {
              this.$stamp(null,res)
              this.$store.state.token = res.data.data.token
              localStorage.setItem('token',res.data.data.token)
              // 判定用户是否拥有权限 
              if(res.data.data.admin.rid == 3){
                this.$store.state.applyStatus = res.data.data.admin.applyStatus
                this.$router.addRoutes(
                  [{
                    // +++++++++++++++++++++ 申请权限
                    path: '/manager/applyPower',
                    name:'applyPower',
                    component:  resolve => require(['@/pages/applyPower'], resolve)
                  }]
                )
                this.$router.push('/manager/applyPower')
              }else{
                // this.$store.state.siderBar.storeList = res.data.data.storeList
                // this.$store.state.storesMessage = res.data.data.storeList[0]
                this.$store.state.userName = res.data.data.admin.adminNicemane
                let routers = [];
                if (res.data.data.menuList) {
                  for (let i = 0;i<res.data.data.menuList.length;i++) {
                    if(res.data.data.menuList[i].ischild == 'true'){
                      for(let j = 0;j<res.data.data.menuList[i].child.length;j++){
                        let url = res.data.data.menuList[i].child[j].component;
                        let componentValChild = resolve => {
                                require(['@/pages/' + url], resolve)
                        }
                        routers.push({
                          path: res.data.data.menuList[i].child[j].path, 
                          component: componentValChild, 
                          name: res.data.data.menuList[i].child[j].name
                        })
                      }
                    }else{
                      let url = res.data.data.menuList[i].component;
                      let componentVal = resolve => {
                        require(['@/pages/' + url], resolve)
                      }
                      let route = {path: res.data.data.menuList[i].path, component: componentVal, name: res.data.data.menuList[i].name}
                      routers.push(route);
                    }
                  }
                }
                let router =   [{
                    path: '/manager/index',
                    name:'siderBar',
                    component: resolve => require(['@/pages/siderBar'], resolve),
                    //  菜单的router
                    children: routers
                }]
                this.$router.addRoutes(
                  router.concat([{
                    path: '*',
                    redirect: '/manager/error'
                  }])
                )
                // 给侧边导航栏分配导航
                this.$store.state.siderBar.list = res.data.data.menuList
                this.$router.push('/manager/index')
              }
          })
        }
      }
    },
    computed: {
      
    },
    components: {
      
    },
    created(){
      
    }
}
</script>

<style>
  .login{
    margin:0 auto;
    box-sizing:border-box;
    padding-top:10vh;
    display:flex;
    align-items:center;
  }
  .login_left{
    width:1035px;
    height:798px;
  }
  .login_right{
    width:620px;
    height: 645px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
  }
  .login_logo{
    width: 439px;
    height: 180px;
    margin-bottom:43px;
  }
  .login_form{
    width:365px;
    box-sizing:border-box;
    padding:10px 10px;
    padding-bottom:40px;
    border-bottom:1px solid #f1f1f1;
  }
  .login_user{
    position:relative;
    display:flex;
    align-items:center;
    border-bottom:1px solid #a5a5a5;
    box-sizing:border-box;
    padding:0 5px;
    margin-top:35px;
  }
  .login_user:before{
    content:'|';
    position:absolute;    
    bottom: -5px;
    left: -2px;
    color: #a5a5a5;
    transform:scale(0.5,0.5);
  }
  .login_user:after{
    content:'|';
    position:absolute;    
    bottom: -5px;
    right: -3px;
    color: #a5a5a5;
    transform:scale(0.5,0.5);
  }
  .login_user img{
    width:25px;
    height:25px;
  }
  .login_user input{
    border:0;
    height: 39px;
  }
  .login_tabs .el-tabs__item{
    font-size:17px;
  }  
  .login_tabs .el-tabs__item:hover{
    color:#ed6f00;
  }
  .login_tabs .is-active{
    color:#ed6f00;
    font-size:17px;
  }
  .login_tabs .el-tabs__active-bar{
    background-color:#ed6f00;
    height:2px;
  }
  .login_tabs .el-tabs__nav-wrap::after{
    height:2px;
  }
  .login_button{
    width:100%;
    margin-top:68px;
    box-sizing:border-box;
    background-color:#ed6f00;
    border-radius:40px;
    color:#FFFFFF;
    border:0;
  }
  .login_button:hover{
    color:#FFFFFF;
    background-color:#ed6f00;
  }
</style>
