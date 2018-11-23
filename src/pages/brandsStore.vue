<template>
  <div>
    <!--头部-->
    <div class="brandsStore_head">
      <div style="display:flex;justify-content:flex-start;align-items:center;">
        <div class="brandsStore_addStore" @click="addStores"><i class="el-icon-plus"></i>&nbsp;添加门店</div>
        <div class="brandsStore_storeNub" style="margin-right:20px;">门店数量&nbsp;<span style="color:#ed6f00">{{totalPages}}</span></div>
        <div class="brandsStore_chooseCity">选择城市</div>
        <el-select v-model="city" class="brandsStore_options" style="width:120px;" placeholder="请选择城市" @change="chooseCity">
          <el-option
            v-for="item in citysList"
            :key="item.cityId"
            :label="item.cityName"
            :value="item.cityId">
          </el-option>
        </el-select>
      </div>
      <el-input
        style="width:240px;margin-left:20px;"
        size="medium"
        class="brandsStore_search"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchStore">
      </el-input>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      class="brandsStore_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        :width="100"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="brandName"
        align="center"
        label="门店品牌">
      </el-table-column>
      <el-table-column
        prop="storeName"
        align="center"
        label="门店名">
      </el-table-column>
      <el-table-column
        prop="storeManager"
        align="center"
        label="店长">
      </el-table-column>
      <el-table-column
        prop="linkman"
        align="center"
        label="门店电话">
      </el-table-column>
      <el-table-column
        prop="addressDetail"
        align="center"
        label="门店地址">
      </el-table-column>
      <el-table-column
        align="center"
        label="营业时间">
        <template slot-scope="scope">
         <p v-for="(items,index) in JSON.parse(scope.row.businessTime)" :key="index">{{items.startTime+'-'+items.endTime}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button style="background-color:#ed6f00;color:#fff;padding:7px 20px;border-radius:30px;" @click="edit(scope.$index,scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
    <!--弹窗-->
    <el-dialog title="门店信息" top="2vh" :visible.sync="storesBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="选择品牌" prop="brands">
          <el-select v-model="form.brands" placeholder="请选择品牌">
            <el-option
              v-for="item in brands"
              :key="item.brandId"
              :label="item.brandName"
              :value="item.brandId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店名称" prop="storeName">
          <el-input v-model="form.storeName" style="width:250px;" placeholder="请输入门店名称"></el-input>
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-autocomplete
            v-model="form.address"
            :disabled="true"
            style="max-width:400px"
            placeholder="请添加店铺地址">
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix">
            </i>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="服务范围" prop="range">
          <el-autocomplete
            v-model="form.range"
            :disabled="true"
            placeholder="请添加店铺服务范围">
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix">
            </i>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="storeEdit">店铺地址编辑</el-button>
        </el-form-item>
        <el-form-item label="人均消费" prop="peopleMoney">
          <el-input v-model="form.peopleMoney" style="width:170px;" placeholder="请输入人均消费金额"></el-input> 元
        </el-form-item>
        <el-form-item label="门店店长" prop="storeManager">
          <el-input v-model="form.storeManager" style="width:250px;" placeholder="请输入门店店长名称"></el-input>
        </el-form-item>
        <el-form-item label="门店电话" prop="storePhone">
          <el-input v-model="form.storePhone" style="width:250px;" placeholder="请输入门店电话"></el-input>
        </el-form-item>
        <el-form-item label="门店实景" prop="storeImgs">
          <imgs :files="form.storeImgs" class="brandsStore_img" :limitImg="3" @imgFiles="getStoreImg" />  
        </el-form-item>
        <el-form-item label="营业时间" prop="storeTimeAm">  
          <el-time-picker
            is-range
            arrow-control
            v-model="form.storeTimeAm"
            size="small"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择上午时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="" prop="storeTimePm">  
          <el-time-picker
            is-range
            arrow-control
            v-model="form.storeTimePm"
            size="small"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择下午时间范围">
          </el-time-picker> 
        </el-form-item>
        <el-form-item label="预约时间" prop="timeType">
          <el-select v-model="form.timeType" placeholder="请选择预约时间">
            <el-option
              v-for="item in timeTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起送金额" prop="initPrice">
          <el-input v-model.number="form.initPrice" style="width:150px;" placeholder="请输入起送金额"></el-input> 元(不含配送费)
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;border-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#000;color:#fff;padding:7px 20px;border-radius:30px;" @click="resetForm('ruleForm')">重 置</el-button>
      </div>
      <!--地图-->
      <el-dialog
        top="2vh"
        title="地图选址"
        :visible.sync="mapVisible"
        append-to-body
        class="brandsStore_inline_body">
        <maps  v-bind:propsCenter="region" v-bind:propsPath="storeArr"  @storePath="getPath" />
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import pages from './../components/pages.vue'
import imgs from './../components/img.vue'
import maps from './../components/map.vue'
export default {
    data () {
      var checkInit = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('起始金额不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          // if (value < 18) {
          //   callback(new Error('必须年满18岁'));
          // } else {
          //   callback();
          // }
          callback();
        }
      };
      var checkPeopleMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('人均金额不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          // if (value < 18) {
          //   callback(new Error('必须年满18岁'));
          // } else {
          //   callback();
          // }
          callback();
        }
      };
      return {
        region:[], //店铺坐标
        storeArr:[],  //店铺配送范围坐标数组
        form:{
          brands:'',
          storeName:'',
          address:'',
          range:'',
          storeManager:'',
          storePhone:'',
          storeImgs:[],
          storeTimeAm:[new Date(), new Date()],
          storeTimePm:[new Date(), new Date()],
          timeType:'1',
          initPrice:'',
          peopleMoney:''
        },
        rules: {
          brands: [
            { required: true, message: '请输入选择品牌', trigger: 'blur' },
          ],
          storeName:[
            { required: true, message: '请输入门店名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请添加门店地址', trigger: 'blur' }
          ],
          range:[
            { required: true, message: '请添加门店服务范围', trigger: 'blur' }
          ],
          peopleMoney:[
             { required: true, validator: checkPeopleMoney, trigger: 'blur' }
          ],
          storeManager:[
            { required: true, message: '请输入门店店长名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          storePhone:[
            { required: true, message: '请输入门店店长电话', trigger: 'blur' },
            {
              validator: function (rule, value, callback) {
                  var MobileRegex = /^1[0-9]{10}$/;
                  if (!MobileRegex.test(value)) {
                      callback(new Error('手机号码格式不正确！'))
                  } else {
                      callback();
                  }
                }, trigger: 'blur'
            }
          ],
          storeImgs:[
            { required: 'array', message: '请添加门店实景图片', trigger: 'blur' }
          ],
          storeTimeAm:[
            { required: true, message: '请添加门店上午营业时间', trigger: 'blur' }
          ],
          storeTimePm:[
            { required: true, message: '请添加门店下午营业时间', trigger: 'blur' }
          ],
          timeType:[
            { required: true, message: '请添加门店预约时间', trigger: 'blur' }
          ],
          initPrice:[
             { validator: checkInit, trigger: 'blur' }
          ]
        },
        timeTypes:[{
          value: '1',
          label: '当日打烊前'
        }],
        brands:[],
        data:[],
        totalPages:0,
        pageSize:10,
        currentPage:1,
        search:'',
        city:'',
        citysList:[],
        storesBox:false,
        mapVisible:false
      }
    },
    methods:{
      //算出每条的数字
      indexMethod(index) {
        return index+1 + this.pageSize*(this.currentPage-1)
      },
      //提交表单
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form);
          } else {
            this.$stamp(null,'error submit!!');
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.region = []
        this.storeArr = []
        this.$refs[formName].resetFields();
      },
      //店铺地址编辑
      storeEdit(){
        this.$stamp(null,this.region)
        this.$stamp(null,this.storeArr)
        this.mapVisible = true
      },
      // 获取配送范围、公里数、店铺坐标、店铺具体地址信息
      getPath(message){
        this.$stamp(null,message)
        this.storeArr = message.storeArr
        this.form.address = message.address
        this.region = message.region
        this.form.range = message.range
        this.mapVisible = message.mapVisible
      },
      //获取城市图片
      getStoreImg(val){
        this.$stamp(null,val)
        this.form.storeImgs = val
      },
      //选择城市
      chooseCity(){
        this.$stamp(null,this.city)
      },
      // 搜索门店
      searchStore(){
        this.$stamp(null,this.search)
      },
      //编辑按钮
      edit(index,val){
        this.$stamp(null,val)

        
          // brands:'',
          // storeName:'',
          // address:'',
          // range:'',
          // storeManager:'',
          // storePhone:'',
          // storeImgs:[],
          // storeTimeAm:[new Date(), new Date()],
          // storeTimePm:[new Date(), new Date()],
          // timeType:'1',
          // initPrice:'',
          // peopleMoney:''
        let storeTimeAmStartTime = JSON.parse(val.businessTime)[0].startTime.split(':')
        let storeTimeAmEndTime = JSON.parse(val.businessTime)[0].endTime.split(':')
        let storeTimePmStartTime = JSON.parse(val.businessTime)[1].startTime.split(':')
        let storeTimePmEndTime = JSON.parse(val.businessTime)[1].endTime.split(':')
        this.form.brands = val.brandName
        this.form.storeName = val.storeName
        this.form.address = val.addressDetail
        this.form.storeManager = val.storeManager
        this.form.storePhone = val.linkman
        this.form.storeTimeAm = [new Date(2016, 9, 10,storeTimeAmStartTime[0],storeTimeAmStartTime[1]),new Date(2016, 9, 10,storeTimeAmEndTime[0],storeTimeAmEndTime[1])]
        this.form.storeTimePm = [new Date(2016, 9, 10,storeTimePmStartTime[0],storeTimePmStartTime[1]),new Date(2016, 9, 10,storeTimePmEndTime[0],storeTimePmEndTime[1])]
        this.storesBox = true
      },
      //添加门店
      addStores(){
        // this.region = []
        // this.storeArr = []
        // this.$refs['ruleForm'].resetFields();
        if(this.$store.state.brandsList.length == 0){
          this.getAllBrandsList().then(res=>{
            this.$stamp(null,res)
            this.brands = res.data.data
            this.$store.state.brandsList = res.data.data
          })
        }
        this.storesBox = true
      },
      //获取当前页数
      getCurrentPage(val){
        this.currentPage = val
      },
      //获取所有的门店列表
      getStoreList(pageNum,pageSize){
        return new Promise((resolve,reject) => {
          this.$api.brandsStore.storeList({pageNum,pageSize}).then(res => {
            resolve(res)
          })
        })
      },
      //获取所有品牌列表
      getAllBrandsList(){
        return new Promise((resolve,reject) => {
          this.$api.common.getAllBrands('').then(res => {
            resolve(res)
          })
        })
      },
      // 获取城市列表
      getCityList(){
        return new Promise((resolve,reject) =>{
          this.$api.common.getCityList().then((res) =>{
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      pages,
      imgs,
      maps
    },
    created(){
      this.$store.state.loading = true
      if(this.$store.state.cityList.length == 0){
        this.getCityList().then(res=>{
          this.$stamp(null,res)
          this.$store.state.cityList = res.data.data
          this.citysList = res.data.data
          this.city = res.data.data[0].cityId
          return res.data.data[0].cityId
        }).then(res=>{
          this.getStoreList(1,this.pageSize).then(res=>{
            this.$stamp(null,res)
            this.data = res.data.data.stores
            this.totalPages = res.data.data.total
            this.$store.state.loading = false
          })
        })
      }else{
        this.citysList = this.$store.state.cityList
        this.city = this.$store.state.cityList[0].cityId
        this.getStoreList(1,this.pageSize).then(res=>{
          this.$stamp(null,res)
          this.data = res.data.data.stores
          this.totalPages = res.data.data.total
          this.$store.state.loading = false
        })
      }
    }
}
</script>

<style>
  .brandsStore_head{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .brandsStore_chooseCity{
    background-color:#fff;
    color:#000;
    box-sizing:border-box;
    padding:9px;
    border-radius:5px 0 0 5px;
  }
  .brandsStore_inline_body .el-dialog__body{
    padding-top:0;
  }
  .brandsStore_inline_body .el-dialog__header{
    text-align:center;
    background-color:#ed6f00;
    padding-top:10px;
  }
  .brandsStore_inline_body .el-dialog__title{
    color:#fff;
  }
  .brandsStore_inline_body .el-dialog__headerbtn{
    top:12px;
  }
  .brandsStore_inline_body .el-dialog__headerbtn .el-dialog__close{
    color:#fff;
  }
  .brandsStore_options .el-input__inner{
    border:0;
    height:39px;
    line-height:39px;
    border-radius:0 5px 5px 0;
  }
  .brandsStore_options .el-select__caret{
    color:#000!important;
  }
  .brandsStore_storeNub{
    color:#000;
    box-sizing:border-box;
    padding:9px;
  }
  .brandsStore_addStore{
    background-color:#ed6f00;
    color:#fff;
    box-sizing:border-box;
    padding:7px 15px;
    cursor:pointer;
    margin-right:20px;
    border-radius:30px;
  }
  .brandsStore_search input{
    border:0;
    border-radius:30px;
  }
  .brandsStore_search .el-input__inner{
    height:33px;
  }
  .brandsStore_search .el-input__suffix{
    color:#FF9800;
  }
  .brandsStore_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .brandsStore_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .brandsStore_table thead tr th:nth-child(8){
    border-radius:0 5px 0 0;
  }
  .brandsStore_img li{
    width:100px!important;
    height:100px!important;
  }
  .brandsStore_img .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .brandsStore_img .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
</style>
