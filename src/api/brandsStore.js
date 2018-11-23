/**
* brandsStore模块接口列表
*/

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const brandsStore = {    
 // 品牌门店列表   
 storeList (params) {    
   return axios.get(`${base}/api/v2/admin/store/find`,{params});    
 },
 // 添加品牌门店  
 addBrandsStore (params) {    
   return axios.post(`${base}/api/v2/admin/store/add`,params);    
 },
 // 修改品牌门店  
 resiveBrandsStore (params) {    
   return axios.post(`${base}/api/v2/admin/store/update`,params);    
 }
}

export default brandsStore;