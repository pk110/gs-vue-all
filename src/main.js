// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
import {stamp} from './utils/utils'
import api from './http/index' // 导入api接口

Vue.use(ElementUI);
Vue.config.productionTip = false

// 全局调用
Vue.prototype.$stamp = stamp;
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'aca0802c1fe6ef6f5834077344b1d0dc',
  plugin: ['AMap.Geolocation','AMap.PolyEditor','AMap.PlaceSearch'],
  v: '1.4.4'
})

//全局自定义获取焦点方法
Vue.directive('focus', function (el) {
  el.querySelector('input').focus()
})

//全局防止按钮双击重复提交
Vue.directive('dbClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      if(!el.disabled) {
        el.disabled = true;
        let timer = setTimeout( () => {
          el.disabled = false;
        },1000)
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
