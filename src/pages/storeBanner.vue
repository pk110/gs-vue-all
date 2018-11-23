<template>
  <div>
    <!--头部-->
    <div class="storeBanner_head">  
      <el-button size="small" style="color:#fff;background-color:#ed6f00;padding:10px 20px;font-size:14px;border-radius:30px;" @click="addBanner">+ 新增活动</el-button>
      <el-input
        style="width:240px;"
        size="small"
        class="storeBanner_search"
        placeholder="搜索品牌、商品名称"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchBanner">
      </el-input>
    </div>
    <div class="storeBanner_choose">
      <div class="storeBanner_choose_city" style="margin-top:0">
        <span style="padding-right:20px;color:#000000">展示城市: </span>
        <el-radio-group v-model="city" @change="chooseCity">
          <el-radio v-for="items in cities" :label="items" :key="items">{{items}}</el-radio>
        </el-radio-group>
      </div>
      <div class="storeBanner_choose_city">
        <span style="padding-right:20px;color:#000000">时间: </span>
        <el-radio v-model="time" style="margin-right:10px;">全部</el-radio>
        <el-date-picker
          size="small"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="chooseDate">
        </el-date-picker>
      </div>
      <div class="storeBanner_choose_city">
        <span style="padding-right:20px;color:#000000">时段: </span>
        <el-radio-group v-model="timeAround" @change="chooseTime">
          <el-radio v-for="time in times" :label="time" :key="time">{{time}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      class="storeBanner_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="name"
        align="center"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="img"
        align="center"
        label="海报">
      </el-table-column>
      <el-table-column
        prop="url"
        align="center"
        label="活动链接">
      </el-table-column>
      <el-table-column
        prop="city"
        align="center"
        label="展示城市">
      </el-table-column>
      <el-table-column
        prop="date"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="time"
        align="center"
        label="时段">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
      </el-table-column>
    </el-table>
    <!--弹窗-->
    <el-dialog title="发布Banner" :visible.sync="bannerBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="商品名称:" prop="activeName">
          <el-input v-model="form.activeName" style="width:250px;" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品海报:" prop="activeImg">
          <imgs :files="form.activeImg" class="banner_img" :limitImg="1" @imgFiles="getBannerImg" />  
        </el-form-item>
        <el-form-item label="商品链接:" prop="acticeUrl">
          <el-input v-model="form.acticeUrl" style="width:250px;" placeholder="请输入商品链接"></el-input>
        </el-form-item>
        <el-form-item label="展示城市:" prop="showCitys">
          <el-checkbox-group v-model="form.showCitys">
            <el-checkbox v-for="(items,index) in citys" :key="index" :label="items.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="时间:" prop="chooseTimeBox">
          <el-checkbox v-model="timeIs" style="margin-right:10px;">全部</el-checkbox>
          <el-date-picker
            v-model="form.chooseTimeBox"
            type="daterange"
            align="right"
            size="mini"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时段:" prop="showTimes">
          <el-radio-group v-model="form.showTimes">
            <el-radio v-for="(items,index) in times" :key="index" :label="items"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#259B24;color:#fff;padding:7px 20px;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#E51C23;color:#fff;padding:7px 20px;" @click="resetForm('ruleForm')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import imgs from './../components/img.vue'
export default {
    data () {
      return {
        time:false,
        timeIs:false,
        form:{
          activeName:'',
          acticeUrl:'',
          activeImg:[],
          showCitys:[],
          chooseTimeBox:'',
          showTimes:''
        },
        rules: {
          activeName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          activeImg: [
            { required: true, message: '请添加商品海报', trigger: 'blur' }
          ],
          acticeUrl:[
            { required: true, message: '请输入商品链接', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        citys:[{
          name:'武汉'
        },{
          name:'成都'
        },{
          name:'上海'
        }],
        pickerOptions:{
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        search:'',
        city:[],
        cities:['全部','上海', '北京', '广州', '深圳'],
        date:'',
        timeAround:'',
        times:['全部','全天','0:00-12:00','12:00-18:00','18:00-24:00'],
        data:[{
          name:'aa',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'bb',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'cc',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'dd',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          date:'2018-2019',
          time:'00:00-06:00'
        }],
        bannerBox:false
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
        this.timeIs = false
        this.$refs[ruleForm].resetFields();
      },
      //搜索
      searchBanner(){
        this.$stamp(null,this.search)
      },
      //选城市
      chooseCity(val){
        this.$stamp(null,val)
      },
      //选时间
      chooseTime(val){
        this.$stamp(null,val)
      },
      //选日期
      chooseDate(val){
        this.$stamp(null,val)
      },
      //选时段
      chooseTime(val){
        this.$stamp(null,val)
      },
      // 新增banner
      addBanner(){
        this.bannerBox = true
      },
      //获得海报图片
      getBannerImg(img){
        this.$stamp(null,img)
        this.form.activeImg = img
      }
    },
    computed: {
      
    },
    components: {
      imgs
    },
    created(){
      
    }
}
</script>

<style>
  .storeBanner_head{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .storeBanner_choose{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;   
    box-sizing: border-box;
    border-radius:5px;
    padding:15px;
    margin-top:20px;
    background-color:#ffffff;
  }
  .storeBanner_choose_city{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-top:20px;
  }
  .storeBanner_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .storeBanner_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .storeBanner_table thead tr th:nth-child(7){
    border-radius:0 5px 0 0;
  }
  .banner_img li,.banner_img .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .banner_img .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
  .storeBanner_search input{
    border:0;
    border-radius:30px;
  }
  .storeBanner_choose_city .el-radio-group{
    display: flex;
    align-items: center;
  }
  .storeBanner_choose_city .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .storeBanner_choose_city .el-radio__inner{
    border-color:#000000;
  }
  .storeBanner_choose_city .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .storeBanner_choose_city .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .storeBanner_choose_city .el-range-editor--small.el-input__inner{
    border:0;
  }
</style>
