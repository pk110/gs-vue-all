<template>
  <div>
    <div class="addDish" @click="addDish">
      <i class="el-icon-plus"></i>
      <span>新增菜品</span>
    </div>
    <!--表格-->
    <el-table
      :data="dishData">
      <el-table-column
        label="菜品名称"
        align="center">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="img"
        align="center"
        label="图片">
        <template slot-scope="scope">
        
        </template>
      </el-table-column>
      <el-table-column
        prop="stores"
        align="center"
        label="所属商家">
        <template slot-scope="scope">
        
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        align="center"
        label="当日活动库存">
        <template slot-scope="scope">
        
        </template>
      </el-table-column>
      <el-table-column
        prop="money"
        align="center"
        label="原价">
        <template slot-scope="scope">
        
        </template>
      </el-table-column>
      <el-table-column
        prop="activeMoney"
        align="center"
        label="活动价">
        <template slot-scope="scope">
        
        </template>
      </el-table-column>
      <el-table-column
        prop="stores"
        align="center"
        label="折扣">
        <template slot-scope="scope">
        
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <div class="editDish" @click="editDish(scope.$index,scope.row)">编辑</div>
        </template>
      </el-table-column>
    </el-table>
    <!--弹窗-->
    <el-dialog title="添加菜品" :visible.sync="addDishBox" width="40%" center class="addDishBox">
      <el-table
        ref="multipleTable"
        :data="dishTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          label="日期"
          align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="comfired()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    props:{
      
    },
    data () {
      return {
        addDishBox:false,
        dishData:[],
        dishTable:[],
        multipleSelection: []
      }
    },
    methods:{
      // 弹框
      addDish(){
        this.addDishBox = true
      },
      //全选菜品
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //确定添加的菜品
      comfired(){
        this.$stamp(null,this.multipleSelection)
        this.dishData = this.multipleSelection
        this.$emit('getDish',this.dishData)
        this.addDishBox = false
      },
      //编辑菜品
      editDish(index,data){

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
  .addDish{
    box-sizing: border-box;
    padding:0px 15px;
    border-radius:30px;
    background-color:#000;
    color:#fff;
    display:inline-block;
    line-height: 37px;
    cursor:pointer;
  }
  .addDishBox .el-dialog__body{
    padding-top:0;
  }
  .editDish{
    box-sizing:border-box;
    padding:6px 5px;
    background-color:#000;
    color:#fff;
    cursor: pointer;
    border-radius:30px;
  }
</style>
