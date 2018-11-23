<template>
  <div>
    <el-radio-group v-model="time" @change="chooseTimeFive">
      <el-radio v-for="items in times" :label="items.value" :key="items.value">{{items.name}}</el-radio>
    </el-radio-group>&nbsp;
    <el-date-picker
      v-model="longStatus !== ''?'':timeDate"
      type="daterange"
      align="right"
      unlink-panels
      size="mini"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2"
      @change="getTimeDate"
      :disabled="longStatus == ''?false:true">
    </el-date-picker>
  </div>
</template>

<script>
export default {
    props:{
      times:{
        type:Array,
        default: function () {
          return [{
            name:'长久有效',
            value:0
          },{
            name:'自定义天数',
            value:1
          }]
        }
      }
    },
    data () {
      return {
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
        longStatus:'no_error',
        time:0,
        timeDate:''
      }
    },
    methods:{
      //选择时间
      chooseTimeFive(val){
        this.$stamp(null,val)
        if(val == 0){
          this.longStatus = 'no_error'
          this.timeDate = ''
          this.$emit('getTime',val)
        }else if(val == 1){
          this.longStatus = ''
          this.$emit('getTime','')
        }
      },
      //获取时间段
      getTimeDate(val){
        this.$stamp(null,val)
        this.$emit('getTime',val)
      },
      //获取具体时间显示出来
      showDate(date){
        this.$stamp(null,date)
        if(date == ''){
          this.longStatus = 'no_error'
          this.timeDate = date
          this.time = 0
        }else{
          this.longStatus = ''
          this.timeDate = date
          this.time = 1
        }
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
</style>
