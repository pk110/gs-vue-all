/** 
 * api接口的统一出口
 */
// 首页模块接口
import index from './../api/index';
// 登录模块的接口
import login from './../api/login';
// 店铺模块的接口
// import stores from './../api/stores';
// 菜品模块的接口
import dishes from './../api/dishes';
// 用户管理模块的接口
import users from './../api/users';
// 订单管理模块的接口
import orders from './../api/orders';
// 资金管理模块的接口
import money from './../api/money';
// 品牌管理模块的接口
import brandsList from './../api/brandsList';
// 品牌门店管理模块的接口
import brandsStore from './../api/brandsStore';
// bannerSet管理模块的接口
import bannerSet from './../api/bannerSet';
// brandsDishes管理模块的接口
import brandsDishes from './../api/brandsDishes';
// hot管理模块的接口
import hot from './../api/hot';
// 所有公用的接口
import common from './../api/common';

// 导出接口
export default {      
  index,
  login,
  // stores,
  dishes,
  users,
  orders,
  money,
  brandsList,
  brandsStore,
  bannerSet,
  brandsDishes,
  hot,
  common
}