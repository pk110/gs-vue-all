<template>
  <div>
    <div class="brandsDishesDetail_head">
      <router-link to="/manager/brandsDishes">
        <i class="el-icon-arrow-left"></i>&nbsp;返回列表
      </router-link>
    </div>
    <!--表单-->
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="brandsDishesDetail_Box">
      <el-form-item label="输入菜名:" prop="dishes">
        <el-input v-model="form.dishes" placeholder="请输入菜名" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="菜名描述:" prop="dishesDetail">
        <el-input
          style="width:250px"
          v-model="form.dishesDetail"
          type="textarea"
          placeholder="请输入菜名描述">
        </el-input>
      </el-form-item>
      <el-form-item label="详情页:" prop="dishesDetailPage">
        <el-input v-model="form.dishesDetailPage" style="width:220px" placeholder="请输入链接跳转地址"></el-input>
      </el-form-item>
      <!--<el-form-item label="菜品标签:" prop="tags">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox v-for="items in dishesTags" :label="items.name" :key="items.name">{{items.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>-->
      <el-form-item label="图片:" prop="dishesImg">
        <imgs :files="form.dishesImg" class="brandsDishesDetail_img" :limitImg="1" @imgFiles="getDishesImg" />
      </el-form-item>
      <!--<el-form-item label="规格:">
        <tag :standard="form.standard" @dishesPrice="dishesPrice" />
      </el-form-item>-->
      <!--<el-form-item label="规格:" prop="dynamicTags">
        <el-tag
          :key="tag"
          v-for="tag in form.dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="tagVisible"
          v-model="spec"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
      </el-form-item>
      <el-form-item label="规格属性:">
        <div style="display:flex;align-items:center;">
          <span style="padding-right:10px;padding-bottom: 5px;">分量:</span>
          <el-checkbox-group v-model="form.weights" @change="weightsChange">
            <el-checkbox v-for="items in weights" :label="items.id" :key="items.name">{{items.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="display:flex;align-items:center;">
          <span style="padding-right:10px;padding-bottom: 5px;">辣度:</span>
          <el-checkbox-group v-model="form.hot" @change="hotChange">
            <el-checkbox v-for="items in hot" :label="items.id" :key="items.name">{{items.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="价格设置:" style="width:530px" prop="price">
        <el-table
          :data="data"
          :span-method="objectSpanMethod"
          class="brandsDishesDetail_price"
          style="width: 100%;">
          <el-table-column
            prop="name"
            align="center"
            label="规格">
          </el-table-column>
          <el-table-column
            prop="type"
            align="center"
            label="规格">
          </el-table-column>
          <el-table-column
            prop="goStore"
            align="center"
            label="自提价格">
            <template slot-scope="scope">
              <el-input class="brandsDishesDetail_priceDetail" v-model="scope.row.goStorePrice" placeholder="自提价格"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="goHome"
            align="center"
            label="外卖价格">
            <template slot-scope="scope">
              <el-input class="brandsDishesDetail_priceDetail" v-model="scope.row.goHomePrice" placeholder="外卖价格"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="boxPrice"
            align="center"
            label="餐盒费">
            <template slot-scope="scope">
              <el-input class="brandsDishesDetail_priceDetail" v-model="scope.row.boxPrice" placeholder="餐盒费"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="hotData"
          :span-method="objectSpanMethod"
          class="brandsDishesDetail_price_two"
          style="width: 100%;">
          <el-table-column
            prop="name"
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goStore"
            align="center">
            <template slot-scope="scope">
              <el-input class="brandsDishesDetail_priceDetail" v-model="scope.row.goStorePrice" placeholder="自提价格"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="goHome"
            align="center">
            <template slot-scope="scope">
              <el-input class="brandsDishesDetail_priceDetail" v-model="scope.row.goHomePrice" placeholder="外卖价格"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="boxPrice"
            align="center">
            <template slot-scope="scope">
              <el-input class="brandsDishesDetail_priceDetail" v-model="scope.row.boxPrice" placeholder="餐盒费"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>-->
      <el-form-item label="食材添加:" prop="dynamicDishes">
        <!--<el-tag
          :key="tag"
          v-for="tag in form.dynamicDishes"
          closable
          :disable-transitions="false"
          @close="handleCloseDishes(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="dishesVisible"
          v-model="myDishes"
          ref="saveTagInputDishes"
          size="small"
          @keyup.enter.native="handleInputConfirmDishes"
          @blur="handleInputConfirmDishes"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInputDishes">添加</el-button>-->
        <el-tag
          v-for="tag in form.dynamicDishes"
          :key="tag.name"
          closable
          @close="handleClose(tag)">
          {{tag.name}}
        </el-tag>
        <el-button  size="small" @click="addTag()">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="padding:7px 20px;background-color:#ff3b21;color:#fff;border-color:#ff3b21;border-radius:30px;">确 定</el-button>
        <el-button @click="resetForm('ruleForm')" style="padding:7px 20px;background-color:#000;color:#fff;border-radius:30px;">取 消</el-button>
      </el-form-item>
    </el-form>
    <!--弹窗-->
    <el-dialog
      title="食材列表"
      :visible.sync="tagBox"
      width="30%"
      center>
      <el-checkbox-group v-model="tag" class="brandsDishDetail_box">
        <el-checkbox v-for="items in tagList" :label="items.tagId" :key="items.tagId">{{items.name}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button  style="padding:7px 20px;background-color:#ff3b21;color:#fff;border-color:#ff3b21;border-radius:30px;" @click="comfiredDish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import imgs from './../components/img.vue'
// import tag from './../components/tag.vue'
export default {
    data () {
      return {
        tag:[],
        tagList:[{
          tagId:1,
          name:'食g材'
        },{
          tagId:2,
          name:'食2材'
        },{
          tagId:3,
          name:'食a材'
        }],
        dishesTags:[{
          name:'炒鸡'
        },{
          name:'嘿嘿'
        },{
          name:'渣渣'
        },{
          name:'哈哈'
        }],
        myDishes:'',
        dishesVisible:false,
        form:{
          dishes:'',
          dishesDetail:'',
          dishesDetailPage:'',
          // tags:[],
          dishesImg:[],
          // standard:[],
          dynamicDishes:[]
        },
        rules: {
          dishes: [
            { required: true, message: '请输入菜品名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          dishesDetailPage:[
            { required: true, message: '请输入详情页地址', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          // tags:[
          //   { required: true, message: '请添加菜品标签', trigger: 'blur' }
          // ],
          dishesImg:[
            { required: true, message: '请添加菜品图片', trigger: 'blur' }
          ],
          dynamicDishes:[
            { required: true, message: '请添加食材信息', trigger: 'blur' }
          ]
        },
        tagBox:false
      }
    },
    methods:{
      //提交订单
      submitForm(formName){
        // if(this.form.standard.length !== 0){
        //   for(let i = 0;i<this.form.standard.length;i++){
        //     for(let j = 0;j<this.form.standard[i].props.length;j++){
        //       if(this.form.standard[i].props[j].goStorePrice !== '' && this.form.standard[i].props[j].goHomePrice !== '' && this.form.standard[i].props[j].boxPrice !== ''){
        //         continue;
        //       }else{
        //         this.$message.error('请补全菜品规格信息!!');
        //         return false;
        //       }
        //     }
        //   }
        // }
        // console.log(this.form.standard)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$stamp(null,this.form)
          } else {
            this.$message.error('error submit!!');
            return false;
          }
        });
      },
      //重置取消
      resetForm(formName){
        // this.standard = []
        this.$refs[formName].resetFields();
        this.$stamp(null,this.form)
      },
      //合并行
      // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   if (columnIndex === 0) {
      //     if (rowIndex % 3 === 0) {
      //       return {
      //         rowspan: 3,
      //         colspan: 1
      //       };
      //     } else {
      //       return {
      //         rowspan: 0,
      //         colspan: 0
      //       };
      //     }
      //   }
      // },
      //食材添加
      handleCloseDishes(tag) {
        this.form.dynamicDishes.splice(this.form.dynamicDishes.indexOf(tag), 1);
      },
      showInputDishes() {
        this.dishesVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInputDishes.$refs.input.focus();
        });
      },
      handleInputConfirmDishes() {
        let myDishes = this.myDishes;
        if (myDishes) {
          this.form.dynamicDishes.push(myDishes);
        }
        this.dishesVisible = false;
        this.myDishes = '';
      },
      //规格添加
      // handleClose(tag) {
      //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      // },
      // showInput() {
      //   this.tagVisible = true;
      //   this.$nextTick(_ => {
      //     this.$refs.saveTagInput.$refs.input.focus();
      //   });
      // },
      // handleInputConfirm() {
      //   let spec = this.form.spec;
      //   if (spec) {
      //     this.dynamicTags.push(spec);
      //   }
      //   this.tagVisible = false;
      //   this.form.spec = '';
      // },
      // 去掉食材
      handleClose(tag) {
        let newList = []
        for(let i = 0;i<this.form.dynamicDishes.length;i++){
          newList.push(this.form.dynamicDishes[i].tagId)
        }
        //去掉表单里的食材
        if(newList.indexOf(tag.tagId) > -1){
          this.form.dynamicDishes.splice(newList.indexOf(tag.tagId), 1);
        }
        // 去掉弹框里的食材
        if(this.tag.indexOf(tag.tagId) > -1){
          this.tag.splice(this.tag.indexOf(tag.tagId), 1);
        }
        
      },
      // 添加食材
      addTag(){
        this.tagBox = true
      },
      //确认食材
      comfiredDish(){
        this.form.dynamicDishes = []
        for(let j = 0;j<this.tag.length;j++){
          for(let i = 0;i<this.tagList.length;i++){
            if(this.tag[j] == this.tagList[i].tagId){
              this.form.dynamicDishes.push({
                tagId:this.tag[j],
                name:this.tagList[i].name
              })
              break;
            }
          } 
        }
        this.tagBox = false
      },
      //获取菜品图片
      getDishesImg(val){
        this.$stamp(null,val)
        this.form.dishesImg = val
      },
      // 获取菜品最后的数据
      dishesPrice(data){
        this.$stamp(null,data)
        // this.form.standard = data
      }
      // 监控大小
      // weightsChange(val){
      //   this.$stamp(null,val)
      //   if(val.length < this.thanWeights.length){
      //     this.$stamp(null,'减少')
      //     for(let i =0;i<val.length;i++){
      //       for(let j =0;j<this.thanWeights.length;j++){
      //         if(val[i] == this.thanWeights[j]){
      //           this.thanWeights.splice(j,1)
      //           break;
      //         }
      //       }
      //     }
      //     this.$stamp('删除的是:',this.thanWeights[0])
      //     for(let i = 0;i<this.data.length;i++){
      //       if(this.thanWeights[0] == this.data[i].id){
      //         this.$delete(this.data,i)
      //       }
      //     }
      //   }else{
      //     this.$stamp(null,'增多')
      //     for(let i =0;i<val.length;i++){
      //       if(val[i] == 1){
      //         this.$set(this.data,i,{name:'分量',type:'大',id:1,goStorePrice:'',goHomePrice:'',boxPrice:''})
      //       }else if(val[i] == 2){
      //         this.$set(this.data,i,{name:'分量',type:'中',id:2,goStorePrice:'',goHomePrice:'',boxPrice:''})
      //       }else if(val[i] == 3){
      //         this.$set(this.data,i,{name:'分量',type:'小',id:3,goStorePrice:'',goHomePrice:'',boxPrice:''})
      //       }
      //     }
      //   }
      //   this.thanWeights = val
      // },
      // // 监控辣度
      // hotChange(val){
      //   this.$stamp(null,val)
      //   if(val.length < this.thanHot.length){
      //     this.$stamp(null,'减少')
      //     for(let i =0;i<val.length;i++){
      //       for(let j =0;j<this.thanHot.length;j++){
      //         if(val[i] == this.thanHot[j]){
      //           this.thanHot.splice(j,1)
      //           break;
      //         }
      //       }
      //     }
      //     this.$stamp('删除的是:',this.thanHot[0])
      //     for(let i = 0;i<this.hotData.length;i++){
      //       if(this.thanHot[0] == this.hotData[i].id){
      //         this.$delete(this.hotData,i)
      //       }
      //     }
      //   }else{
      //     this.$stamp(null,'增多')
      //     for(let i = 0;i<val.length;i++){
      //       if(val[i] == 1){
      //         this.$set(this.hotData,i,{name:'辣度',type:'不辣',id:1,goStorePrice:'',goHomePrice:'',boxPrice:''})
      //       }else if(val[i] == 2){
      //         this.$set(this.hotData,i,{name:'辣度',type:'微辣',id:2,goStorePrice:'',goHomePrice:'',boxPrice:''})
      //       }else if(val[i] == 3){
      //         this.$set(this.hotData,i,{name:'辣度',type:'特辣',id:3,goStorePrice:'',goHomePrice:'',boxPrice:''})
      //       }
      //     }
      //   }
      //   this.thanHot = val
      // }
    },
    computed: {
      
    },
    components: {
      imgs
      // ,
      // tag
    },
    created(){
        // form:{
        //   dishes:'',
        //   dishesDetail:'',
        //   dishesDetailPage:'',
        //   tags:[],
        //   dishesImg:[],
        //   // standard:[],
        //   dynamicDishes:[]
        // }
      this.$stamp(null,this.$route.params.data)
      if(this.$route.params.data !== undefined){
        this.form.dishes = this.$route.params.data.productName
        this.form.dishesDetail = this.$route.params.data.intro
        this.form.dishesDetailPage = this.$route.params.data.imageDetail
      }
    }
}
</script>

<style>
  .brandsDishesDetail_head{
    display:inline-block;
    background-color:#ed6f00;
    box-sizing:border-box;
    padding:7px 15px;
    border-radius:30px;
    cursor:pointer;
  }
  .brandsDishesDetail_head a{
    color:#fff;
  }
  .brandsDishesDetail_Box{
    width:100%;
    box-sizing:border-box;
    padding:15px;
    border-radius:5px;
    background-color:#fff;
    margin-top:15px;
  }
  .brandsDishesDetail_img li{
    width:100px!important;
    height:100px!important;
  }
  .brandsDishesDetail_img .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .brandsDishesDetail_img .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .brandsDishesDetail_price tr th{
    padding:0;
  }
  .brandsDishesDetail_priceDetail input{
    border:0;
    height:auto;
    line-height:1;
    padding:0;
    background-color:#e4e4e4;
    color:#a5a5a5;
    padding:4px;
  }
  .brandsDishesDetail_price_two thead{
    display:none;
  }
  .brandsDishDetail_box .is-checked .el-checkbox__inner{
    background-color: #000;
    border-color: #000;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#000000;
  }
</style>
