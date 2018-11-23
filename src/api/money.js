/**
 * money模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const money = {    
  // 资金列表   
  moneyList (params) {    
    return axios.post(`${base}/api/v2/admin/order/capital`,params);    
  },  
  // 资金列表详情页  
  getMoneyDetail (params) {    
    return axios.post(`${base}/api/v2/admin/order/info`,params);    
  },
  //资金excel文件下载
  getExcel (params){
    return axios.post(`${base}/api/v2/admin/excel/bill`,params,{responseType: 'arraybuffer'});
  }
}

export default money;