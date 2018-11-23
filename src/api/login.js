/**
 * login模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const login = {
  // post提交    
  login (params) {       
    return axios.post(`${base}/api/v2/admin/user/login`, params);     
  },
  //登出
  exit (params) {
    return axios.get(`${base}/api/v2/admin/user/exit`, params);
  },
  //验证码登陆
  codeLogin (params) {
    return axios.get(`${base}/api/v2/admin/user/code`, params);
  },
  //绑定手机号
  contactPhone(params){
    return axios.post(`${base}/api/v2/admin/user/apply`,params)
  },
  //用token直接拿到用户信息 在用户刷新页面的时候
  refrush(params){
    return axios.get(`${base}/api/v2/admin/user/token`,params)
  }
}

export default login;