//写时间插件
export function runAsync(){
  var p = new Promise((resolve, reject) => {
    //第一天当前时间
    let date = new Date();
    //之后六天的营业时间
    let newDate = new Date(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + '10:00:00');
    //获取到当前的日期
    let currentDate = (date.getMonth() + 1) + '-' + date.getDate()
    // 获取当前的时间
    let currentTime = date.getHours() + '-' +date.getMinutes()
    let p = []
    for(let i = 0;i<6;i++){
      let timeList = []
      if(i == 0){
        let currentSce = date.getMinutes()
        for(let j = 0;j<14;j++){
          //第一天当前时间
          let date = new Date();
          let time = date.setMinutes(currentSce + 10*j)
          let timeLast = new Date(time)
          timeList.push({
            value:`${formatDate(timeLast)}`,
            text:`${timePrefix(timeLast.getHours())}` + ':' + `${timePrefix(timeLast.getMinutes())}`
          })
        }
      }else{
        let currentSce = newDate.getMinutes()
        for(let j = 0;j<14;j++){
          //之后六天的营业时间
          let newDate = new Date(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + '10:00:00');
          let time = newDate.setMinutes(currentSce + 10*j)
          let timeLast = new Date(time)
          timeList.push({
            value:`${formatDate(timeLast)}`,
            text:`${timePrefix(timeLast.getHours())}` + ':' + `${timePrefix(timeLast.getMinutes())}`
          })
        }
      }
      p.push({
        date:`${timePrefix(date.getMonth() + 1)}` + '-' + `${timePrefix(date.getDate() + i)}`,
        times:timeList
      })
    }
    resolve(p);
  })
  return p;            
}

/** 
 * 根据当前时间，获得送达时间选项组
 * @param bookDay {int} 可预订天数，确定左边选项
 * @param startTime {string} 营业开始时间，eg.'11:00'
 * @param endTime {string} 营业结束时间，同上
 * @param receiveTime {int} 从接单到送达的预备时间，分钟
 * @return {array} 送达时间选项组
*/
// 配送时间隔断
export function getTimeList(bookDay, AmStartTime, AmEndTime,PmStartTime,PmEndTime, receiveTime){
    const intervalMin = 15 // 间隔时间(分钟)
    let timeList = [] // 右边时间选项（二维数组）
    // let business_start // 营业结束时间
    // let business_end // 营业结束时间
    const date = new Date()
    let clocks = [] // 右边时刻表, 从开始营业时间，每隔40分钟，增加一个时间选项
    date.setMinutes(date.getMinutes() + receiveTime)
    // while (date.getHours() < business_end && date.getHours() > business_start) {
    //算出上午时间段
    while (`${CompareDate(date.getHours()+':'+date.getMinutes(),AmStartTime)}` === 'true' && `${CompareDate(date.getHours()+':'+date.getMinutes(),AmEndTime)}` === 'false') {
      clocks.push({
        value: `${date.getFullYear()}-${timePrefix(date.getMonth() + 1)}-${timePrefix(date.getDate())} ${timePrefix(date.getHours())}:${timePrefix(date.getMinutes())}:00`,
        text: timePrefix(date.getHours()) + ":" + timePrefix((date.getMinutes()))
      })
      date.setMinutes(date.getMinutes() + intervalMin)
    }
    // 算出下午时间段
    while (`${CompareDate(date.getHours()+':'+date.getMinutes(),PmStartTime)}` === 'true' && `${CompareDate(date.getHours()+':'+date.getMinutes(),PmEndTime)}` === 'false') {
      clocks.push({
        value: `${date.getFullYear()}-${timePrefix(date.getMonth() + 1)}-${timePrefix(date.getDate())} ${timePrefix(date.getHours())}:${timePrefix(date.getMinutes())}:00`,
        text: timePrefix(date.getHours()) + ":" + timePrefix((date.getMinutes()))
      })
      date.setMinutes(date.getMinutes() + intervalMin)
    }
  
  
    timeList.push({
      date: `今日（${getDay_my(date)}）`,
      times: clocks
    })
  
    for(let i=0; i<bookDay; i++) {
      date.setDate(date.getDate() + 1)
      let datePrefix =  `${date.getFullYear()}-${timePrefix(date.getMonth() + 1)}-${timePrefix(date.getDate())}`
      timeList.push({
        date: timePrefix(date.getMonth() + 1) + '-' + timePrefix(date.getDate()) + '(' + getDay_my(date) + ')',
        times: [
          {
            value: datePrefix + " 10:00:00", text: "10:00"
          },
          {
            value: datePrefix + " 10:40:00", text: "10:40"
          },
          {
            value: datePrefix + " 11:20:00", text: "11:20"
          },
          {
            value: datePrefix + " 12:00:00", text: "12:00"
          },
          {
            value: datePrefix + " 12:40:00", text: "12:40"
          },
          {
            value: datePrefix + " 13:20:00", text: "13:20"
          },
          {
            value: datePrefix + " 14:00:00", text: "14:00"
          },
        ]
      })
    }
  return timeList
}


 /**
  * 获得当天的星期几
  * @param {object} dateObj 
  * @returns {string} '周一'
  */
 export const getDay_my = (dateObj) => {
  if (!(dateObj instanceof Date)) {
    console.error('Not a Date object')
    return
  }

  let d = dateObj.getDay()
  switch(d) {
   case 1:
     return '周一';
   case 2:
     return '周二';
   case 3:
     return '周三';
   case 4:
     return '周四';
   case 5:
     return '周五';
   case 6:
     return '周六';
   case 0:
     return '周日';
   default:
     return
  }
}

// 判断时间前面是否需要加0
const timePrefix = (v) => {
  return (v > 9 ? v : '0' + v)
}

// 比较时间来取公共的部分
export const CompareDate = (t1,t2) =>  
{  
  // console.log(t1)
  // console.log(t2)
  var date = new Date();  
  var a = t1.split(":");  
  var b = t2.split(":");  
  // console.log(date.setHours(a[0],a[1]))
  // console.log(date.setHours(b[0],b[1]))
  return date.setHours(a[0],a[1]) > date.setHours(b[0],b[1]);  
}

//获取cookie、
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}
 
//解决读取cookie中文乱码问题
export function readCookie(name){
  var currentServiceAliasName = `${getCookie(name)}`;
  
  var displayName = "";
  if (currentServiceAliasName != null && currentServiceAliasName != "" && currentServiceAliasName != "undefined")
    return  displayName = unescape(currentServiceAliasName);
  else
    return null
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
 
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

// 格式化时间
export function dateFtt(fmt,date)   
{ //author: meizz  
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return Math.round(fmt / 1000);   
}

// 格式化时间
export function formatDate(date,pattern){
  if (date == undefined) {  
    date = new Date();  
  }  
  if (pattern == undefined) {  
      pattern = "yyyy-MM-dd hh:mm:ss";  
  }  

  var o = {  
          "M+": date.getMonth() + 1,  
          "d+": date.getDate(),  
          "h+": date.getHours(),  
          "m+": date.getMinutes(),  
          "s+": date.getSeconds(),  
          "q+": Math.floor((date.getMonth() + 3) / 3),  
          "S":  date.getMilliseconds()  
      };  
  if (/(y+)/.test(pattern)) {  
      pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));  
  }  

  for (var k in o) {  
      if (new RegExp("(" + k + ")").test(pattern)) {  
          pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
      }  
  }  

  return pattern;  
}


// 格式化年月日
export function getyyyyMMdd(d){
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; 
  var curr_year = d.getFullYear();
  String(curr_month).length < 2 ? (curr_month = "0" + curr_month): curr_month;
  String(curr_date).length < 2 ? (curr_date = "0" + curr_date): curr_date;
  var yyyyMMdd = curr_year + "-" + curr_month +"-"+ curr_date;
  return yyyyMMdd;
} 

//嵌套路由
export function convertRouteMap(menu){
  let routers = [];
  if (menu) {
      for (let i = 0;i<menu.length;i++) {
          let url = menu[i].component;
          let componentVal = resolve => {
                  require(['@/pages/' + url], resolve)
          }
          let route = {path: menu[i].path, component: componentVal, name: menu[i].name}
          if (menu[i].child) {
            route.children = convertRouteMap(menu.children);
          }
          routers.push(route);
      }
  }
  return routers
}

//获取网址后链接参数
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  // 匹配目标参数
  if (r != null) return unescape(r[2]); return null; // 返回参数值
}

// 打印日志开关
export function stamp(label,val){
  const a = true;
  if(a == true){
    if(label == null){
      return new Promise((resolve,reject) => {
        console.log(val)
      })
    }else{
      return new Promise((resolve,reject) => {
        console.log(label+':'+val)
      })
    }
  }else{
    return new Promise((resolve,reject) => {
      return;
    })
  }
}

/**
 *表单修改提交，只提交已经修改的参数，其余传空
 * @param newFormData {object}  form对象
 * @param oldFormData {object} 原始form对象
 * @param backData  不需要更改的返回什么类型 ''/null等
 * 包括如果里面对象也是数组请转换成字符串
*/

export function checkedForm(newFormData,oldFormData,backData){
  let lastFormData = {}
  return new Promise((resolve,reject)=>{
    Object.getOwnPropertyNames(newFormData).forEach(function(val, idx, array) {
      Object.getOwnPropertyNames(oldFormData).forEach(function(oldVal, oldIdx, oldArray) {
        if(val === oldVal && newFormData[val] !== oldFormData[oldVal]){
          lastFormData[val] = newFormData[val];
        }else if(val === oldVal && newFormData[val] === oldFormData[oldVal]){
          lastFormData[val] = backData;
        }
      })
    })
    resolve(lastFormData)
  })
}

// let form = {
//   a:1,
//   b:'2',
//   c:'3'
// }
// let oldForm = {
//   a:2,
//   b:'2',
//   c:'2'
// }
// let backData = ''
// async function app(){
//   try{
//     console.log(await checkedForm(form,oldForm,backData))
//   }catch(error){
//     console.log(error)
//   }
// }
// app()

/*
 *数组内求和运算
 * @param data {Number}
 */

  export function splitArray(data){
      if(data == 1){
        return [1]
      }else if(data%2 == 1){
        return [1,data-1]
      }else if(data == 6){
        return [2,4]
      }else if(data == 10){
        return [2,8]
      }else if(data == 12){
        return [4,8]
      }
  }

/*
 *日期格式转成标准时间
 * @param date {Number}
 */

  export function parserDate(date) {  
    var t = Date.parse(date);  
    if (!isNaN(t)) {  
      return new Date(Date.parse(date.replace(/-/g, "/")));  
    } else {  
      return new Date();  
    }  
  }


/*
 *
 *作者:七年
 *时间:2018-08-01
 *
 */

