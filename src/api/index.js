/**
 * index模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const index = {    
  // 首页   
  index (params) {    
    return axios.get(`${base}/api/v2/admin/homepage/select`,{params});    
  },
  // {
  //   "storeId":7,
  //   "type":1, //0表示查询6个全部 1第一排左边2第一排右边
  //   "dateCount":30,
  //   "start":"2018-10-10",
  //   "end":"2018-10-18"
  //   }  
  // 报表接口  
  echart (params) {    
    return axios.post(`${base}/api/v2/admin/homepage/report`,params);    
  }
}

export default index;