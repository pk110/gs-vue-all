/**
 * orders模块接口列表
 */

import base from './../http/base'; // 导入接口域名列表
import axios from './../http/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const orders = { 
  //查询订单
  getOrders (params) {    
    return axios.post(`${base}/api/v2/admin/order/select`,params);    
  },
  //订单处理
  handleOrders (params) {    
    return axios.post(`${base}/api/v2/admin/order/list`,params);    
  },
  //获取今日订单概况
  getToday (params) {    
    return axios.get(`${base}/api/v2/admin/order/price`,{params});    
  },
  //根据orderId地图查看骑手、店铺坐标
  getLoaction (params){
    return axios.get(`${base}/api/v2/admin/order/rider`,{params});    
  },
  //订单查询
  findOrders (params) {    
    return axios.post(`${base}/api/v2/admin/order/select`,params);    
  },
  //部分全部退款
  refundMoney (params) {    
    return axios.post(`${base}/api/v2/admin/order/accept`,params);    
  },
  //再次呼单
  againOrder (params) {    
    return axios.post(`${base}/api/v2/admin/order/opt `,params);    
  }
}

export default orders;