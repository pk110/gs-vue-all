<template>
  <div>
    <!--筛选-->
    <div class="storeFace_head">
      <el-button style="color:#fff;background-color:#ed6f00;padding:10px 18px;border-radius:30px;" @click="agree(scope.$index,scope.row)">
      <i class="el-icon-plus"></i>
      新增活动</el-button>
      <el-button style="border:1px solid #ed6f00;color:#ed6f00;background-color:#fff;padding:10px 45px;border-radius:30px;" @click="agree(scope.$index,scope.row)">预览</el-button>
      <el-button v-dbClick style="color:#fff;background-color:#ff3b21;padding:10px 45px;border-radius:30px;" @click="agree(scope.$index,scope.row)">发布</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="data"
      class="storeFace_table"
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
          <img class="storeFace_img" :src="scope.row.img" />
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
  .storeFace_options .el-input__inner{
    border:0;
    height:24px;
    line-height:24px;
    border-radius:0 5px 5px 0;
  }
  .storeFace_options .el-select__caret{
    color:#000!important;
    line-height:24px;
  }
  .storeFace_head{
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    box-sizing:border-box;
    padding:0 0 15px 0;
  }
  .storeFace_img{
    width:100px;
    height:50px;
  }
  .storeFace_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .storeFace_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .storeFace_table thead tr th:nth-child(8){
    border-radius:0 5px 0 0;
  }
</style>
