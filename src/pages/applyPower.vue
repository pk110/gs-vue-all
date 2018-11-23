<template>
  <div class="applyPower">
    <div class="applyPower_head">
      <div class="applyPower_head_left">
        <img src="./../assets/phone.png" />
        <span>宴十三商家后台管理系统</span>
      </div>
      <router-link to="/manager/login">
        <div class="applyPower_head_right">返回上页</div>
      </router-link>
    </div>
    <div class="applyPower_body">
      <div class="applyPower_box" v-if="applyStatus == 0">
        <img class="applyPower_logo" src="./../assets/login.png" />
        <div class="applyPower_form">
          <div class="applyPower_form_head">申请权限</div>
          <div class="applyPower_form_input">
            <img src="./../assets/login_user.png" />
            <el-input v-model="phone" placeholder="点击输入手机号"></el-input>
          </div>
          <div class="applyPower_form_code">
            <div style="width:42px;height:25px;"></div>
            <el-input v-model="code" placeholder="输入验证码"></el-input>
            <el-button v-dbClick class="applyPower_form_code_button" :disabled="disable" @click="getCode">{{getPhone}}</el-button>
          </div>
          <div class="applyPower_form_input">
            <img src="./../assets/suo.png" />
            <el-input v-model="password"  type="password" placeholder="设置登录密码"></el-input>
          </div>
          <div class="applyPower_form_code">
            <div style="width:28px;height:25px;"></div>
            <el-input v-model="twoPassword"  type="password" placeholder="再次确认密码"></el-input>
          </div>
          <div class="applyPower_error">{{error}}</div>
        </div>
        <el-button v-dbClick class="applyPower_form_submit" @click="submit">
          <i class="el-icon-loading" v-if="comfired"></i>
          <span>确认</span>
        </el-button>
      </div>
      <div class="applyPower_box" v-else-if="applyStatus == 1">
        <div class="applyPower_applying">耐心等待超级管理员给您分配权限...</div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
    data () {
      return {
        phone:'',
        code:'',
        password:'',
        twoPassword:'',
        error:'',
        comfired:false,
        getPhone:'获取验证码',
        disable:false,
        count:60
      }
    },
    methods:{
      //获取验证码
      getCode(){
        if(this.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/) == null){
          this.error = '请输入正确的手机号'
        }else{
          this.error = ''
          this.time()
          this.$api.login.codeLogin({
            params : { 
              phone : this.phone
            }
          }).then(res=> {
            if(res.data.code == 200){
              this.$message.success('发送验证码成功!')
            }
          }).catch((error) => {
            this.$message.error(error)
          })
        }
      },
      //倒计时
      time(){
        var that = this
        if(this.count == 0){
          this.disable = false
          this.count = 60
          this.getPhone = '重新发送验证码'
        }else{
          this.disable = true
          this.count--;
          this.getPhone = '剩余'+this.count+' 秒'
          setTimeout(()=>{
            that.time()
          },1000)
        }
      },
      //确认
      submit(){
        if(this.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/) == null){
          this.error = '请输入正确的手机号'
        }else if(this.code == ''){
          this.error = '验证码不能为空'
        }else if(this.password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/) == null){
          this.error = '请输入6-16位数字和字母的组合密码'
        }else if(this.password !== this.twoPassword){
          this.error = '与原密码输入不一致'
        }else{
          this.error = ''
          this.comfired = true
          this.$api.login.contactPhone({
            phone:this.phone,
            code:this.code,
            userPass:md5(this.password),
            userPassTwo:md5(this.twoPassword)
          }).then(res=> {
            if(res.data.code == 200){
              this.$store.state.applyStatus = 1
            }
          }).catch((error) => {
            this.$message.error(error)
          })
        }
      }
    },
    computed: {
      applyStatus(){
        return this.$store.state.applyStatus
      }
    },
    components: {
      
    },
    created(){
      
    }
}
</script>

<style>
  .applyPower_head{
    width:100%;
    height:56px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:10px 15px;
    background-color:#ffffff;
  }
  .applyPower_head_left{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .applyPower_head_left img{
    width: 40px;
	  height: 40px;
    border-radius:100%;
    margin-right:10px;
  }
  .applyPower_head_right{
    height:100%;
    padding-left:14px;
    border-left:1px solid #f1f1f1;
    line-height:35px;
    color:#000000;
  }
  .applyPower_body{
    width:100%;
    min-height:913px;
    height:100%;
    background-color:#f1f1f1;    
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .applyPower_box{
    width:390px;
    box-sizing:border-box;
    display:flex;
    align-items:center;
    flex-direction:column;
  }
  .applyPower_form{
    width:100%;
    background-color:#ffffff;
    border-radius:5px;
    box-sizing:border-box;
    padding:15px;
  }
  .applyPower_form_head{
    font-size:18px;
    color:#ed6f00;
    line-height:40px;
    text-align:center;
    width:100%;
    font-weight:bold;
  }
  .applyPower_form_input{
    position:relative;
    display:flex;
    align-items:center;
    border-bottom:1px solid #a5a5a5;
    box-sizing:border-box;
    padding:0 5px;
    margin-top:20px;
  }
  .applyPower_form_input:before{
    content:'|';
    position:absolute;    
    bottom: -7px;
    left: -2px;
    color: #a5a5a5;
    transform:scale(0.5,0.5);
  }
  .applyPower_form_input:after{
    content:'|';
    position:absolute;    
    bottom: -7px;
    right: -3px;
    color: #a5a5a5;
    transform:scale(0.5,0.5);
  }
  .applyPower_form_input img{
    width:25px;
    height:25px;
  }
  .applyPower_form_input input{
    border:0;
  }  
  .applyPower_form_code{
    position:relative;
    display:flex;
    align-items:center;
    border-bottom:1px solid #a5a5a5;
    box-sizing:border-box;
    padding:0 5px;
    margin-top:20px;
  }
  .applyPower_form_code:before{
    content:'|';
    position:absolute;    
    bottom: -7px;
    left: -2px;
    color: #a5a5a5;
    transform:scale(0.5,0.5);
  }
  .applyPower_form_code:after{
    content:'|';
    position:absolute;    
    bottom: -7px;
    right: -3px;
    color: #a5a5a5;
    transform:scale(0.5,0.5);
  }
  .applyPower_form_code input{
    border:0;
  }
  .applyPower_form_code_button{
    border-radius:40px;
    margin-bottom:10px;
    border-color:#000000!important;
    color:#000000!important;
  }
  .applyPower_error{
    width:100%;
    line-height:40px;
    text-align:center;
    color:#ff0000;
    padding-top:15px;
  }
  .applyPower_form_submit{
    width:100%;
    color:#ffffff;
    background-color:#ed6f00;
    border-radius:40px;
    margin-top:30px;
  }
  .applyPower_form_submit:hover{
    color:#ffffff;
    background-color:#ed6f00;
  }
  .applyPower_logo{
    width: 330px;
    height: 60px;
    margin-bottom: 55px;
  }
  .applyPower_applying{
    box-sizing:border-box;
    padding:20px;
    background-color:#ffffff;
    border-radius:5px;
    color:#ed6f00;
  }
</style>
