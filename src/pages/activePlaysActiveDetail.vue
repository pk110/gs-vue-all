<template>
  <div class="activesPlaysActiveDetail">
    <div class="activesPlaysActiveDetail_back">
      <router-link to="/manager/activePlays"><i class="el-icon-arrow-left"></i>返回列表</router-link>
    </div>
    <!--登陆奖励创建-->
    <div class="activesPlaysActiveDetail_box" v-if="status == 0">
      <el-form :model="form0" :rules="rules0" ref="ruleForm0" label-width="100px" class="demo-ruleForm">
        <el-form-item label="有效期:" prop="time" class="activesPlaysActiveDetail_radio">
          <choseTime @getTime="getTime" />
        </el-form-item>
        <el-form-item label="优惠券:" prop="coupons">
          <addCoupon @getCoupon="getCoupon" :status="status" />
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
           <el-input v-model="form0.content" type="textarea" :rows="5" style="width:400px;" placeholder="请输入登陆奖励活动说明!"></el-input>
        </el-form-item>
        <el-form-item label="说明:">
            用户每日第一次登录时候获取的奖励
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submitForm0('ruleForm0')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--礼盒创建-->
    <div class="activesPlaysActiveDetail_box" v-else-if="status == 1">
      <el-form :model="form1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="有效期:">
          长久有效
        </el-form-item>
        <el-form-item label="可领取人数:">
          10人
        </el-form-item>
        <el-form-item label="优惠券:" prop="coupons">
          <addCoupon @getCoupon="getCoupon" :status="status" />
          <el-input :disabled="true" v-model="content" type="textarea" :rows="5" style="width:400px;margin-top:15px;" placeholder="!"></el-input>
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
           <el-input :disabled="true" v-model="form1.content" type="textarea" :rows="5" style="width:400px;" placeholder="!"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submitForm1('ruleForm1')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--分享拉新创建-->
    <div class="activesPlaysActiveDetail_box" v-else-if="status == 2">
      <el-form :model="form2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="有效期:" prop="time" class="activesPlaysActiveDetail_radio">
          <choseTime @getTime="getTime" />
        </el-form-item>
        <el-form-item label="活动文字:">
          <el-input  v-model="form2.ActiveWord" type="textarea" :rows="5" style="width:400px;" placeholder="请输入活动文字"></el-input>
        </el-form-item>
        <el-form-item label="优惠券:" prop="coupons">
          <addCoupon @getCoupon="getCoupon" :status="status" />
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
           <el-input  v-model="form2.content" type="textarea" :rows="5" style="width:400px;" placeholder="请输入活动内容"></el-input>
        </el-form-item>
        <el-form-item label="说明:">
            以新人完成交易为准，交易成功，邀请人可获得同样的奖励
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submitForm2('ruleForm2')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--精细化运营创建-->
    <div class="activesPlaysActiveDetail_box" v-else-if="status == 3">
      <el-form :model="form3" :rules="rules3" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
        <el-form-item label="筛选条件:" prop="userId" class="activesPlaysActiveDetail_radio">
          <el-radio-group v-model="userId" @change="choseUsers">
            <el-radio :label="0">全部用户</el-radio>
            <el-radio :label="1">指定标签</el-radio>
          </el-radio-group>  
        </el-form-item>     
        <transition name="el-zoom-in-top">
          <div v-show="showUsers">
            <el-form-item label="购买次数:">
              <el-input size="mini" style="width:150px;" v-model="startBuyNum" placeholder="请输入起始购买次数"></el-input>&nbsp;———&nbsp;
              <el-input size="mini" style="width:150px;" v-model="endBuyNum" placeholder="请输入最后购买次数"></el-input>&nbsp;次
            </el-form-item>
            <el-form-item label="平均客单价:">
              <el-input size="mini" style="width:155px;" v-model="startCustomNum" placeholder="请输入起始平均客单价"></el-input>&nbsp;———&nbsp;
              <el-input size="mini" style="width:155px;" v-model="endCustomNum" placeholder="请输入最后平均客单价"></el-input>&nbsp;元
            </el-form-item>
            <el-form-item label="性别:" class="activePlaysActiveDetail_radio">
              <el-radio-group v-model="sex">
                <el-radio :label="items.sexId" v-for="items in sexes" :key="items.sexId">{{items.sexName}}</el-radio>
              </el-radio-group>   
            </el-form-item>
            <el-form-item label="地区:">
              <v-distpicker @selected="onSelected"></v-distpicker>  
            </el-form-item>
            <el-form-item label="购买品类:" class="activePlaysActiveDetail_radio">
              <el-radio-group v-model="buyClass">
                <el-radio :label="items.classId" v-for="items in classes" :key="items.classId">{{items.className}}</el-radio>
              </el-radio-group>   
            </el-form-item>
          </div>
        </transition>
        <el-form-item label="活动内容:" prop="content">
           <el-input  v-model="form3.content" type="textarea" :rows="5" style="width:400px;" placeholder="请输入活动内容"></el-input>
        </el-form-item>
        <el-form-item label="说明:">
            针对选中的用户标签/无差别发放优惠券
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submitForm3('ruleForm3')">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button style="background-color:#000;color:#fff;padding:7px 20px;border-radius:30px;border-color:#000;" type="primary" @click="sendCoupon()">批量发券</el-button>
      <el-table
        class="activePlaysActiveDetail_table"
        ref="multipleTable"
        :data="dishTable"
        tooltip-effect="dark"
        style="width: 100%;margin-top:10px;"
        @selection-change="handleDishChange">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="微信号"
          align="center"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="购买次数">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="平均客单价">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="地址区域">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="购买类别">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!--弹窗-->
      <el-dialog title="发券" :visible.sync="sendCouponBox" width="40%" center class="addCouponBox">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="优惠券类型:" prop="couponType" class="activesPlaysActiveDetail_radio">
            <el-radio-group v-model="form.couponType">
              <el-radio :label="items.couponTypeName" v-for="items in couponTypes" :key="items.couponTypeId">{{items.couponTypeName}}</el-radio>
            </el-radio-group>  
          </el-form-item>
          <el-form-item label="勾选菜品:" prop="dishes">
            <el-table
              ref="multipleTable"
              :data="form.dishes"
              tooltip-effect="dark"
              style="width: 100%"
              class="activePlaysActiveDetail_sendCoupon"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column
                label="菜品名称"
                align="center">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="所属品牌">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                label="库存数量"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </el-form-item>          
          <el-form-item label="活动期限:" prop="activeTime">
            <el-date-picker
              v-model="form.activeTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker> 
          </el-form-item> 
          <el-form-item label="每日发券时间:" prop="sendCouponTime">
            <el-time-picker
              arrow-control
              v-model="form.sendCouponTime"
              placeholder="每日发券时间">
            </el-time-picker>
          </el-form-item>
          <el-form-item>
            <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="comfiredSendCoupon('ruleForm')">确 定</el-button>
          </el-form-item>    
        </el-form>
      </el-dialog>
    </div>
    <!--门店领券创建-->
    <div class="activesPlaysActiveDetail_box" v-else-if="status == 4">
      <el-form :model="form4" :rules="rules4" ref="ruleForm4" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动范围:" prop="time" class="activesPlaysActiveDetail_radio">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="form4.checkedBrands" @change="handleCheckedBrandsChange" style="display: inline-block;margin-left:15px;">
            <el-checkbox v-for="items in brands" :label="items.brandId" :key="items.brandId">{{items.brandName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="优惠券:" prop="coupons">
          <addCoupon @getCoupon="getCoupon" :status="status" />
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
           <el-input  v-model="form4.content" type="textarea" :rows="5" style="width:400px;" placeholder="请输入活动内容"></el-input>
        </el-form-item>
        <el-form-item label="说明:">
            进店领券
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submitForm4('ruleForm4')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--设置商品特价创建-->
    <div class="activesPlaysActiveDetail_box" v-else-if="status == 5">
      <el-form :model="form5" :rules="rules5" ref="ruleForm5" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择商家:" prop="brandId">  
          <el-select v-model="form5.brandId" placeholder="请选择商家" @change="getBrands">
            <el-option
              v-for="item in brands"
              :key="item.brandId"
              :label="item.brandName"
              :value="item.brandId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择店铺:" prop="storeId">
          <el-select :disabled="storeDisable" v-model="form5.storeId" placeholder="请选择店铺">
            <el-option
              v-for="item in stores"
              :key="item.storeId"
              :label="item.storeName"
              :value="item.storeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券:" prop="dishes">
          <addDish @getDish="getDish" />
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submitForm5('ruleForm5')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--减配送费创建-->
    <div class="activesPlaysActiveDetail_box" v-else-if="status == 6">
      <el-form :model="form6" :rules="rules6" ref="ruleForm6" label-width="100px" class="demo-ruleForm">
        <el-form-item label="有效期:" prop="time" class="activesPlaysActiveDetail_radio">
          <choseTime @getTime="getTime" />
        </el-form-item>
        <el-form-item label="活动商家:" prop="storeId" class="activePlaysActiveDetail_radio">
          <el-radio-group v-model="storeId" @change="choseStores">
            <el-radio :label="0">全部商家</el-radio>
            <el-radio :label="1">指定商家</el-radio>
          </el-radio-group>      
          <transition name="el-zoom-in-top">
            <el-select v-show="showBrands" v-model="addStores" multiple placeholder="请选择指定商家" @change="choseManyStores">
              <el-option
                v-for="item in brands"
                :key="item.brandId"
                :label="item.brandName"
                :value="item.brandId">
              </el-option>
            </el-select>
          </transition>
        </el-form-item>
        <el-form-item label="优惠价格:" prop="money">
           <el-input  v-model.number="form6.money"  placeholder="请输入优惠价格" style="width:130px"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
           <el-input  v-model="form6.content" type="textarea" :rows="5" style="width:400px;" placeholder="请输入活动内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submitForm6('ruleForm6')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import choseTime from './../components/choseTime'
import addCoupon from './../components/addCoupon'
import addDish from './../components/addDish'
import VDistpicker from 'v-distpicker'
export default {
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
        // 登陆奖励创建
        form0: {
          time: 0,
          coupons:[],
          content:''
        },
        rules0: {
          time: [
            { required: true, message: '请输入活动有效期', trigger: 'blur' }
          ],
          coupons:[
            { required: true, message: '请添加优惠券', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        // 礼盒创建
        content:`礼盒玩法说明:                                                                          
A.每个礼盒里有0.03份成长菜。
B.每个礼盒最多3个人可能获得成长菜。
C.用户获取3次优惠券（商品折扣券、赠品券、现金券）后，就有机会获得成长菜。
D.不同菜品的折扣券和赠品券随机发放；
E.未关注公众号的用户会获得面值大的优惠券；
    有消费记录的用户会获得面值略小的优惠券。`,
        form1: {
          coupons:[],
          content:`1、礼盒中共设有商品折扣券、0.3份成长菜、赠品券、现金券4种奖品，点击领取之后随机获得，每人每次只能获得一种奖品。
2、每个礼盒里奖励供10名用户抢取。人数已满，则无法再获取奖励。
3、获得折扣券/现金券的用户，在有效期内使用时，可直接扣减相应商品金额。
4、成长菜累计满份时，可以兑换所提供的任意商品的抵用券，随时即可享用，使用时直接免去相应商品金额。
5、赠品券只有在购买指定商品时才能使用。在有效期内使用赠品券的用户，用商品原价购买商品之后，可以额外获得赠品券上赠送的其他商品。
6、请在有效期内使用优惠券（商品折扣券、赠品券、现金券）。
7、如果任何问题可联系客服。
8、宴十三保留法律范围内允许的对活动的解释权。`
        },
        rules1: {
          coupons:[
            { required: true, message: '请添加优惠券', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入活动内容', trigger: 'blur' }
          ]
        },
        // 分享拉新创建
        form2: {
          time: 0,
          coupons:[],
          ActiveWord:'',
          content:''
        },
        rules2: {
          time: [
            { required: true, message: '请输入活动有效期', trigger: 'blur' }
          ],
          coupons:[
            { required: true, message: '请添加优惠券', trigger: 'blur' }
          ],
          ActiveWord:[
            { required: true, message: '请输入活动文字', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        //精细化运营
        userId:0,
        sendCouponBox:false,
        showUsers:false,
        startBuyNum:'',
        endBuyNum:'',
        startCustomNum:'',
        endCustomNum:'',
        sex:0,
        sexes:[{
          sexName:'不限',
          sexId:0
        }],
        address:{},
        dishTable:[],
        multipleSelection:[],
        classes:[{
          classId:0,
          className:'全脂'
        }],
        buyClass:0,
        form3: {
          userId:0,
          content:''
        },
        rules3: {
          userId: [
            { required: true, message: '请填完整筛选条件', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        couponTypes:[{
          couponTypeId:0,
          couponTypeName:'抵用券'
        }],
        form: {
          couponType:0,
          dishes:[],
          activeTime:'',
          sendCouponTime:''
        },
        rules: {
          couponType: [
            { required: true, message: '请勾选优惠券类型', trigger: 'blur' }
          ],
          dishes: [
            { required: true, message: '请勾选菜品', trigger: 'blur' }
          ],
          activeTime:[
            { required: true, message: '请输入活动期限', trigger: 'blur' }
          ],
          sendCouponTime:[
            { required: true, message: '请输入每日发券时间', trigger: 'blur' }
          ]
        },
        // 门店领券创建
        checkAll: false,
        brands: [{
          brandName:'摇滚米粒',
          brandId:1
        },{
          brandName:'披萨店',
          brandId:2
        }],
        isIndeterminate: true,
        form4: {
          checkedBrands: [],
          coupons:[],
          content:''
        },
        rules4: {
          checkedBrands:[
            { required: true, message: '请勾选品牌', trigger: 'blur' }
          ],
          coupons:[
            { required: true, message: '请添加优惠券', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        //设置商品价格
        stores:[{
          storeName:'摇滚米粒',
          storeId:1
        },{
          storeName:'披萨店',
          storeId:2
        }],
        storeDisable:true,
        form5: {
          brandId: '',
          dishes:[],
          storeId:''
        },
        rules5: {
          brandId:[
            { required: true, message: '请选择商家', trigger: 'blur' }
          ],
          dishes:[
            { required: true, message: '请添加菜品', trigger: 'blur' }
          ],
          storeId:[
            { required: true, message: '请选择店铺', trigger: 'blur' }
          ]
        },
        //减配送费
        storeId:0,
        showBrands:false,
        addStores:[],
        form6: {
          time: 0,
          storeId:0,
          content:'',
          money:''
        },
        rules6: {
          time:[
            { required: true, message: '请输入活动有效期', trigger: 'blur' }
          ],
          storeId:[
            { required: true, message: '请勾选商家', trigger: 'blur' }
          ],
          money:[
            { required: true, message: '请输入优惠价格', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入活动内容', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
      }
    },
    methods:{
      //获取有效期
      getTime(val){
        this.$stamp(null,val)
        if(this.status == 0){
          this.form0.time = val
        }else if(this.status == 2){
          this.form2.time = val
        }else if(this.status == 6){
          this.form6.time = val
        }
      },
      //获取优惠券
      getCoupon(val){
        this.$stamp(null,val)
        if(this.status == 0){
          this.form0.coupons = val
        }else if(this.status == 1){
          this.form1.coupons = val
        }else if(this.status == 2){
          this.form2.coupons = val
        }else if(this.status == 4){
          this.form4.coupons = val
        }
      },
      // 登陆奖励创建
      submitForm0(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form0)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //礼盒创建
      submitForm1(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form1)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //分享拉新创建
      submitForm2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form2)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //精细化运营
      choseUsers(val){
        //选择标签
        this.$stamp(null,val)
        if(val == 0){
          this.showUsers = false
          this.form3.userId = val
        }else if(val == 1){
          this.showUsers = true
          this.form6.userId = ''
        }
      },
      submitForm3(formName){
        //搜索
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form3)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      handleDishChange(val){
        //多选菜品
        this.multipleSelection = val;
      },
      sendCoupon(){
        //批量发券
        if(this.multipleSelection.length == 0){
          this.$message.error('请选择客户!')
        }else{
          this.sendCouponBox = true
        }
      },
      onSelected(data) {
        //选择地区
        alert(data.province + ' | ' + data.city + ' | ' + data.area)
        this.address = data
      },
      comfiredSendCoupon(){
        //确认发券
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      handleSelectionChange(val){
        //多选批量发券的菜品
        this.form.dishes = val;
      },
      //进店领券创建
      submitForm4(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form4)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      handleCheckAllChange(val) {
        this.$stamp(null,val)
        let brands = []
        for(let i = 0;i<this.brands.length;i++){
          brands.push(this.brands[i].brandId)
        }
        this.form4.checkedBrands = val ? brands : [];
        this.isIndeterminate = false;
      },
      handleCheckedBrandsChange(value) {
        this.$stamp(null,value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.brands.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.brands.length;
      },
      // 设置商品价格
      submitForm5(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form5)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      getBrands(){
        // 给店铺释放可选
        this.storeDisable = false
      },
      getDish(val){
        //获得选择的菜品列表
        this.$stamp(null,val)
      },
      //减配送费
      choseStores(val){
        //选择店铺
        this.$stamp(null,val)
        if(val == 0){
          this.showBrands = false
          this.form6.storeId = val
        }else if(val == 1){
          this.showBrands = true
          this.form6.storeId = ''
        }
      },
      choseManyStores(val){
        //选择多个商店
        this.$stamp(null,val)
        this.form6.storeId = 1
      },
      submitForm6(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form6)
            // if(this.form6.storeId == 0)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
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
      choseTime,
      addCoupon,
      addDish,
      VDistpicker
    },
    created(){
      
    }
}
</script>

<style>
  .activesPlaysActiveDetail_back{
    box-size:border-box;
    padding:6px 15px;
    background-color:#ed6f00;
    color:#fff;
    display:inline-block;
    border-radius:30px;
  }
  .activesPlaysActiveDetail_back a{
    color:#fff;
  }
  .activesPlaysActiveDetail_radio .el-radio{
    color:#000000;
  }
  .activesPlaysActiveDetail_radio .el-radio__inner{
    border-color:#000000;
  }
  .activesPlaysActiveDetail_radio .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .activesPlaysActiveDetail_radio .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .activesPlaysActiveDetail_radio .el-range-editor--small.el-input__inner{
    border:0;
  }
  .activesPlaysActiveDetail_box{
    box-size:border-box;
    padding:15px;
    border-radius:5px;
    background-color:#fff;
    margin-top:15px;
  }
  .activePlaysActiveDetail_radio .el-radio__input.is-checked .el-radio__inner{
    border-color: #000;
    background: #000;
  }
  .activePlaysActiveDetail_radio .el-radio__input.is-checked+.el-radio__label{
    color:#000;
  }
  .activePlaysActiveDetail_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
    padding: 10px;
  }
  .activePlaysActiveDetail_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .activePlaysActiveDetail_table thead tr th:nth-child(9){
    border-radius:0 5px 0 0;
  }
  .activePlaysActiveDetail_sendCoupon thead tr th{
	  background-color: #494949;
    color:#ffffff;
    padding: 0px;
  }
  .activePlaysActiveDetail_sendCoupon thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .activePlaysActiveDetail_sendCoupon thead tr th:nth-child(4){
    border-radius:0 5px 0 0;
  }
</style>
