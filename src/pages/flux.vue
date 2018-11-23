<template>
  <div>
    <!--底部信息-->
    <div class="flux_storeNub">
      <ul style="display:flex;">
        <li>
          <div class="flux_storeNub_title" style="background-color:#ed6f00;">访客数</div>
          <span style="font-size:20px;color:#ed6f00;">1477 次</span>
          <div style="padding-bottom:10px">昨日同时段
            <span style="margin-left:15px;color:#8BC34A!important"><i style="font-size:23px;padding-right:10px;" class="el-icon-upload2"></i>
            214.10次</span>
          </div>
        </li>
        <li>
          <div class="flux_storeNub_title" style="background-color:#9076ff;">下单数 (单)</div>
          <span style="font-size:20px;color:#9076ff;">122 单</span>
          <div style="padding-bottom:10px">昨日同时段
            <span style="margin-left:15px;color:#8BC34A!important"><i style="font-size:23px;padding-right:10px;" class="el-icon-upload2"></i>
            9单</span>
          </div>
        </li>
        <li>
          <div class="flux_storeNub_title" style="background-color:#ffc600;">有效订单数 (单)</div>
          <span style="font-size:20px;color:#ffc600 ;">115 单</span>
          <div style="padding-bottom:10px">昨日同时段
            <span style="margin-left:15px;color:#E51C23!important"><i style="font-size:23px" class="el-icon-download"></i>
            9单</span>
          </div>
        </li>
        <li>
          <div class="flux_storeNub_title" style="background-color:#494949;">付款金额</div>
          <span style="font-size:20px;color:#494949;">105.50 元</span>
          <div style="padding-bottom:10px">昨日同时段
            <span style="margin-left:15px;color:#E51C23!important"><i style="font-size:23px" class="el-icon-download"></i>
            9元</span>
          </div>
        </li>
      </ul>
    </div>
    <!--查询信息-->
    <div style="max-width:1300px;min-width:1200px;margin-top:10px;background-color:#ffffff;padding-bottom:20px;">
      <div class="flux_title">交易概况</div>
      <div class="flux_search_left_date">
        <el-radio-group v-model="totalPriceChoose" class="flux_totalPriceChoose">
          <el-radio-button label="0">昨日</el-radio-button>
          <el-radio-button label="1">7日</el-radio-button>
          <el-radio-button label="2">30日</el-radio-button>
          <el-radio-button label="3">90日</el-radio-button>
        </el-radio-group>
        <el-date-picker
          class="fluxTime"
          @change="timeFluxSearch"
          v-model="fluxSearchTime"
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
      <div class="flux_search">
        <div class="flux_search_left">
          <div class="flux_people">
            <div>
              <p style="color:#000000">访客数</p>
              <p style="font-size:21px;color:#ed6f00">1477 次</p>
            </div>
            <div>
              <p style="color:#000000">下单订单数</p>
              <p style="font-size:18px;color:#ed6f00">1477 单</p>
            </div>
            <div>
              <p style="color:#000000">下单金额 (元)</p>
              <p style="font-size:18px;color:#ed6f00">1477 元</p>
            </div>
            <div style="padding-right:15px">
              <p style="color:#000000">客单价 (元)</p>
              <p style="font-size:18px;color:#ed6f00">1477 元</p>
            </div>
          </div>
          <div class="flux_people" style="border-bottom-width:0">
            <div>
              <p style="color:#000000">下单人数</p>
              <p style="font-size:18px;color:#ed6f00">1477 次</p>
            </div>
            <div>
              <p style="color:#000000">有效订单数</p>
              <p style="font-size:18px;color:#ed6f00">1477 单</p>
            </div>
            <div>
              <p style="color:#000000">有效金额 (元)</p>
              <p style="font-size:18px;color:#ed6f00">1477 元</p>
            </div>
            <div>
              <p style="color:#000000">真实客单价 (元)</p>
              <p style="font-size:18px;color:#ed6f00">1477 元</p>
            </div>
          </div>
        </div>
        <div class="flux_search_right">
          <!--<div class="flux_search_right_left">
            <div class="flux_back_one">
              <span>访客</span>
            </div>
            <div class="flux_back_two">
              <span>下单</span>
            </div>
            <div class="flux_back_three">
              <span>有效</span>
            </div>
          </div>
          <div class="flux_search_right_right">

          </div>-->
          <!--下单转化率-->
          <span style="top: 34px;left: 145px;">20%</span>
          <!--全店转化率-->
          <span style="top: 34px;left: 374px;">50%</span>
          <!--有效转化率-->
          <span style="top: 146px;left: 259px;">60%</span>
        </div>
      </div>
    </div>
    <!--可视化图表-->
    <div class="flux_echart">
        <div id="flux_myLineNub" class="flux_myLine"></div>
        <div class="flux_totalPrice_line_bottom">
          <span style="color:#696969" class="flux_totalPrice_line_bottom_inline"><i style="background-color:#60c101"></i>下单转化率</span>
          <span style="color:#696969" class="flux_totalPrice_line_bottom_inline"><i style="background-color:#9076ff"></i>付款转化率</span>
          <span style="color:#696969" class="flux_totalPrice_line_bottom_inline"><i style="background-color:#ffc600"></i>全店转化率</span>
        </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入线状图组件
import 'echarts/lib/chart/line'
export default {
    data () {
      return {
        totalPriceChoose:0,
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
        fluxSearchTime:'',
        listSeven:[]
      }
    },
    mounted(){
this.listSeven = [
{
"orderPriceSum":38.94,
"orderCount":1,
"orderDate":"08-15"
},
{
"orderPriceSum":56.29,
"orderCount":3,
"orderDate":"08-16"
},
{
"orderPriceSum":59.61,
"orderCount":3,
"orderDate":"08-17"
},
{
"orderPriceSum":49.45,
"orderCount":2,
"orderDate":"08-18"
},
{
"orderPriceSum":0.00,
"orderCount":0,
"orderDate":"08-19"
},
{
"orderPriceSum":55.01,
"orderCount":3,
"orderDate":"08-20"
},
{
"orderPriceSum":0.00,
"orderCount":0,
"orderDate":"08-21"
}
]
      this.drawLineNub();
    },
    methods:{
      //总订单量条形
      drawLineNub(){
        let date = []
        for(let i = 0;i<this.listSeven.length;i++){
          date.push(this.listSeven[i].orderDate)
        }
        let moneyTotal = []
        for(let i = 0;i<this.listSeven.length;i++){
          moneyTotal.push(this.listSeven[i].orderPriceSum)
        }
        let orderTotal = []
        for(let i = 0;i<this.listSeven.length;i++){
          orderTotal.push(this.listSeven[i].orderCount)
        }
        this.$stamp(null,date)
        this.$stamp(null,moneyTotal)
        this.$stamp(null,orderTotal)

        echarts.init(document.getElementById('flux_myLineNub')).setOption({
          baseOption: {
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data:['总金额','总订单']
              },
              toolbox: {
                  show: true,
                  feature: {
                      magicType: {show: true, type: ['stack', 'tiled']},
                      saveAsImage: {show: true}
                  }
              },
              xAxis: {
                  name:'过去七天',
                  type: 'category',
                  boundaryGap: false,
                  data: date
              },
              yAxis: {
                  name:'订单量',
                  type: 'value'
              },
              series: [
              {
                  name: '下单转化率',
                  type: 'line',
                  smooth: true,
                  color:'#60c101',
                  data: orderTotal
              },
              {
                  name: '付款转化率',
                  type: 'line',
                  smooth: true,
                  color:'#9076ff',
                  data: moneyTotal
              },
              {
                  name: '全店转化率',
                  type: 'line',
                  smooth: true,
                  color:'#ffc600',
                  data: moneyTotal
              }]
          },
          media: [ 
            {
                query: {maxWidth: 1150, minWidth: 1100},
                option: {
                    legend: {
                        orient: 'horizontal',
                        left: 200,
                        itemGap: 5
                    },
                    grid: {
                        left: '10%',
                        top: 80,
                        right: 250,
                        bottom: 100
                    },
                    xAxis: {
                        nameLocation: 'end',
                        nameGap: 10,
                        splitNumber: 5,
                        splitLine: {
                            show: true
                        }
                    },
                    timeline: {
                        orient: 'horizontal',
                        inverse: false,
                        left: '20%',
                        right: '20%',
                        bottom: 10,
                        height: 40
                    },
                    series: [
                        { center: ['50%', '50%']}
                    ]
                }
            }
          ]
        })
      },
      //日期查询
      timeFluxSearch(){
        this.$stamp(null,this.fluxSearchTime)
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
  .flux_storeNub ul li{
    width:297px;
    height:190px;
    border:1px solid #cccccc;
    border-radius:5px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    color:#696969;
    margin-right:15px;
    background-color:#ffffff;
  }
  .flux_search{
    display:flex;
    justify-content:flex-start;
    margin-top:20px;
  }
  .flux_title{
    width:100%;
    text-align:center;
    padding:10px 0;
    box-sizing:border-box;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    color:#ffffff;
    background-color:#494949;
  }
  .flux_search_left{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    flex:1;
    margin-right:74px;
    border-right:1px solid #e6e6e6;
    padding-right:74px;
  }
  .flux_search_left_date{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding-left:15px;
    color:#B0AFAF;
    margin-top:10px;
  }
  .flux_totalPriceChoose .el-radio-button__inner{
    padding:8px 11px;
    color:#000000;
    border-color:#000000;
  }
  .flux_totalPriceChoose .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    padding:8px 11px;
    background-color:#000000;
    color:#fff;
    border-color:#dcdfe6;
    box-shadow: -1px 0 0 0 #dcdfe6;
  }
  .flux_totalPriceChoose .el-radio-button:first-child .el-radio-button__inner{
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-color:#000000;
  }
  .flux_totalPriceChoose .el-radio-button:last-child .el-radio-button__inner{
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    border-color:#000000;
  }
  .fluxTime{
    width:250px!important;
    background-color:#fff!important;
    margin-left:20px;
    border-color:#000000;
  }
  .fluxTime i,.fluxTime .el-range-input,.fluxTime input::-webkit-input-placeholder{
    color:#000000!important;
  }
  .flux_people{
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:20px 10px;
    border-bottom:1px solid #e6e6e6;
  }
  .flux_people div{
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .flux_echart{
    width:1300px;
    background-color:#ffffff;
    margin-top:1px;
  }
  .flux_myLine{
    width:100%;
    height:350px;
  }
  .flux_totalPrice_line_bottom{
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    box-sizing:border-box;
    padding-left:107px;
    padding-bottom:15px;
  }
  .flux_totalPrice_line_bottom_inline{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-right:20px;
  }
  .flux_totalPrice_line_bottom span i{
    width:15px;
    height:15px;
    display:inline-block;
    border-radius:100%;
    margin-right:10px;
  }
  .flux_search_right{
    max-width:640px;
    width:100%;
    height:auto;
    background:url(./../assets/flux.png) no-repeat;
    background-size:contain;
    position:relative;
  }
  .flux_search_right span{
    position:absolute;
	  color: #000000;
    font-size:23px;
  }
  /*.flux_search_right_left{
    display:flex;
    flex-direction:column;
    align-items:center;
  }*/
  .flux_back_one{ 
    width:198px;
    height:0;
    border-top: 100px solid #2889FC;
    border-right: 37px solid transparent;
    border-left:37px solid transparent;
    position:relative;
  }
  .flux_back_one span{
    position:absolute;
    top: -63px;
    left: 82px;
    font-size: 18px;
    color:#fff;
  }
  .flux_back_two{ 
    width:124px;
    height:0;
    border-top: 100px solid #0e932e;
    border-right: 37px solid transparent;
    border-left:37px solid transparent;
    position:relative;
  }
  .flux_back_two span{
    position:absolute;
    top: -63px;
    left: 44px;
    font-size: 18px;
    color:#fff;
  }
  .flux_back_three{ 
    width:50px;
    height:0;
    border-top: 100px solid red;
    border-right: 37px solid transparent;
    border-left:37px solid transparent;
    position:relative;
  }
  .flux_back_three span{
    position:absolute;
    top: -63px;
    left: 7px;
    font-size: 18px;
    color:#fff;
  }
  .flux_storeNub_title{
    width:100%;
    text-align:center;
    padding:10px 0;
    box-sizing:border-box;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    color:#ffffff;
  }
</style>
