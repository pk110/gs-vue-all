<template>
  <el-container style="height: 100vh;">
    <!--头部-->
    <el-header class="header">
      <div class="header_left">
        <img class="header_logoImg" src="./../assets/user.png" />
        <span class="header_title">宴十三后台管理系统</span>
      </div>
      <div class="header_right">
        <el-dropdown size="small"  trigger="click"  @command="loginOut">
          <span class="el-dropdown-link">
            <div class="sider_user">
              <img class="header_user" src="./../assets/user.png" />
              <span style="padding:0 10px;">{{userName}}</span>
              <i class='el-icon-arrow-down'></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown" class="siderBar_dropdown">
            <el-dropdown-item>{{userName}}</el-dropdown-item>
            <el-dropdown-item divided command="login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!--底部导航栏-->
    <el-container>
      <el-aside style="width:200px;min-height: 909px;background-color: #494949;">
        <!--现配-->
        <el-menu @select="selectMenu" :active-text-color="activeTextColor" :background-color="backgroundColor" :text-color="textColor" router :unique-opened="uniqueOpen" :default-active="$route.path" class="el-menu-vertical-demo">
          <template  v-for="(item , index) in siderbarList">
      　　  <el-submenu :index="item.path"  v-if="item.ischild == 'true'">
              <template slot="title">
                <i :class="item.icon" class="siderbar_img"></i>
                <span>{{item.name}}</span>
              </template>
              <div v-for="(itemChild , index) in item.child" class="siderBar_child">
            　　<el-submenu v-if="itemChild.ischild == 'true'" :index="itemChild.path" :key="index">
                  <template slot="title">
                    <!--<i class="el-icon-tickets"></i>-->
                    <span>{{itemChild.name}}</span>
                  </template>
            　　</el-submenu>
            　　<el-menu-item v-else :index="itemChild.path" :key="index">
                  <!--<i class="el-icon-tickets"></i>-->
                  <span>{{itemChild.name}}</span>
            　　</el-menu-item>
              </div>
            </el-submenu>   
  　　　　　 <el-menu-item :index="item.path" v-else>
              <i :class="item.icon" class="siderbar_img"></i>
              <span>{{item.name}}</span>
      　　  </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!--通配模块-->
      <div style="position:relative;width: 100%;overflow: hidden;">
        <!--加载画面-->	
        <div v-show="loading == true" class="loadingGif">
          <img src="./../assets/loading.gif" />
        </div>
        <transition name="fade"  mode="out-in">
          <div v-if="!network" class="network">   
            <img src="./../assets/network.png" style="width:200px;height:200px;" />  
            <span @click="onRefresh">点我刷新</span>      
          </div> 
          <router-view v-else class="common"></router-view>	
        </transition>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      siderbarList:[],
      uniqueOpen:true,
      backgroundColor:'#494949',
      textColor:'#a5a5a5',
      activeTextColor:'#fff'
    }
  },
  methods:{
    // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
    onRefresh () {
      this.$store.state.network = true      
      this.$router.replace('/manager/refresh')    
    },
    //退出登陆
    loginOut(val){
      this.$stamp(null,val)
      // localStorage.setItem('userinfo',JSON.stringify(user));  设置local
      // localStorage.getItem('userinfo')  获取local
      if(val == 'login'){
        this.$api.login.exit().then(res=> {
          this.$stamp(null,res)
          localStorage.removeItem('token');
          this.$router.push('/manager/login')
        })
      }
    },
    //网络问题重新激活导航
    selectMenu(val){
      if(this.$store.state.network == false ){
        this.$store.state.network = true
      }
    }
  },
  computed: {
    network(){
      return this.$store.state.network
    },
    loading(){
      return this.$store.state.loading
    },
    userName(){
      return this.$store.state.userName
    }
  },
  components: {
    
  },
  created(){
    this.siderbarList = [{
"muid":1,
"path":"/manager/index",
"component":"index/index",
"mulevel":1,
"name":"首页",
"icon":'iconfont icon-shouye1',
"ischild":"true",
"child":[
  {
  "muid":9,
  "path":"/manager/index",
  "component":"brand/brand",
  "mulevel":2,
  "name":"营销状况",
  "ischild":"false",
  "fatheriId":3
  },
  {
  "muid":9,
  "path":"/manager/BannerSet",
  "component":"brand/brand",
  "mulevel":2,
  "name":"Banner设置",
  "ischild":"false",
  "fatheriId":3
  },
  {
  "muid":9,
  "path":"/manager/hot",
  "component":"brand/brand",
  "mulevel":2,
  "name":"人气网红",
  "ischild":"false",
  "fatheriId":3
  }
]},{
"muid":2,
"path":"/manager/orders",
"component":"",
"mulevel":1,
"name":"订单",
"icon":'iconfont icon-dingdan',
"ischild":"false",
"child":[]
},
{
"muid":3,
"path":"/manager/stores",
"component":"",
"mulevel":1,
"name":"品牌管理",
"icon":'iconfont icon-pinpai',
"ischild":"true",
"child":[
{
"muid":9,
"path":"/manager/brandsList",
"component":"brand/brand",
"mulevel":2,
"name":"品牌列表",
"ischild":"false",
"fatheriId":3
},
{
"muid":10,
"path":"/manager/brandsDishes",
"component":"product/dish",
"mulevel":2,
"name":"品牌菜库",
"ischild":"false",
"fatheriId":3,
"child":[
]
},
{
"muid":11,
"path":"/manager/brandsStore",
"component":"stores/stores",
"mulevel":2,
"name":"品牌门店",
"ischild":"false",
"fatheriId":3,
"child":[
]
},
{
"muid":11,
"path":"/manager/tags",
"component":"stores/stores",
"mulevel":2,
"name":"标签管理",
"ischild":"false",
"fatheriId":3,
"child":[
]
},
{
"muid":11,
"path":"/manager/foodesManager",
"component":"stores/stores",
"mulevel":2,
"name":"食材管理",
"ischild":"false",
"fatheriId":3,
"child":[
]
}
]
},
{
"muid":4,
"path":"/manager/comment",
"component":"",
"mulevel":1,
"name":"评价管理",
"icon":'iconfont icon-pinglun1',
"ischild":"false",
"child":[]
},
{
"muid":5,
"path":"/manager/aa",
"component":"",
"mulevel":1,
"name":"营销活动",
"icon":'iconfont icon-yunying1',
"ischild":"true",
"child":[
{
"muid":15,
"path":"/manager/activePlays",
"component":"noworder/noworder",
"mulevel":2,
"name":"营销玩法",
"ischild":"false",
"fatheriId":5
},
{
"muid":16,
"path":"/manager/storeBanner",
"component":"applyrefund/applyrefund",
"mulevel":2,
"name":"商家Banner",
"ischild":"false",
"fatheriId":5,
"child":[
]
}]
},
{
"muid":17,
"path":"/manager/dishesManager",
"component":"nowrefund/nowrefund",
"mulevel":2,
"name":"菜品管理",
"icon":'iconfont icon-caipin',
"ischild":"false",
"fatheriId":5
},
{
"muid":18,
"path":"/manager/historyorder",
"component":"historyorder/historyorder",
"mulevel":2,
"name":"美食街",
"ischild":"true",
"icon":'iconfont icon-meishijie1',
"fatheriId":5,
"child":[
{
"muid":19,
"path":"/manager/storeFace",
"component":"discountcoupons/discountcoupons",
"mulevel":2,
"name":"店铺形象",
"ischild":"false",
"fatheriId":6
},
{
"muid":20,
"path":"/manager/pageList",
"component":"gifts/gifts",
"mulevel":2,
"name":"文章申请列表",
"ischild":"false",
"fatheriId":6
}]
},
{
"muid":6,
"path":"/manager/flux",
"component":"",
"mulevel":1,
"name":"流量分析",
"icon":'iconfont icon-fenxi1',
"ischild":"false",
"child":[]
},
{
"muid":7,
"path":"/manager/money",
"component":"account/account",
"mulevel":1,
"name":"资金状况",
"icon":'iconfont icon-jinqian1',
"ischild":"false",
"child":[
]
},
{
"muid":8,
"path":"/manager/userList",
"component":"userList/userList",
"mulevel":1,
"name":"用户权限",
"icon":'iconfont icon-shezhi',
"ischild":"false",
"child":[
]
}
]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .common{
      width: 100%;
      padding: 18px 12px;
      overflow-y: auto;
      height: 100%;
      box-sizing: border-box;
      background-color: #f1f1f1;
  }
  .loadingGif{
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 20vh;
    box-sizing: border-box; 
    background-color: #fff;
    z-index: 99999;  
    position: absolute;
    float: right;

  }
  .network{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    box-sizing:border-box;
    padding-top:20vh;
    background-color:#f1f1f1;
    height: 909px;
  }
  .network span{
    cursor:pointer;
    color:#409EFF
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .el-menu{
    height:100%;
    border-right-width: 0;
  }
  .header{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .header_title{
    font-size:14px;
    padding-left:12px;
  }
  .header_user{
    width:25px;
    height:25px;
    border-radius:100%;
    cursor:pointer;
  }
  .header_logoImg{
    width:30px;
    height:30px;
    border-radius:100%;
  }
  .header_left,.header_right{
    display:flex;
    align-items:center;
    justify-content:flex-start;
  }
  .siderBar_status{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    border-left:1px solid #e6e6e6;
    border-right:1px solid #e6e6e6;
    height:40px;
  }
  .siderBar_status p{
    color:red;
    font-size:18px;
    padding-left:20px;
  }
  .siderBar_status i{
    width:24px;
    height:24px;
    cursor:pointer;
    margin:0 20px;
  }
  .siderBar_status div{
    color:#259B24;
    font-size:14px;
  }
  /*去掉导航栏侧边的上下图标*/
  .el-aside ul li .el-submenu__title i:nth-child(3){
    display:none;
  }
  .siderBar_child li{
    text-align: center;
    background-color:#ffffff!important;
  }
  .el-aside ul li .el-submenu__title{
    display:flex;
    align-items:center;
  }
  /*导航父级与子级颜色变化*/
  .el-menu .is-active{
    background-color:#ed6f00!important;
  }
  .is-active{
    background-color:#ffffff!important;
  }
  .siderBar_child .is-active{
    color:#ed6f00!important;
    border-left: 4px solid;
    padding-left:36px!important;
    background-color:#F0F0F0!important;
  }

  .siderBar_dropdown li{
    text-align: center;
  }
  .siderBar_dropdown_choose{
    box-sizing:border-box;
    padding: 10px 20px;
  }
  .siderBar_dropdown_choose li{
    background-color:#e6e6e6;
    margin-top:10px;
  }
  .siderBar_dropdown_choose .el-radio__label{
    color:#000000;
  }
  .siderBar_dropdown_choose li label{
    display:flex;
    align-items:center;
    box-sizing:border-box;
    padding: 10px 0;
  }
  .siderBar_dropdown_choose li p:nth-child(2n){
    color:gray;
    padding-top:5px;
  }
  .siderBar_dropdown_choose .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .siderBar_dropdown_choose .el-radio__input.is-checked .el-radio__inner{
    border-color: #259B24;
    background: #259B24;
  }
  .sider_user{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    cursor:pointer;
  }
  .siderBar_storeStatus{
    display:flex;
    cursor:pointer;
    align-items:center;
  }
  .siderBar_storeStatus i{
    padding-top:17px;
  }
  .el-aside .is-active .el-submenu__title{
    background-color:#ed6f00!important;
    color:#ffffff!important;
  }
  .el-aside .is-active .el-submenu__title i{
    color:#ffffff;
  }
  .siderbar_img{
    margin-right:5px;
    padding-left:30px;
    font-size:18px;
  }
</style>
