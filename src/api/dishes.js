/**
 * dishes模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const dishes = {    
  // 顶部标签列表   
  typeList (params) {    
    return axios.get(`${base}/api/v2/admin/product/select`,{params});    
  },
  //获取全部商品菜品列表
  getProducts (params) {    
    return axios.get(`${base}/api/v2/admin/product/all`,{params});    
  },
  //操作菜品信息
  operateDishes (params){
    return axios.post(`${base}/api/v2/admin/product/update`,params);
  }
}

export default dishes;