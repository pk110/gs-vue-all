<template>
  <div>
    <!--头部-->
    <div class="foodesManagerDetail_title">~{{title}}所属门店列表~</div>
    <div class="foodesManagerDetail_head">
      <div style="display:flex;justify-content:flex-start;align-items:center;">
        <div class="foodesManagerDetail_addStore" @click="addStore"><i class="el-icon-plus"></i>&nbsp;添加食材所属门店</div>
        <div class="foodesManagerDetail_storeNub" style="margin-right:20px;">食材所属门店数量&nbsp;<span style="color:#ed6f00">80</span></div>
        <!--<div class="foodesManager_chooseCity">选择品牌</div>
        <el-select v-model="city" class="foodesManager_options" style="width:120px;" placeholder="请选择品牌" @change="chooseCity">
          <el-option
            v-for="item in citysList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>-->
      </div>
      <el-input
        style="width:240px;margin-left:20px;"
        size="medium"
        class="foodesManagerDetail_search"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchFoods">
      </el-input>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      class="foodesManagerDetail_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        :width="100"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        align="center"
        label="所属店铺">
        <template slot-scope="scope">
          <div v-if="scope.row.edit == false">{{scope.row.storeName}}</div>
          <el-select v-model="scope.row.storeName"  v-else style="width:120px;" placeholder="请选择门店">
            <el-option
              v-for="item in citysList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="产地">
        <template slot-scope="scope">
          <div v-if="scope.row.edit == false">{{scope.row.foodAddress}}</div>
          <el-input v-focus v-model="scope.row.foodAddress" v-else style="width:250px;" placeholder="请输入产地"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <div class="foodesManagerDetail_edit" v-if="scope.row.edit == false" @click="edit(scope.$index,scope.row)">编辑</div>
          <div class="foodesManagerDetail_check" v-else @click="check(scope.$index,scope.row)">确认</div>
          <div class="foodesManagerDetail_chose" v-if="scope.row.edit == false" @click="close(scope.$index,scope.row)">删除</div>
          <div class="foodesManagerDetail_cancel" v-else @click="cancel(scope.$index,scope.row)">取消</div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
    <!--弹窗-->
    <el-dialog title="食材所属门店信息" :visible.sync="foodsStoreBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="所属店铺" prop="foodStore">
          <el-select v-model="form.foodStore" style="width:120px;" placeholder="请选择门店">
            <el-option
              v-for="item in citysList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产地" prop="foodAddress">
          <el-input v-model="form.foodAddress" style="width:250px;" placeholder="请输入产地"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;border-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#000;color:#fff;padding:7px 20px;border-radius:30px;" @click="resetForm('ruleForm')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pages from './../components/pages.vue'
export default {
    data () {
      return {
        title:'',
        form:{
          foodAddress:'',
          foodStore:''
        },
        rules: {
          foodAddress:[
            { required: true, message: '请输入产地', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          foodStore:[
            { required: true, message: '请选择所属门店', trigger: 'blur' }
          ]
        },
        data:[{
          storeName:'摇滚迷离1',
          foodAddress:'武汉本地',
          edit:false
        },{
          storeName:'摇滚迷离1',
          foodAddress:'武汉本地',
          edit:false
        },{
          storeName:'摇滚迷离1',
          foodAddress:'武汉本地',
          edit:false
        },{
          storeName:'摇滚迷离1',
          foodAddress:'武汉本地',
          edit:false
        },{
          storeName:'摇滚迷离1',
          foodAddress:'武汉本地',
          edit:false
        },{
          storeName:'摇滚迷离1',
          foodAddress:'武汉本地',
          edit:false
        }],
        totalPages:10,
        pageSize:1,
        currentPage:1,
        search:'',
        city:'选项2',
        citysList:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        foodsStoreBox:false,
        currentData:{}
      }
    },
    methods:{
      //算出每条的数字
      indexMethod(index) {
        return index+1 + 10*(this.currentPage-1)
      },
      //编辑按钮
      edit(index,data){
        // 只准编辑其中一个
        for(let i = 0;i<this.data.length;i++){
          if(i == index){
            this.currentData = data
            this.$set(this.data,index,{
              storeName:data.storeName,
              foodAddress:data.foodAddress,
              edit:true
            })
          }else{
            this.$set(this.data,i,{
              storeName:data.storeName,
              foodAddress:data.foodAddress,
              edit:false
            })
          }
        }
      },
      //勾选按钮
      check(index,data){
        if(data.foodAddress == ''){
          this.$message.error('产地不能为空')
          return false
        }else{
          this.$set(this.data,index,{
            storeName:data.storeName,
            foodAddress:data.foodAddress,
            edit:false
          })
        }
      },
      //取消按钮
      cancel(index,date){
        this.$set(this.data,index,{
          storeName:this.currentData.storeName,
          foodAddress:this.currentData.foodAddress,
          edit:false
        })
      },
      //删除按钮
      close(index,data){
        this.$delete(this.data,index)
        //计算页数
        this.totalPages--
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
        this.$refs[formName].resetFields();
      },
      //选择城市
      chooseCity(){
        this.$stamp(null,this.city)
      },
      // 搜索食材
      searchFoods(){
        this.$stamp(null,this.search)
      },
      //添加门店
      addStore(){
        this.foodsStoreBox = true
      },
      //获取当前页数
      getCurrentPage(val){
        this.currentPage = val
      }
    },
    computed: {
      
    },
    components: {
      pages
    },
    created(){
      this.title = this.$route.params.foodsMessage.foodsName
    }
}
</script>

<style>
  .foodesManagerDetail_head{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .foodesManagerDetail_title{
    width:100%;
    text-align:center;
    color:#ed6f00;
    font-size:16px;
    font-weight:bold;
  }
  .foodesManagerDetail_chooseCity{
    background-color:#fff;
    color:#000;
    box-sizing:border-box;
    padding:9px;
    border-radius:5px 0 0 5px;
  }
  .foodesManagerDetail_inline_body .el-dialog__body{
    padding-top:0;
  }
  .foodesManagerDetail_edit{
    display:inline-block;
    border-radius:30px;
    color:#fff;
    box-sizing:border-box;
    padding:5px 17px;
    background-color:#ed6f00;
    cursor:pointer;
  }
  .foodesManagerDetail_check{
    display:inline-block;
    border-radius:30px;
    color:#ed6f00;
    box-sizing:border-box;
    padding:4px 17px;
    border:1px solid #ed6f00;
    cursor:pointer;
  }
  .foodesManagerDetail_cancel{
    display:inline-block;
    border-radius:30px;
    color:#fff;
    box-sizing:border-box;
    padding:5px 17px;
    background-color:#000;
    cursor:pointer;
  }
  .foodesManagerDetail_chose{
    display:inline-block;
    border-radius:30px;
    color:#fff;
    box-sizing:border-box;
    padding:5px 17px;
    background-color:#000;
    cursor:pointer;
  }
  .foodesManagerDetail_inline_body .el-dialog__header{
    text-align:center;
    background-color:#ed6f00;
    padding-top:10px;
  }
  .foodesManagerDetail_inline_body .el-dialog__title{
    color:#fff;
  }
  .foodesManagerDetail_inline_body .el-dialog__headerbtn{
    top:12px;
  }
  .foodesManagerDetail_inline_body .el-dialog__headerbtn .el-dialog__close{
    color:#fff;
  }
  .foodesManagerDetail_options .el-input__inner{
    border:0;
    height:39px;
    line-height:39px;
    border-radius:0 5px 5px 0;
  }
  .foodesManagerDetail_options .el-select__caret{
    color:#000!important;
  }
  .foodesManagerDetail_storeNub{
    color:#000;
    box-sizing:border-box;
    padding:9px;
  }
  .foodesManagerDetail_addStore{
    background-color:#ed6f00;
    color:#fff;
    box-sizing:border-box;
    padding:7px 15px;
    cursor:pointer;
    margin-right:20px;
    border-radius:30px;
  }
  .foodesManagerDetail_search input{
    border:0;
    border-radius:30px;
  }
  .foodesManagerDetail_search .el-input__inner{
    height:33px;
  }
  .foodesManagerDetail_search .el-input__suffix{
    color:#FF9800;
  }
  .foodesManagerDetail_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .foodesManagerDetail_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .foodesManagerDetail_table thead tr th:nth-child(4){
    border-radius:0 5px 0 0;
  }
  .foodesManagerDetail_img li{
    width:100px!important;
    height:100px!important;
  }
  .foodesManagerDetail_img .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .foodesManagerDetail_img .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
</style>
