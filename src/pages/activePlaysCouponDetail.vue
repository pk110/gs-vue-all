<template>
  <div class="activesPlaysCouponDetail">
    <router-link to="/manager/activePlays">
      <div class="activesPlaysCouponDetail_back">
        <i class="el-icon-arrow-left"></i>
        <span>返回列表</span>
      </div>
    </router-link>
    <!--新人优惠券-->
    <div v-if="status == 0" class="activesPlaysCouponDetail_box">
      <el-form :model="form0" :rules="rules0" ref="ruleForm" label-width="120px">
        <el-form-item label="有效期:" prop="time" :class="longStatus" class="activesPlaysCouponDetail_radio">
          <el-radio-group v-model="time" @change="chooseTimeOne">
            <el-radio v-for="items in times" :label="items.value" :key="items.value">{{items.name}}</el-radio>
          </el-radio-group>&nbsp;
          <el-input v-model.number="longStatus !== ''?'':form0.time" :disabled="longStatus == ''?false:true" ref="days" style="width:90px;" placeholder="输入天数"></el-input>&nbsp;天
        </el-form-item>
        <el-form-item label="券的金额:" prop="money">
          <el-input v-model.number="form0.money" style="width:150px;" placeholder="请输入金额"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
          <el-input v-model="form0.content" type="textarea" :rows="5" style="width:400px;" placeholder="点击输入活动内容简介，字数不得超过50 字"></el-input>
        </el-form-item>
        <el-form-item>
          <span style="color:#ff3b21">说明：新人现金券，使用时间限制XXXXXXXXXX</span>
        </el-form-item>
        <el-form-item>
          <el-button v-dbClick class="activesPlaysCouponDetail_create" @click="form0Create('ruleForm')">创 建</el-button>
          <el-button v-dbClick class="activesPlaysCouponDetail_reset" @click="form0Reset('ruleForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--抵用券-->
    <div v-if="status == 1" class="activesPlaysCouponDetail_box">
      <el-form :model="form1" :rules="rules1" ref="ruleForm" label-width="150px">
        <el-form-item label="有效期:" prop="time" :class="longStatus" class="activesPlaysCouponDetail_radio">
          <el-radio-group v-model="time" @change="chooseTimeTwo">
            <el-radio v-for="items in times" :label="items.value" :key="items.value">{{items.name}}</el-radio>
          </el-radio-group>&nbsp;
          <el-input v-model.number="longStatus !== ''?'':form1.time" :disabled="longStatus == ''?false:true" ref="days" style="width:90px;" placeholder="输入天数"></el-input>&nbsp;天
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
          <el-input v-model="form1.content" type="textarea" :rows="5" style="width:400px;" placeholder="点击输入活动内容简介，字数不得超过50 字"></el-input>
        </el-form-item>
        <el-form-item label="成长菜可兑换菜品:" prop="dishes">
          <div><el-button class="activesPlaysCouponDetail_reset" @click="addDish">+ 新增菜品</el-button></div>
          <el-table
            :data="form1.dishes"
            tooltip-effect="dark"
            style="width: 100%"
            class="couponsa_table">
            <el-table-column
              prop="name"
              align="center"
              label="菜品名称">
            </el-table-column>
            <el-table-column
              prop="img"
              align="center"
              label="图片">
            </el-table-column>
            <el-table-column
              prop="brands"
              align="center"
              label="所属品牌">
            </el-table-column>
            <el-table-column
              prop="number"
              align="center"
              label="可兑换数量">
            </el-table-column>
            <el-table-column
              prop="status"
              align="center"
              label="能否与特价同时使用">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <span style="color:#ff3b21">说明：下单立减，使用时间限制XXXXXXXXXX</span>
        </el-form-item>
        <el-form-item>
          <el-button v-dbClick class="activesPlaysCouponDetail_create" @click="form1Create('ruleForm')">创 建</el-button>
          <el-button v-dbClick class="activesPlaysCouponDetail_reset" @click="form1Reset('ruleForm')">重 置</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="新增菜品"
        :visible.sync="addDishShow"
        width="50%"
        class="activesPlaysCouponDetail_addDishBox"
        center>
        <el-form :model="form1" :rules="rules1" ref="ruleForm" label-width="150px">
          <el-form-item label="有效期:" prop="time" :class="longStatus" class="activesPlaysCouponDetail_radio">
            <el-radio-group v-model="time" @change="chooseTimeTwo">
              <el-radio v-for="items in times" :label="items.value" :key="items.value">{{items.name}}</el-radio>
            </el-radio-group>&nbsp;
            <el-input v-model.number="longStatus !== ''?'':form1.time" :disabled="longStatus == ''?false:true" ref="days" style="width:90px;" placeholder="输入天数"></el-input>&nbsp;天
          </el-form-item>
          <el-form-item label="活动内容:" prop="content">
            <el-input v-model="form1.content" type="textarea" :rows="5" style="width:400px;" placeholder="点击输入活动内容简介，字数不得超过50 字"></el-input>
          </el-form-item>
          <el-form-item>
            <span style="color:#ff3b21">说明：下单立减，使用时间限制XXXXXXXXXX</span>
          </el-form-item>
          <el-form-item>
            <el-button v-dbClick class="activesPlaysCouponDetail_create" @click="form1Create('ruleForm')">创 建</el-button>
            <el-button v-dbClick class="activesPlaysCouponDetail_reset" @click="form1Reset('ruleForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--赠品券-->
    <div v-if="status == 2" class="activesPlaysCouponDetail_box">
      <el-form :model="form2" :rules="rules2" ref="ruleForm" label-width="120px">
        <el-form-item label="有效期:" prop="time" :class="longStatus" class="activesPlaysCouponDetail_radio">
          <el-radio-group v-model="time" @change="chooseTimeThree">
            <el-radio v-for="items in times" :label="items.value" :key="items.value">{{items.name}}</el-radio>
          </el-radio-group>&nbsp;
          <el-input v-model.number="longStatus !== ''?'':form2.time" :disabled="longStatus == ''?false:true" ref="days" style="width:90px;" placeholder="输入天数"></el-input>&nbsp;天
        </el-form-item>
        <el-form-item label="买入商品:" prop="product">  
          <el-select v-model="form2.product" placeholder="请选择买入菜品" @change="chooseProduct">
            <el-option
              v-for="item in products"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>&nbsp;
          <el-input v-model.number="form2.product == ''?'':nub" :disabled="form2.product == ''?true:false" ref="number" style="width:90px;" placeholder="输入个数"></el-input>&nbsp;个
        </el-form-item>
        <el-form-item label="赠送商品:" prop="donateProduct">
          <el-input v-model="form2.donateProduct" style="width:120px;" placeholder="输入赠送商品"></el-input>
        </el-form-item>
        <el-form-item label="当日赠品库存:" prop="ProductNub">
          <el-input v-model="form2.ProductNub" style="width:120px;" placeholder="输入赠送商品"></el-input>&nbsp;个
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
          <el-input v-model="form2.content" type="textarea" :rows="5" style="width:400px;" placeholder="点击输入活动内容简介，字数不得超过50 字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-dbClick class="activesPlaysCouponDetail_create" @click="form2Create('ruleForm')">创 建</el-button>
          <el-button v-dbClick class="activesPlaysCouponDetail_reset" @click="form2Reset('ruleForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--品牌现金券-->
    <div v-if="status == 3" class="activesPlaysCouponDetail_box">
      <el-form :model="form3" :rules="rules3" ref="ruleForm" label-width="120px">
        <el-form-item label="活动范围:" prop="actives">  
          <div style="display:flex;align-items:center;">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkedStore" style="padding-bottom: 5px;">全选</el-checkbox>
            <el-checkbox-group v-model="form3.actives" @change="checkedActiveChange" style="margin-left:10px;">
              <el-checkbox v-for="items in stores" :label="items.storeId" :key="items.storeId">{{items.storeName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="优惠信息:" prop="allMoney">  
            满&nbsp;<el-input v-model.number="form3.allMoney" style="width:90px;" placeholder="输入金额"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="" prop="money">  
            减&nbsp;<el-input v-model.number="form3.money"  style="width:90px;" placeholder="输入金额"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="有效期:" prop="time" :class="longStatus" class="activesPlaysCouponDetail_radio">
          <el-radio-group v-model="time" @change="chooseTimeFour">
            <el-radio v-for="items in times" :label="items.value" :key="items.value">{{items.name}}</el-radio>
          </el-radio-group>&nbsp;
          <el-input v-model.number="longStatus !== ''?'':form3.time" :disabled="longStatus == ''?false:true" ref="days" style="width:90px;" placeholder="输入天数"></el-input>&nbsp;天
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
          <el-input v-model="form3.content" type="textarea" :rows="5" style="width:400px;" placeholder="点击输入活动内容简介，字数不得超过50 字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-dbClick class="activesPlaysCouponDetail_create" @click="form3Create('ruleForm')">创 建</el-button>
          <el-button v-dbClick class="activesPlaysCouponDetail_reset" @click="form3Reset('ruleForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--菜品折扣券-->
    <div v-if="status == 4" class="activesPlaysCouponDetail_box">
      <el-form :model="form4" :rules="rules4" ref="ruleForm" label-width="120px">
        <el-form-item label="活动范围:" prop="actives">  
          <div style="display:flex;align-items:center;">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkedStoreTwo" style="padding-bottom: 5px;">全选</el-checkbox>
            <el-checkbox-group v-model="form4.actives" @change="checkedActiveChangeTwo" style="margin-left:10px;">
              <el-checkbox v-for="items in stores" :label="items.storeId" :key="items.storeId">{{items.storeName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="有效期:" prop="time" :class="longStatus" class="activesPlaysCouponDetail_radio">
          <el-radio-group v-model="time" @change="chooseTimeFive">
            <el-radio v-for="items in times" :label="items.value" :key="items.value">{{items.name}}</el-radio>
          </el-radio-group>&nbsp;
          <el-input v-model.number="longStatus !== ''?'':form4.time" :disabled="longStatus == ''?false:true" ref="days" style="width:90px;" placeholder="输入天数"></el-input>&nbsp;天
        </el-form-item>
        <el-form-item label="折扣菜品:" prop="couponProduct">
          <el-table
            :data="form4.couponProduct"
            class="activePlaysCouponDetail_table"
            style="width: 400px;">
            <el-table-column
              prop="name"
              align="center"
              label="菜品名称">
            </el-table-column>
            <el-table-column
              prop="Logo"
              align="center"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="headImg"
              align="center"
              label="打几折">
            </el-table-column>
            <el-table-column
              prop="detail"
              align="center"
              label="原价">
            </el-table-column>
            <el-table-column
              align="center"
              label="现价">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
          <el-input v-model="form4.content" type="textarea" :rows="5" style="width:400px;" placeholder="点击输入活动内容简介，字数不得超过50 字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-dbClick class="activesPlaysCouponDetail_create" @click="form4Create('ruleForm')">创 建</el-button>
          <el-button v-dbClick class="activesPlaysCouponDetail_reset" @click="form4Reset('ruleForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--弹窗-->
    <el-dialog title="添加折扣商品" :visible.sync="activePlaysCouponDetailBox" width="40%" center>
      <!--<el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="brandsList_Box">
        <el-form-item label="输入品牌" prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logo">
          <imgs :files="form.logo" class="brandsList_logo" :limitImg="1" @imgFiles="getLogoImg" />
        </el-form-item>
        <el-form-item label="品牌头图" prop="headImg">
          <imgs :files="form.headImg" class="brandsList_head" :limitImg="1" @imgFiles="getHeadImg" />
        </el-form-item>
        <el-form-item label="品牌文字描述" prop="brandsDetail">
          <el-input
            v-model="form.brandsDetail"
            type="textarea"
            placeholder="请输入品牌文字描述">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#000000;color:#fff;padding:7px 20px;border-radius:30px;" @click="resetForm('ruleForm')">取 消</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
    data () {
      return {
        activePlaysCouponDetailBox:false,
        // 共用有效期选择
        longStatus:'no_error',
        time:0,
        times:[{
          name:'长久有效',
          value:0
        },{
          name:'自定义天数',
          value:1
        }],
        //新人优惠券
        form0:{
          time:0,
          money:'',
          content:''
        },
        rules0:{
          time: [
            { required: true, message: '请输入券的有效期', trigger: 'blur'},
            { type: 'number', message: '有效期必须为数字值', trigger: 'blur'}
          ],
          money: [
            { required: true, message: '请输入券的金额', trigger: 'blur'},
            { type: 'number', message: '券的金额必须为数字值', trigger: 'blur'}
          ],
          content: [
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        },
        //抵用券
        form1:{
          time:0,
          dishes:[],
          content:''
        },
        rules1:{
          time: [
            { required: true, message: '请输入券的有效期', trigger: 'blur'},
            { type: 'number', message: '有效期必须为数字值', trigger: 'blur'}
          ],
          dishes: [
            { required: true, message: '请添加菜品', trigger: 'blur'},
          ],
          content: [
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        },
        addDishShow:false,
        //赠品券
        form2:{
          time:0,
          product:'',
          donateProduct:'',
          ProductNub:'',
          content:''
        },
        rules2:{
          time: [
            { required: true, message: '请输入券的有效期', trigger: 'blur'},
            { type: 'number', message: '有效期必须为数字值', trigger: 'blur'}
          ],
          product: [
            { required: true, message: '请选择买入的菜品', trigger: 'blur'},
          ],
          donateProduct:[
            { required: true, message: '请输入赠送商品', trigger: 'blur'}
          ],
          ProductNub:[
            { required: true, message: '请输入赠品库存', trigger: 'blur'}
          ],
          content: [
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        },
        products:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        nub:1,
        //品牌现金券券
        form3:{
          time:0,
          actives:[],
          allMoney:'',
          money:'',
          content:''
        },
        rules3:{
          time: [
            { required: true, message: '请输入券的有效期', trigger: 'blur'},
            { type: 'number', message: '有效期必须为数字值', trigger: 'blur'}
          ],
          actives:[
            { required: true, message: '请勾选商铺', trigger: 'blur'}
          ],
          allMoney: [
            { required: true, message: '请输入满时金额', trigger: 'blur'},
          ],
          money: [
            { required: true, message: '请输入满减金额', trigger: 'blur'},
          ],
          content: [
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        },
        checkAll:false,
        isIndeterminate: true,
        stores:[{
          storeId:1,
          storeName:'摇滚米粒'
        }],
        //菜品折扣券
        form4:{
          time:0,
          actives:[],
          couponProduct:[],
          content:''
        },
        rules4:{
          time: [
            { required: true, message: '请输入券的有效期', trigger: 'blur'},
            { type: 'number', message: '有效期必须为数字值', trigger: 'blur'}
          ],
          couponProduct:[
            { required: true, message: '请创建打折菜品', trigger: 'blur'}
          ],
          actives:[
            { required: true, message: '请勾选商铺', trigger: 'blur'}
          ],
          content: [
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //0000000000000000000000000000000000000000新人优惠券//
      //选择时间
      chooseTimeOne(val){
        this.$stamp(null,val)
        if(val == 0){
          this.$nextTick(()=>{
            this.longStatus = 'no_error'
            this.form0.time = 0
            this.$refs.days.blur()
          })
        }else if(val == 1){
          this.$nextTick(()=>{
            this.longStatus = ''
            this.form0.time = ''
            this.$refs.days.focus()
          })
        }
      },
      // 创建
      form0Create(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form0)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //重置
      form0Reset(formName){
        this.longStatus = 'no_error'
        this.time = 0
        this.form0.time = 0
        this.$refs[formName].resetFields();
      },
      //111111111111111111111111111111111111111111抵用券//
      //选择时间
      chooseTimeTwo(val){
        this.$stamp(null,val)
        if(val == 0){
          this.$nextTick(()=>{
            this.longStatus = 'no_error'
            this.form1.time = 0
            this.$refs.days.blur()
          })
        }else if(val == 1){
          this.$nextTick(()=>{
            this.longStatus = ''
            this.form1.time = ''
            this.$refs.days.focus()
          })
        }
      },
      // 创建
      form1Create(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form1)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //重置
      form1Reset(formName){
        this.longStatus = 'no_error'
        this.time = 0
        this.form1.time = 0
        this.$refs[formName].resetFields();
      },
      // 添加菜品
      addDish(){
        this.addDishShow = true
      },
      //2222222222222222222222222222222222222222赠品券//
      //选择时间
      chooseTimeThree(val){
        this.$stamp(null,val)
        if(val == 0){
          this.$nextTick(()=>{
            this.longStatus = 'no_error'
            this.form2.time = 0
            this.$refs.days.blur()
          })
        }else if(val == 1){
          this.$nextTick(()=>{
            this.longStatus = ''
            this.form2.time = ''
            this.$refs.days.focus()
          })
        }
      },
      chooseProduct(val){
        this.$stamp(null,val)
        this.$nextTick(()=>{
          this.$refs.number.focus()
        })
      },
      // 创建
      form2Create(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form2)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //重置
      form2Reset(formName){
        this.longStatus = 'no_error'
        this.time = 0
        this.form2.time = 0
        this.$refs[formName].resetFields();
      },
      //2222222222222222222222222222222222222222品牌现金券//
      //全选勾选店铺
      checkedStore(val) {
        let stores = []
        for(let i = 0;i<this.stores.length;i++){
          stores.push(this.stores[i].storeId)
        }
        this.form3.actives = val ? stores : [];
        this.isIndeterminate = false;
      },
      checkedActiveChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.stores.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.stores.length;
      },
      chooseTimeFour(val){
        this.$stamp(null,val)
        if(val == 0){
          this.$nextTick(()=>{
            this.longStatus = 'no_error'
            this.form3.time = 0
            this.$refs.days.blur()
          })
        }else if(val == 1){
          this.$nextTick(()=>{
            this.longStatus = ''
            this.form3.time = ''
            this.$refs.days.focus()
          })
        }
      },
      // 创建
      form3Create(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form3)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //重置
      form3Reset(formName){
        this.time = 0
        this.form3.time = 0
        this.$refs[formName].resetFields();
      },
      //333333333333333333333333333333333333333333菜品折扣券//
      checkedStoreTwo(val) {
        let stores = []
        for(let i = 0;i<this.stores.length;i++){
          stores.push(this.stores[i].storeId)
        }
        this.form4.actives = val ? stores : [];
        this.isIndeterminate = false;
      },
      checkedActiveChangeTwo(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.stores.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.stores.length;
      },
      chooseTimeFive(val){
        this.$stamp(null,val)
        if(val == 0){
          this.$nextTick(()=>{
            this.longStatus = 'no_error'
            this.form4.time = 0
            this.$refs.days.blur()
          })
        }else if(val == 1){
          this.$nextTick(()=>{
            this.longStatus = ''
            this.form4.time = ''
            this.$refs.days.focus()
          })
        }
      },
      // 创建
      form4Create(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form4)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //重置
      form4Reset(formName){
        this.time = 0
        this.form4.time = 0
        this.$refs[formName].resetFields();
      }
    },
    computed: {
      status:{
        get:function(){
          return this.$route.params.value
        },
        set:function(){

        }
      }
    },
    components: {
      
    },
    created(){
      
    }
}
</script>

<style>
  .activesPlaysCouponDetail_back{
    box-sizing:border-box;
    padding:8px 15px;
    background-color:#ed6f00;
    color:#fff;
    display:inline-block;
    border-radius:30px;
  }
  .activesPlaysCouponDetail_box{
    box-sizing:border-box;
    padding:15px;
    background-color:#fff;
    margin-top:20px;
  }
  .activesPlaysCouponDetail_create{
    box-sizing:border-box;
    padding:10px 30px;
    background-color:#ff3b21;
    border-radius:30px;
    color:#fff;
  }
  .activesPlaysCouponDetail_reset{
    box-sizing:border-box;
    padding:10px 30px;
    background-color:#000000;
    border-radius:30px;
    color:#fff;
  }
  .no_error .el-form-item__error{
    display:none;
  }
  .no_error .el-input__inner{
    border-color:#dcdfe6!important;
  }
  .activesPlaysCouponDetail_radio .el-radio{
    color:#000000;
  }
  .activesPlaysCouponDetail_radio .el-radio__inner{
    border-color:#000000;
  }
  .activesPlaysCouponDetail_radio .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .activesPlaysCouponDetail_radio .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .activesPlaysCouponDetail_radio .el-range-editor--small.el-input__inner{
    border:0;
  }
  .couponsa_table thead tr th{
    padding:0;
	  background-color: #494949;
    color:#ffffff;
  }
  .couponsa_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .couponsa_table thead tr th:nth-child(7){
    border-radius:0 5px 0 0;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #000;
    border-color: #000;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#000;
  }
  .activesPlaysCouponDetail thead tr th{
	  background-color: #494949;
    color:#ffffff;
    padding:0;
  }
  .activesPlaysCouponDetail thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .activesPlaysCouponDetail thead tr th:nth-child(5){
    border-radius:0 5px 0 0;
  }
</style>
