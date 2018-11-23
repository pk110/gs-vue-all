<template>
  <div>
    <!--筛选-->
    <div class="pageList_head">
      <div style="box-sizing:border-box;padding:5px;border-radius:5px;display:flex;justify-content:flex-start;align-items:center;background-color:#fff;">
        <div class="pageList_head_body">
          <div class="pageList_head_title">状态:</div>
          <el-radio-group v-model="pageListAssign" @change="pageListAssignChange">
            <el-radio v-for="items in pageListAssigns" :label="items.id" :key="items.name">{{items.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="pageList_head_body">
        <el-input 
          style="width:240px;" 
          size="small"
          auto-complete="off" 
          placeholder="请输入名称" 
          class="pageList_search"
          prefix-icon="el-icon-search"
          v-model="search"
          @blur="searchPageList"></el-input>
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="data"
      class="pageList_table"
      style="width: 100%;">
      <el-table-column
        prop="name"
        align="center"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="storeName"
        align="center"
        label="店铺名">
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="time"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="内容">
        <template slot-scope="scope">
          <span style="color:#ed6f00">{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 2">处理中</span>
          <span v-else-if="scope.row.status == 3" style="color:#60c101">已通过</span>
          <span v-else-if="scope.row.status == 4" style="color:#ff3b21">未通过</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="activePrice"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 2">
            <el-button v-dbClick style="color:#fff;background-color:#60c101;padding:10px 18px;border-radius:30px;" @click="agree(scope.$index,scope.row)">通过</el-button>
            <el-button v-dbClick style="color:#fff;background-color:#ff3b21;padding:10px 18px;border-radius:30px;" @click="refuse(scope.$index,scope.row)">拒绝</el-button>
          </div>
          <div v-if="scope.row.status == 3">
            <el-button v-dbClick style="color:#fff;background-color:#000;padding:10px 18px;border-radius:30px;" @click="deleteNub(scope.$index,scope.row)">删除</el-button>
          </div>
          <div v-if="scope.row.status == 4">
            <el-button v-dbClick style="color:#fff;background-color:#60c101;padding:10px 18px;border-radius:30px;" @click="agree(scope.$index,scope.row)">通过</el-button>
            <el-button v-dbClick style="color:#fff;background-color:#000;padding:10px 18px;border-radius:30px;" @click="deleteNub(scope.$index,scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
  </div>
</template>

<script>
import pages from './../components/pages.vue'
export default {
    data () {
      return {
        totalPages:4,
        pageSize:10,
        currentPage:1,
        search:'',
        pageListAssign:[],
        pageListAssigns:[{
          name:'全部',
          id:1
        },{
          name:'处理中',
          id:2
        },{
          name:'已通过',
          id:3
        },{
          name:'未通过',
          id:4
        }],
        brands:[{
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
        data:[{
          name:'亮亮',
          storeName:'摇滚米粒一号店',
          title:'鱼香肉丝',
          time:'2018-2019',
          content:'asdad',
          status:2
        },{
          name:'亮亮',
          storeName:'摇滚米粒一号店',
          title:'鱼香肉丝',
          time:'2018-2019',
          content:'asdad',
          status:3
        },{
          name:'亮亮',
          storeName:'摇滚米粒一号店',
          title:'鱼香肉丝',
          time:'2018-2019',
          content:'asdad',
          status:4
        },{
          name:'亮亮',
          storeName:'摇滚米粒一号店',
          title:'鱼香肉丝',
          time:'2018-2019',
          content:'asdad',
          status:2
        }]
      }
    },
    methods:{
      //同意
      agree(index,data){

      },
      //删除
      deleteNub(index,data){
        
      },
      //拒绝
      refuse(index,data){
        
      },
      //单选
      pageListAssignChange(val){
        this.$stamp(null,val)
      },
      //获取当前页数
      getCurrentPage(val){
        this.$stamp(null,`获取的当前页数${val}`)
        this.currentPage = val
      },
      //搜索
      searchPageList(){
        this.$stamp(null,this.search)
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
  .pageList_head{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:0 0 15px 0;
  }
  .pageList_search input{
    border:0;
    border-radius:30px;
  }
  .pageList_head_body{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .pageList_head_body .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .pageList_head_body .el-radio-group{
    display: flex;
    align-items: center;
    padding-left: 15px;
  }
  .pageList_head_body .el-radio__input{
    line-height:0;
  }
  .pageList_head_body .el-range-editor--small.el-input__inner{
    border:0;
  }
  .pageList_head_body .el-radio__inner{
    border-color:#000000;
  }
  .pageList_head_body .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .pageList_head_body .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .pageList_head_title{
    margin-left:20px;
  } 
  .pageList_img{
    width:100px;
    height:50px;
  }
  .pageList_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .pageList_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .pageList_table thead tr th:nth-child(7){
    border-radius:0 5px 0 0;
  }
</style>
