<template>
  <div>
    <!--头部-->
    <div class="bannerSet_head">  
      <el-button size="small" style="color:#fff;background-color:#ed6f00;padding:10px 20px;font-size:14px;border-radius:30px;" @click="addBanner">+ 新增活动</el-button>
      <el-input
        style="width:240px;"
        size="small"
        class="bannerSet_search"
        placeholder="搜索品牌、商品名称"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchBanner">
      </el-input>
    </div>
    <div class="bannerSet_choose">
      <div class="bannerSet_choose_city" style="margin-top:0">
        <span style="padding-right:20px;color:#000000">展示城市: </span>
        <el-radio-group v-model="city" @change="chooseCity">
          <el-radio v-for="items in cities" :label="items.cityId" :key="items.cityId">{{items.cityName}}</el-radio>
        </el-radio-group>
      </div>
      <div class="bannerSet_choose_city">
        <span style="padding-right:20px;color:#000000">时间: </span>
        <choseTime @getTime="getTime" :times="initTimes" style="display: flex;align-items:center" />
      </div>
      <div class="bannerSet_choose_city bannerSet_radio">
        <span style="padding-right:20px;color:#000000">时段: </span>
        <el-checkbox-group v-model="timeAround" @change="chooseTime">
          <el-checkbox v-for="items in times" :label="items.timeId" :key="items.timeId">{{items.name}}</el-checkbox>
        </el-checkbox-group> 
      </div>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      :loading="tableLoading"
      class="BannerSet_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="bannerName"
        align="center"
        label="名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="海报">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width:135px;height:50px;" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="活动链接">
        <template slot-scope="scope">
          <a :href="scope.row.promotionUrl">{{scope.row.promotionUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="cityName"
        align="center"
        label="展示城市">
      </el-table-column>
      <el-table-column
        prop="date"
        align="center"
        label="时间">
        <template slot-scope="scope">
          {{scope.row.startDate}}至{{scope.row.endDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        align="center"
        label="时段">
        <template slot-scope="scope">
          {{scope.row.createTime}}<br/>{{scope.row.modifyTime}}
        </template>
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
    <el-dialog title="发布Banner" :visible.sync="bannerBox" width="45%" center @close="resetForm('ruleForm')">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="活动名称:" prop="activeName">
          <el-input v-model="form.activeName" style="width:250px;" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动海报:" prop="activeImg">
          <imgs :files="form.activeImg" class="banner_img" :limitImg="1" @imgFiles="getBannerImg" />  
        </el-form-item>
        <el-form-item label="活动链接:" prop="acticeUrl">
          <el-input v-model="form.acticeUrl" style="width:250px;" placeholder="请输入活动链接"></el-input>
        </el-form-item>
        <el-form-item label="展示城市:" prop="showCitys" class="bannerSet_choose_city_bug">
          <el-radio-group v-model="form.showCitys">
            <el-radio v-for="(items,index) in cities" :key="items.cityId" :label="items.cityId">{{items.cityName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间:" prop="chooseTimeBox" class="bannerSet_choose_city_box">
          <choseTime ref="choseTime" @getTime="getTimeBox" :times="initTimes" style="display: flex;align-items:center"/>
        </el-form-item>
        <el-form-item label="时段:" prop="showTimes" class="bannerSet_choose_city_box bannerSet_radio">  
          <el-checkbox-group v-model="form.showTimes">
            <el-checkbox v-for="items in times" :label="items.timeId" :key="items.timeId">{{items.name}}</el-checkbox>
          </el-checkbox-group> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:rgb(229, 28, 35);color:#fff;padding:7px 20px;border-radius:30px;border:0" type="primary" v-dbClick @click="submit('ruleForm')">确定</el-button>
        <el-button style="background-color:#000;color:#fff;padding:7px 20px;border-radius:30px;border:0" @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import imgs from './../components/img.vue'
import pages from './../components/pages.vue'
import choseTime from './../components/choseTime'
import {getyyyyMMdd,splitArray,parserDate,checkedForm} from './../utils/utils'
export default {
    data () {
      return {
        initTimes:[{
          name:'全部',
          value:0
        },{
          name:'指定日期',
          value:1
        }],
        time:false,
        timeIs:true,
        oldForm:{},
        form:{
          activeName:'',
          acticeUrl:'',
          activeImg:[],
          showCitys:'',
          chooseTimeBox:0,
          showTimes:[]
        },
        rules: {
          activeName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          activeImg: [
            { required: true, message: '请添加活动海报', trigger: 'blur' }
          ],
          acticeUrl:[
            { required: true, message: '请输入活动链接', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
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
        city:'',
        cities:[],
        date:'',
        isIndeterminateTime: true,
        checkAllTime: false,
        timeAround:[1,2,4,8],
        times:[{
          name:'0:00-06:00',
          timeId:1
        },{
          name:'06:00-12:00',
          timeId:2
        },{
          name:'12:00-18:00',
          timeId:4
        },{
          name:'18:00-24:00',
          timeId:8
        }],
        data:[],
        bannerBox:false,
        pageSize:12,
        totalPages:0,
        tableLoading:false,
        currentPage:1,
        startDate:'',
        endDate:'',
        isSubmit:true,
        bannerId:''
      }
    },
    methods:{
      //界面获取有效期
      getTime(val){
        this.$stamp(null,val)
        if(val == 0 && val !== ''){
          this.startDate = ''
          this.endDate = ''
          this.tableLoading = true
          let initNub = 0
          for(let i = 0;i<this.timeAround.length;i++){
            initNub += this.timeAround[i]
          }
          this.getBannerList(this.city,this.currentPage,this.pageSize,this.startDate,this.endDate,initNub).then(res=>{
            this.$stamp(null,res)
            this.data = res.data.data.banners
            this.totalPages = res.data.data.total
            this.tableLoading = false
          })
        }else if(val.length == 2){
          this.startDate = getyyyyMMdd(val[0])
          this.endDate = getyyyyMMdd(val[1])
          this.tableLoading = true
          let initNub = 0
          for(let i = 0;i<this.timeAround.length;i++){
            initNub += this.timeAround[i]
          }
          this.getBannerList(this.city,this.currentPage,this.pageSize,this.startDate,this.endDate,initNub).then(res=>{
            this.$stamp(null,res)
            this.data = res.data.data.banners
            this.totalPages = res.data.data.total
            this.tableLoading = false
          })
        }
      },
      //弹窗表单获取有效期
      getTimeBox(val){
        this.$stamp(null,val)
        this.form.chooseTimeBox = val
      },
      //提交表单
      submit(formName) {
        this.$stamp(null,this.form)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isSubmit == true){
              let startDate = ''
              let endDate = ''
              let initNub = 0
              if(this.form.showTimes.length !== 0){
                for(let i = 0;i<this.form.showTimes.length;i++){
                  initNub += this.form.showTimes[i]
                }
              }
              if(this.form.chooseTimeBox == 0){
                startDate = ''
                endDate = ''
              }else{
                startDate = getyyyyMMdd(this.form.chooseTimeBox[0])
                endDate = getyyyyMMdd(this.form.chooseTimeBox[1])
              }
              let formData = new FormData();
              formData.append('bannerName',this.form.activeName)
              formData.append('images',this.form.activeImg[0].raw)
              formData.append('promotionUrl',this.form.acticeUrl)
              formData.append('startDate',startDate)
              formData.append('endDate',endDate)
              formData.append('promotionTime',initNub)
              formData.append('cityId',this.form.showCitys)
              this.addBannerForm(formData).then(res =>{
                this.$stamp(null,res)
                this.resetForm()
                this.$message.success('创建成功!')
              })
            }else{
              checkedForm(this.form,this.oldForm,'').then(res=>{
                this.$stamp(null,res)
                let startDate = ''
                let endDate = ''
                let initNub = 0
                if(res.showTimes.length !== 0){
                  for(let i = 0;i<res.showTimes.length;i++){
                    initNub += res.showTimes[i]
                  }
                }
                if(res.chooseTimeBox == 0){
                  startDate = ''
                  endDate = ''
                }else{
                  startDate = getyyyyMMdd(res.chooseTimeBox[0])
                  endDate = getyyyyMMdd(res.chooseTimeBox[1])
                }
                let formData = new FormData();
                formData.append('bannerId',this.bannerId)
                formData.append('bannerName',res.activeName)
                formData.append('images',res.activeImg == ''?'':res.activeImg[0].raw)
                formData.append('promotionUrl',res.acticeUrl)
                formData.append('startDate',startDate)
                formData.append('endDate',endDate)
                formData.append('promotionTime',initNub)
                formData.append('cityId',res.showCitys)
                this.reviseBanner(formData).then(res =>{
                  this.$stamp(null,res)
                  this.resetForm()
                  this.$message.success('修改成功!')
                })
              })
            }
          } else {
            this.$message.error('error submit!!');
            return false;
          }
        });
      },
      //取消表单
      resetForm(ruleForm){
        this.form.activeName = ''
        this.form.acticeUrl = ''
        this.form.activeImg = []
        this.form.showCitys = ''
        this.form.chooseTimeBox = 0 
        this.form.showTimes = []
        this.$nextTick(()=>{
          this.$refs.choseTime.showDate('')
        })
        this.bannerBox = false
      },
      //搜索
      searchBanner(){
        this.$stamp(null,this.search)
        if(this.search !== ''){

        }
      },
      //选城市
      chooseCity(val){
        this.$stamp(null,val)
        this.tableLoading = true
        let initNub = 0
        for(let i = 0;i<this.timeAround.length;i++){
          initNub += this.timeAround[i]
        }
        this.getBannerList(val,this.currentPage,this.pageSize,this.startDate,this.endDate,initNub).then(res=>{
          this.$stamp(null,res)
          this.data = res.data.data.banners
          this.totalPages = res.data.data.total
          this.tableLoading = false
        })
      },
      //全选时段
      handleCheckAllChangeTime(val){
        this.$stamp(null,val)
        let times = []
        for(let i =0;i<this.times.length;i++){
          times.push(this.times[i].timeId)
        }
        this.timeAround = val ? times : [];
        this.isIndeterminateTime = false;
      },
      //选时段
      chooseTime(value){
        this.$stamp(null,value)
        this.tableLoading = true
        let initNub = 0
        for(let i = 0;i<value.length;i++){
          initNub += value[i]
        }
        this.getBannerList(this.city,this.currentPage,this.pageSize,this.startDate,this.endDate,initNub).then(res=>{
          this.$stamp(null,res)
          this.data = res.data.data.banners
          this.totalPages = res.data.data.total
          this.tableLoading = false
        })
      },
      // 新增banner
      addBanner(){
        this.isSubmit = true
        this.bannerBox = true
      },
      //获得海报图片
      getBannerImg(img){
        this.$stamp(null,img)
        this.form.activeImg = img
      },
      //编辑
      edit(val,data){
        this.$stamp(null,data)
        this.bannerId = data.bannerId
        this.form.activeName = data.bannerName
        this.form.acticeUrl = data.promotionUrl
        this.form.activeImg = [{
          url:data.image
        }]
        this.form.showCitys = data.cityId
        if(data.endDate !== ''){
          this.form.chooseTimeBox = [parserDate(data.startDate),parserDate(data.endDate)]
          this.$nextTick(()=>{
            this.$refs.choseTime.showDate([parserDate(data.startDate),parserDate(data.endDate)])
          })
        }else{
          this.form.chooseTimeBox = 0
          this.$nextTick(()=>{
            this.$refs.choseTime.showDate('')
          })
        }
        this.form.showTimes = splitArray(data.promotionTime)
        this.oldForm = Object.assign({}, this.form)
        this.isSubmit = false
        this.bannerBox = true
      },
      //页数选择
      getCurrentPage(val){
        this.$stamp(null,`获取的当前页数${val}`)
        this.currentPage = val
        this.tableLoading = true
        let initNub = 0
        for(let i = 0;i<this.timeAround.length;i++){
          initNub += this.timeAround[i]
        }
        this.getBannerList(this.city,val,this.pageSize,this.startDate,this.endDate,initNub).then(res=>{
          this.$stamp(null,res)
          this.data = res.data.data.banners
          this.totalPages = res.data.data.total
          this.tableLoading = false
        })
      },
      //获取bannerSet列表
      getBannerList(cityId,pageNum,pageSize,startDate,endDate,promotionTime){
        return new Promise((resolve,reject) =>{
          this.$api.bannerSet.bannerList({cityId,pageNum,pageSize,startDate,endDate,promotionTime}).then((res) =>{
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
      },
      //修改品牌表单
      reviseBanner(formData){
        return new Promise((resolve,reject) =>{
          this.$api.bannerSet.reviseBanner(formData).then((res) =>{
            resolve(res)
          })
        })
      },
      //新建品牌信息 
      addBannerForm(formData){
        return new Promise((resolve,reject) =>{
          this.$api.bannerSet.addBanner(formData).then((res) =>{
            resolve(res)
          })
        })
      },
      // 搜索banner设置
      bannerSearch(bannerName,pageNum,pageSize){
        return new Promise((resolve,reject) =>{
          this.$api.bannerSet.bannerSearch().then((res) =>{
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      imgs,
      pages,
      choseTime
    },
    created(){
      this.$store.state.loading = true
      if(this.$store.state.cityList.length == 0){
        this.getCityList().then(res=>{
          this.$stamp(null,res)
          this.$store.state.cityList = res.data.data
          this.city = res.data.data[0].cityId
          this.cities = res.data.data
          return this.city
        }).then(res=>{
          this.$stamp(null,res)
          this.getBannerList(res,1,this.pageSize,'','',15).then(res=>{
            this.data = res.data.data.banners
            this.totalPages = res.data.data.total
            this.$store.state.loading = false
          })
        })
      }else{
        this.cities = this.$store.state.cityList
        this.city = this.$store.state.cityList[0].cityId
        this.getBannerList(this.city,1,this.pageSize,'','',15).then(res=>{
          this.$stamp(null,res)
          this.data = res.data.data.banners
          this.totalPages = res.data.data.total
          this.$store.state.loading = false
        })
      }
    }
}
</script>

<style>
  .bannerSet_head{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .bannerSet_choose{
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
  .bannerSet_choose_city{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-top:20px;
  }
  .BannerSet_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .BannerSet_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .BannerSet_table thead tr th:nth-child(7){
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
  .bannerSet_search input{
    border:0;
    border-radius:30px;
  }
  .bannerSet_choose_city .el-radio-group{
    display: flex;
    align-items: center;
  }
  .bannerSet_choose_city .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .bannerSet_choose_city .el-radio__inner{
    border-color:#000000;
  }
  .bannerSet_choose_city .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .bannerSet_choose_city .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .bannerSet_choose_city .el-range-editor--small.el-input__inner{
    border:0;
  }
  .bannerSet_choose_city_bug .el-form-item__content{
    margin-top:14px;
  }
  .bannerSet_choose_city_box .el-radio-group{
    display: flex;
    align-items: center;
  }
  .bannerSet_choose_city_box .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .bannerSet_choose_city_box .el-radio__inner{
    border-color:#000000;
  }
  .bannerSet_choose_city_box .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .bannerSet_choose_city_box .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .bannerSet_choose_city_box .el-range-editor--small.el-input__inner{
    border:0;
  }
  .bannerSet_radio .el-radio{
    color:#000000;
  }
  .bannerSet_radio .el-radio__inner{
    border-color:#000000;
  }
  .bannerSet_radio .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: #000000;
    background: #000000;
  }
  .bannerSet_radio .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#000000;
  }
  .bannerSet_radio .el-range-editor--small.el-input__inner{
    border:0;
  }
</style>
