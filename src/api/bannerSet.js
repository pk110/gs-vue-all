/**
 * bannerSet模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const bannerSet = {    
  // 品牌列表   
  bannerList (params) {    
    return axios.post(`${base}/api/v2/admin/banner/select`,params);    
  },
  //搜索banner设置  
  bannerSearch (params) {    
    return axios.get(`${base}/api/v2/admin/banner/search`,{params});    
  },
  //修改品牌信息
  reviseBanner (params) {
    return axios.post(`${base}/api/v2/admin/banner/update`,params,{
      　　　　headers:{
      　　　　  'Content-Type':'multipart/form-data'   //hearder 很重要，Content-Type 要写对
      　　　　}
      　　})
  },
  //新建品牌信息
  addBanner (params) {
    return axios.post(`${base}/api/v2/admin/banner/add`,params,{
      　　　　headers:{
      　　　　  'Content-Type':'multipart/form-data'   //hearder 很重要，Content-Type 要写对
      　　　　}
      　　}
    )
  }
}

export default bannerSet;