<template>
  <div>
    <!--底部查询-->
    <div class="orderSearch_choose">
      <div>
        <b>收货方式</b>
        <el-radio-group @change="deliveryMethod" v-model="delivery">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">外卖</el-radio>
          <el-radio :label="3">自提</el-radio>
        </el-radio-group>
      </div>
      <div class="orderSearch_status">
        <b>订单状态</b>
        <el-radio-group @change="statusMethod" v-model="status">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">已付款</el-radio>
          <el-radio :label="2">已接单</el-radio>
          <el-radio :label="3">已呼单</el-radio>
          <el-radio :label="4">待分配起手</el-radio>
          <el-radio :label="5">骑手已接单</el-radio>
          <el-radio :label="6">已配送(骑手已到店)</el-radio>
          <el-radio :label="7">配送已完成</el-radio>
          <el-radio :label="8">订单已完成</el-radio>
          <el-radio :label="9">订单异常(需手动干预异常)</el-radio>
          <el-radio :label="10">退款</el-radio>
          <el-radio :label="97">配送已取消</el-radio>
          <el-radio :label="98">订单已取消</el-radio>
        </el-radio-group>
      </div>
      <div>
        <b>时间查询</b>
        <el-date-picker
          class="orderSearchTime"
          @change="timeOrderSearch"
          v-model="orderSearchTime"
          type="daterange"
          align="right"
          size="small"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
    </div>
    <!--底部列表-->
    <div class="orderSearch_container">
      <div class="orderSearch_left">
        <ul>
          <div v-if="orders.length == 0" class="orderSearch_nodata">
            <img style="width: 11vw;" src="./../assets/nodata.png" />
          </div>
          <li v-for="(items,index) in orders" :key="index" v-else>
            <div class="orderSearch_title">
              <div>
                <span>NO.{{items.orderNo}}</span>
                <span style="padding-left:10px;">立即送达</span>
                <span>|  建议 {{items.serviceTime}} 前送达</span>
              </div>
              <div class="orderSearch_totalStatus" v-if="items.totalStatus == 1">
                已付款
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 2">
                已接单
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 3">
                已呼单
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 4">
                待分配骑手
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 5">
                骑手已接单
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 6">
                骑手已取餐
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 7">
                骑手已送达
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 8">
                用户已确认收餐
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 9">
                订单异常(需手动干预异常)
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 97">
                配送已取消
              </div>
              <div class="orderSearch_totalStatus" v-else-if="items.totalStatus == 98">
                订单已取消
              </div>
            </div>
            <div class="orderSearch_user">
              <div class="orderSearch_user_left">
                <img src="./../assets/order_user.png" />
                <div style="margin:0 15px;">
                  <div style="padding-bottom:10px;">
                    <span style="font-size:18px;font-weight:bold">{{items.consigneeInfo.consigneeName}} ({{items.consigneeInfo.consigneeSex}}) {{items.consigneeInfo.consigneePhone}}</span>
                    <!--<span style="color:#959292"> | 本店第{{}}次下单</span>-->
                  </div>
                  <div>
                    <span>{{items.consigneeInfo.consigneeAddress}}</span>
                    <span style="color:#696969"><i style="color:#ff3b21" class="el-icon-location"></i>{{calculateLineDistance({longitude:items.consigneeInfo.consigneeLng,latitude:items.consigneeInfo.consigneeLat},{longitude:storesMessage.lng,latitude:storesMessage.lat})}}km</span>
                  </div>
                </div>
                <router-link :to="{ name: '地图', params:{ orderId: items.orderId,userLocation:[items.consigneeInfo.consigneeLng,items.consigneeInfo.consigneeLat] }}">
                  <el-button style="background-color:#ed6f00;color:#fff;height: 35px;margin-top: 21px;line-height: 10px;">查看地图</el-button>
                </router-link>
              </div>
              <div v-if="ordersStatus == '2' && handle == 1" class="orderSearch_refundStatus">
                <span v-if="items.refundStatus == 18">全额退款成功</span>
                <span v-else-if="items.refundStatus == 19">全额退款失败</span>
                <span v-else-if="items.refundStatus == 1">全额退款中</span>
                <span v-else-if="items.refundStatus == 2">部分退款中</span>
                <span v-else-if="items.refundStatus == 28">部分退款成功</span>
                <span v-else-if="items.refundStatus == 29">部分退款失败</span>&nbsp;&nbsp;
                <span v-if="items.exceptionStatus == 99">配送取消失败</span>
                <span v-else>配送取消成功</span>
                <div class="orderSearch_money">
                  <span>退款中 ￥49,</span>
                  <span>已退款 ￥0,</span>
                  <span>退款失败 ￥0</span>
                </div>
              </div>
            </div>
            <el-collapse class="orderSearch_collapse">
              <el-collapse-item>
                <template slot="title">
                  <div class="orderSearch_collapse_title">
                    <div class="orderSearch_imgs">
                      <img src="./../assets/ride.png" style="margin-bottom:10px;"/>
                      <img src="./../assets/eat.png" />
                    </div>
                    <div style="margin-left:10px;">
                      <div style="padding-bottom:14px;">
                        <span style="color:#000">骑手:</span>
                        <span>{{items.riderName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{{items.riderPhone}}</span>
                      </div>
                      <div style="font-size:18px;font-weight:bold;padding-bottom:10px;">{{items.cartInfo.listProduct.length}}件商品</div>
                      <div>
                        <span style="color:#ed6f00">备注:</span>
                        <span style="color:#696969">{{items.description}}</span>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="orderSearch_dishes">
                  <ul>
                    <li v-for="(products,index) in items.cartInfo.listProduct" :key="index">
                      <span>{{products.productName}}</span>
                      <span>x{{products.count}} ￥{{products.price}}</span>
                    </li>
                  </ul>
                </div>
                <div class="orderSearch_dishes">
                  <ul>
                    <li>
                      <span>餐盒费</span>
                      <span>￥{{items.cartInfo.totalBoxPrice}}</span>
                    </li>
                    <li>
                      <span>配送费</span>
                      <span>￥{{items.cartInfo.deliveryPrice}}</span>
                    </li>
                  </ul>
                </div>
                <div class="orderSearch_dishes">
                  <ul>
                    <li>
                      <span>小计</span>
                      <span>￥{{items.payPrice + items.cartInfo.totalCouponPrice}}</span>
                    </li>
                    <li>
                      <span>支付立减</span>
                      <span>￥{{items.cartInfo.totalCouponPrice}}</span>
                    </li>
                  </ul>
                </div>
                <div class="orderSearch_dishes">
                  <ul>
                    <li style="padding-left:0">
                      <div style="padding-left:0;" class="orderSearch_custom_money">
                        <img src="./../assets/money.png" />
                        <span>顾客实付</span>
                      </div>
                      <span>已支付￥{{items.payPrice}}</span>
                    </li>
                  </ul>
                </div>
                <div class="orderSearch_dishes">
                  <ul>
                    <div v-if="handle == 0 || handle == 1" class="orderSearch_refund">
                      <div>
                        <p style="font-size:14px;font-weight:600;color:#000">退货理由</p>
                        <div>用户申请<span style="color:#ed6f00">全额退款</span>&nbsp;&nbsp;&nbsp;<span style="color:#a5a5a5">理由:接单太慢</span></div>
                      </div>
                      <div class="orderSearch_refund_imgs">
                        <img src="./../assets/ride.png" />
                      </div>
                    </div>
                    <li style="padding:4px 0">
                      <div class="orderSearch_num">
                        <span style="padding-left:0px">下单时间: {{items.createTime}}</span>
                        <span style="padding-left:0px">单号: {{items.orderId}}</span>
                      </div>
                      <div v-if="ordersStatus == '1'">
                        <el-button class="orderSearch_button" @click="refund(index,items.cartInfo.listProduct,items.orderId)">部分退款</el-button>
                        <el-button v-if="items.totalStatus == 2 || items.totalStatus == 4" class="orders_button">取消订单并退款</el-button>
                      </div>
                      <div v-else-if="ordersStatus == '2' && handle == 0">
                        <el-button class="orderSearch_button">同意并退款</el-button>
                        <el-button class="orderSearch_reject">拒绝</el-button>
                      </div>
                      <div v-else-if="ordersStatus == '2' && handle == 1">
                        <div v-if="items.refundStatus == 1"></div>
                        <div v-else-if="items.refundStatus == 2"></div>
                        <div v-else-if="items.refundStatus == 18 && items.exceptionStatus !== 99"></div>
                        <el-button class="orderSearch_button" v-else-if="items.refundStatus == 19 && items.exceptionStatus !== 99">继续退款</el-button>
                        <el-button class="orderSearch_button" v-else-if="items.refundStatus == 18 && items.exceptionStatus == 99">取消配送</el-button>
                        <el-button class="orderSearch_button" v-else-if="items.refundStatus == 19 && items.exceptionStatus == 99">继续退款</el-button>
                      </div>
                      <div v-else-if="ordersStatus == '3'">
                        <div v-if="items.totalStatus == 9"></div>
                        <div v-else-if="items.totalStatus == 97">
                          <el-button v-dbClick class="orderSearch_button" @click="againOrder(items.orderId)">再次呼单</el-button>
                          <el-button class="orders_button" v-if="items.totalStatus == 2">自行配送</el-button>
                          <el-button class="orders_button" v-else-if="items.totalStatus == 6">自行配送完成</el-button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
          </li>
        </ul>
        <pages :totalPages="totalOrders" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"/>
      </div>
      <div class="orderSearch_right">
        <div class="orderSearch_right_title">今日订单概况</div>
        <div class="orderSearch_right_li" style="border-bottom:1px solid #f1f1f1">
          <span>已接订单: </span>
          <i>{{todayMessage.orderCount}}笔</i>
        </div>
        <div class="orderSearch_right_li">
          <span>今日营业额: </span>
          <i>{{todayMessage.orderPrice}}元</i>
        </div>
      </div>
    </div> 
    <!--弹出框-->
    <el-dialog
      title="选择退款菜品"
      :visible.sync="RefundDishes"
      width="30%"
      class="orderSearch_refund_box"
      center>
      <div class="orderSearch_refund_list">
        <ul>
          <li v-for="(items,index) in dishesList" :key="index">
            <span>{{items.productName}}</span>
            <span>x{{items.count}}</span>
            <span>￥{{items.price}}</span>
            <el-input-number v-model="items.initNub" @change="changeNub(index,items.initNub)" size="mini" :min="0" :max="items.count"></el-input-number>
          </li>
          <div class="orderSearch_refund_money">
            <span>退款金额</span>
            <p>￥{{refundMoney}}</p>
            <el-checkbox v-model="allRefund" @change="clickAll" class="orderSearch_allRefund">全额退款</el-checkbox>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
        <el-button class="orderSearch_comfired" v-dbClick @click="comfiredRefund">确 定</el-button>
      </span>
    </el-dialog> 
  </div>
</template>

<script>
import {formatDate} from './../utils/utils'
import pages from './../components/pages'
export default {
    data () {
      return {
        currentPage:1,
        pageSize:10,
        delivery:1,
        status:0,
        totalOrders:0,
        RefundDishes:false,
        pickerOptions2: {
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
        orderSearchTime:'',
        orders:[],
        todayMessage:'',
        dishesList:[],
        totalMoney:0,
        orderId:'',
        allRefund:false
      }
    },
    methods:{
      //收货方式筛选
      deliveryMethod(){
        this.$stamp(null,this.delivery)
        this.currentPage = 1
        this.findOrders(this.status,this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[0]),this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[1]),this.delivery,this.currentPage,this.pageSize).then( result =>{
          this.$stamp(null,result)
          this.orders = result.data.data.order
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      // 订单状态筛选
      statusMethod(){
        this.$stamp(null,this.status)
        this.currentPage = 1
        this.findOrders(this.status,this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[0]),this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[1]),this.delivery,this.currentPage,this.pageSize).then( result =>{
          this.$stamp(null,result)
          this.orders = result.data.data.order
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      //时间查询
      timeOrderSearch(val){
        this.$stamp(null,val)
        if(val == null){
          this.orderSearchTime = ''
        }else{
          this.orderSearchTime = val
        }
        this.currentPage = 1
        this.findOrders(this.status,this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[0]),this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[1]),this.delivery,this.currentPage,this.pageSize).then( result =>{
          this.$stamp(null,result)
          this.orders = result.data.data.order
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      // 退券
      refund(index,data,orderId){
        this.orderId = orderId
        for(let i = 0;i<data.length;i++){
          data[i].initNub = 0
        }
        this.dishesList = data
        this.RefundDishes = true
      },
      //确定退款
      comfiredRefund(){
        this.$stamp(null,this.dishesList)
        let product = []
        let totalMoney = 0
        for(let i = 0;i<this.dishesList.length;i++){
          totalMoney += this.dishesList[i].price*this.dishesList[i].count
          if(this.dishesList[i].initNub !== 0){
            product.push({productId:this.dishesList[i].productId,count:this.dishesList[i].initNub})
          }
        }
        if(product.length == 0){
          this.$message.error('请选择退款菜品数量!')
        }else{
          this.RefundDishes = false
          let refundPrice = 0
          if(totalMoney == this.totalMoney){
            refundPrice = 0
          }else{
            refundPrice = this.totalMoney*100
          }
          this.$api.orders.refundMoney({refundPrice,orderId:this.orderId,product:JSON.stringify(product)}).then(result => {
            this.$stamp(null,result)
            if(result.data.code == 200){
              this.$message.success('退款成功!')
            }else{
              this.$message.error(result.data.msg)
            }
          }).catch(error => {
            this.$message.error('退款失败')
          })
        }
      },
      //改变退款菜品数量
      changeNub(index,val){
        this.$stamp(null,index)
        this.$stamp(null,val)
        this.dishesList[index].initNub = val
        let totalMoney = 0
        for(let i = 0;i<this.dishesList.length;i++){
          totalMoney += this.dishesList[i].price*this.dishesList[i].initNub
        }
        this.totalMoney = totalMoney
        //计算总价
        let lastMoney = 0
        for(let i = 0;i<this.dishesList.length;i++){
          lastMoney += this.dishesList[i].price*this.dishesList[i].count
        }
        // 判定是否是全额
        if(lastMoney == totalMoney){
          this.allRefund = true
        }else{
          this.allRefund = false
        }
      },
      //全额退款
      clickAll(val){
        this.$stamp(null,val)
        let totalMoney = 0
        if(val == true){
          for(let i = 0;i<this.dishesList.length;i++){
            this.dishesList[i].initNub = this.dishesList[i].count
            totalMoney += this.dishesList[i].price*this.dishesList[i].count
          }
          this.refundMoney = totalMoney
        }else{
          for(let i = 0;i<this.dishesList.length;i++){
            this.dishesList[i].initNub = 0
          }
          this.refundMoney = 0
        }
      },
      //再次呼单
      againOrder(orderId){
        this.$api.orders.againOrder({orderId}).then(res => {
          this.$stamp(null,res)
          this.$message.success('再次呼单成功!')
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      },
      //计算两个坐标之间的距离
      calculateLineDistance(start, end) {
          var d1 = 0.01745329251994329;
          var d2 = start.longitude;
          var d3 = start.latitude;
          var d4 = end.longitude;
          var d5 = end.latitude;
          d2 *= d1;
          d3 *= d1;
          d4 *= d1;
          d5 *= d1;
          var d6 = Math.sin(d2);
          var d7 = Math.sin(d3);
          var d8 = Math.cos(d2);
          var d9 = Math.cos(d3);
          var d10 = Math.sin(d4);
          var d11 = Math.sin(d5);
          var d12 = Math.cos(d4);
          var d13 = Math.cos(d5);
          var arrayOfDouble1 = [];
          var arrayOfDouble2 = [];
          arrayOfDouble1.push(d9 * d8);
          arrayOfDouble1.push(d9 * d6);
          arrayOfDouble1.push(d7);
          arrayOfDouble2.push(d13 * d12);
          arrayOfDouble2.push(d13 * d10);
          arrayOfDouble2.push(d11);
          var d14 = Math.sqrt((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
              (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
              (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2]));

          return(Math.asin(d14 / 2.0) * 12742001.579854401).toFixed(2);
      },
      //获取今日订单概况
      getToday(){
        return new Promise((resolve,reject) => {
          this.$api.orders.getToday({storeId:this.$store.getters.storesMessage.storeId}).then(res => {
            resolve(res)
          })
        })
      },
      //查询订单
      findOrders(status,start,end,deliveryType,currentPage,pageSize){
        return new Promise((resolve,reject) => {
          this.$api.orders.findOrders({storeId:this.$store.getters.storesMessage.storeId,status,start,end,deliveryType,currentPage,pageSize}).then(res => {
            resolve(res)
          })
        })
      },
      //改变的页数
      changeCurrentPage(val){
        this.$stamp(null,`我想要第${val}页`)
        this.currentPage = val
        this.findOrders(this.status,this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[0]),this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[1]),this.delivery,this.currentPage,this.pageSize).then( result =>{
          this.$stamp(null,result)
          this.orders = result.data.data.order
        }).catch(error => {
          this.$message.error('网络错误,请重新刷新页面')
        })
      }
    },
    computed: {
      refundMoney:{
        get:function(){
          return this.totalMoney
        },
        set:function(val){
          this.$stamp(null,val)
          this.totalMoney = val
        }
      }
    },
    components: {
      pages
    },
    created(){
      this.$store.state.loading = true
      Promise.all([this.findOrders(this.status,this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[0]),this.orderSearchTime == ''?'':formatDate(this.orderSearchTime[1]),this.delivery,this.currentPage,this.pageSize),this.getToday()]).then(result => {
        this.$stamp(null,result)
        this.orders = result[0].data.data.order
        this.totalOrders = result[0].data.data.totalPage
        this.todayMessage = result[1].data.data
        this.$store.state.loading = false
      }).catch(error => {
        this.$message.error('网络错误,请重新刷新页面')
      })
    }
}
</script>

<style>
  .orderSearch_choose{
    border-bottom:1px solid #e6e6e6;
    background-color:#ffffff;
    box-sizing:border-box;
    padding:5px 15px;
    border-radius:5px;
  }
  .orderSearch_choose div{
    margin:10px 0;
  }
  .orderSearch_choose div b{
    padding-right:10px;
  }
  .orderSearch_choose .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .orderSearch_choose .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .orderSearchTime{
    background-color: #fff!important;
    border-color:#000000;
  }
  .orderSearchTime i,.orderSearchTime .el-range-input,.orderSearchTime input::-webkit-input-placeholder{
    color:#000000!important;
  }
  .orderSearch_status{
    display:flex;
    width:800px;
    margin:0;
  }
  .orderSearch_status b{
    width:123px;
  }
  .orderSearch_status .el-radio-group{
    margin:0;
  }    
  .orderSearch_status .el-radio-group .el-radio:nth-child(1){
    padding-top: 4px;
  }
  .orderSearch_status .el-radio-group .el-radio:nth-child(n+7){
    padding-top:10px;
  }
  .orderSearch_status .el-radio-group .el-radio:nth-child(7),.orderSearch_status .el-radio-group .el-radio:nth-child(12){
    margin-left:0;
  }  
  .orderSearch_container{
    display:flex;
    justify-content:space-between;
    margin-top:20px;
  }
  .orderSearch_right{
    width:205px;
    height:268px;
    border:1px solid #e6e6e6;
    background-color:#ffffff;
  }
  .orderSearch_right_title{
    width:100%;
    height:49px;
    border-bottom:1px solid #E1E0E0;
    background-color:#ed6f00;
    color:#ffffff;
    font-size:15px;
    line-height:49px;
    box-sizing:border-box;
    padding-left:20px;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
  .orderSearch_right_li{
    box-sizing:border-box;
    padding-left:20px;
    margin-top:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .orderSearch_right_li span{
    color: #000000;
    font-size:18px;
    font-weight:bold;
    padding-bottom:10px;
  }
  .orderSearch_right_li i{
    color: #ed6f00;
    font-size:18px;
    font-weight:bold;
    padding-bottom:10px;
  }
  .orderSearch_left{
    flex:1;
    margin-right:20px;
  }
  .orderSearch_left ul{
    overflow-y: auto;
    max-height: 780px;
    overflow-x: hidden;
  }
  .orderSearch_left ul li{
    width:100%;
    border:1px solid #e6e6e6;
    margin-bottom:20px;
  }
  .orderSearch_title{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:#ed6f00;
    border-bottom:1px solid #e6e6e6;
    color:#ffffff;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
  .orderSearch_title:first-child div{
    box-sizing:border-box;
    padding:10px 15px;
  }
  .orderSearch_user{
    box-sizing:border-box;
    padding:10px 15px;
    display:flex;
    background-color:#ffffff;
    justify-content:space-between;
    border-bottom:1px solid #e6e6e6;
  }
  .orderSearch_user_left{
    display:flex;
    justify-content:flex-start;
  }
  .orderSearch_user_left img{
    width:27px;
    height:23px;
  }
  .orderSearch_collapse_title img{
    width: 25px;
    height: 27px;
  }
  .orderSearch_custom_money{
    display:flex;
    align-items:center;
  }
  .orderSearch_custom_money img{
    width: 25px;
    height: 27px;
  }
  .orderSearch_collapse{
    background-color:#ffffff;
    box-sizing:border-box;
    padding:10px 15px;
  }
  .orderSearch_collapse .el-collapse-item__wrap,.orderSearch_collapse .el-collapse-item__header{
    border-width:0;
    line-height: 25px;
    padding:10px 0;
    height: auto;
  }
  .orderSearch_collapse .is-active{
    background-color: #fff!important;
  }
  .orderSearch_collapse_title{
    display:flex;
    justify-content:flex-start;
  }
  .orderSearch_collapse .el-collapse-item__content{
    padding-bottom:0;
  }
  .orderSearch_dishes ul li{
    width:100%;
    display:flex;
    justify-content:space-between;
    box-sizing:border-box;
    padding:4px 15px;
    border:0;
    margin:0;
  }
  .orderSearch_dishes ul {
    border-top:1px solid  #e6e6e6;
    box-sizing:border-box;
    padding:10px 0;
  }
  .orderSearch_dishes ul li span{
    padding-left:20px;
    color:#696969;
  }
  .orderSearch_num{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    color:#959292;
  }
  .orderSearch_button span{
    padding-left:0!important;
    color:#ed6f00!important;
  }
  .orderSearch_button{
    border-color:#ed6f00;
    padding:8px 20px;
    border-radius: 30px;
  }
  .orderSearch_reject{
    border-color:#ff3b21;
    padding:8px 20px;
    border-radius: 30px;
    background-color:#ff3b21;
  }
  .orderSearch_reject span{
    padding-left:0!important;
    color:#fff!important;
  }
  .orderSearch_refund_box .el-button--primary{
    padding:8px 20px;
    background-color: #259B24;
    border-color: #259B24;
  }
  .orderSearch_refund_box .el-dialog__body{
    padding:0;
  }
  .orderSearch_refund_box .el-dialog__header{
    background-color:#ed6f00;
    padding:10px;
  }
  .orderSearch_refund_box .el-dialog__title{
    color:#ffffff;
  }
  .orderSearch_refund_box .el-dialog__headerbtn{
    top:14px;
  }
  .orderSearch_refund_box .el-dialog__headerbtn .el-dialog__close{
    color:#ffffff;
  }
  .orderSearch_refund_list{
    margin-top:20px;
  }
  .orderSearch_refund_list ul li{
    width:100%;
    display:flex;
    align-items:center;
    color:#000;
    justify-content:space-around;
    margin-bottom:10px;
  }
  .orderSearch_refund_money{
    width:100%;
    display:flex;
    align-items:center;
    color:#000;
    justify-content:center;
  }
  .orderSearch_refund_money p{
    padding:0 20px;
  }
  .orderSearch_refund{
    display:flex;
    align-items:center;
  }
  .orderSearch_refund_imgs{
    margin-left:15px;
  }
  .orderSearch_refund_imgs img{
    border-radius:5px;
    margin-right:7px;
  }
  .orderSearch_nodata{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    font-size:16px;
    min-height: 50vh;
  }
  .orderSearch_toggle{
    display:flex;
    justify-content:center;
    align-items:center;
    box-sizing:border-box;
    padding:15px 0;
    background-color:#fff;
  }
  .orderSearch_toggle .el-radio__input.is-checked .el-radio__inner{
    border-color: #ed6f00;
    background: #ed6f00;
  }
  .orderSearch_toggle .el-radio__input.is-checked+.el-radio__label{
    color: #ed6f00;
  }
  .orderSearch_totalStatus{
    font-size:18px;
    font-weight:bold;
    background-color:#000000;
    border-top-right-radius:5px;
  }
  .orderSearch_imgs{
    display:flex;
    flex-direction:column;
  }
  .orderSearch_money{
    display:flex;
    width:250px;
    justify-content:space-between;
    align-items:center;
  }
  .orderSearch_money span{
    color:#000;
    font-weight:500!important;
  }
</style>
