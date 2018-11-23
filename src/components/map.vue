<template>
  <div class="amap-page-container">
    <!--搜索
    <div class="map-top">
      <div class="search-box">
        <div class="search-box-city">
          <div class="spinner" v-if="searchOption.city == ''">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
          <span v-else>{{searchOption.city}}</span>
        </div> 
        <el-amap-search-box :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      </div>
      <div style="width:270px;position:absolute;top:20px;" class="el-vue-search-box-container search-box-right"><div class="search-box-wrapper"><input type="text" v-model="dispatching"> <span class="search-btn-right" @click="paste">粘贴配送范围</span></div> <div class="search-tips"><ul></ul></div></div>
    </div>-->
    <div class="map_search">
      <span style="margin-right:15px;color:#000;font-size:16px;">配送范围</span>
      <input type="text" v-model="dispatching" placeholder="沾入配送范围"> 
      <span class="map_btn" @click="paste">生成范围</span>
    </div>
    <el-amap style="height:75vh" ref="map" vid="amap-vue" :center="center" :plugin="plugin" :zoom="zoom" :events="events" class="amap-demo">
      <!--图标-->
      <el-amap-marker vid="component-marker" :zIndex="zIndex" :position="center"></el-amap-marker>
      <!--多边形-->
      <el-amap-polygon v-for="(polygon, index) in polygons" :editable="editable" :key="index" :vid="index" :ref="`polygon_${index}`" :path="path" :draggable="polygon.draggable" :events="polygon.events" :strokeColor="polygon.strokeColor" :fillColor="polygon.fillColor" :fillOpacity="polygon.fillOpacity" :strokeStyle="polygon.strokeStyle"></el-amap-polygon>
    </el-amap>
    <div class="toolbar">
      <span style="color:#000">选点地址:<span style="color: #ed6f00;">{{storeAddress}}</span></span>
      <el-button type="primary" :loading="loading" style="background-color:#ff3b21;color:#fff;border-width:0;padding:7px 15px;cursor:pointer;border-radius:30px;" @click="changeEditable">保存</el-button>
    </div>
  </div>
</template>
<script>
  import axios from './../http/http'
  export default {
    props: {
      propsCenter: {
        type: Array
      },
      propsPath: {
        type: Array
      }
    },
    data () {
      var that = this
      return {
        loading:false,
        //配送范围
        dispatching:[],
        //店铺位置
        province:'',
        city:'',
        district:'',
        address:'',
        storeAddress:'正在定位...',
        // 搜索控制
        searchOption: {
          city: '',
          citylimit: true
        },
        //地图控制
        zIndex:1100,  //地图图标高度
        zoom: 14,
        center: [121.5273285, 31.21515044], //店铺坐标
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              that.$stamp(null,that.propsCenter.length)
              that.$stamp(null,that.propsPath.length)
              // 0为新建  不为0为修改
              if(that.propsPath.length == 0){
                o.getCurrentPosition((status, result) => {
                  that.$stamp(null,result)
                  if (result && result.position) {
                    // 标点
                    that.center = [result.position.lng,result.position.lat]
                    // [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]]
                    // [121.59996, 31.197646]
                    that.path = [[result.position.lng-0.04,result.position.lat],[result.position.lng+0.02,result.position.lat-0.02],[result.position.lng+0.01,result.position.lat+0.02]]
                    //获取当前城市
                    that.province = result.addressComponent.province
                    that.city = result.addressComponent.city
                    that.district = result.addressComponent.district
                    that.address = result.addressComponent.street + result.addressComponent.township + result.addressComponent.streetNumber
                    that.searchOption.city = result.addressComponent.city
                    that.storeAddress = result.formattedAddress
                  }else{
                    that.path = [[that.center[0]-0.04,that.center[1]],[that.center[0]+0.02,that.center[1]-0.02],[that.center[0]+0.01,that.center[1]+0.02]]
                    that.$message({
                      type:'error',
                      message: '请检查浏览器是否开启定位功能'
                    })
                  }
                })
              }else{
                let propsPath = []
                if(JSON.parse(that.propsPath)[0].O){
                  for(let i =0;i<JSON.parse(that.propsPath).length;i++){
                    propsPath.push([JSON.parse(that.propsPath)[i].lng,JSON.parse(that.propsPath)[i].lat])
                  }
                }else{
                  propsPath = JSON.parse(that.propsPath)
                }
                let propsCenter = JSON.parse(that.propsCenter)
                that.center = [propsCenter[0],propsCenter[1]]
                // [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]]
                // [121.59996, 31.197646]
                that.path = []
                for(let i =0;i<propsPath.length;i++){
                  that.path.push([propsPath[i][0],propsPath[i][1]])
                }
                that.$stamp(null,propsCenter)
                //获取当前城市
                // 这里通过高德 SDK 完成。
                axios.get('https://restapi.amap.com/v3/geocode/regeo?location='+propsCenter[0]+','+propsCenter[1]+'&key=b068eea7c41a9d8aa07fcd9244285d9c&radius=1000&extensions=all').then((result) =>{
                  if(result.status == '0'){
                    that.$message({
                      type:'error',
                      message: '请输入正确的店铺坐标'
                    })
                  }else if(result && result.regeocode){
                    that.$stamp(null,result)
                    that.province = result.regeocode.addressComponent.province
                    that.city = result.regeocode.addressComponent.city
                    that.district = result.regeocode.addressComponent.district
                    that.address = result.regeocode.addressComponent.streetNumber.street + result.regeocode.addressComponent.township + result.regeocode.addressComponent.streetNumber.number
                    that.searchOption.city = result.regeocode.addressComponent.city
                    that.storeAddress = result.regeocode.formatted_address
                  }else{
                    that.$message({
                      type:'error',
                      message: '请检查浏览器是否开启定位功能'
                    })
                  }
                })
              }
            }
          }
        }],
        events: {
          click(e) {  
            // 标点
            that.searchOption.city = ''
            that.center = [e.lnglat.lng,e.lnglat.lat]
            that.storeAddress = '正在定位...'
            // 这里通过高德 SDK 完成。
            axios.get('https://restapi.amap.com/v3/geocode/regeo?location='+e.lnglat.lng+','+e.lnglat.lat+'&key=b068eea7c41a9d8aa07fcd9244285d9c&radius=1000&extensions=all').then((result) =>{ 
              that.$stamp(null,result.data)  
              if(result && result.data.regeocode){
                that.province = result.data.regeocode.addressComponent.province
                that.city = result.data.regeocode.addressComponent.city
                that.district = result.data.regeocode.addressComponent.district
                that.address = result.data.regeocode.addressComponent.streetNumber.street + result.data.regeocode.addressComponent.township + result.data.regeocode.addressComponent.streetNumber.number
                that.searchOption.city = result.data.regeocode.addressComponent.city
                that.storeAddress = result.data.regeocode.formatted_address
              }else{
                that.$message({
                  type:'error',
                  message: '请检查浏览器是否开启定位功能'
                })
              }               
            })
          }
        },
        //多边形
        path: [],   //配送范围
        editable:true,
        polygons: [
            {
              draggable: true,
              strokeColor:'#fa5b5b',
              fillColor:'#38adff',
              strokeStyle:'dashed',
              fillOpacity:'0.5',
              events: {
                click: (e) => {
                  // 标点
                  that.searchOption.city = ''
                  that.center = [e.lnglat.lng,e.lnglat.lat]
                  that.storeAddress = '正在定位...'
                  // 这里通过高德 SDK 完成。
                  axios.get('https://restapi.amap.com/v3/geocode/regeo?location='+e.lnglat.lng+','+e.lnglat.lat+'&key=b068eea7c41a9d8aa07fcd9244285d9c&radius=1000&extensions=all').then((result) =>{                  
                    that.$stamp(null,result)
                    if(result && result.data.regeocode){
                      that.province = result.data.regeocode.addressComponent.province
                      that.city = result.data.regeocode.addressComponent.city
                      that.district = result.data.regeocode.addressComponent.district
                      that.address = result.data.regeocode.addressComponent.streetNumber.street + result.data.regeocode.addressComponent.township + result.data.regeocode.addressComponent.streetNumber.number
                      that.searchOption.city = result.data.regeocode.addressComponent.city
                      that.storeAddress = result.data.regeocode.formatted_address
                    }else{
                      that.$message({
                        type:'error',
                        message: '请检查浏览器是否开启定位功能'
                      })
                    }
                  })
                },
                end:(e) =>{
                  let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
                  that.path = newPath
                }
              }
            }
          ]
      }
    },
    methods:{
      changeEditable() {
        // this.editable = !this.editable;
        this.loading = true
        let roundRange = 0
        for(let i = 0;i<this.path.length;i++){
          roundRange += (this.calculateLineDistance({longitude:this.center[0],latitude:this.center[1]},{longitude:this.path[i].lng,latitude:this.path[i].lat}))
        }
        const data = {
          storeArr:this.path,
          region:this.center,
          address:this.province+this.city+this.district+this.address,
          range:'约'+(roundRange/(this.path.length*1000)).toFixed(2)+'公里',
          mapVisible:false
        }
        this.$emit('storePath',data)
        // this.$emit('storePath',JSON.stringify(this.path))
        setTimeout(() => {
          this.loading = false
        },1000)
      },
      //计算平均配送服务范围公里数
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

          return(Math.asin(d14 / 2.0) * 12742001.579854401);
      },
      onSearchResult(pois) {
        // console.log(pois)
        this.center = [pois[0].lng,pois[0].lat]
        this.storeAddress = pois[0].address+pois[0].name
      },
      // 重新配置范围
      addAddress(){
        this.path = []
        for(let i =0;i<JSON.parse(this.dispatching).length;i++){
          this.path.push([JSON.parse(this.dispatching)[i][0],JSON.parse(this.dispatching)[i][1]])
        }
      },
      //粘贴
      async paste(){
        try{
          await this.addAddress()
        }catch(e){
          this.$message({
            type:"error",
            message:'配送范围格式有问题，请检查后再粘贴!'
          })
        }
      }
    },
    computed:{
      
    },
    components:{
      
    },
    created() {
      
    }
  }
</script>
<style lang="">
  .map_search{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px 0;
  }
  .map_search input{
    flex:1;
    padding:5px 0;
    text-align:center;
    background-color:#e4e4e4;
    border-radius:5px;
    border:0;
  }
  .map_btn{
    margin-left:15px;
    box-sizing:border-box;
    padding:4px 15px;
    background-color:#000;
    border-radius:30px;
    color:#fff;
    cursor:pointer;
  }
  
  .amap-page-container{
    position: relative;
    height:84vh;
  }
  .search-box {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index:10;
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .search-box-city{
    background-color:#fff;
    height:45px;
    line-height:45px;
    box-sizing:border-box;
    padding:0 5px;
    box-shadow: 0 2px 2px rgba(0,0,0,.15);
  }
  .search-box-right{
    position: absolute;
    top: 66px;
    right: 20px;
  }
  .search-btn-right{    
    border-left: 1px solid #eee;
    padding: 0 5px;
    display: block;
    height: 100%;
    line-height: 45px;
    background-color: #d8ac65;
    color: #fff;
    cursor:pointer;
  }
  .search-btn-right:active{
    opacity:0.5
  }
  .toolbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:5px;
    position: relative;
  }
  .search-btn{
    padding-left:5px;
    border-left:1px solid #eee;
  }
  .map-top{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .spinner {
    text-align: center;
    line-height: 47px;
  }
 
.spinner > div {
  width: 10px;
  height: 10px;
  background-color: #d8ac65;
 
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
 
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>