<template>
  <div>
    <!--店铺基本信息
    <div class="index_storeMessage">
      <img :src="storeImg" />
      <span style="padding:0 26px;">{{storeName}}</span>
      <el-rate
        class="index_value"
        v-model="storeComment"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}分">
      </el-rate>
    </div>-->
    <!--店铺信息栏-->
    <div class="index_storeNub">
      <ul style="display:flex;">
        <li>
          <div class="index_storeNub_title" style="background-color:#ed6f00;">今日营业额</div>
          <span style="font-size:20px;color:#ed6f00;">￥ {{todayMoney}} 元</span>
          <div class="index_storeNub_bottom">昨日 {{tomatoMoney}}元
            <span style="margin-left:15px;color:#8BC34A!important">
            <i v-if="moneyStatus == 1" style="font-size:23px;padding-right:10px;" class="el-icon-upload2"></i>
            <i v-else style="font-size:23px" class="el-icon-download"></i>
            {{money}}元</span>
          </div>
        </li>
        <li>
          <div class="index_storeNub_title" style="background-color:#9076ff;">今日订单量</div>
          <span style="font-size:20px;color:#9076ff;">{{todayOrder}} 单</span>
          <div class="index_storeNub_bottom">昨日 {{tomatoOrder}}单
            <span style="margin-left:15px;color:#8BC34A!important">
            <i v-if="orderStatus == 1" style="font-size:23px;padding-right:10px;" class="el-icon-upload2"></i>
            <i v-else style="font-size:23px" class="el-icon-download"></i>
            {{order}}单</span>
          </div>
        </li>
        <li>
          <div class="index_storeNub_title" style="background-color:#ffc600;">今日访客数</div>
          <span style="font-size:20px;color:#ffc600;">1 个</span>
          <div class="index_storeNub_bottom">昨日访客数 1000个
            <span style="margin-left:15px;color:#E51C23!important"><i style="font-size:23px" class="el-icon-download"></i>
            9个</span>
          </div>
        </li>
        <li>
          <div class="index_storeNub_title" style="background-color:#494949;">代办事项</div>
          <div class="index_switch">
            <div>
              <span style="font-size:20px;color:#000;">外卖</span>
              <el-switch
                class="index_switch_small"
                v-model="goHome"
                active-color="#ed6f00"
                inactive-color="#a5a5a5">
              </el-switch>
            </div>
            <div>
              <span style="font-size:20px;color:#000;">自提</span>
              <el-switch
                class="index_switch_small"
                v-model="goStore"
                active-color="#ed6f00"
                inactive-color="#a5a5a5">
              </el-switch>
            </div>
          </div>
          <div class="index_moedth index_storeNub_bottom">
            <span>待接单 1单</span>
            <span>待自提 1单</span>
          </div>
        </li>
      </ul>
    </div>
    <!--店铺总营业额分布-->
    <div class="index_totalPrice">
      <div class="index_totalPrice_left">
        <div class="index_storeNub_title" style="background-color:#494949;">总营业额分布</div>
        <el-radio-group v-model="totalPriceChoose" style="margin-top:10px;" class="totalPriceChoose" @change="priceChange">
          <el-radio-button label="-1">昨日</el-radio-button>
          <el-radio-button label="7">7日</el-radio-button>
          <el-radio-button label="30">30日</el-radio-button>
        </el-radio-group>    
        <el-date-picker
          v-model="totalPriceDate"
          class="indexTime"
          type="daterange"
          align="right"
          size="mini"
          style="width:226px;margin-top:10px;height:32px"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="dateRange"
          @change="totalPriceChange">
        </el-date-picker>
        <div id="myPiePrice" class="myPie"></div>
        <div class="index_totalPrice_bottom">
          <div>
            <i style="background-color:#ed6f00;"></i>
            <span style="color:#696969">自提</span>
          </div>
          <div>
            <i style="background-color:#c64f00;"></i>
            <span style="color:#696969">外卖</span>
          </div>
        </div>
      </div>
      <div class="index_totalPrice_right">
        <div class="index_storeNub_title" style="background-color:#a5a5a5;">自有平台营业额</div>
        <div class="index_time">
          <el-radio-group v-model="totalPriceChooseLine" class="totalPriceChoose" style="margin-right:26px;" @change="PriceLineChange">
            <el-radio-button label="7">7日</el-radio-button>
            <el-radio-button label="30">30日</el-radio-button>
            <el-radio-button label="90">90日</el-radio-button>
          </el-radio-group>
          <el-date-picker
            size="small"
            class="indexTime"
            v-model="dateTimePrice"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="dateRange"
            @change="totalPriceLineChange">
          </el-date-picker>
        </div>
        <div id="myLinePrice" class="myLine"></div>
        <div class="index_totalPrice_line_bottom">
          <span style="color:#696969" class="index_totalPrice_line_bottom_inline"><i style="background-color:#ed6f00"></i>全部</span>
          <span style="color:#696969" class="index_totalPrice_line_bottom_inline"><i style="background-color:#9076ff"></i>自提</span>
          <span style="color:#696969" class="index_totalPrice_line_bottom_inline"><i style="background-color:#ffc600"></i>外卖</span>
        </div>
      </div>
    </div>
    <!--店铺总订单量分布-->
    <div class="index_totalPrice">
      <div class="index_totalPrice_left">
        <div class="index_storeNub_title" style="background-color:#494949;">总订单量分布</div>
        <el-radio-group v-model="totalNubChoose" class="totalPriceChoose" style="margin-top:10px" @change="ordersChange">
          <el-radio-button label="-1">昨日</el-radio-button>
          <el-radio-button label="7">7日</el-radio-button>
          <el-radio-button label="30">30日</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="totalNubDate"
          class="indexTime"
          type="daterange"
          align="right"
          size="mini"
          style="width:226px;margin-top:10px;height:32px"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="dateRange"
          @change="totalNubChange">
        </el-date-picker>
        <div id="myPieNub" class="myPie"></div>
        <div class="index_totalPrice_bottom">
          <div>
            <i style="background-color:#9076ff;"></i>
            <span style="color:#696969">自提</span>
          </div>
          <div>
            <i style="background-color:#5f4bb2;"></i>
            <span style="color:#696969">外卖</span>
          </div>
        </div>
      </div>
      <div class="index_totalPrice_right">
        <div class="index_storeNub_title" style="background-color:#a5a5a5;">自有平台订单量</div>
        <div class="index_time">
          <el-radio-group v-model="totalNubChooseLine" class="totalPriceChoose" style="margin-right:26px;" @change="totalNubTimeChange">
            <el-radio-button label="7">7日</el-radio-button>
            <el-radio-button label="30">30日</el-radio-button>
            <el-radio-button label="90">90日</el-radio-button>
          </el-radio-group>
          <el-date-picker
            size="small"
            class="indexTime"
            v-model="dateTimeNub"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="dateRange"
            @change="totalNubLineChange">
          </el-date-picker>
        </div>
        <div id="myLineNub" class="myLine"></div>
        <div class="index_totalPrice_line_bottom">
          <span style="color:#696969" class="index_totalPrice_line_bottom_inline"><i style="background-color:#ed6f00"></i>全部</span>
          <span style="color:#696969" class="index_totalPrice_line_bottom_inline"><i style="background-color:#9076ff"></i>自提</span>
          <span style="color:#696969" class="index_totalPrice_line_bottom_inline"><i style="background-color:#ffc600"></i>外卖</span>
        </div>
      </div>
    </div>
    <!--店铺复购率及用户反馈-->
    <div class="index_totalPrice">
      <div class="index_totalPrice_left">
        <div class="index_storeNub_title" style="background-color:#494949;">复购率: {{rate}}%</div>
        <el-radio-group v-model="totalPeopleChoose" class="totalPriceChoose" style="margin-top:10px;" @change="totalPeopleChooseChange">
          <el-radio-button label="-1">昨日</el-radio-button>
          <el-radio-button label="7">7日</el-radio-button>
          <el-radio-button label="30">30日</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="drawPieDate"
          class="indexTime"
          type="daterange"
          align="right"
          size="mini"
          style="width:226px;margin-top:10px;height:32px"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="dateRange"
          @change="drawPieChange">
        </el-date-picker>
        <div id="myPiePeople" class="myPie"></div>
        <div class="index_totalPrice_bottom">
          <div>
            <i style="background-color:#ffc600;"></i>
            <span style="color:#696969">新客</span>
          </div>
          <div>
            <i style="background-color:#d28500;"></i>
            <span style="color:#696969">老客</span>
          </div>
        </div>
      </div>
      <div class="index_totalPrice_right">
        <div class="index_storeNub_title" style="background-color:#a5a5a5;">自有平台负面反馈</div>
        <div class="index_time" style="margin-top: 15px;">
          <el-radio-group v-model="totalPeopleChooseLine" class="totalPriceChoose" style="margin-right:26px;" @change="totalPeopleChooseTime">
            <el-radio-button label="-1">昨日</el-radio-button>
            <el-radio-button label="7">7日</el-radio-button>
            <el-radio-button label="30">30日</el-radio-button>
          </el-radio-group>
          <el-date-picker
            size="small"
            class="indexTime"
            v-model="dateTimePeople"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="dateRange"
            @change="totalPeopleChange">
          </el-date-picker>
        </div>
        <div id="myLinePeople" class="myBar"></div>
      </div>
    </div>
    <!--各种情况的几率-->
    <div class="index_allBottom">
      <span>差评率: <i style="color:#60c101">6%</i></span>
      <span>拒单率: <i style="color:#ecb700">6%</i></span>
      <span>少餐送错率: <i style="color:#ff3b21">6%</i></span>
      <span>配送延迟率: <i style="color:#60c101">6%</i></span>
      <span>超时取消率: <i style="color:#60c101">6%</i></span>
      <span>取消不告知率: <i style="color:#ecb700">6%</i></span>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入线状图组件
import 'echarts/lib/chart/line'
// 引入柱状图组件
import 'echarts/lib/chart/bar'
// 引入饼图。
import 'echarts/lib/chart/pie';
// 引入提示框和title组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import { getyyyyMMdd } from './../utils/utils'
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
        todayMoney:0,
        tomatoMoney:0,
        money:0,
        moneyStatus:0,
        todayOrder:0,
        tomatoOrder:0,
        order:0,
        orderStatus:0,
        storeComment:4.7,  //店铺打分
        goHome:true,      //是否开启外卖
        goStore:false,    //是否开启自提
        totalPriceChoose:7,   //总营业额时间选择
        totalPriceDate:'',    //总营业额时间段选择
        totalNubChoose:7,     //总订单量时间选择
        totalNubDate:'',      //总订单量时间段选择
        totalPeopleChoose:7,  //总复购率时间选择
        drawPieDate:'',       //总复购率时间段选择
        totalPriceChooseLine:7,   //线型图总营业额时间选择
        totalNubChooseLine:7,     //线型图总订单量时间选择
        totalPeopleChooseLine:7,  //线型图反馈情况时间选择
        totalPrice:[],  //总订单额饼图数据  
        totalPriceLine:[],  //总订单额条形图数据  
        totalOrder:[],  //总订单饼图数据  
        totalOrderLine:[],  //总订单条形图数据 
        againBuy:[],  //复购率饼图数据  
        suggestLine:[],  //总订单条形图数据  
        dateTimePrice:'',   //总营业额时间段选择
        dateTimeNub:'',     //总订单量时间段选择
        dateTimePeople:'',   //总反馈情况时间段选择
        rate:0 //复购率值
      }
    },
    mounted(){
      // 加载页面
      this.$store.state.loading = true
      Promise.all([this.getTop(),this.getEchart(0,7,'','')]).then((result) => {
        this.$stamp(null,result)
        //首页顶部
        this.storeComment = result[0].data.data.star
        this.todayMoney = result[0].data.data.moneyList[0].todayMoney
        this.tomatoMoney = result[0].data.data.moneyList[0].yesMoney
        this.money = result[0].data.data.moneyList[0].money
        this.moneyStatus = result[0].data.data.moneyList[0].status
        this.todayWord = result[0].data.data.wordList[0].todayWord
        this.tomatoOrder = result[0].data.data.wordList[0].yesWord
        this.word = result[0].data.data.wordList[0].word
        this.orderStatus = result[0].data.data.wordList[0].status
        //图表集合
        this.totalPrice = result[1].data.data.priceDistribution
        this.totalPriceLine = result[1].data.data.listOrderPrice
        this.totalOrder = result[1].data.data.countDistribution
        this.totalOrderLine = result[1].data.data.listOrderCount
        this.againBuy = result[1].data.data.reteDistribution
        this.suggestLine = result[1].data.data.listComment
        // 复购率值
        this.rate = result[1].data.data.rate
        // 绘制饼图
        this.drawPiePrice();  
        this.drawPieNub(); 
        this.drawPiePeople(); 
        // // 绘制柱状图
        this.drawLinePrice();
        this.drawLineNub();
        this.drawLinePeople();
        this.$store.state.loading = false
      }).catch(error => {
        this.$message.error('网络错误,请重新刷新页面')
      })
    },
    methods:{
      //总营业额饼形
      drawPiePrice() {
        let list = []
        for(let i =0;i<this.totalPrice.length;i++){
          if(this.totalPrice[i].appType == 1){
            list.push({
              value:this.totalPrice[i].priceCount,
              name:'',
              // selected:true,
              label:{
                normal:{
                  formatter: '{title|{c}元}',
                  position: 'inner',
                  rich:{
                    title:{
                      color:'#fff',
                      align: 'center'
                    }
                  }
                }
              },
              itemStyle:{
                color:'#ed6f00'
              }
            })
          }else if(this.totalPrice[i].appType == 2){
            list.push({
              value:this.totalPrice[i].priceCount,
              name:'',
              label:{
                normal:{
                  formatter: '{title|{c}元}',
                  position: 'inner',
                  rich:{
                    title:{
                      color:'#fff',
                      align: 'center'
                    }
                  }
                }
              },
              itemStyle:{
                color:'#c64f00'
              }
            })
          }
        }
        echarts.init(document.getElementById('myPiePrice')).setOption({
          baseOption: {
              series : [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      // roseType: 'radius',
                      // label: {
                      //     normal: {
                      //         show: true,
                      //         // formatter: '{b}: {c}({d}%)'
                      //         formatter: '{c}元',
                      //         position: 'inner'
                      //     }
                      // },
                      // color:['#8BC34A','#FF9800'],
                      backgroundColor:'#101010',
                      data:list,
                      itemStyle:{
                        normal: {
                            color: '#101010'
                        }
                      }
                  }
              ]
          },
          media: [

          ]
        })
      },
      //总营业额选择时间段
      totalPriceChange(val){
        this.$stamp(null,val)
        if(val == null){
          this.totalPriceChoose = 7
          this.getEchart(1,'7','','').then((result) => {
            this.totalPrice = result.data.data.priceDistribution
            this.drawPiePrice(); 
          })
        }else{
          this.totalPriceChoose = null
          const start = getyyyyMMdd(val[0])
          const end = getyyyyMMdd(val[1])
          this.getEchart(1,null,start,end).then((result) => {
            this.totalPriceLine = result.data.data.priceDistribution
            this.drawPiePrice();
          })
        }
      },
      //总营业额切换时间
      priceChange(val){
        this.$stamp(null,val)
        this.totalPriceDate = ''
        this.getEchart(1,val,'','').then((result) => {
          this.totalPrice = result.data.data.priceDistribution
          this.drawPiePrice(); 
        })
      },
      //总营业额条形
      drawLinePrice(){
        let date = []
        for(let i = 0;i<this.totalPriceLine.length;i++){
          date.push(this.totalPriceLine[i].dateKey)
        }
        let orderPriceAll = []
        for(let i = 0;i<this.totalPriceLine.length;i++){
          orderPriceAll.push(this.totalPriceLine[i].orderPriceAll)
        }
        let orderPriceIn = []
        for(let i = 0;i<this.totalPriceLine.length;i++){
          orderPriceIn.push(this.totalPriceLine[i].orderPriceIn)
        }
        let orderPriceOut = []
        for(let i = 0;i<this.totalPriceLine.length;i++){
          orderPriceOut.push(this.totalPriceLine[i].orderPriceOut)
        }
        this.$stamp(null,date)
        this.$stamp(null,orderPriceAll)
        this.$stamp(null,orderPriceIn)
        this.$stamp(null,orderPriceOut)

        echarts.init(document.getElementById('myLinePrice')).setOption({
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
                  name:`过去${date.length}天`,
                  type: 'category',
                  boundaryGap: false,
                  data: date
              },
              yAxis: {
                  name:'营业额',
                  type: 'value'
              },
              series: [{
                  name: '全部',
                  type: 'line',
                  smooth: true,
                  color:'#ed6f00',
                  data: orderPriceAll
              },
              {
                  name: '自提',
                  type: 'line',
                  smooth: true,
                  color:'#9076ff',
                  data: orderPriceIn
              },
              {
                  name: '外卖',
                  type: 'line',
                  smooth: true,
                  color:'#ffc600',
                  data: orderPriceOut
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
      //自有平台选择时间段
      totalPriceLineChange(val){
        this.$stamp(null,val)
        if(val == null){
          this.totalPriceChooseLine = 7
          this.getEchart(2,'7','','').then((result) => {
            this.totalPriceLine = result.data.data.listOrderPrice
            this.drawLinePrice(); 
          })
        }else{
          this.totalPriceChooseLine = null
          const start = getyyyyMMdd(val[0])
          const end = getyyyyMMdd(val[1])
          this.getEchart(2,null,start,end).then((result) => {
            this.totalPriceLine = result.data.data.listOrderPrice
            this.drawLinePrice();
          })
        }
      },
      //总营业额条形时间切换
      PriceLineChange(val){
        this.$stamp(null,val)
        this.dateTimePrice = ''
        this.getEchart(2,val,'','').then((result) => {
          this.totalPriceLine = result.data.data.listOrderPrice
          this.drawLinePrice(); 
        })
      },
      //总订单量饼形
      drawPieNub() {
        let list = []
        for(let i =0;i<this.totalOrder.length;i++){
          if(this.totalOrder[i].appType == 1){
            list.push({
              value:this.totalOrder[i].orderCount,
              name:'微信',
              // selected:true,
              label:{
                normal:{
                  formatter: '{title|{c}元}',
                  position: 'inner',
                  rich:{
                    title:{
                      color:'#fff',
                      align: 'center'
                    }
                  }
                }
              },
              itemStyle:{
                color:'#9076ff'
              }
            })
          }else if(this.totalOrder[i].appType == 2){
            list.push({
              value:this.totalOrder[i].orderCount,
              name:'小程序',
              label:{
                normal:{
                  formatter: '{title|{c}元}',
                  position: 'inner',
                  rich:{
                    title:{
                      color:'#fff',
                      align: 'center'
                    }
                  }
                }
              },
              itemStyle:{
                color:'#5f4bb2'
              }
            })
          }
        }
        echarts.init(document.getElementById('myPieNub')).setOption({
          baseOption: {
              series : [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      // roseType: 'radius',
                      // label: {
                      //     normal: {
                      //         show: true,
                      //         // formatter: '{b}: {c}({d}%)'
                      //         formatter: '{c}元',
                      //         position: 'inner'
                      //     }
                      // },
                      // color:['#8BC34A','#FF9800'],
                      backgroundColor:'#101010',
                      data:list,
                      itemStyle:{
                        normal: {
                            color: '#101010'
                        }
                      }
                  }
              ]
          },
          media: [

          ]
        })
      },
      //总订单量饼形图切换时间
      ordersChange(val){
        this.$stamp(null,val)
        this.totalNubDate = ''
        this.getEchart(3,val,'','').then((result) => {
          this.totalOrder = result.data.data.countDistribution
          this.drawPieNub(); 
        })
      },
      //总订单量选择时间段
      totalNubChange(val){
        this.$stamp(null,val)
        if(val == null){
          this.totalNubChoose = 7
          this.getEchart(3,'7','','').then((result) => {
            this.totalOrder = result.data.data.countDistribution
            this.drawPieNub(); 
          })
        }else{
          this.totalNubChoose = null
          const start = getyyyyMMdd(val[0])
          const end = getyyyyMMdd(val[1])
          this.getEchart(3,null,start,end).then((result) => {
            this.totalOrder = result.data.data.countDistribution
            this.drawPieNub();
          })
        }
      },
      //总订单量条形
      drawLineNub(){
        let date = []
        for(let i = 0;i<this.totalOrderLine.length;i++){
          date.push(this.totalOrderLine[i].dateKey)
        }
        let orderCountAll = []
        for(let i = 0;i<this.totalOrderLine.length;i++){
          orderCountAll.push(this.totalOrderLine[i].orderCountAll)
        }
        let orderCountIn = []
        for(let i = 0;i<this.totalOrderLine.length;i++){
          orderCountIn.push(this.totalOrderLine[i].orderCountIn)
        }
        let orderCountOut = []
        for(let i = 0;i<this.totalOrderLine.length;i++){
          orderCountOut.push(this.totalOrderLine[i].orderCountOut)
        }
        this.$stamp(null,date)
        this.$stamp(null,orderCountAll)
        this.$stamp(null,orderCountIn)
        this.$stamp(null,orderCountOut)

        echarts.init(document.getElementById('myLineNub')).setOption({
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
                  name:`过去${date.length}天`,
                  type: 'category',
                  boundaryGap: false,
                  data: date
              },
              yAxis: {
                  name:'订单量',
                  type: 'value'
              },
              series: [{
                  name: '全部',
                  type: 'line',
                  smooth: true,
                  color:'#ed6f00',
                  data: orderCountAll
              },
              {
                  name: '自提',
                  type: 'line',
                  smooth: true,
                  color:'#9076ff',
                  data: orderCountIn
              },
              {
                  name: '外卖',
                  type: 'line',
                  smooth: true,
                  color:'#ffc600',
                  data: orderCountOut
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
      //总订单量时间切换
      totalNubTimeChange(val){
        this.$stamp(null,val)
        this.dateTimeNub = ''
        this.getEchart(4,val,'','').then((result) => {
          this.totalOrderLine = result.data.data.listOrderCount
          this.drawLineNub(); 
        })
      },
      //总订单量时间段选择
      totalNubLineChange(val){
        this.$stamp(null,val)
        if(val == null){
          this.totalNubChooseLine = 7
          this.getEchart(4,'7','','').then((result) => {
            this.totalOrderLine = result.data.data.listOrderCount
            this.drawLineNub(); 
          })
        }else{
          this.totalNubChooseLine = null
          const start = getyyyyMMdd(val[0])
          const end = getyyyyMMdd(val[1])
          this.getEchart(4,null,start,end).then((result) => {
            this.totalOrderLine = result.data.data.listOrderCount
            this.drawLineNub();
          })
        }
      },
      //复购率饼形
      drawPiePeople() {
        let list = []
        for(let i =0;i<this.againBuy.length;i++){
          if(this.againBuy[i].appType == 1){
            list.push({
              value:this.againBuy[i].count,
              name:'新客',
              // selected:true,
              label:{
                normal:{
                  formatter: '{title|{c}人}',
                  position: 'inner',
                  rich:{
                    title:{
                      color:'#fff',
                      align: 'center'
                    }
                  }
                }
              },
              itemStyle:{
                color:'#ffc600'
              }
            })
          }else if(this.againBuy[i].appType == 2){
            list.push({
              value:this.againBuy[i].count,
              name:'老客',
              label:{
                normal:{
                  formatter: '{title|{c}人}',
                  position: 'inner',
                  rich:{
                    title:{
                      color:'#fff',
                      align: 'center'
                    }
                  }
                }
              },
              itemStyle:{
                color:'#d28500'
              }
            })
          }
        }
        echarts.init(document.getElementById('myPiePeople')).setOption({
          baseOption: {
              series : [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      // roseType: 'radius',
                      // label: {
                      //     normal: {
                      //         show: true,
                      //         // formatter: '{b}: {c}({d}%)'
                      //         formatter: '{c}元',
                      //         position: 'inner'
                      //     }
                      // },
                      // color:['#8BC34A','#FF9800'],
                      backgroundColor:'#101010',
                      data:list,
                      itemStyle:{
                        normal: {
                            color: '#101010'
                        }
                      }
                  }
              ]
          },
          media: [

          ]
        })
      },
      //复购率饼形图时间切换
      totalPeopleChooseChange(val){
        this.$stamp(null,val)
        this.drawPieDate = ''
        this.getEchart(5,val,'','').then((result) => {
          this.rate = result.data.data.rate
          this.againBuy = result.data.data.reteDistribution
          this.drawPiePeople(); 
        })
      },
      //总复购率选择时间段
      drawPieChange(val){
        this.$stamp(null,val)
        if(val == null){
          this.totalPeopleChoose = 7
          this.getEchart(5,'7','','').then((result) => {
            this.rate = result.data.data.rate
            this.againBuy = result.data.data.reteDistribution
            this.drawPiePeople(); 
          })
        }else{
          this.totalPeopleChoose = null
          const start = getyyyyMMdd(val[0])
          const end = getyyyyMMdd(val[1])
          this.getEchart(5,null,start,end).then((result) => {
            this.rate = result.data.data.rate
            this.againBuy = result.data.data.reteDistribution
            this.drawPiePeople();
          })
        }
      },
      //负面反馈条形
      drawLinePeople(){
        let star = []
        for(let i = 0;i<this.suggestLine.length;i++){
          star.push(this.suggestLine[i].star)
        }
        let commentKey = []
        for(let i = 0;i<this.suggestLine.length;i++){
          commentKey.push(this.suggestLine[i].commentKey)
        }
        this.$stamp(null,star)
        this.$stamp(null,commentKey)

        echarts.init(document.getElementById('myLinePeople')).setOption({
          baseOption: {
              color: ['#FF4081'],
              tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              xAxis: {
                  type: 'category',
                  data: commentKey,
                  axisTick: {
                      alignWithLabel: true
                  }
              },
              yAxis: {
                  name:'人数',
                  type: 'value'
              },
              series: [{
                data: star,
                barWidth: 40,
                color:'#ffc600',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
              }]
          }
        })
      },
      //复负面反馈条形时间切换
      totalPeopleChooseTime(val){
        this.$stamp(null,val)
        this.dateTimePeople = ''
        this.getEchart(6,val,'','').then((result) => {
          this.suggestLine = result.data.data.listComment
          this.drawLinePeople(); 
        })
      },
      //复负面反馈条形时间段选择
      totalPeopleChange(val){
        this.$stamp(null,val)
        if(val == null){
          this.totalPeopleChooseLine = 7
          this.getEchart(6,'7','','').then((result) => {
            this.suggestLine = result.data.data.listComment
            this.drawLinePeople(); 
          })
        }else{
          this.totalPeopleChooseLine = null
          const start = getyyyyMMdd(val[0])
          const end = getyyyyMMdd(val[1])
          this.getEchart(6,null,start,end).then((result) => {
            this.suggestLine = result.data.data.listComment
            this.drawLinePeople();
          })
        }
      },
      //上部异步请求
      getTop(){  
        return new Promise((resolve,reject) =>{
          this.$api.index.index({storeId:this.$store.getters.storesMessage.storeId}).then(res=> {
              resolve(res)   
          })
        })
      },
      //图表异步请求
      getEchart(type,dateCount,start,end){  
        return new Promise((resolve,reject) =>{
          this.$api.index.echart({storeId:this.$store.getters.storesMessage.storeId,type,dateCount,start,end}).then(res=> {
              resolve(res)   
          })
        })
      }
    },
    computed: {
      //店铺名称
      storeName(){
        return this.$store.state.storesMessage.storeName
      },
      //店铺图片
      storeImg(){
        return this.$store.state.storesMessage.storeLogo
      }
    },
    components: {
      
    },
    created(){

    }
}
</script>

<style>
  .index_storeMessage{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:15px;
    background-color:#ffffff;
    border-radius:5px;
    box-sizing:border-box;
    padding:5px 15px;
  }
  .index_storeMessage img{
    width:28px;
    height:28px;
    border:1px solid #cccccc;
    border-radius:100%;
    margin-left:5px;
  }
  .index_storeNub ul li{
    width:297px;
    height:170px;
    border:1px solid #cccccc;
    border-radius:5px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    color:#B0AFAF;
    margin-right:15px;
    background-color:#ffffff;
  }
  .index_switch{
    width:100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
  }
  .index_switch_small span{
    width:36px;
    height:22px;
  }
  .index_switch_small .el-switch__core:after{
    height:18px;
  }
  .index_moedth{
    width:100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
  }
  .index_totalPrice{
    margin-top:19px;
    color:#B0AFAF;
    display:flex;
    justify-content:flex-start;
  }
  .index_totalPrice_left{
    width:288px;
    /*height:320px;*/
    border:1px solid #cccccc;
    border-radius:5px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    background-color:#ffffff;
  }
  .totalPriceChoose .el-radio-button__inner{
    padding:8px 24px;
    border-color:#000000;
  }
  .totalPriceChoose .el-radio-button:first-child .el-radio-button__inner{
    border-top-left-radius:40px;
    border-bottom-left-radius:40px;
    border-left-color:#000000;
  }
  .totalPriceChoose .el-radio-button:last-child .el-radio-button__inner{
    border-top-right-radius:40px;
    border-bottom-right-radius:40px;
  }
  .totalPriceChoose .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    padding:8px 24px;
    background-color:#000000;
    color:#fff;
    border-color:#000000;
    box-shadow: -1px 0 0 0 #dcdfe6;
  }
  .index_totalPrice_bottom{
    width:100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding-bottom:10px;
  }
  .index_totalPrice_bottom i{
    display:inline-block;
    width:20px;
    height:12px;
    border-radius:5px;
    margin-right:5px;
  }
  .index_totalPrice_bottom div{
    display:flex;
    align-items:center;
  }
  .myPie{
    width:180px;
    height:180px;
  }
  .index_totalPrice_right{
    width:889px;
    height:336px;
    border:1px solid #cccccc;
    border-radius:5px;
    margin-left:18px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    background-color:#ffffff;
  }
  .myLine{
    width:880px;
    height:200px;
  }
  .index_time{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    margin-left:26px;
    margin-top:9px;
  }
  .index_totalPrice_line_bottom{
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-left:26px;
    margin-bottom:10px;
  }
  .index_totalPrice_line_bottom_inline{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-right:20px;
  }
  .index_totalPrice_line_bottom span i{
    width:15px;
    height:15px;
    display:inline-block;
    border-radius:100%;
    margin-right:10px;
  }
  .index_allBottom{
    display:flex;
    justify-content:space-around;
    align-items:center;
    border:1px solid #cccccc;
    height:56px;
    font-size:14px;
    margin-top:19px;
    max-width:1233px;
    background-color:#ffffff;
  }
  .myBar{
    width:880px;
    height:240px;
  }
  .index_value .el-rate__text{
    color:#ff3b21!important;
  }
  .index_storeNub_title{
    width:100%;
    text-align:center;
    padding:10px 0;
    box-sizing:border-box;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    color:#ffffff;
  }
  .index_storeNub_bottom{
    padding:10px 0;
    box-sizing:border-box;

  }
  .indexTime{
    background-color:#fff!important;
    border-color:#000000;
    border-radius:30px;
  }
  .indexTime i,.indexTime .el-range-input,.indexTime input::-webkit-input-placeholder{
    color:#000000!important;
  }
  .indexTime .el-range-separator{
    line-height:24px;
  }
</style>
