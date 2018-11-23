<template>
  <div>
    <el-amap ref="map" vid="amap-vue" :center="center" :zoom="zoom" class="amap-demo">
      <!--图标-->
      <el-amap-marker vid="component-marker" :zIndex="zIndex" :position="center"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
    data () {
      return {
        //地图控制
        zIndex:1100,  //地图图标高度
        zoom: 14,
        center: []
      }
    },
    methods:{

    },
    computed: {
      
    },
    components: {
      
    },
    created(){
      this.$stamp(null,this.$route.params.data)
      this.center = this.$route.params.data
    }
}
</script>

<style>

</style>
