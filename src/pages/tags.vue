<template>
  <div>
    <!--头部-->
    <div class="tags_head">
      <el-button size="small" style="color:#fff;background-color:#ed6f00;padding:9px 15px;border-radius:30px;" @click="addTags"><i class="el-icon-plus"></i>&nbsp;添加标签</el-button>
      <el-input
        style="width:240px;"
        size="small"
        placeholder="搜索"
        class="tags_search"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchTags">
      </el-input>
    </div>
    <!--身体部分-->
    <el-table
      :data="data"
      style="width: 100%;margin-top:20px;"
      class="tags_table">
      <el-table-column
        label="图标"
        align="center"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.tagsImg" class="tags_imgs"/>
          <el-upload
            action=''
            :auto-upload="false"
            class="upload_listImg"
            :limit="1"
            :show-file-list="false"
            :on-change="getListTagsImg"
            :file-list="fileList"
            v-if="scope.row.edit == true">
            <i class="el-icon-close" @click="uploadImg(scope.$index)"></i>
          </el-upload>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" size="mini" placeholder="请输入标签名称" minlength="1" maxlength="10" v-focus v-if="scope.row.edit == true"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="包含商品">
        <template slot-scope="scope">
          {{scope.row.products}}个
        </template>
      </el-table-column>
      <el-table-column
        prop="lastUpdata"
        align="center"
        label="最后更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <div class="tags_edit" v-if="scope.row.edit == false" @click="edit(scope.$index,scope.row)">编辑</div>
          <div class="tags_check" v-else @click="check(scope.$index,scope.row)">确认</div>
          <div class="tags_chose" v-if="scope.row.edit == false" @click="close(scope.$index,scope.row)">删除</div>
          <div class="tags_cancel" v-else @click="cancel(scope.$index,scope.row)">取消</div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
    <!--弹窗-->
    <el-dialog title="发布标签" :visible.sync="tagsBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="新增品类:" prop="tagsName">
          <el-input v-model="form.tagsName" style="width:250px;" placeholder="请输入品类名称"></el-input>
          <p style="color:#E51C23">* 品类修改会对商家造成一定影响，新增、删除、修改之前需经过部门领导审批同意</p>
        </el-form-item>
        <el-form-item label="图标:" prop="tagsImg">
          <imgs :files="form.tagsImg" class="tags_img" :limitImg="1" @imgFiles="getTagsImg" />  
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;color:#fff;border:0;padding:7px 20px;border-radius:30px;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#000;color:#fff;padding:7px 20px;border-radius:30px;" @click="resetForm('ruleForm')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import imgs from './../components/img.vue'
import pages from './../components/pages.vue'
export default {
    data () {
      return {
        totalPages:4,
        pageSize:10,
        currentPage:1,
        data:[{
          tagsImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          name:'优质品牌1',
          products:'102',
          lastUpdata:'2016-08-09 13:18',
          edit:false
        },{
          tagsImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          name:'优质品牌2',
          products:'102',
          lastUpdata:'2016-08-09 13:18',
          edit:false
        },{
          tagsImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          name:'优质品牌3',
          products:'102',
          lastUpdata:'2016-08-09 13:18',
          edit:false
        },{
          tagsImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          name:'优质品牌4',
          products:'102',
          lastUpdata:'2016-08-09 13:18',
          edit:false
        }],
        search:'',
        form:{
          tagsName:'',
          tagsImg:[]
        },
        rules: {
          tagsName: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          tagsImg: [
            { required: true, message: '请添加图标', trigger: 'blur' }
          ]
        },
        tagsBox:false,
        fileList:[],
        currentImgIndex:0,
        currentData:{}
      }
    },
    methods:{
      //提交表单
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
          } else {
            this.$message.error('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(ruleForm){
        this.$refs[ruleForm].resetFields();
      },
      //编辑按钮
      edit(index,data){
        // 只准编辑其中一个
        for(let i = 0;i<this.data.length;i++){
          if(i == index){
            this.currentData = data
            this.$set(this.data,index,{
              tagsImg:data.tagsImg,
              name:data.name,
              products:data.products,
              lastUpdata:data.lastUpdata,
              edit:true
            })
          }else{
            this.$set(this.data,i,{
              tagsImg:this.data[i].tagsImg,
              name:this.data[i].name,
              products:this.data[i].products,
              lastUpdata:this.data[i].lastUpdata,
              edit:false
            })
          }
        }
      },
      //开启选图片的索引
      uploadImg(val){
        this.$stamp(null,val)
        this.currentImgIndex = val
      },
      //上传图片
      getListTagsImg(val){
        this.fileList.push(val)
        this.$stamp(null,this.fileList)
        this.$stamp(null,this.currentImgIndex)
        this.$set(this.data,this.currentImgIndex,{
          tagsImg:this.fileList[0].url,
          name:this.data[this.currentImgIndex].name,
          products:this.data[this.currentImgIndex].products,
          lastUpdata:this.data[this.currentImgIndex].lastUpdata,
          edit:this.data[this.currentImgIndex].edit
        })
        this.fileList = []
      },
      //勾选按钮
      check(index,data){
        if(data.name == ''){
          this.$message.error('标签名称不能为空')
          return false
        }else{
          this.$set(this.data,index,{
            tagsImg:data.tagsImg,
            name:data.name,
            products:data.products,
            lastUpdata:data.lastUpdata,
            edit:false
          })
        }
      },
      //取消按钮
      cancel(index,date){
        this.$set(this.data,index,{
          tagsImg:this.currentData.tagsImg,
          name:this.currentData.name,
          products:this.currentData.products,
          lastUpdata:this.currentData.lastUpdata,
          edit:false
        })
      },
      //删除按钮
      close(index,data){
        this.$delete(this.data,index)
        //计算页数
        this.totalPages--
      },
      //搜索
      searchTags(){
        this.$stamp(null,this.search)
      },
      //添加标签
      addTags(){
        this.tagsBox = true
      },
      //获取当前页数
      getCurrentPage(val){
        this.$stamp(null,`获取的当前页数${val}`)
        this.currentPage = val
      },
      //获得图标图片
      getTagsImg(img){
        this.$stamp(null,img)
        this.form.tagsImg = img
      }
    },
    computed: {
      
    },
    components: {
      imgs,
      pages
    },
    created(){

    }
}
</script>

<style>
  .tags_head{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .tags_img li,.tags_img .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .tags_img .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
  .tags_imgs{
    width:30px;
    height:30px;
    border-radius:100%;
    margin-top: 8px;
  }
  .tags_edit{
    display:inline-block;
    border-radius:30px;
    color:#fff;
    box-sizing:border-box;
    padding:5px 17px;
    background-color:#ed6f00;
    cursor:pointer;
  }
  .tags_check{
    display:inline-block;
    border-radius:30px;
    color:#ed6f00;
    box-sizing:border-box;
    padding:5px 17px;
    border:1px solid #ed6f00;
    cursor:pointer;
  }
  .tags_cancel{
    display:inline-block;
    border-radius:30px;
    color:#fff;
    box-sizing:border-box;
    padding:5px 17px;
    background-color:#000;
    cursor:pointer;
  }
  .tags_chose{
    display:inline-block;
    border-radius:30px;
    color:#fff;
    box-sizing:border-box;
    padding:5px 17px;
    background-color:#000;
    cursor:pointer;
  }
  .tags_closeImg:before{
    content:'×';
    width:10px;
    height:10px;
    color:red;    
    position: relative;
    left: 40px;
    top: -6px;
    cursor: pointer;
  }
  .upload_listImg{
    display:inline-block;
  }
  .upload_listImg i{
    color:#fff;
    background-color:#000;
    border-radius:100%;
    cursor:pointer;
  }
  .tags_table i{
    font-size: 18px;
  }
  .tags_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .tags_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .tags_table thead tr th:nth-child(5){
    border-radius:0 5px 0 0;
  }
  .tags_search input{
    border:0;
    border-radius:30px;
  }
  .tags_search .el-input__inner{
    height:33px;
  }
  .tags_search .el-input__suffix{
    color:#FF9800;
  }
</style>
