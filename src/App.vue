<template>
  <div id="app" style="max-width:1920px;min-width:1440px;">
    <router-view/>
  </div>
</template>

<script>
import {getUrlParam,checkedForm} from './utils/utils'
export default {
    data () {
      return {
        
      }
    },
    methods:{
      getUser(){
        this.$api.login.refrush().then(res=> {
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
    },
    computed: {
      
    },
    components: {
      
    },
    created(){
      // 扫码登陆
      if(typeof(getUrlParam('code')) == 'string'){

      }else if(typeof((localStorage.getItem('token'))) == 'string'){  //用户刷新
        this.getUser()
      }
    }
}
</script>

<style>
  /*css初始化*/
  body,dl,dd,ul,ol,h1,h2,h3,h4,h5,h6,pre,form,input,textarea,p,hr,thead,tbody,tfoot,th,td{margin:0;padding:0;}
  ul,ol{list-style:none;}
  a{text-decoration:none;}
  html{-ms-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none; height: 100%;}
  body{line-height:1.5; font-size:14px; height: 100%;}
  body,button,input,select,textarea{font-family:'微软雅黑',tahoma,'hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;}
  b,strong{font-weight:bold;}
  i,em{font-style:normal;}
  table{border-collapse:collapse;border-spacing:0;}
  img{border:0 none;width:auto\9;max-width:100%;vertical-align:top; height:auto;}
  button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;vertical-align:baseline;}
  button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;}
  button[disabled],input[disabled]{cursor:default;}
  input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;}
  input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
  input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}
  input:focus{outline:none;}
  select[size],select[multiple],select[size][multiple]{border:1px solid #AAA;padding:0;}
  article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block;}
  audio,canvas,video,progress{display:inline-block;}
  body{background:#fff;}
  input::-webkit-input-speech-button {display: none}
  button,input,textarea{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
</style>
