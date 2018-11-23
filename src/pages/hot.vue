<template>
  <div>
    <!--头部-->
    <div class="hot_head">
      <router-link :to="{path:'/manager/hotDetail',query:{isSumit:true,data:{}}}">
        <el-button size="small" style="color:#fff;background-color:#ed6f00;padding:10px 20px;font-size:14px;border-radius:30px;">+ 新增活动</el-button>
      </router-link>
      <el-input
        style="width:240px;"
        size="small"
        class="hot_search"
        placeholder="搜索品牌、商品名称"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchBanner">
      </el-input>
    </div>
    <div class="hot_choose">
      <div class="hot_choose_city" style="margin-top:0">
        <span style="padding-right:20px;color:#000000">展示城市: </span>
        <el-radio-group v-model="city" @change="chooseCity">
          <el-radio v-for="items in cities" :label="items.cityId" :key="items.cityId">{{items.cityName}}</el-radio>
        </el-radio-group>
      </div>
      <div class="hot_choose_city">
        <span style="padding-right:20px;color:#000000">时间: </span>
        <choseTime @getTime="getTime" :times="initTimes" style="display: flex;align-items:center"/>
      </div>
      <div class="hot_choose_city hot_radio">
        <span style="padding-right:20px;color:#000000">时段: </span>     
        <!--<el-checkbox :indeterminate="isIndeterminateTime" :checked="checkAllTime" v-model="checkAllTime" @change="handleCheckAllChangeTime" style="margin-right:10px">全选</el-checkbox>-->
        <el-checkbox-group v-model="timeAround" @change="chooseTime">
          <el-checkbox v-for="items in times" :label="items.timeId" :key="items.timeId">{{items.name}}</el-checkbox>
        </el-checkbox-group> 
      </div>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      :loading="tableLoading"
      class="hot_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="name"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="img"
        align="center"
        label="海报">
      </el-table-column>
      <el-table-column
        prop="url"
        align="center"
        label="文章链接">
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
        prop="detail"
        align="center"
        label="详情">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
  </div>
</template>

<script>
import choseTime from './../components/choseTime'
import pages from './../components/pages.vue'
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
        isIndeterminate: true,
        checkAll: false,
        search:'',
        city:0,
        cities:[],
        time:'',
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
        data:[{
          name:'aa',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'bb',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'cc',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'dd',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        }],
        pageSize:12,
        totalPages:0,
        currentPage:0,
        tableLoading:false,
        startDate:'',
        endDate:''
      }
    },
    methods:{   
      //搜索
      searchBanner(){
        this.$stamp(null,this.search)
      },
      //获取时间
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
          this.getHotList(this.city,this.startDate,this.endDate,initNub,this.currentPage,this.pageSize).then(res =>{
            this.$stamp(null,res)
            this.data = res.data.data.hots
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
          this.getHotList(this.city,this.startDate,this.endDate,initNub,this.currentPage,this.pageSize).then(res =>{
            this.$stamp(null,res)
            this.data = res.data.data.hots
            this.totalPages = res.data.data.total
            this.tableLoading = false
          })
        }
      }, 
      // 选城市 
      chooseCity(value) {
        this.$stamp(null,value)
        this.tableLoading = true
        let initNub = 0
        for(let i = 0;i<this.timeAround.length;i++){
          initNub += this.timeAround[i]
        }
        this.getHotList(value,this.startDate,this.endDate,initNub,this.currentPage,this.pageSize).then(res =>{
          this.$stamp(null,res)
          this.data = res.data.data.hots
          this.totalPages = res.data.data.total
          this.tableLoading = false
        })
      },
      //全选时段
      handleCheckAllChangeTime(val){
        this.$stamp(null,val)
        this.timeAround = val ? this.times : [];
        this.isIndeterminateTime = false;
      },
      //选时间
      chooseTimeAll(value){
        this.$stamp(null,value)
        let checkedCount = value.length;
        this.checkAllTime = checkedCount === this.times.length;
        this.isIndeterminateTime = checkedCount > 0 && checkedCount < this.times.length;
      },
      //选日期
      chooseDate(val){
        this.$stamp(null,val)
      },
      //选时段
      chooseTime(val){
        this.$stamp(null,val)
        this.tableLoading = true
        let initNub = 0
        for(let i = 0;i<val.length;i++){
          initNub += val[i]
        }
        this.getHotList(this.city,this.startDate,this.endDate,initNub,this.currentPage,this.pageSize).then(res =>{
          this.$stamp(null,res)
          this.data = res.data.data.hots
          this.totalPages = res.data.data.total
          this.tableLoading = false
        })
      },
      // 分页
      getCurrentPage(val){
        this.$stamp(null,`获取第${val}页`)      
        this.currentPage = val  
        this.tableLoading = true
        let initNub = 0
        for(let i = 0;i<val.length;i++){
          initNub += val[i]
        }
        this.getHotList(this.city,this.startDate,this.endDate,initNub,this.currentPage,this.pageSize).then(res =>{
          this.$stamp(null,res)
          this.data = res.data.data.hots
          this.totalPages = res.data.data.total
          this.tableLoading = false
        })
      },
      //获取人气网红列表
      getHotList(cityId,startDate,endDate,promotionTime,pageNum,pageSize){
        return new Promise((resolve,reject) =>{
          this.$api.hot.hotList({cityId,startDate,endDate,promotionTime,pageNum,pageSize}).then((res) =>{
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
      //人气网红搜索
      hotSearch(popularityName,pageNum,pageSize){
        return new Promise((resolve,reject) =>{
          this.$api.hot.hotSearch({popularityName,pageNum,pageSize}).then((res) =>{
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      choseTime,
      pages
    },
    created(){
      // this.$store.state.loading = true
      if(this.$store.state.cityList.length == 0){
        this.getCityList().then(res => {
          this.$stamp(null,res)
          this.$store.state.cityList = res.data.data
          this.cities = res.data.data
          this.city = res.data.data[0].cityId
          return res.data.data[0]
        }).then(res => {
          // let initNub = 0
          // for(let i = 0;i<this.timeAround.length;i++){
          //   initNub += this.timeAround[i]
          // }
          // this.getHotList(res.cityId,'','',initNub,1,this.pageSize).then(res =>{
          //   this.$stamp(null,res)
          //   this.data = res.data.data.hots
          //   this.totalPages = res.data.data.total
          //   this.$store.state.loading = false
          // })
        })
      }else{
        this.cities = this.$store.state.cityList
        this.city = this.$store.state.cityList[0].cityId
        // let initNub = 0
        // for(let i = 0;i<this.timeAround.length;i++){
        //   initNub += this.timeAround[i]
        // }
        // this.getHotList(this.city,'','',initNub,1,this.pageSize).then(res =>{
        //   this.$stamp(null,res)
        //   this.data = res.data.data.hots
        //   this.totalPages = res.data.data.total
        //   this.$store.state.loading = false
        // })
      }
    }
}
</script>

<style>
  .hot_head{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .hot_choose{
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
  .hot_choose_city{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-top:20px;
  }
  .hot_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .hot_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .hot_table thead tr th:nth-child(8){
    border-radius:0 5px 0 0;
  }
  .hot_search input{
    border:0;
    border-radius:30px;
  }
  .hot_choose_city .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .hot_choose_city .el-radio-group{
    display: flex;
    align-items: center;
  }
  .hot_choose_city .el-range-editor--small.el-input__inner{
    border:0;
  }
  .hot_choose_city .el-radio__inner{
    border-color:#000000;
  }
  .hot_choose_city .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .hot_choose_city .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .hot_radio .el-radio{
    color:#000000;
  }
  .hot_radio .el-radio__inner{
    border-color:#000000;
  }
  .hot_radio .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: #000000;
    background: #000000;
  }
  .hot_radio .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#000000;
  }
  .hot_radio .el-range-editor--small.el-input__inner{
    border:0;
  }
</style>
