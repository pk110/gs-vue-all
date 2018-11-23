<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      :auto-upload="false"
      :file-list="files"
      :on-change="changeImg"
      :on-remove="removeImg"
      :on-exceed="overImgs"
      :limit="limitImg"
      list-type="picture-card"
      :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
    props:{
      limitImg: {
        type: Number  //图片限制个数
      },
      files:{
        type: Array  //图片集合
      }
    },
    data () {
      return {
        
      }
    },
    methods:{
      //改变的照片文件数组
      changeImg(file, fileList){
        this.$stamp(null,fileList)
        this.$emit('imgFiles',fileList)
      },
      //移除照片文件数组
      removeImg(file,fileList){
        this.$stamp(null,fileList)
        this.$emit('imgFiles',fileList)
      },
      //限制照片大小
      beforeUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //超出限制
      overImgs(){
        this.$message.error(`只能上传${this.limitImg}个图片`)
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
