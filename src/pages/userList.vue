<template>
  <div class="users">
    <el-table
      class="users_table"
      :header-cell-style="{background:'#494949',color:'#ffffff'}"
      :data="usersList">
      <el-table-column
        prop="adminNicemane"
        label="用户名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="adminLogin"
        label="账号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.applyStatus == 0" style="color:#ff3b21">注册未申请权限</span>
          <span v-else-if="scope.row.applyStatus == 1">权限申请中</span>
          <span v-else style="color:#ed6f00">已完成权限分配</span>
        </template>
      </el-table-column>
      <!--<el-table-column
        label="门店"
        align="center">
          <template slot-scope="scope">
            <div class="users_navigation">
              <span v-for="(items,index) in scope.row.storeList" :key="items.storeId">{{index !== scope.row.storeList.length-1?items.storeName+'、':items.storeName}}</span>
            </div>
          </template>
      </el-table-column>-->
      <el-table-column
        label="导航栏"
        align="center">
          <template slot-scope="scope">
            <div class="users_navigation">
              <span v-for="(items,index) in scope.row.menuList" :key="items.menuId">{{index !== scope.row.menu.length-1?items.name+'、':items.name}}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.applyStatus !== 0" class="money_set" @click="set(scope.$index,scope.row)">设置</div>
          </template>
      </el-table-column>
    </el-table>
    <!--弹出框-->
    <el-dialog
      title="选择导航权限"
      :visible.sync="usersBox"
      width="30%"
      class="money_box"
      center>
        <div v-if="usersBoxLoading == true" style="padding-bottom: 5vh;">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </div>
        <div v-else>
          <div class="userSetList_top">
            <span style="padding-right:20px;">可多选所需导航</span>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange" class="allChecked">全选</el-checkbox>
          </div>
          <div class="userSetList">
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedPower" @change="checkedPowerChange" class="allChecked">
              <el-checkbox v-for="items in Powers" :label="items.menuId" :key="items.menuId">{{items.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <!--<div class="userSetList_top">
            <span style="padding-right:20px;">可多选所需门店</span>
            <el-checkbox :indeterminate="storeIsIndeterminate" v-model="checkAllStores" @change="checkAllStoresChange" class="allChecked">全选</el-checkbox>
          </div>
          <div class="userSetList">
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedStores" @change="checkedStoresChange" class="allChecked">
              <el-checkbox v-for="items in stores" :label="items.storeId" :key="items.storeId">{{items.storeName}}</el-checkbox>
            </el-checkbox-group>
          </div>-->
          <div class="userSetList_bottom">
            <el-button v-dbClick class="users_comfired" @click="comfired">确认</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
let Powers = []
let stores = []
export default {
    data () {
      return {
        usersList:[],
        usersBox:false,
        checkAll: false,
        checkedPower: [],
        Powers: Powers,
        checkAllStores: false,
        checkedStores: [],
        stores: [],
        isIndeterminate: true,
        storeIsIndeterminate: true,
        usersBoxLoading:false,
        userId:'',
        currentIndex:0
      }
    },
    methods:{
      //确认
      comfired(){
        this.$stamp(null,this.checkedPower)
        // this.$stamp(null,this.checkedStores)
        this.usersBox = false;
        // let myStores = []
        // for(let i = 0;i<this.checkedStores.length;i++){
        //   for(let j = 0;j<this.stores.length;j++){
        //     if(this.checkedStores[i] == this.stores[j].storeId){
        //       myStores.push(this.stores[j])
        //       continue;
        //     }
        //   }
        // }
        // this.usersList[this.currentIndex].storeList = myStores
        let myPowers = []
        for(let i = 0;i<this.checkedPower.length;i++){
          for(let j = 0;j<this.Powers.length;j++){
            if(this.checkedPower[i] == this.Powers[j].menuId){
              myPowers.push(this.Powers[j])
              continue;
            }
          }
        }
        this.usersList[this.currentIndex].menu = myPowers
        this.addPower(this.userId,this.checkedPower).then(res =>{
          this.$stamp(null,res)
          this.$message.success('操作成功!')
        })
      },
      //设置按钮
      set(index,data){
        this.$stamp(null,data)
        this.usersBox = true;
        this.currentIndex = index
        this.userId = data.userId
        this.checkedPower = []
        // this.checkedStores = []
        // for(let i = 0;i<data.storeList.length;i++){
        //   this.checkedStores.push(data.storeList[i].storeId)
        // }
        for(let i = 0;i<data.menuList.length;i++){
          this.checkedPower.push(data.menuList[i].menuId)
        }
        if(typeof(this.Powers[0]) == 'undefined'){
          this.usersBoxLoading = true
          this.getNavigation('').then(res =>{
            this.$stamp(null,res)
            // for(let i = 0;i<res.data.data.storeList.length;i++){
            //   stores.push(res.data.data.storeList[i].storeId)
            // }
            for(let i = 0;i<res.data.data.length;i++){
              Powers.push(res.data.data[i].menuId)
            }
            // this.stores = res.data.data.storeList
            this.Powers = res.data.data
            this.usersBoxLoading = false
          }).catch(error => {
            this.$message.error('网络错误!')
          })
        }
      },
      // 全选导航
      checkAllChange(val) {
        this.checkedPower = val ? Powers : [];
        this.isIndeterminate = false;
      },
      //单选导航
      checkedPowerChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.Powers.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.Powers.length;
      },
      // 全选门店
      checkAllStoresChange(val) {
        this.checkedStores = val ? stores : [];
        this.storeIsIndeterminate = false;
      },
      //单选门店
      checkedStoresChange(value) {
        let checkedCount = value.length;
        this.checkAllStores = checkedCount === this.stores.length;
        this.storeIsIndeterminate = checkedCount > 0 && checkedCount < this.stores.length;
      },
      //获取用户列表
      getUserList(){
        return new Promise((resolve,reject) => {
          this.$api.users.getUserList('').then(res => {
            resolve(res)
          })
        })
      },
      //获取全部导航信息
      getNavigation(){
        return new Promise((resolve,reject) => {
          this.$api.users.navigationList('').then(res => {
            resolve(res)
          })
        })
      },
      //给用户添加店铺和导航
      addPower(adminId,menu){
        return new Promise((resolve,reject) => {
          this.$api.users.addPower({adminId,menu:JSON.stringify(menu)}).then(res => {
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      
    },
    created(){
      this.$store.state.loading = true
      this.getUserList().then(res => {
        this.$stamp(null,res)
        this.usersList = res.data.data
        this.$store.state.loading = false
      }).catch(error => {
        this.$message.error('网络错误,请重新刷新页面')
      })
    }
}
</script>

<style>
  .money_box .el-dialog__body{
    padding:0;
  }
  .money_box thead tr th{
    background-color:#494949;
    color:#fff;
  }
  .money_box .el-dialog__header{
    background-color:#ed6f00;
    padding:10px;
  }
  .money_box .el-dialog__title{
    color:#ffffff;
  }
  .money_box .el-dialog__headerbtn{
    top:14px;
  }
  .money_box .el-dialog__headerbtn .el-dialog__close{
    color:#ffffff;
  }
  .money_set{
    width:100px;
    color:#fff;
    cursor: pointer;
    box-sizing:border-box;
    padding:7px 18px;
    background-color:#ed6f00;
    border-radius:30px;
    margin:0 auto;
  }
  .users_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .users_table thead tr th:nth-child(7){
    border-radius:0 5px 0 0;
  }
  .userSetList{
    box-sizing:border-box;
    padding:15px;
  }
  .userSetList_top{
    display:flex;
    align-items:center;
    border-bottom:1px solid #f1f1f1;
    box-sizing:border-box;
    padding:15px;
  }
  .allChecked .el-checkbox__input.is-indeterminate .el-checkbox__inner,.allChecked .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #000000;
    border-color: #000000;
  }
  .allChecked .el-checkbox__inner:hover{
    border-color: #000000;
  }
  .allChecked .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #000000;
  }
  .userSetList_bottom{
    box-sizing:border-box;
    padding:15px 0;
    text-align:center;
  }
  .users_comfired{
    background-color:#ff3b21;
    color:#fff;
    border-radius:30px;
    box-sizing:border-box;
    padding:10px 27px;
  }
  .users_navigation{
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .spinner {
    width: 60px;
    height: 60px;
  
    position: relative;
    margin: 100px auto;
  }
  
  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ff3b21;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
  }
  
  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  
  @-webkit-keyframes bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
  .allChecked label:first-child{
    margin-left:30px;
  }
</style>
