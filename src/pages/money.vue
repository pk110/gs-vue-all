<template>
  <div>
    <!--标题-->
    <!--<div class="money_current">
      <div style="display:flex;align-items:center;flex:1;">
        <span style="font-size:15px;color:#000000;">可提现余额</span>
        <span style="font-size:22px;color:#ed6f00;padding-left:10px;">￥ 1477.28 元</span>
      </div>
      <div style="border-left:1px solid #e6e6e6;margin:5px 0;padding-left:30px;">
        <el-button v-dbClick style="font-size:12px;padding:5px 20px;background-color:#ed6f00;color:#ffffff;border-radius:40px;">提现</el-button>
      </div>
    </div>-->
    <!--账户流水-->
    <!--<div class="money_user">
      <div class="money_user_right">
        <div class="money_user_right_title">账户流水</div>
        <el-table
          class="money_table"
          :header-cell-style="{background:'#494949'}"
          :data="moneyData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            align="center"
            label="时间"
            width='380'>
            <template slot-scope="scope">
              <span style="color:#B0AFAF">{{scope.row.date}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作类型">
            <template slot-scope="scope">
              <span style="color:#B0AFAF">{{scope.row.money}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="提现金额">
            <template slot-scope="scope">
              <span style="color:#B0AFAF">{{scope.row.money}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="账户余额">
            <template slot-scope="scope">
              <span style="color:#B0AFAF">{{scope.row.status}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="money_pages">
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>-->
    <!--账户经营分析-->
    <div>
      <el-date-picker
        v-model="moneyTime"
        class="moneyTime"
        type="daterange"
        align="right"
        size="mini"
        style="width:226px;margin-top:10px;height:32px"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateRange"
        @change="moneyChange">
      </el-date-picker>
    </div>
    <div class="money_user">
      <div class="money_user_right">
        <div class="money_user_right_title">经营分析</div>
        <el-table
          class="money_table"
          :header-cell-style="{background:'#494949'}"
          :data="moneyData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            align="center"
            label="时间"
            width='380'>
            <template slot-scope="scope">
              <span style="color:#B0AFAF">{{scope.row.dateKey}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="账单金额">
            <template slot-scope="scope">
              <span style="color:#B0AFAF">{{scope.row.totalPrice}}元</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div class="money_operate">
                <span style="color:#fff;background-color:#ed6f00" @click="seeMoney(scope.row,scope.row.totalPrice)">查看</span>
                <span style="color:#ed6f00;margin-left:20px;" @click="exportEchart(scope.row)">下载</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="money_pages">
          <pages :totalPages="totalMoney" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"/>
        </div>
      </div>
    </div>
    <!--弹出框-->
    <el-dialog
      title="查看账单"
      :visible.sync="seeMoneyBox"
      width="80%"
      class="money_refund_box"
      center>
      <el-table
        :data="moneyList">
        <el-table-column
          prop="orderNo"
          label="流水号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="订单号"
          align="center">
        </el-table-column>
        <el-table-column
          label="下单时间"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="完成时间"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.taskTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payPrice"
          label="支付金额"
          align="center">
        </el-table-column>
        <el-table-column
          label="联系人"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.consigneeName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="退款金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="微信实收金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="payPrice"
          label="订单类型"
          align="center">
        </el-table-column>
      </el-table>
      <div class="money_box">
        <span style="padding-left:5%;">总额: {{totalMoneyLast}}元</span>
        <pages style="width:auto" :totalPage="totalMoneyDetail" :pageSize="pageSize" @changeCurrentPage="adjustPage"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate} from './../utils/utils'
import pages from './../components/pages'
import base from './../http/base'; // 导入接口域名列表
import axios from 'axios'
export default {
    data () {
      return {
        dateRange: {
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
        currentPage:1,
        totalMoney:0,
        currentPageDetail:1,
        totalMoneyDetail:0,
        totalMoneyLast:0,
        pageSize:10,
        moneyTime:'',    //资金时间段选择
        moneyList:[],
        seeMoneyBox:false,
        moneyData:[]
      }
    },
    methods:{
      //资金选择时间段
      moneyChange(val){
        this.$stamp(null,val)
        if(val == null){
          this.moneyTime = ''
        }else{
          this.moneyTime = val
        }
        this.currentPage = 1
        this.getMoneyList(this.moneyTime == ''?'':formatDate(this.moneyTime[0]),this.moneyTime == ''?'':formatDate(this.moneyTime[1]),this.currentPage,this.pageSize,true).then(result =>{   
          this.moneyData = result.data.data.list
          this.totalMoney = result.data.data.total
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      //查看订单
      seeMoney(data,money){
        this.seeMoneyBox = true
        this.totalMoneyLast = money
        this.currentTimeDetail = data.dateKey
        this.getMoneyDetail(this.currentTimeDetail,this.currentTimeDetail,this.currentPageDetail,this.pageSize,true).then(result =>{   
          this.moneyList = result.data.data.list.map((items,index) => {
            return {
              orderNo:items.orderNo,
              orderId:items.orderId,
              payPrice:items.payPrice,
              consigneeName:items.consigneeInfo == null? '无联系人信息':items.consigneeInfo.consigneeName,
              createTime:formatDate(new Date(items.createTime)),
              taskTime:formatDate(new Date(items.taskTime))
            }
          })
          this.totalMoneyDetail = result.data.data.total
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      //下载导出
      exportEchart(data){
        const that = this
        axios.post(`${base}/api/v2/store/excel/bill`,{
            storeId: that.$store.getters.storesMessage.storeId,
            start:data.dateKey,
            end:data.dateKey,
            pageNum:1,
            pageSize:10,
            paging:false
        },{responseType: 'arraybuffer'}).then((res) => {
            this.$stamp(null,res)
            let fileName = res.headers['content-disposition'].split('=')[1].split('.')[0]
            let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
　　　　   }).catch( res => {
            this.$message.error('网络错误,请稍后重试!')
        })
        // this.getExcel(data.dateKey,data.dateKey,1,10,false).then(res =>{
        //   this.$stamp(null,res)
        //   let fileName = res.headers['content-disposition'].split('=')[1].split('.')[0]
        //   let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
        //   var link = document.createElement('a');
        //   link.href = window.URL.createObjectURL(blob);
        //   link.download = fileName;
        //   link.click();
        //   window.URL.revokeObjectURL(link.href);
        // }).catch((res) => {
        //     this.$message.error('网络错误,请稍后重试!')
        // })
      },
      //详情页改变页数
      adjustPage(val){
        this.$stamp(null,`我想要第${val}页`)
        this.currentPageDetail = val
        this.getMoneyDetail(this.currentTimeDetail,this.currentTimeDetail,this.currentPageDetail,this.pageSize,true).then(result =>{   
          this.moneyList = result.data.data.list.map((items,index) => {
            return {
              orderNo:items.orderNo,
              orderId:items.orderId,
              payPrice:items.payPrice,
              consigneeName:items.consigneeInfo == null? '无联系人信息':items.consigneeInfo.consigneeName,
              createTime:formatDate(new Date(items.createTime)),
              taskTime:formatDate(new Date(items.taskTime))
            }
          })
          this.totalMoneyDetail = result.data.data.total
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      // 获取资金列表
      getMoneyList(start,end,pageNum,pageSize,paging){
        return new Promise((resolve,reject) => {
          this.$api.money.moneyList({storeId:this.$store.getters.storesMessage.storeId,start,end,pageNum,pageSize,paging}).then(res => {
            resolve(res)
          })
        })
      },
      //改变的页数
      changeCurrentPage(val){
        this.$stamp(null,`我想要第${val}页`)
        this.currentPage = val
        this.getMoneyList(this.moneyTime == ''?'':formatDate(this.moneyTime[0]),this.moneyTime == ''?'':formatDate(this.moneyTime[1]),this.currentPage,this.pageSize,true).then(result => {
          this.$stamp(null,result)
          this.orders = result.data.data.order
          this.totalOrders = result.data.data.totalPage
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      //获取资金详情页
      getMoneyDetail(start,end,pageNum,pageSize,paging){
        return new Promise((resolve,reject) => {
          this.$api.money.getMoneyDetail({storeId:this.$store.getters.storesMessage.storeId,start,end,pageNum,pageSize,paging}).then(res => {
            resolve(res)
          })
        })
      },
      //获取资金excel文件
      getExcel(start,end,pageNum,pageSize,paging){
        return new Promise((resolve,reject) => {
          this.$api.money.getExcel({storeId:this.$store.getters.storesMessage.storeId,start,end,pageNum,pageSize,paging}).then(res => {
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
      this.getMoneyList(this.moneyTime == ''?'':formatDate(this.moneyTime[0]),this.moneyTime == ''?'':formatDate(this.moneyTime[1]),1,10,true).then(result => {
        this.$stamp(null,result)
        this.moneyData = result.data.data.list
        this.totalMoney = result.data.data.total
        this.$store.state.loading = false
      }).catch(error => {
        this.$message.error('网络错误,请重新刷新页面')
      })
    }
}
</script>

<style>
  .money_current{
    width:100%;
    display:flex;
    justify-content:space-between;
    box-sizing:border-box;
    padding:0 15px;
    align-items:center;
    background-color:#ffffff;
    border-radius:5px;
  }
  .money_user{
    width:99%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-top:20px;
  }
  .money_user_right{
    flex:1;
    border:1px solid #e6e6e6; 
  }
  .money_user_right_title{
    width:100%;
    box-sizing:border-box;
    padding:10px 15px;
    font-weight:bold;
    background-color:#ed6f00;
    color:#ffffff;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
  .money_anaylse_title{
    line-height:70px;
    font-weight:bold;
    padding-left:10px;
  }
  .money_anaylse{
    width:100%;
    height:320px;
    box-sizing:border-box;
    border:1px solid #e6e6e6;
  }
  .money_table tbody tr td{
    border-width:0;
    border-bottom:1px solid #f1f1f1;
  }
  .money_table thead{
    color:#ffffff;
  }
  .el-table::before{
    height:0;
  }
  .money_operate{
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .money_operate span{
    box-sizing:border-box;
    padding:3px 15px;
    border:1px solid #FF9800;
    border-radius:30px;
    cursor:pointer;
  }
  .money_box{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:10px;
    padding-bottom:10px;
  }
  .money_pages{
    width:100%;
    box-sizing:border-box;
    padding:5px 15px;
    text-align:right;
    background-color:#ffffff;
  }
  .money_refund_box .el-dialog__body{
    padding:0;
  }
  .money_refund_box thead tr th{
    background-color:#494949;
    color:#fff;
  }
  .money_refund_box .el-dialog__header{
    background-color:#ed6f00;
    padding:10px;
  }
  .money_refund_box .el-dialog__title{
    color:#ffffff;
  }
  .money_refund_box .el-dialog__headerbtn{
    top:14px;
  }
  .money_refund_box .el-dialog__headerbtn .el-dialog__close{
    color:#ffffff;
  }
  .moneyTime{
    background-color:#fff!important;
    border-color:#000000;
    border-radius:30px;
  }
  .moneyTime i,.moneyTime .el-range-input,.moneyTime input::-webkit-input-placeholder{
    color:#000000!important;
  }
  .moneyTime .el-range-separator{
    line-height:24px;
  }
</style>
