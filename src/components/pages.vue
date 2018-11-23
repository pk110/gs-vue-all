<template>
  <div>
    <el-pagination
      :class="pages"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalPages">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props: {
      pageSize: {
        type: Number  //每页的条数
      },
      totalPages: {
        type: Number  //总页数
      },
      pages:{
        type:String, //样式
        default:'pages'
      }
    },
    data () {
      return {
        currentPage:1  //当前页数
      }
    },
    methods:{
      handleCurrentChange(val) {
        this.$stamp(null,`当前页: ${val}`);
        this.$emit('changeCurrentPage',val)
      }
    },
    computed: {
      
    },
    components: {
      
    },
    created(){
      
    }
}
</script>

<style>
  .pages{
    text-align:center;
    margin-top:20px;
  }
  .left_pages{
    text-align:left;
    margin-top:20px;
    margin-left:300px;
  }
</style>
