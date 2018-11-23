<template>
  <div class="hotDetail">
    <div class="hotDetail_head">
      <router-link to="/manager/hot">
        <div>
          <i class="el-icon-arrow-left"></i>
          <span>返回列表</span>
        </div>
      </router-link>
    </div>
    <div class="hotDetail_form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="活动名称:" prop="activeName">
          <el-input v-model="form.activeName" style="width:250px;" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动海报:" prop="activeImg">
          <imgs :files="form.activeImg" class="hotDetail_img" :limitImg="1" @imgFiles="getHotImg" />  
        </el-form-item>
        <el-form-item label="活动链接:" prop="acticeUrl">
          <el-input v-model="form.acticeUrl" style="width:250px;" placeholder="请输入活动链接"></el-input>
        </el-form-item>
        <el-form-item label="展示城市:" prop="showCitys" class="hotDetail_choose_city_box hotDetail_choose_city_bug">
          <el-radio-group v-model="form.showCitys">
            <el-radio v-for="(items,index) in citys" :key="items.cityId" :label="items.cityId">{{items.cityName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间:" prop="chooseTimeBox" class="hotDetail_choose_city_box hotDetail_time">
          <choseTime ref="choseTime" @getTime="getTimeBox" :times="initTimes" style="display: flex;align-items:center"/>
        </el-form-item>
        <el-form-item label="时段:" prop="showTimes" class="hotDetail_choose_city_box hotDetail_radio">
          <el-radio-group v-model="form.showTimes">
            <el-radio v-for="(items,index) in times" :key="items.timeId" :label="items.timeId">{{items.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联商品:" prop="products">
          <div style="display:flex;align-items:center;">
            <div class="hotDetail_addProducts"  @click="addProducts">
              <i class="el-icon-plus"></i>
              <span>添加商品</span>
              <span>(3-9个)</span>
            </div>
            <div class="hotDetail_products_list">
              <ul>
                <li v-for="(imgs,index) in form.products" :key="index">
                  <img :src="imgs.image" />
                  <i @click="removeProduct(index,imgs)" class="el-icon-circle-close"></i>
                </li>
              </ul>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button style="display: block;margin:10px auto;background-color:#E51C23;color:#fff;border-radius:30px;padding:7px 20px;" @click="submitForm('ruleForm')">发 布</el-button>
    </div>
    <!--弹窗-->
    <el-dialog title="选择关联商品" :visible.sync="hotDetailBox" width="40%" center class="hotDetailBox">
      <el-dialog
        width="40%"
        center
        title="商品信息"
        :visible.sync="hotDetailBoxInner"
        append-to-body>
      </el-dialog>
      <div class="hotDetailBox_head">
        <div>
          <span class="hotDetailBox_title">名称</span>
          <el-input size="small" v-model="productsName" style="width:250px;" placeholder="输入商品名称"></el-input>
        </div>
        <div>
          <span class="hotDetailBox_title">筛选条件</span>      
          <el-select size="small" v-model="productsTerm" style="width:180px;" class="hotDetailBox_option" placeholder="请选择品牌" @change="chooseBrands">
            <el-option
              v-for="item in brandsList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="hotDetailBox_body">
        <ul>
          <li v-for="(items,index) in productsList">
            <div class="hotDetailBox_body_left">
              <img :src="items.image" />
              <div>
                <span>{{items.name}}</span>
                <span>￥{{items.price}}</span>
              </div>
            </div>
            <div class="hotDetailBox_body_right">
              <el-button @click="seeProduct" class="hotDetailBox_see" style="color:#ffffff;background-color:#ed6f00">查看</el-button>
              <el-button dbClick class="hotDetailBox_see" style="color:#ed6f00" @click="addProduct(index,items)">添加</el-button>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import imgs from './../components/img.vue'
import choseTime from './../components/choseTime'
export default {
    data () {
      return {
        initTimes:[{
          name:'全部',
          value:0
        },{
          name:'指定日期',
          value:1
        }],
        pickerOptions:{
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
        citys:[],
        hotDetailBox:false,
        hotDetailBoxInner:false,
        times:[{
          name:'0:00-06:00',
          timeId:1
        },{
          name:'06:00-12:00',
          timeId:2
        },{
          name:'12:00-18:00',
          timeId:4
        },{
          name:'18:00-24:00',
          timeId:8
        }],
        timeIs:false,
        productsList:[{
            productId:1,
            name:'鱼香肉丝',
            price:12,
            image:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1'
          },{
            productId:2,
            name:'鱼香肉丝',
            price:12,
            image:'http://imgsrc.baidu.com/forum/w%3D580%3B/sign=b50659384790f60304b09c4f0929b21b/a8ec8a13632762d0c88771b6adec08fa513dc67a.jpg'
          }],
        form:{
          activeName:'',
          acticeUrl:'',
          activeImg:[],
          showCitys:[],
          products:[],
          chooseTimeBox:'',
          showTimes:''
        },
        rules: {
          activeName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          activeImg: [
            { required: true, message: '请添加活动海报', trigger: 'blur' }
          ],
          products: [
            { required: true, message: '请添加关联商品', trigger: 'blur' },
            {  min: 1, max: 100, message: '请添加3-9个关联商品', trigger: 'blur' }
          ],
          acticeUrl:[
            { required: true, message: '请输入活动链接', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        productsName:'',
        productsTerm:'',
        brandsList:[],
        isSubmit:true
      }
    },
    methods:{
      //获得海报图片
      getHotImg(img){
        this.$stamp(null,img)
        this.form.activeImg = img
      },
      //弹窗表单获取有效期
      getTimeBox(val){
        this.$stamp(null,val)
        this.form.chooseTimeBox = val
      },
      //提交发布
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
          } else {
            this.$message.error('error submit!!');
            return false;
          }
        })
      },
      // 添加关联商品
      addProducts(){
        if(this.isSubmit == true){
          if(this.$store.state.brandsList.length == 0){
            this.getAllBrand().then(res=>{
              this.$store.state.brandsList = res.data.data
              this.brandsList = res.data.data
              this.productsTerm = res.data.data[0].brandId
            })
          }else{
            this.brandsList = this.$store.state.brandsList
            this.productsTerm = this.$store.state.brandsList[0].brandId
          }
        }
        this.hotDetailBox = true
      },
      //选择品牌条件
      chooseBrands(val){

      },
      //查看商品具体信息
      seeProduct(){
        this.hotDetailBoxInner = true
      },
      //添加商品信息
      addProduct(index,data){
        this.$set(this.form.products,this.form.products.length,data)
        this.$set(this.productsList,index,{
            productId:data.productId,
            name:data.name,
            price:data.price,
            image:data.image
        })
      },
      //删除商品信息
      removeProduct(index,data){
        this.$delete(this.form.products,index)
        //再删除的时候就不能以序号为this.productsList的位置
        // for(let i = 0;i<this.productsList.length;i++){
        //   if(data.productId == this.productsList[i].productId){
        //     this.$set(this.productsList,i,{
        //         productId:data.productId,
        //         name:data.name,
        //         price:data.price,
        //         show:true,
        //         image:data.image
        //     })
        //     break;
        //   }
        // }
      },
      //获取全部品牌
      getAllBrand(){
        return new Promise((resolve,reject) =>{
          this.$api.common.getAllBrands().then((res) =>{
            resolve(res)
          })
        })
      },
      // 获取城市列表
      getCityList(){
        return new Promise((resolve,reject) =>{
          this.$api.common.getCityList().then((res) =>{
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      imgs,
      choseTime
    },
    created(){
      this.$stamp(null,this.$route.query)
      this.$store.state.loading = true
      if(this.$store.state.cityList.length == 0){
        this.getCityList().then(res=>{
          this.$stamp(null,res)
          this.$store.state.cityList = res.data.data
          this.citys = res.data.data
          this.isSubmit = this.$route.query.isSubmit
          this.$store.state.loading = false
        })
      }else{
        this.citys = this.$store.state.cityList
        this.isSubmit = this.$route.query.isSubmit
        this.$store.state.loading = false
      }
    }
}
</script>

<style>
  .hotDetail_head div{ 
    width:80px;   
    color: rgb(255, 255, 255);
    background-color: rgb(237, 111, 0);
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 30px;
  }
  .hotDetail_form{
    box-sizing:border-box;
    padding:15px;
    background-color:#ffffff;
    border-radius:5px;
    margin-top:20px;
  }
  .hotDetail_img li,.hotDetail_img .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .hotDetail_img .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
  .hotDetail_addProducts{
    width:100px;
    height:100px;
    display:flex;
    flex-direction:column;
    align-items:center;
    color:#ffffff;
    background-color:#000000;
    border-radius:5px;
    justify-content:center;
    cursor:pointer;
  }
  .hotDetail_addProducts span{
    line-height:1;
  }
  .hotDetail_addProducts:first-child span{
    padding:5px 0;
  }
  .hotDetailBox .el-dialog{
    border-radius:5px;
  }
  .hotDetailBox .el-dialog__header{
    background-color:#ed6f00;
    border-radius: 5px 5px 0 0;
  }
  .hotDetailBox .el-dialog__header span,.hotDetailBox .el-dialog__header i{
    color:#ffffff;
  }
  .hotDetailBox_head{
    display:flex;
    align-items:center;
  }
  .hotDetailBox_title{
    color:#000000;
    padding-right:20px;
  }
  .hotDetailBox_head div:nth-child(2){
    padding-right:20px;
  }
  .hotDetailBox_head input{
    border:0;
    background-color:#e4e4e4;
  }
  .hotDetailBox_option .el-select__caret{
    color:#000000!important;
  }
  .hotDetailBox_option input{
    background-color:#ffffff;
  }
  .hotDetailBox_see{
    box-sizing:border-box;
    padding:10px 20px;
    border-radius:30px;
    border:1px solid #ed6f00;
  }
  .hotDetailBox_body{
    margin:15px 0;
  }
  .hotDetailBox_body ul li{
    border-top:1px solid #f1f1f1;
    box-sizing:border-box;
    padding:15px;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .hotDetailBox_body_left{
    display:flex;
    align-items:center;
  }
  .hotDetailBox_body_left img{
    width:60px;
    height:60px;
    border-radius:5px;
  }
  .hotDetailBox_body_left div{
    display:flex;
    flex-direction:column;
    padding-left:10px;
    justify-content:space-between;
    height: 60px;
  }
  .hotDetail_products_list ul li{
    position:relative;
    float:left;
    margin-left:10px;
  }
  .hotDetail_products_list ul li img{
    width:100px;
    height:100px;
    border-radius:5px;
  }
  .hotDetail_products_list ul li i{
    position:absolute;
    top: -8px;
    right: -8px;
    font-size: 18px;
    cursor:pointer;
  }
  .hotDetail_choose_city_box .el-radio-group{
    display: flex;
    align-items: center;
  }
  .hotDetail_choose_city_box .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .hotDetail_choose_city_box .el-form-item__content{
    padding-top:12px;
  }
  .hotDetail_time .el-form-item__content{
    padding-top:0;
  } 
  .hotDetail_choose_city_box .el-radio__inner{
    border-color:#000000;
  }
  .hotDetail_choose_city_box .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .hotDetail_choose_city_box .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .hotDetail_choose_city_box .el-range-editor--small.el-input__inner{
    border:0;
  }
  .hotDetail_radio .el-radio{
    color:#000000;
  }
  .hotDetail_radio .el-radio__inner{
    border-color:#000000;
  }
  .hotDetail_radio .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: #000000;
    background: #000000;
  }
  .hotDetail_radio .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#000000;
  }
  .hotDetail_radio .el-range-editor--small.el-input__inner{
    border:0;
  }
</style>
