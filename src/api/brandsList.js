/**
* brandsList模块接口列表
*/

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const brandsList = {    
 // 品牌列表   
 getBrandsList (params) {    
   return axios.get(`${base}/api/v2/admin/brand/get`,{params});    
 },
 // 添加品牌  
 addBrands (params) {    
   return axios.post(`${base}/api/v2/admin/brand/add`,params,{
    　　　　headers:{
    　　　　  'Content-Type':'multipart/form-data'   //hearder 很重要，Content-Type 要写对
    　　　　}
    　　});    
 },
 // 修改品牌  
 resiveBrands (params) {    
   return axios.post(`${base}/api/v2/admin/brand/update`,params,{
    　　　　headers:{
    　　　　  'Content-Type':'multipart/form-data'   //hearder 很重要，Content-Type 要写对
    　　　　}
    　　});    
 }
}

export default brandsList;