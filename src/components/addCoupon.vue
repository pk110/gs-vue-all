<template>
  <div>
    <div class="addCoupon" @click="addCoupon">
      <i class="el-icon-plus"></i>
      <span>新增优惠券</span>
    </div>
    <!--表格-->
    <el-table
      :data="couponData"
      :class="status == 1?'addCouponTable':'addCouponTablea'">
      <el-table-column
        label="优惠券名称"
        align="center"
        width="250">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="获得概率"
        width="240"
        v-if="status == 1">
        <template slot-scope="scope">
          <el-input-number size="small" v-model="scope.row.num" :min="1" :max="100" label="优惠券概率"></el-input-number>&nbsp;%
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <div class="addCouponDetele" @click="addCouponDetele(scope.$index,scope.row)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <!--弹窗-->
    <el-dialog title="添加优惠券" :visible.sync="addCouponBox" width="40%" center class="addCouponBox">
      <el-table
        ref="multipleTable"
        :data="couponTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
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
      status:{
        type:Number //获得类型
      }
    },
    data () {
      return {
        addCouponBox:false,
        couponData:[],
        couponTable: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:0
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:0
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:0
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:0
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:0
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:0
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:0
        }],
        multipleSelection: []
      }
    },
    methods:{
      //弹框
      addCoupon(){
        this.addCouponBox = true      
        if (this.couponData.length !== 0) {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //全选优惠券
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //确定添加的优惠券
      comfired(){
        this.$stamp(null,this.multipleSelection)
        this.couponData = this.multipleSelection
        this.$emit('getCoupon',this.couponData)
        this.addCouponBox = false
      },
      //删除添加优惠券的值
      addCouponDetele(index,data){
        this.$stamp(null,index)
        this.$delete(this.couponData,index)
        this.$emit('getCoupon',this.couponData)
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
  .addCoupon{
    box-sizing: border-box;
    padding:0px 15px;
    border-radius:30px;
    background-color:#000;
    color:#fff;
    display:inline-block;
    line-height: 37px;
    cursor:pointer;
  }
  .addCouponBox .el-dialog__body{
    padding-top:0;
  }
  .addCouponTable{
    width:640px;
  }
  .addCouponTable thead tr th{
	  background-color: #494949;
    color:#ffffff;
    padding: 0;
  }
  .addCouponTable thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .addCouponTable thead tr th:nth-child(3){
    border-radius:0 5px 0 0;
  }
  .addCouponDetele{
    box-sizing:border-box;
    padding:6px 5px;
    background-color:#000;
    color:#fff;
    cursor: pointer;
    border-radius:30px;
  }
  .addCouponTablea{
    width:370px;
  }
  .addCouponTablea thead tr th{
	  background-color: #494949;
    color:#ffffff;
    padding: 0;
  }
  .addCouponTablea thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .addCouponTablea thead tr th:nth-child(2){
    border-radius:0 5px 0 0;
  }
</style>
