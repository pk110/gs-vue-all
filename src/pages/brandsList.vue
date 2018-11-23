<template>
  <div>
    <div class="brandsList_head">
      <div class="brandsList_head_left">
        <el-button style="color:#fff;background-color:#ed6f00;padding:10px 18px;border-radius:30px;" @click="addBrands">
        <i class="el-icon-plus"></i>
        添加品牌</el-button>
        <div class="brandsNub">已添加品牌&nbsp;<span style="color:#ed6f00">{{totalPages}}</span>&nbsp;个</div>
      </div>
      <el-input
        style="width:240px;"
        size="small"
        class="brandsList_search"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchBands">
      </el-input>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      :loading="tableLoading"
      class="brandsList_table"
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
        label="品牌名">
      </el-table-column>
      <el-table-column
        align="center"
        label="Logo">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width:35px;" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="头图">
        <template slot-scope="scope">
          <img :src="scope.row.banner" style="width:100px;height:35px;" />
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        align="center"
        label="文字描述">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button style="background-color:#ed6f00;border-radius:30px;color:#fff;padding:7px 20px;" @click="edit(scope.$index,scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
    <!--弹窗-->
    <el-dialog title="品牌编辑" :visible.sync="brandBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="brandsList_Box">
        <el-form-item label="输入品牌" prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logo">
          <imgs :files="form.logo" class="brandsList_logo" :limitImg="1" @imgFiles="getLogoImg" />
        </el-form-item>
        <el-form-item label="品牌头图" prop="headImg">
          <imgs :files="form.headImg" class="brandsList_head" :limitImg="1" @imgFiles="getHeadImg" />
        </el-form-item>
        <el-form-item label="品牌文字描述" prop="brandsDetail">
          <el-input
            v-model="form.brandsDetail"
            type="textarea"
            placeholder="请输入品牌文字描述">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#000000;color:#fff;padding:7px 20px;border-radius:30px;" @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pages from './../components/pages.vue'
import imgs from './../components/img.vue'
import {checkedForm} from './../utils/utils'

export default {
    data () {
      return {
        totalPages:0,
        pageSize:10,
        currentPage:1,
        brandId:'',
        index:0,
        oldForm:{},
        form:{
          name:'',
          logo:[],
          headImg:[],
          brandsDetail:''
        },
        rules: {
          name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '请添加品牌logo图片', trigger: 'blur' }
          ],
          headImg:[
            { required: true, message: '请添加品牌头图图片', trigger: 'blur' }
          ],
          brandsDetail:[
            { required: true, message: '请输入品牌文字描述', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        brandBox:false,
        data:[],
        search:'',
        tableLoading:false,
        isSubmit:true  //区分是修改还是提交
      }
    },
    methods:{
      //算出每条的数字
      indexMethod(index) {
        return index+1 + this.pageSize*(this.currentPage-1)
      },
      //搜索
      searchBands(){
        this.$stamp(null,this.search)
      },
      //获取当前页数
      getCurrentPage(val){
        this.$stamp(null,`获取的当前页数${val}`)
        this.currentPage = val
        this.tableLoading = true
        this.getBrandsList(val,this.pageSize).then( result => {
          this.$stamp(null,result)
          this.data = result.data.data.brands
          this.totalPages = result.data.data.total
          this.tableLoading = false
        })
      },
      //获得品牌logo图片
      getLogoImg(img){
        this.$stamp(null,img)
        this.form.logo = img
      },
      //获得品牌头图图片
      getHeadImg(img){
        this.$stamp(null,img)
        this.form.headImg = img
      },
      //添加品牌
      addBrands(){
        this.form.name = ''
        this.form.logo = []
        this.form.headImg = []
        this.form.brandsDetail = ''
        this.isSubmit = true
        this.brandBox = true
      },
      // 编辑按钮
      edit(index,val){
        this.$stamp(null,val)
        this.addBrands()
        this.form.name = val.brandName
        this.form.logo.push({
          url:val.image
        })
        this.form.headImg.push({
          url:val.banner
        })
        this.form.brandsDetail = val.intro
        this.index = index
        this.brandId = val.brandId
        this.oldForm = Object.assign({}, this.form)
        this.isSubmit = false
      },
      //提交表单
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form)
            if(this.isSubmit == true){
              let formData = new FormData();
              formData.append('brandName',this.form.name)
              formData.append('images',this.form.logo[0].raw)
              formData.append('banner',this.form.headImg[0].raw)
              formData.append('intro',this.form.brandsDetail)
              this.addNewBrands(formData).then(res=>{
                this.$message.success('创建成功!')
                this.brandBox = false
                this.$set(this.data,0,{
                  brandName:this.form.name,
                  image:this.form.logo[0].url,
                  banner:this.form.headImg[0].url,
                  intro:this.form.brandsDetail
                })
              })
            }else{
              checkedForm(this.form,this.oldForm,'').then(res=>{
                this.$stamp(null,res)
                let formData = new FormData();
                formData.append('brandId',this.brandId)
                formData.append('brandName',res.name)
                formData.append('images',res.logo == ''?'':res.logo[0].raw)
                formData.append('banner',res.headImg == ''?'':res.headImg[0].raw)
                formData.append('intro',res.brandsDetail)
                this.reviseBrands(formData).then(res=>{
                  this.$message.success('修改成功!')
                  this.brandBox = false
                  this.$set(this.data,this.index,{
                    brandName:this.form.name,
                    image:this.form.logo[0].url,
                    banner:this.form.headImg[0].url,
                    intro:this.form.brandsDetail
                  })
                })
              })
            }
          } else {
            this.$message.error('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(ruleForm){
        this.$refs[ruleForm].resetFields();
        this.brandBox = false
      },
      //获取品牌列表
      getBrandsList(pageNum,pageSize){
        return new Promise((resolve,reject) => {
          this.$api.brandsList.getBrandsList({pageNum,pageSize}).then(res => {
            resolve(res)
          })
        })
      },
      //添加品牌
      addNewBrands(formData){
        return new Promise((resolve,reject) => {
          this.$api.brandsList.addBrands(formData).then(res => {
            resolve(res)
          })
        })
      },
      //修改品牌
      reviseBrands(formData){
        return new Promise((resolve,reject) => {
          this.$api.brandsList.resiveBrands(formData).then(res => {
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      pages,
      imgs
    },
    created(){
      this.$store.state.loading = true
      this.getBrandsList(1,this.pageSize).then( result => {
        this.$stamp(null,result)
        this.data = result.data.data.brands
        this.totalPages = result.data.data.total
        this.$store.state.loading = false
      })
    }
}
</script>

<style>
  .brandsList_head{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .brandsList_head_left{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .brandsList_search input{
    border:0;
    border-radius:30px;
  }
  .brandsNub{
    margin:0 20px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
  }
  .brandsList_search .el-input__inner{
    height:32px;
  }
  .brandsList_search .el-input__suffix{
    color:#FF9800;
  }
  .brandsList_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .brandsList_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .brandsList_table thead tr th:nth-child(6){
    border-radius:0 5px 0 0;
  }
  .brandsList_Box .el-input__inner{
    width:30%;
  }
  .brandsList_Box .el-textarea__inner{
    width:50%;
  }
  .brandsList_logo li,.brandsList_logo .el-upload-list,.brandsList_head .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .brandsList_logo .el-upload--picture-card,.brandsList_head .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
  .brandsList_head li{
    width:300px!important;
    height:100px!important;
  }
</style>
