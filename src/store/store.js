import Vue from 'vue'
import Vuex from 'vuex'
import siderBar from './modules/siderBar'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    role:0,  //登录进来的角色类型 
    storesMessage:{
      storeId:'0'
    },
    search:'',
    loading:false, //是否加载动画
    network:true,  //判读是否断网
    token:'',   //用户的token
    userName:'', //用户名
    applyStatus:0,  //申请权限状态
    brandsList:[],  //所有品牌列表
    cityList:[]  //所有城市列表
  },
  getters: {
    storesMessage(state){
      return state.storesMessage
    },
    search(state){
      return state.search
    }
  },
  mutations: {
    changeNetwork:(state,data) =>{
      state.network = data
    }
  },
  actions: {
    changeNetwork:(context,data) =>{
      context.commit('changeNetwork',data)
    }
  },
  modules: {
    siderBar
  }
})

export default store