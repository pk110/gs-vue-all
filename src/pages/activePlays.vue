<template>
  <div class="activePlays">
    <!--上部分-->
    <div class="activePlays_top">
      <div class="activePlays_top_left">
        <div class="activePlays_top_left_top">
          <span>创建优惠券</span>
          <div class="activePlays_create" @click="createMethod">创建规则</div>
        </div>
        <div class="activePlays_top_left_bottom">
          <ul>
            <li>
              <span>新人无门槛现金券</span>
              <router-link :to="{name:'activePlaysCouponDetail',params:{value:0,data:{}}}">
                <div>立即创建</div>
              </router-link>
            </li>
            <li>
              <span>抵用券</span>
              <router-link :to="{name:'activePlaysCouponDetail',params:{value:1,data:{}}}">
                <div>立即创建</div>
              </router-link>
            </li>
            <li>
              <span>赠品券</span>
              <router-link :to="{name:'activePlaysCouponDetail',params:{value:2,data:{}}}">
                <div>立即创建</div>
              </router-link>
            </li>
            <li>
              <span>品牌现金券</span>
              <router-link :to="{name:'activePlaysCouponDetail',params:{value:3,data:{}}}">
                <div>立即创建</div>
              </router-link>
            </li>
            <li>
              <span>菜品折扣券</span>
              <router-link :to="{name:'activePlaysCouponDetail',params:{value:4,data:{}}}">
                <div>立即创建</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="activePlays_top_right">
        <div class="activePlays_top_right_top">
          <span>使用优惠券及创建活动</span>
        </div>
        <div class="activePlays_top_right_bottom">
          <ul>
            <li>
              <div class="activePlays_top_right_bottom_li">
                <div>
                  <span>登陆奖励</span>
                  <span style="color:#696969;padding-top:15px;">设置用户登录时候获取的优惠券</span>
                </div>
                <router-link :to="{name:'activePlaysActiveDetail',params:{value:0,data:{}}}">
                  <p>立即创建</p>
                </router-link>
              </div>
              <div class="activePlays_top_right_bottom_li">
              
              </div>
            </li>
            <li>
              <div class="activePlays_top_right_bottom_li">
                <div>
                  <span>礼盒</span>
                  <span style="color:#696969;padding-top:15px;">下单返券,设置礼盒内的优惠券</span>
                </div>
                <router-link :to="{name:'activePlaysActiveDetail',params:{value:1,data:{}}}">
                  <p>立即创建</p>
                </router-link>
              </div>
              <div class="activePlays_top_right_bottom_li">
                <div>
                  <span>门店领券</span>
                  <span style="color:#696969;padding-top:15px;">门店领取品牌现金券,用完可继续领取</span>
                </div>
                <router-link :to="{name:'activePlaysActiveDetail',params:{value:4,data:{}}}">
                  <p>立即创建</p>
                </router-link>
              </div>
            </li>
            <li>
              <div class="activePlays_top_right_bottom_li">
                <div>
                  <span>分享拉新奖励</span>
                  <span style="color:#696969;padding-top:15px;">新人在交易成功后,邀请人可获得同意的奖励</span>
                </div>
                <router-link :to="{name:'activePlaysActiveDetail',params:{value:2,data:{}}}">
                  <p>立即创建</p>
                </router-link>
              </div>
              <div class="activePlays_top_right_bottom_li">
                <div>
                  <span>设置商品特价</span>
                </div>
                <router-link :to="{name:'activePlaysActiveDetail',params:{value:5,data:{}}}">
                  <p>立即创建</p>
                </router-link>
              </div>
            </li>
            <li>
              <div class="activePlays_top_right_bottom_li">
                <div>
                  <span>精细化运营</span>
                  <span style="color:#696969;padding-top:15px;">定向发放优惠券</span>
                </div>
                <router-link :to="{name:'activePlaysActiveDetail',params:{value:3,data:{}}}">
                  <p>立即创建</p>
                </router-link>
              </div>
              <div class="activePlays_top_right_bottom_li">
                <div>
                  <span>减配送费</span>
                </div>
                <router-link :to="{name:'activePlaysActiveDetail',params:{value:6,data:{}}}">
                  <p>立即创建</p>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--下部分-->
    <div class="activePlays_bottom">
      <div class="activePlays_bottom_left">
        <div class="activePlays_bottom_left_top">
          <div style="width:180px;">已创优惠券</div>
          <el-radio-group v-model="currentCoupon" @change="chooseCoupon">
            <el-radio v-for="items in coupons" :label="items.index" :key="items.index">{{items.value}}</el-radio>
          </el-radio-group>
        </div>
        <el-table
          :data="couponsData"
          tooltip-effect="dark"
          style="width: 100%"
          class="coupons_table">
          <el-table-column
            prop="name"
            align="center"
            label="优惠券名称">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="有效期">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
          </el-table-column>
        </el-table>
      </div>
      <div class="activePlays_bottom_right">
        <div class="activePlays_bottom_right_top">
          <div style="width:80px;">已创建活动</div>
          <el-radio-group v-model="currentActive" @change="chooseActive">
            <el-radio v-for="items in actives" :label="items.index" :key="items.index">{{items.value}}</el-radio>
          </el-radio-group>
        </div>
        <el-table
          :data="activesData"
          tooltip-effect="dark"
          style="width: 100%"
          class="actives_table">
          <el-table-column
            prop="name"
            align="center"
            label="活动名称">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="活动状态">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="活动时间">
          </el-table-column>
          <el-table-column
            prop="content"
            align="center"
            label="活动内容">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--弹窗-->
    <el-dialog title="创建规则" :visible.sync="activePlaysBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="brandsList_Box">
        <el-form-item label="优惠券之间是否同时使用" prop="coupon">
          <div style="width:400px;display:flex;margin-top: 12px;">
            <div class="activePlays_couponUserColumn">
              <ul>
                <li></li>
                <li style="padding-top:3px;">抵用券</li>
                <li style="padding-top:19px;">赠品券</li>
                <li style="padding-top:20px;">品牌现金券</li>
                <li style="padding-top:20px;">菜品折扣券</li>
              </ul>
            </div>
            <div style="display:flex;flex-direction:column;">
              <div class="activePlays_couponUserRow">
                <ul>
                  <li>抵用券</li>
                  <li>赠品券</li>
                  <li>品牌现金券</li>
                  <li>菜品折扣券</li>
                </ul>
              </div>
              <div class="activePlays_checkbox">
                <el-checkbox-group v-model="form.coupon" @change="checkedCouponChange" style="margin-left:10px;">
                  <el-checkbox v-for="items in couponUser" :label="items" :key="items"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="文字描述" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="5" style="width:400px;" placeholder="请输入优惠券使用规则的文字描述，字数不得超过50 字!"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#000000;color:#fff;padding:7px 20px;border-radius:30px;" @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data () {
      return {
        couponUser:[11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44],
        form:{
          coupon:[],
          content:''
        },
        rules:{
          coupon:[
            { required: true, message: '请勾选优惠券之间是否能同时使用', trigger: 'blur'}
          ],
          content: [
            { required: true, message: '请输入优惠券使用规则', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        },
        activesData:[{
          name:'礼盒',
          status:'进行中',
          time:'2018-06-09至2018-11-10',
          content:'下单增送：赠品券、折扣券、现金券'
        },{
          name:'礼盒',
          status:'进行中',
          time:'2018-06-09至2018-11-10',
          content:'下单增送：赠品券、折扣券、现金券'
        },{
          name:'礼盒',
          status:'进行中',
          time:'2018-06-09至2018-11-10',
          content:'下单增送：赠品券、折扣券、现金券'
        },{
          name:'礼盒',
          status:'进行中',
          time:'2018-06-09至2018-11-10',
          content:'下单增送：赠品券、折扣券、现金券'
        },{
          name:'礼盒',
          status:'进行中',
          time:'2018-06-09至2018-11-10',
          content:'下单增送：赠品券、折扣券、现金券'
        }],
        couponsData:[{
          name:'新人现金券10元',
          time:'25天'
        },{
          name:'鱼香肉丝折扣券',
          time:'35天'
        },{
          name:'新人现金券10元',
          time:'25天'
        },{
          name:'酸菜鱼7折券',
          time:'15天'
        }],
        currentCoupon:[],
        coupons:[{
          index:0,
          value:'全部'
        },{
          index:1,
          value:'新人优惠券'
        },{
          index:2,
          value:'抵用券'
        },{
          index:3,
          value:'赠品券'
        },{
          index:4,
          value:'品牌现金券'
        },{
          index:5,
          value:'菜品折扣券'
        }],
        currentActive:[],
        actives:[{
          index:0,
          value:'全部'
        },{
          index:1,
          value:'下单返券'
        },{
          index:2,
          value:'分享拉新'
        },{
          index:3,
          value:'精细化运营'
        },{
          index:4,
          value:'特价商品'
        },{
          index:5,
          value:'门店领券'
        },{
          index:6,
          value:'减配送费 '
        }],
        activePlaysBox:false
      }
    },
    methods:{
      //选择优惠券
      chooseCoupon(val){
        this.$stamp(null,val)
      },
      //选择活动
      chooseActive(val){
        this.$stamp(null,val)
      },
      // 创建规则按钮弹窗
      createMethod(){
        this.activePlaysBox = true
      },
      //勾选优惠券是否使用
      checkedCouponChange(val){
        this.$stamp(null,val)
      },
      // 创建规则
      submit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form)
          } else {
            this.$message.error('创建失败!!');
            return false;
          }
        })
      },
      //重置
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.activePlaysBox = false
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
  .activePlays_top{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
  }
  .activePlays_top_left{
    width:400px;
    background-color:#fff;
    margin-right:15px;
    border-radius: 0 0 5px 5px;
  }
  .activePlays_top_left_top{
    border-radius:5px 5px 0 0;
    width:100%;
    background-color:#ed6f00;
    color:#fff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:5px 15px;
  }
  .activePlays_top_left_bottom{
    box-sizing:border-box;
    padding:0 15px;
  }
  .activePlays_top_left_bottom ul li{
    border-bottom:1px solid #f1f1f1;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:25.2px 0;
  }
  .activePlays_top_left_bottom ul li:last-child{
    border:0;
  }
  .activePlays_top_left_bottom ul li div{
    box-sizing:border-box;
    padding:5px 15px;
    background-color:#ed6f00;
    border-radius:30px;
    color:#fff;
  }
  .activePlays_top_right{
    flex:1;
    background-color:#fff;
    border-radius: 0 0 5px 5px;
  }
  .activePlays_top_right_top{
    border-radius:5px 5px 0 0;
    width:100%;
    background-color:#ed6f00;
    color:#fff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:10px 15px;
  }
  .activePlays_top_right_bottom{
    box-sizing:border-box;
    padding:0 15px;
  }
  .activePlays_top_right_bottom ul li{
    border-bottom:1px solid #f1f1f1;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:22.5px 0;
  }
  .activePlays_top_right_bottom ul li:last-child{
    border:0;
  }
  .activePlays_top_right_bottom ul li div:last-child{
    box-sizing:border-box;
    padding-left:15px;
    border-left:1px solid #f1f1f1;
  }
  .activePlays_top_right_bottom_li{
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex:1;
    box-sizing:border-box;
    padding:0 15px 0 0;
  }
  .activePlays_top_right_bottom_li div{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .activePlays_top_right_bottom_li p{
    box-sizing:border-box;
    padding:5px 15px;
    background-color:#ed6f00;
    border-radius:30px;
    color:#fff;
  }
  .activePlays_bottom{
    display:flex;
  }
  .activePlays_bottom_left{
    width:400px;
    background-color:#fff;
    margin-right:15px;
    border-radius:5px;
  }
  .activePlays_bottom_left_top{
    display:flex;
    justify-content:flex-start;
    align-items:baseline;
    width:100%;
    box-sizing:border-box;
    padding:15px;
  }
  .activePlays_bottom_left_top .el-radio{
    color:#000000;
  }
  .activePlays_bottom_left_top .el-radio:nth-child(4),.activePlays_bottom_left_top .el-radio:nth-child(6){
    margin-left:0;
  }
  .activePlays_bottom_left_top .el-radio:nth-child(n+3){
    margin-top:10px;
  }
  .activePlays_bottom_left_top .el-range-editor--small.el-input__inner{
    border:0;
  }
  .activePlays_bottom_left_top .el-radio__inner{
    border-color:#000000;
  }
  .activePlays_bottom_left_top .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .activePlays_bottom_left_top .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .coupons_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .activePlays_bottom_right{
    background-color:#fff;
    border-radius:5px;
    flex:1;
  }
  .activePlays_bottom_right_top{
    display:flex;
    justify-content:flex-start;
    align-items:baseline;
    width:100%;
    box-sizing:border-box;
    padding:15px;
  }
  .activePlays_bottom_right_top .el-radio{
    color:#000000;
  }
  .activePlays_bottom_right_top .el-range-editor--small.el-input__inner{
    border:0;
  }
  .activePlays_bottom_right_top .el-radio__inner{
    border-color:#000000;
  }
  .activePlays_bottom_right_top .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .activePlays_bottom_right_top .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
  .actives_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .activePlays_create{
    box-sizing:border-box;
    padding:5px 10px;
    border-radius:5px;
    cursor:pointer;
    background-color:#000;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #000;
    border-color: #000;
  }
  .activePlays_couponUserColumn ul{
    display:flex;
    flex-direction:column;
  }
  .activePlays_couponUserColumn ul li:first-child{
    padding-top:0;
  }
  .activePlays_couponUserColumn ul li{
    padding-top:15px;
    width:100px;
    height:25px;
    text-align:center;
    line-height:25px;
  }
  .activePlays_couponUserRow ul{
    display:flex;
    align-items:center;
  }
  .activePlays_couponUserRow ul li{
    width:100px;
    height:20px;
    text-align:center;
    line-height:20px;
  }
  .activePlays_checkbox .el-checkbox__label{
    display:none;
  }
  .activePlays_checkbox label{
    width:90px;
    text-align:center;
  }
  .activePlays_checkbox .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
</style>
