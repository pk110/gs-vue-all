/**
 * 接口域名的管理
 */

//  多人开发项目
// const base = {    
//   production: 'https://management.yanss.cn',    
//   development: 'http://192.168.11.168:8080'
// }

//单人开发项目
let base
// 环境的切换
if (process.env.NODE_ENV == 'development') {    
  base = 'http://192.168.11.168:8082';
} else if (process.env.NODE_ENV == 'debug') {    
  base = 'http://192.168.11.168:8082';
} else if (process.env.NODE_ENV == 'production') {    
  base = 'https://management.yanss.cn';
}

export default base;