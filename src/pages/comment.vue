<template>
  <div>
    <!--筛选-->
    <div class="comment_head">
      <div style="box-sizing:border-box;padding:5px;border-radius:5px;display:flex;justify-content:flex-start;align-items:center;background-color:#fff;">
        <div class="comment_head_body">
          <div class="comment_head_title">评分:</div>
          <el-radio-group v-model="commentAssign" @change="commentAssignChange">
            <el-radio v-for="items in commentAssigns" :label="items.id" :key="items.name">{{items.name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="comment_head_body">
          <div class="comment_head_title">品类:</div>
          <el-select class="comment_options" v-model="type" placeholder="请选择品类">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="comment_head_body">
        <el-input 
          style="width:240px;" 
          size="small"
          auto-complete="off" 
          placeholder="请输入名称" 
          class="comment_search"
          prefix-icon="el-icon-search"
          v-model="search"
          @blur="searchComment"></el-input>
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="data"
      class="comment_table"
      style="width: 100%;">
      <el-table-column
        prop="name"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="电话">
      </el-table-column>
      <el-table-column
        align="center"
        label="图片">
        <template slot-scope="scope">
          <img class="comment_img" :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="store"
        align="center"
        label="所属店铺">
      </el-table-column>
      <el-table-column
        prop="price"
        align="center"
        label="原价">
        <template slot-scope="scope">
          ￥{{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column
        prop="activePrice"
        align="center"
        label="活动价">
        <template slot-scope="scope">
          ￥{{scope.row.activePrice}}
        </template>
      </el-table-column>
      <el-table-column
        prop="rank"
        align="center"
        label="评分等级">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.rank"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
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
        type:'',
        commentAssign:[],
        commentAssigns:[{
          name:'大',
          id:1
        },{
          name:'中',
          id:2
        },{
          name:'小',
          id:3
        }],
        types:[{
          value: '1',
          label: '当日打烊前'
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
          phone:'132012313',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          title:'鱼香肉丝',
          store:'摇滚米粒一号店',
          price:10,
          activePrice:8,
          rank:3.7
        },{
          name:'亮亮',
          phone:'132012313',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          title:'鱼香肉丝',
          store:'摇滚米粒一号店',
          price:10,
          activePrice:8,
          rank:3.7
        },{
          name:'亮亮',
          phone:'132012313',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          title:'鱼香肉丝',
          store:'摇滚米粒一号店',
          price:10,
          activePrice:8,
          rank:3.7
        },{
          name:'亮亮',
          phone:'132012313',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          title:'鱼香肉丝',
          store:'摇滚米粒一号店',
          price:10,
          activePrice:8,
          rank:3.7
        }]
      }
    },
    methods:{
      //多选
      commentAssignChange(val){
        this.$stamp(null,val)
      },
      //获取当前页数
      getCurrentPage(val){
        this.$stamp(null,`获取的当前页数${val}`)
        this.currentPage = val
      },
      //搜索
      searchComment(){
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
  .comment_options .el-input__inner{
    border:0;
    height:24px;
    line-height:24px;
    border-radius:0 5px 5px 0;
  }
  .comment_options .el-select__caret{
    color:#000!important;
    line-height:24px;
  }
  .comment_head{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:0 0 15px 0;
  }
  .comment_search input{
    border:0;
    border-radius:30px;
  }
  .comment_head_body{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .comment_head_body .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .comment_head_body .el-radio-group{
    display: flex;
    align-items: center;
    padding-left: 15px;
  }
  .comment_head_body .el-radio__input{
    line-height:0;
  }
  .comment_head_body .el-range-editor--small.el-input__inner{
    border:0;
  }
  .comment_head_body .el-radio__inner{
    border-color:#000000;
  }
  .comment_head_body .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .comment_head_body .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .comment_head_title{
    margin-left:20px;
  } 
  .comment_img{
    width:100px;
    height:50px;
  }
  .comment_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .comment_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .comment_table thead tr th:nth-child(8){
    border-radius:0 5px 0 0;
  }
</style>
