/**
 * brandsDishes模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const brandsDishes = {    
  // 品牌菜库列表   
  brandsDishesList (params) {    
    return axios.get(`${base}/api/v2/admin/product/slcity`,{params});    
  }
}

export default brandsDishes;