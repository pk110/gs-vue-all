/**
 * users模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const users = {    
  // 用户列表   
  getUserList (params) {    
    return axios.get(`${base}/api/v2/admin/menu/list`,{params});    
  },
  //获取门店、导航列表
  navigationList (params) {    
    return axios.get(`${base}/api/v2/admin/menu/all`,{params});    
  },
  //给用户添加店铺和导航
  addPower (params) {    
    return axios.post(`${base}/api/v2/admin/menu/add`,params);    
  }
}

export default users;