<template>
  <div>
    <!--头部-->
    <div class="foodesManager_head">
      <div style="display:flex;justify-content:flex-start;align-items:center;">
        <div class="foodesManager_addStore" @click="addFoods"><i class="el-icon-plus"></i>&nbsp;添加食材</div>
        <div class="foodesManager_storeNub" style="margin-right:20px;">食材数量&nbsp;<span style="color:#ed6f00">80</span></div>
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
        class="foodesManager_search"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchFoods">
      </el-input>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      class="foodesManager_table"
      style="max-width: 1000px;margin-top:20px;">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        :width="100"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="foodsName"
        align="center"
        label="食材名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button style="background-color:#ed6f00;border-radius:30px;color:#fff;padding:8px 18px;" @click="edit(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pages="left_pages" :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
    <!--弹窗-->
    <el-dialog title="食材信息" :visible.sync="foodsBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="食材名称" prop="foodName">
          <el-input v-model="form.foodName" style="width:250px;" placeholder="请输入食材名称"></el-input>
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
        left_pages:'left_pages',
        form:{
          foodName:''
        },
        rules: {
          foodName:[
            { required: true, message: '请输入食材名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ]
        },
        data:[{
          foodsName:'摇滚迷离1'
        },{
          foodsName:'摇滚迷离2'
        },{
          foodsName:'摇滚迷离3'
        },{
          foodsName:'摇滚迷离4'
        },{
          foodsName:'摇滚迷离5'
        },{
          foodsName:'摇滚迷离6'
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
        foodsBox:false,
      }
    },
    methods:{
      //算出每条的数字
      indexMethod(index) {
        return index+1 + 10*(this.currentPage-1)
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
      //编辑按钮
      edit(val){
        this.$stamp(null,val)
        this.$router.push({
          name:'foodesManagerDetail',
          params:{
            foodsMessage:val
          }
        })
      },
      //添加门店
      addFoods(){
        this.foodsBox = true
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
      
    }
}
</script>

<style>
  .foodesManager_head{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .foodesManager_chooseCity{
    background-color:#fff;
    color:#000;
    box-sizing:border-box;
    padding:9px;
    border-radius:5px 0 0 5px;
  }
  .foodesManager_inline_body .el-dialog__body{
    padding-top:0;
  }
  .foodesManager_inline_body .el-dialog__header{
    text-align:center;
    background-color:#ed6f00;
    padding-top:10px;
  }
  .foodesManager_inline_body .el-dialog__title{
    color:#fff;
  }
  .foodesManager_inline_body .el-dialog__headerbtn{
    top:12px;
  }
  .foodesManager_inline_body .el-dialog__headerbtn .el-dialog__close{
    color:#fff;
  }
  .foodesManager_options .el-input__inner{
    border:0;
    height:39px;
    line-height:39px;
    border-radius:0 5px 5px 0;
  }
  .foodesManager_options .el-select__caret{
    color:#000!important;
  }
  .foodesManager_storeNub{
    color:#000;
    box-sizing:border-box;
    padding:9px;
  }
  .foodesManager_addStore{
    background-color:#ed6f00;
    color:#fff;
    box-sizing:border-box;
    padding:7px 15px;
    cursor:pointer;
    margin-right:20px;
    border-radius:30px;
  }
  .foodesManager_search input{
    border:0;
    border-radius:30px;
  }
  .foodesManager_search .el-input__inner{
    height:33px;
  }
  .foodesManager_search .el-input__suffix{
    color:#FF9800;
  }
  .foodesManager_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .foodesManager_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .foodesManager_table thead tr th:nth-child(3){
    border-radius:0 5px 0 0;
  }
  .foodesManager_img li{
    width:100px!important;
    height:100px!important;
  }
  .foodesManager_img .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .foodesManager_img .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
</style>
