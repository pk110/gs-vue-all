/**
 * common模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const common = {    
  // 公用所有品牌列表  
  getAllBrands (params) {    
    return axios.get(`${base}/api/v2/admin/brand/list`,{params});    
  },
  //根据品牌获取店铺列表
  getBrandsStore (params) {    
    return axios.get(`${base}/api/v2/admin/store/list`,{params});    
  },
  //获取城市列表
  getCityList (params) {    
    return axios.get(`${base}/api/v2/admin/brand/city`,{params});    
  }
}

export default common;