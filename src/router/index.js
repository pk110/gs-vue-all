import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载组件
const router = new Router({
  mode:"hash",
  routes: [
    {
      // +++++++++++++++++++++ 首页
      path: '/',
      redirect: '/manager/login'
    },
    {
      // +++++++++++++++++++++ 登录
      path: '/manager/siderBar',
      name:'siderBar',
      component:  resolve => require(['@/pages/siderBar'], resolve),
      children:[{
        // +++++++++++++++++++++ 首页
        path: '/manager/index',
        name:'index',
        component:  resolve => require(['@/pages/index'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/orders',
        name:'orders',
        component:  resolve => require(['@/pages/orders'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/map',
        name:'map',
        component:  resolve => require(['@/pages/map'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/BannerSet',
        name:'BannerSet',
        component:  resolve => require(['@/pages/BannerSet'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/hot',
        name:'hot',
        component:  resolve => require(['@/pages/hot'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/hotDetail',
        name:'hotDetail',
        component:  resolve => require(['@/pages/hotDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsList',
        name:'brandsList',
        component:  resolve => require(['@/pages/brandsList'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsDishes',
        name:'brandsDishes',
        component:  resolve => require(['@/pages/brandsDishes'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsDishesDetail',
        name:'brandsDishesDetail',
        component:  resolve => require(['@/pages/brandsDishesDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsStore',
        name:'brandsStore',
        component:  resolve => require(['@/pages/brandsStore'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/tags',
        name:'tags',
        component:  resolve => require(['@/pages/tags'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/comment',
        name:'comment',
        component:  resolve => require(['@/pages/comment'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/dishesManager',
        name:'dishesManager',
        component:  resolve => require(['@/pages/dishesManager'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/foodesManager',
        name:'foodesManager',
        component:  resolve => require(['@/pages/foodesManager'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/foodesManagerDetail',
        name:'foodesManagerDetail',
        component:  resolve => require(['@/pages/foodesManagerDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/money',
        name:'money',
        component:  resolve => require(['@/pages/money'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/flux',
        name:'flux',
        component:  resolve => require(['@/pages/flux'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/pageList',
        name:'pageList',
        component:  resolve => require(['@/pages/pageList'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/storeFace',
        name:'storeFace',
        component:  resolve => require(['@/pages/storeFace'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/storeBanner',
        name:'storeBanner',
        component:  resolve => require(['@/pages/storeBanner'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/activePlays',
        name:'activePlays',
        component:  resolve => require(['@/pages/activePlays'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/activePlaysCouponDetail',
        name:'activePlaysCouponDetail',
        component:  resolve => require(['@/pages/activePlaysCouponDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/activePlaysActiveDetail',
        name:'activePlaysActiveDetail',
        component:  resolve => require(['@/pages/activePlaysActiveDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/userList',
        name:'userList',
        component:  resolve => require(['@/pages/userList'], resolve)
      }]
    },{
      // +++++++++++++++++++++ 首页
      path: '/manager/login',
      name:'login',
      component:  resolve => require(['@/pages/login'], resolve)
    },{
      // +++++++++++++++++++++ 刷新
      path: '/manager/refresh',
      name:'refresh',
      component:  resolve => require(['@/pages/refresh'], resolve)
    }
  ]
})

// 全局路由守卫
let routeList = [];
router.beforeEach((to, from, next) => {
  //判断浏览器版本
  if(!window.localStorage){
    alert("浏览器版本过低,请换一个浏览器或者升级该浏览器");
    return false;
  }else{
    //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
    if(localStorage.getItem('token')){
      // localStorage.setItem("c",3);
      // console.info('表示用户已经是登陆状态，不需要刷新页面跑到登陆页面') 
      // to: Route: 即将要进入的目标 路由对象
      // from: Route: 当前导航正要离开的路由
      // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
      // store.state.loading = false
      next();
    }else{
      // console.info('表示用户未登陆状态，第一次需要到登陆页面')
      if(to.fullPath == '/manager/login'){
        // store.state.loading = false 
        next()
      }else{
        // console.info('在未登陆时都是进入登陆的页面')
        // store.state.loading = false 
        next('/manager/login');
      }
    }
  }
})

// router.afterEach((to) => {
//   store.state.loading = true
// })

export default router;