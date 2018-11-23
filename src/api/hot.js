/**
 * hot模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const hot = {    
  // 人气网红列表   
  hotList (params) {    
    return axios.get(`${base}/api/v2/admin/popularity/select`,{params});    
  },
  //人气网红搜索
  hotSearch (params) {    
    return axios.get(`${base}/api/v2/admin/popularity/search`,{params});    
  } 
}

export default hot;