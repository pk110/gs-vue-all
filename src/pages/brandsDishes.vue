<template>
  <div>
    <!--头部-->
    <div class="brandsDishes_head">
      <div style="display:flex;justify-content:flex-start;align-items:center;">
        <router-link to="/manager/brandsDishesDetail"><div class="brandsDishes_addDishes"><i class="el-icon-plus"></i>&nbsp;添加菜品</div></router-link>
        <div style="margin-right:20px;">菜品数量&nbsp;<span style="color:#ed6f00">{{totalPages}}</span></div>
        <div class="brandsDishes_chooseBrands">选择品牌</div>
        <el-select v-model="brands" class="brandsDishes_options" style="width:120px;" placeholder="请选择品牌" @change="chooseBrands">
          <el-option
            v-for="item in brandsList"
            :key="item.brandId"
            :label="item.brandName"
            :value="item.brandId">
          </el-option>
        </el-select>
      </div>
      <el-input
        style="width:240px;margin-left:20px;"
        size="medium"
        class="brandsDishes_search"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchDishes">
      </el-input>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      :loading="tableLoading"
      class="brandsDishes_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        :width="100"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="productName"
        align="center"
        label="菜品名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'brandsDishesDetail',params:{data:scope.row}}"><el-button style="background-color:#ed6f00;color:#fff;padding:7px 20px;border-radius:30px;">编辑</el-button></router-link>
          <el-button style="background-color:#ed6f00;color:#fff;padding:7px 20px;border-radius:30px;" v-dbClick @click="topDish(scope.$index,scope.row)">开售</el-button>
          <el-button style="background-color:#ed6f00;color:#fff;padding:7px 20px;border-radius:30px;" v-dbClick @click="bottomDish(scope.$index,scope.row)">停售</el-button>
          <el-button style="background-color:#000;color:#fff;padding:7px 20px;border-radius:30px;" v-dbClick @click="deleteDish(scope.$index,scope.row)">删除</el-button>
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
        data:[],
        totalPages:10,
        pageSize:12,
        currentPage:1,
        search:'',
        brands:'',
        brandsList:[],
        tableLoading:false
      }
    },
    methods:{
      //算出每条的数字
      indexMethod(index) {
        return index+1 + this.pageSize*(this.currentPage-1)
      },
      //删除菜品
      deleteDish(index,data){

      },
      //开售
      topDish(index,data){

      },
      //停售
      bottomDish(index,data){

      },
      //选择品牌
      chooseBrands(){
        this.$stamp(null,this.brands)
        this.tableLoading = true
        this.getBrandsDishesList(this.brands,this.currentPage,this.pageSize).then(result=>{
          this.$stamp(null,result)
          this.data = result.data.data.products
          this.totalPages = result.data.data.total
          this.tableLoading = false
        })
      },
      // 搜索菜品
      searchDishes(){
        this.$stamp(null,this.search)
      },
      //编辑按钮
      edit(val){
        this.$stamp(null,val)
      },
      //添加菜品
      addDishes(){
        this.dishesBox = true
      },
      //获取当前页数
      getCurrentPage(val){
        this.currentPage = val
        this.tableLoading = true
        this.getBrandsDishesList(this.brands,val,this.pageSize).then(result=>{
          this.$stamp(null,result)
          this.data = result.data.data.products
          this.totalPages = result.data.data.total
          this.tableLoading = false
        })
      },
      //获取品牌菜库列表
      getBrandsDishesList(brandId,pageNum,pageSize){
        return new Promise((resolve,reject) => {
          this.$api.brandsDishes.brandsDishesList({brandId,pageNum,pageSize}).then(res => {
            resolve(res)
          })
        })
      },
      //获取所有品牌列表
      getAllBrands(){
        return new Promise((resolve,reject) => {
          this.$api.common.getAllBrands().then(res => {
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      pages
    },
    created(){
      this.$store.state.loading = true
      if(this.$store.state.brandsList.length == 0){
        this.getAllBrands().then(res=>{
          this.$stamp(null,res)
          this.brandsList = res.data.data
          this.brands = res.data.data[0].brandId
          this.getBrandsDishesList(res.data.data[0].brandId,1,this.pageSize).then(result=>{
            this.$stamp(null,result)
            this.data = result.data.data.products
            this.totalPages = result.data.data.total
            this.$store.state.loading = false
          })
        })
      }else{
        this.brandsList = this.$store.state.brandsList
        this.brands = this.$store.state.brandsList[0].brandId
        this.getBrandsDishesList(this.$store.state.brandsList[0].brandId,1,this.pageSize).then(result=>{
          this.$stamp(null,result)
          this.data = result.data.data.products
          this.totalPages = result.data.data.total
          this.$store.state.loading = false
        })
      }
    }
}
</script>

<style>
  .brandsDishes_head{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .brandsDishes_chooseBrands{
    border-radius:5px 0 0 5px;
    background-color:#fff;
    color:#000;
    box-sizing:border-box;
    padding:9px;
  }
  .brandsDishes_options .el-input__inner{
    border:0;
    height:39px;
    line-height:39px;
    border-radius:0 5px 5px 0;
  }
  .brandsDishes_options .el-select__caret{
    color:#000!important;
  }
  .brandsDishes_addDishes{
    background-color:#ed6f00;
    color:#fff;
    box-sizing:border-box;
    padding:7px 14px;
    border-radius:30px;
    cursor:pointer;
    margin-right:20px;
  }
  .brandsDishes_search input{
    border:0;
    border-radius:30px;
  }
  .brandsDishes_search .el-input__inner{
    height:33px;
  }
  .brandsDishes_search .el-input__suffix{
    color:#FF9800;
  }
  .brandsDishes_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .brandsDishes_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .brandsDishes_table thead tr th:nth-child(4){
    border-radius:0 5px 0 0;
  }
</style>
