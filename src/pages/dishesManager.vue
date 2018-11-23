<template>
  <div>
    <div class="dishes_header">
      <div style="display:flex;justify-content:flex-start;align-items:center;">
        <el-button size="small" style="color:#fff;background-color:#ed6f00;padding:12px 24px;border-radius:30px;">选择菜品</el-button>
        <div class="dishes_chooseCity">选择品牌</div>
        <el-select v-model="brands" class="dishes_options" style="width:120px;" placeholder="请选择品牌" @change="chooseBrands">
          <el-option
            v-for="item in brandsList"
            :key="item.brandId"
            :label="item.brandName"
            :value="item.brandId">
          </el-option>
        </el-select>        
        <div class="dishes_chooseCity">选择门店</div>
        <el-select v-model="stores" class="dishes_options" style="width:150px;" placeholder="请选择门店" @change="chooseStores">
          <el-option
            v-for="item in storesList"
            :key="item.storeId"
            :label="item.storeName"
            :value="item.storeId">
          </el-option>
        </el-select>
      </div>
      <el-input
        style="width:240px;"
        class="dishes_search"
        size="small"
        placeholder="输入菜品名称"
        prefix-icon="el-icon-search"
        v-model="dishesSearch"
        @keyup.enter.native="search">
      </el-input>
    </div>
    <!--顶部切换标签-->
    <div class="dishes_top_container">
      <el-tabs v-model="dishesStatus" @tab-click="handleClick" class="dishes_topTages">
        <el-tab-pane v-for="(items,index) in typeList" :key="index" :label="items.name + '(' +items.val.toString() + ')'" :name="(items.type).toString()"></el-tab-pane>
      </el-tabs>
    </div>
    <!--底部-->
    <div v-if="dishesType.length == 0 && dishesData.length == 0" class="dishes_nodata">暂时无数据</div>
    <div class="dishes_bottom" v-else>
      <!--底部左侧标签切换-->
      <div class="dishes_bottom_left">
        <ul>
          <li v-for="(items,index) in dishesType" :key="index" :style="chooseTag == index?chooseTagColor:''" @click="dishesTags(items.classId,index)">
            <div>
              <i v-if="chooseTag == index" class="el-icon-sort dishes_sorts" @click.stop="sorts(index,items)"></i>
              <transition name="el-zoom-in-top">
                <div v-show="items.shown" class="dishes_sorts_box">
                  <ul>
                    <li @click.stop="moveTop(index,items)">移动至上方</li>
                    <li @click.stop="moveBottom(index,items)">移动至下方</li>
                  </ul>
                </div>
              </transition>
              <!--<span>{{items.className}}</span>-->
              <el-input
                v-model="items.className"
                v-focus
                ref="newTitle"
                placeholder="新建名称"
                size="small"
                class="dishes_left_title"
                style="width:90px;height:30px;"
                @blur="blurTag(index,items)"
                v-if="!items.bool">
              </el-input>
              <span v-if="items.bool">{{items.className}}</span>

            </div>
            <!--<span>{{items.size}}</span>-->
            <div style="display:flex;align-items:center;">
              <span>{{items.size}}</span>
              <i v-if="chooseTag == index" class="el-icon-edit-outline dishes_edit" @click="editTag(index,items)"></i>
            </div>

          </li>
          <el-button @click="addTag" v-dbClick size="mini" style="background-color:#ed6f00;color:#fff;border-radius:30px;width: 100%;padding: 16px;font-size: 14px;"><i class="el-icon-plus"></i>&nbsp;新建分类</el-button>
        </ul>
      </div>
      <!--底部右侧内容-->
      <div class="dishes_bottom_right">
        <div class="dishes_bottom_right_top">
          <el-button v-dbClick v-for="(items,index) in operates" :key="index" size="small" @click="chooseOperate(items,index)" :style="chooseOperateStatus == index?currentOperate:''">{{items.name}}</el-button>
        </div>
        <!--v-loading="true"-->
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="dishesData"
          tooltip-effect="dark"
          style="width: 100%"
          class="dishes_table"
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            label="商品"
            width='380'>
            <template slot-scope="scope">
              <div class="dishes_message">
                <div class="dishes_img">
                  <!--v-loading="scope.row.loading"-->
                  <div>
                    <img :src='scope.row.image' />
                  </div>
                  <!--<el-upload
                    action=''
                    :auto-upload="false"
                    class="upload-demo"
                    :limit="1"
                    :show-file-list="false"
                    :on-change="getDishesImg"
                    :file-list="fileList">
                    <i class="el-icon-edit" @click="uploadImg(scope.$index)"></i>
                  </el-upload>-->
                </div>
                <div class="dishes_detail">
                  <p class="dishes_detail_title">{{scope.row.productName}}</p>
                  <p>{{scope.row.intro}}</p>
                  <div>
                    <span>月售：{{scope.row.sales == null?0:scope.row.sales}}</span>
                    |
                    <span>好评：{{scope.row.favourable == null?0:scope.row.favourable}}%</span>
                  </div>
                  <div v-if="scope.row.properties == null"></div>
                  <div class="dishes_tags" v-else>
                    <ul>
                      <li v-for="(tags,index) in scope.row.properties.split(',')" :key="index">{{tags}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="价格（自提/外卖）">
            <template slot-scope="scope">
            {{scope.row.pickUpPrice}}/{{scope.row.price}} 元
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="库存">
            <template slot-scope="scope">
              <div class="dishes_count">
                <el-input
                  v-model="scope.row.count"
                  v-focus
                  @blur="startReviseCount(scope.$index,scope.row)"
                  v-if="!scope.row.bool">
                </el-input>
                <span style="color:#000" v-if="scope.row.bool">{{scope.row.count}}</span>
                <i class="el-icon-edit" @click="reviseCount(scope.$index,scope.row)"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="餐盒费">
            <template slot-scope="scope">
              ￥{{scope.row.boxPrice}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button v-dbClick class="dishes_cancel" style="background-color:#ff3b21" v-if="scope.row.status == 0" @click="bottomDishes(scope.row)">下架</el-button>
              <el-button v-dbClick class="dishes_cancel" style="background-color:#ed6f00" v-else-if="scope.row.status == 1" @click="topDishes(scope.row)">上架</el-button>
              <el-button type="success" @click="edit(scope.$index,scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--弹出框-->
    <el-dialog
      title="批量修改库存"
      :visible.sync="DishesBox"
      width="30%"
      class="dishes_box"
      center>
        <div class="DishesSet">
          <span style="padding-right:20px;color:#000">编辑批量库存量:</span>
          <el-input style="width:150px;" v-model="countEdit" placeholder="请输入库存"></el-input>
        </div>
        <div class="dishesBox_bottom">
          <el-button v-dbClick class="dishes_comfired" @click="comfired">确认</el-button>
        </div>
    </el-dialog>
    <!--弹出框-->
    <el-dialog
      title="菜品信息"
      :visible.sync="dishesShow"
      width="40%"
      center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜名:">
          哈哈
        </el-form-item>
        <el-form-item label="菜名描述:">
          哈哈
        </el-form-item>
        <el-form-item label="详情页:">
          哈哈
        </el-form-item>
        <el-form-item label="菜品标签:">
          哈哈
        </el-form-item>
        <el-form-item label="图片:">
          哈哈
        </el-form-item>
        <el-form-item label="规格:" prop="standard">
          <tag :standard="form.standard" @dishesPrice="dishesPrice" />
        </el-form-item>
        <el-form-item label="食材添加:">
          哈哈
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import tag from './../components/tag.vue'
export default {
    data () {
      return {
        brandsList:[],
        storesList:[],
        stores:'',
        brands:'',
        typeList:[],
        operates:[{
          name:'批量上架',
          val:1
        },{
          name:'批量下架',
          val:2
        },{
          name:'批量改库存',
          val:3
        },{
          name:'沽清',
          val:4
        },{
          name:'置满',
          val:5
        }],
        dishesSearch:'',
        dishesStatus:'1',
        chooseOperateStatus:999,
        currentOperate:'color:#ffffff;background-color:#000000;',
        chooseTag:'',
        chooseTagColor:'color:#000000;background-color:#ffffff;',
        dishesType:[],
        dishesData: [],
        fileList:[],
        dishesImgIndex:0,
        oldCount:0,
        loading:false,
        DishesBox:false,
        countEdit:'',
        multipleSelection:[],
        dishesShow:false,
        form:{
          standard:[]
        },
        rules: {
          standard:[
            { required: true, message: '请添加食材规格', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //编辑侧边标签
      editTag(index,data){
        this.oldName = data.name
        this.$set(this.dishesType,index,{name:data.name,number:data.number,shown:data.shown,bool:false})
      },
      //添加侧边标签
      addTag(){
        this.$set(this.dishesType,this.dishesType.length,{name:'',number:'',shown:false,bool:false})
        this.$nextTick(()=>{
          this.$refs.newTitle[0].focus()
        })
      },
      //修改侧边标签
      blurTag(index,data){
        const oldName = data.name
        if(data.name == ''){
          if(index == this.dishesType.length-1){
            this.$delete(this.dishesType,index)
            this.$message({
                type: 'info',
                message: '已取消添加分类名称'
              }); 
          }else{
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$delete(this.dishesType,index)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.dishesType[index].name = this.oldName
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        }else{
          if(this.oldName == data.name){
            this.$set(this.dishesType,index,{name:data.name,shown:data.shown,number:data.number,bool:true})
          }else{
            console.log('真的去修改')
            this.$set(this.dishesType,index,{name:data.name,shown:data.shown,number:data.number,bool:true})
          }
        }
      },
      //选择门店
      chooseStores(){
        this.$stamp(null,this.stores)
        Promise.all([this.getTypeList(this.stores),this.getAllProducts(this.stores,1,null)]).then(res=>{
          this.$stamp(null,res)
          this.typeList = res[0].data.data
          this.dishesType = res[1].data.data.classList || []
          this.dishesData = res[1].data.data.productList || []
        })
      },
      //选择品牌
      chooseBrands(){
        this.$stamp(null,this.brands)
        this.getBrandsStore(this.brands).then(res=>{
          this.$stamp(null,res)
          this.storesList = res.data.data
          this.stores = res.data.data[0].storeId
          return this.stores
        }).then(storeId =>{
          this.$stamp(null,storeId)
          Promise.all([this.getTypeList(storeId),this.getAllProducts(storeId,1,null)]).then(res=>{
            this.$stamp(null,res)
            this.typeList = res[0].data.data
            this.dishesType = res[1].data.data.classList || []
            this.dishesData = res[1].data.data.productList || []
            this.$store.state.loading = false
          })
        })
      },
      //搜索
      search(){
        this.dishesType = [{
          name:'全部商品',
          number:64,
          shown:false
        }]
        this.chooseTag = 0
      },
      //下架按钮
      bottomDishes(data){
        let productIds = []
        productIds.push(data.productId)
        for(let j =0;j<this.dishesData.length;j++){
          if(data.productId == this.dishesData[j].productId){
            this.dishesData[j].status = 1
            break;
          }
        }
        this.operateDishes(this.stores,2,0,JSON.stringify(productIds)).then(res => {
          this.$stamp(null,res)
          if(res.data.code == 200){
            this.$message.success('操作成功!')
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((error) => {
          this.$message.error('网络错误!')
        })
      },
      //上架按钮
      topDishes(data){
        let productIds = []
        productIds.push(data.productId)
        for(let j =0;j<this.dishesData.length;j++){
          if(data.productId == this.dishesData[j].productId){
            this.dishesData[j].status = 0
            break;
          }
        }
        this.operateDishes(this.stores,1,1,JSON.stringify(productIds)).then(res => {
          this.$stamp(null,res)
          if(res.data.code == 200){
            this.$message.success('操作成功!')
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((error) => {
          this.$message.error('网络错误!')
        })
      },
      // 顶部标签切换状态
      handleClick(tab, event) {
        this.$stamp(null,tab.name);
        this.getAllProducts(this.stores,tab.name,null).then((res) => {
          this.$stamp(null,res)
          if(res.data.data.classList == null || res.data.data.productList == null){
            this.dishesType = []
            this.dishesData = []
          }else{
            this.dishesType = res.data.data.classList
            this.dishesData = res.data.data.productList
          }
        }).catch((error) => {
          this.$message.error('网络错误!')
        })
        this.chooseTag = ''
      },
      // 标签移位
      sorts(index,data){
        if(data.shown == false){
          this.$set(this.dishesType,index,{name:data.name,number:data.number,shown:true})
        }else{
          this.$set(this.dishesType,index,{name:data.name,number:data.number,shown:false})
        }
      },
      // 移动至上方
      moveTop(index,data){
        if(index == 0){
          this.$message.error('不能继续上移哦!')
        }else{
          this.chooseTag = index-1
          this.$set(this.dishesType,index,{name:this.dishesType[index-1].name,number:this.dishesType[index-1].number,shown:false})
          this.$set(this.dishesType,index-1,{name:data.name,number:data.number,shown:false})
        }
      },
      // 移动至下方
      moveBottom(index,data){
        if(index+1 == this.dishesType.length){
          this.$message.error('不能继续下移哦!')
        }else{
          this.chooseTag = index+1
          this.$set(this.dishesType,index,{name:this.dishesType[index+1].name,number:this.dishesType[index+1].number,shown:false})
          this.$set(this.dishesType,index+1,{name:data.name,number:data.number,shown:false})
        }
      },
      //底部左侧标签切换状态
      dishesTags(name,index){
        this.$stamp(null,name)
        this.$stamp(null,index)
        // for(let i = 0;i<this.dishesType.length;i++){
        //   if(this.dishesType[i].shown == true){
        //     this.$set(this.dishesType,i,{classId:this.dishesType[i].classId,className:this.dishesType[i].className,size:this.dishesType[i].size,shown:false,listorder:this.dishesType[i].listorder})
        //   }
        // }
        this.chooseTag = index
        this.loading = true
        this.getAllProducts(this.stores,this.dishesStatus,name).then((res) => {
          this.$stamp(null,res)
          this.dishesData = res.data.data.productList
          this.loading = false
        }).catch((error) => {
          this.$message.error('网络错误!')
        })
      },
      //操作菜品
      chooseOperate(data,index){
        this.$stamp(null,data)
        this.$stamp(null,index)
        let count = 0;
        let productIds = []
        // this.chooseOperateStatus = index
        if(this.multipleSelection.length == 0){
          this.$message.error('请先勾选菜品!')
        }else if(data.val == 3){
          this.DishesBox = true
        }else{
          for(let i = 0;i<this.multipleSelection.length;i++){
            productIds.push(this.multipleSelection[i].productId)
          }
          if(data.val == 1){
            count = 1
            for(let i = 0;i<this.multipleSelection.length;i++){
              for(let j =0;j<this.dishesData.length;j++){
                if(this.multipleSelection[i].productId == this.dishesData[j].productId){
                  this.dishesData[j].status = 1
                  continue;
                }
              }
            }
          }else if(data.val == 2){
            count = 0
            for(let i = 0;i<this.multipleSelection.length;i++){
              for(let j =0;j<this.dishesData.length;j++){
                if(this.multipleSelection[i].productId == this.dishesData[j].productId){
                  this.dishesData[j].status = 0
                  continue;
                }
              }
            }
          }else if(data.val == 3){
            count = 44
          }else if(data.val == 4){
            count = 0
            for(let i = 0;i<this.multipleSelection.length;i++){
              for(let j =0;j<this.dishesData.length;j++){
                if(this.multipleSelection[i].productId == this.dishesData[j].productId){
                  this.dishesData[j].count = 0
                  continue;
                }
              }
            }
          }else if(data.val == 5){
            count = 9999
            for(let i = 0;i<this.multipleSelection.length;i++){
              for(let j =0;j<this.dishesData.length;j++){
                if(this.multipleSelection[i].productId == this.dishesData[j].productId){
                  this.dishesData[j].count = 9999
                  continue;
                }
              }
            }
          }
          this.multipleSelection = []
          this.$refs.multipleTable.clearSelection();
          this.operateDishes(this.stores,data.val,count,JSON.stringify(productIds)).then(res => {
            this.$stamp(null,res)
            if(res.data.code == 200){
              this.$message.success('操作成功!')
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((error) => {
            this.$message.error('网络错误!')
          })
        }
      },
      //批量编辑库存
      comfired(){
        let count = this.countEdit
        if(count == ''){
          this.$message.error('库存不能为空!')
        }else{
          let productIds = []
          for(let i = 0;i<this.multipleSelection.length;i++){
            productIds.push(this.multipleSelection[i].productId)
          }
          for(let i = 0;i<this.multipleSelection.length;i++){
            for(let j =0;j<this.dishesData.length;j++){
              if(this.multipleSelection[i].productId == this.dishesData[j].productId){
                this.dishesData[j].count = count
                continue;
              }
            }
          }
          this.multipleSelection = []
          this.$refs.multipleTable.clearSelection();
          this.DishesBox = false
          this.operateDishes(this.stores,3,count,JSON.stringify(productIds)).then(res => {
            this.$stamp(null,res)
            if(res.data.code == 200){
              this.$message.success('操作成功!')
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((error) => {
            this.$message.error('网络错误!')
          })
        }
      },
      // 多选按钮
      handleSelectionChange(val) {
        this.$stamp(null,val)
        this.multipleSelection = val;
      },
      //修改库存
      reviseCount(val,data){
        this.oldCount = data.count
        // this.$set(this.dishesData,val,{
        //   storeProductId: data.storeProductId,
        //   productId: data.productId,
        //   productName: data.productName,
        //   spelling:data.spelling,
        //   image:data.image,
        //   intro:data.intro,
        //   type:data.type,
        //   status:data.status,
        //   listorder:data.listorder,
        //   count:data.count,
        //   sales:data.sales,
        //   favourable:data.favourable,
        //   price:data.price,
        //   specialPrice:data.specialPrice,
        //   pickUpPrice:data.pickUpPrice,
        //   boxPrice:data.boxPrice,
        //   properties:data.properties,
        //   createTime:data.createTime,
        //   modifyTime:data.modifyTime,
        //   loading:data.loading,
        //   bool:false
        // })     
        this.dishesData[val].bool = false
      },
      //开始修改库存
      startReviseCount(val,data){
        this.$stamp(null,this.dishesData[val].count)
        if(this.oldCount == this.dishesData[val].count){
          this.dishesData[val].bool = true
        }else if(!/^[+]{0,1}(\d+)$/.test(this.dishesData[val].count)){
          this.dishesData[val].count = this.oldCount
          this.$message.error('请输入大于0以上的正整数!!')
        }else{
          this.dishesData[val].bool = true
          let productIds = []
          productIds.push(data.productId)
          this.operateDishes(this.stores,3,this.dishesData[val].count,JSON.stringify(productIds)).then(res => {
            this.$stamp(null,res)
            if(res.data.code == 200){
              this.$message.success('操作成功!')
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((error) => {
            this.$message.error('网络错误!')
          })
        }
      },
      //拿到获取的菜品图片
      getDishesImg(val){
        this.fileList.push(val)
        this.$stamp(null,this.fileList)
        this.$stamp(null,this.dishesImgIndex)
        this.$set(this.dishesData,this.dishesImgIndex,{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:12,
          bool:true,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202'
        })
        this.fileList = []
      },
      // 上传菜品图片当前的索引
      uploadImg(val){
        this.dishesImgIndex = val
      },
      //获取顶部标签列表
      getTypeList(storeId){
        return new Promise((resolve,reject) => {
          this.$api.dishes.typeList({storeId}).then(res => {
            resolve(res)
          })
        })
      },
      //获取全部商品菜品列表
      getAllProducts(storeId,type,classId){
        return new Promise((resolve,reject) => {
          this.$api.dishes.getProducts({storeId,type,classId}).then(res => {
            resolve(res)
          })
        })
      },
      //操作菜品信息请求
      operateDishes(storeId,type,count,productIds){
        return new Promise((resolve,reject) => {
          this.$api.dishes.operateDishes({storeId,type,value:count,productIds:productIds}).then(res => {
            resolve(res)
          })
        })
      },
      // 获取菜品最后的数据
      dishesPrice(data){
        this.$stamp(null,data)
        this.form.standard = data
      },
      //获取所有品牌列表
      getAllBrandsList(){
        return new Promise((resolve,reject) => {
          this.$api.common.getAllBrands('').then(res => {
            resolve(res)
          })
        })
      },
      //根据品牌获取店铺列表
      getBrandsStore(brandId){
        return new Promise((resolve,reject) => {
          this.$api.common.getBrandsStore({brandId}).then(res => {
            resolve(res)
          })
        })
      }
    },
    computed: {
      
    },
    components: {
      tag
    },
    created(){
      this.$store.state.loading = true
      if(this.$store.state.brandsList.length == 0){
        this.getAllBrandsList().then(res=>{
          this.brandsList = res.data.data
          this.brands = res.data.data[0].brandId
          return this.brands
        }).then(brandId =>{
          this.getBrandsStore(brandId).then(res=>{
            this.$stamp(null,res)
            this.storesList = res.data.data
            this.stores = res.data.data[0].storeId
            return this.stores
          }).then(storeId =>{
            this.$stamp(null,storeId)
            Promise.all([this.getTypeList(storeId),this.getAllProducts(storeId,1,null)]).then(res=>{
              this.$stamp(null,res)
              this.typeList = res[0].data.data
              this.dishesType = res[1].data.data.classList || []
              this.dishesData = res[1].data.data.productList || []
              this.$store.state.loading = false
            })
          })
        })
      }else{
        this.brandsList = this.$store.state.brandsList
        this.brands = this.$store.state.brandsList[0].brandId
        this.getBrandsStore(this.brands).then(res=>{
          this.storesList = res.data.data
          this.stores = res.data.data[0].storeId
          return this.stores
        }).then(storeId=>{
          this.$stamp(null,storeId)
          Promise.all([this.getTypeList(storeId),this.getAllProducts(storeId,1,null)]).then(res=>{
            this.$stamp(null,res)
            this.typeList = res[0].data.data
            this.dishesType = res[1].data.data.classList || []
            this.dishesData = res[1].data.data.productList || []
            this.$store.state.loading = false
          })
        })
      }
    }
}
</script>

<style>
  .dishes_edit{
    font-size:20px;
    color:#ed6f00;
  }
  .dishes_chooseCity{
    background-color:#fff;
    color:#000;
    box-sizing:border-box;
    padding:9px;
    border-radius:5px 0 0 5px;
    margin-left:15px;
  }
  .dishes_options .el-input__inner{
    border:0;
    height:39px;
    line-height:39px;
    border-radius:0 5px 5px 0;
  }
  .dishes_options .el-select__caret{
    color:#000!important;
  }
  .dishes_header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
  }
  .dishes_nodata{
    width:100%;
    /*height:100%;*/
    display:flex;
    justify-content:center;
    align-items: center;
    font-size:16px;
  }
  .dishes_topTages .is-active{
    background-color:#fff!important;
    color:#FF9800!important;
  }
  .dishes_topTages .el-tabs__nav-wrap::after{
    height:0;
  }
  .dishes_topTages .el-tabs__item:hover{
    color:#FF9800;
  }
  .dishes_topTages .el-tabs__active-bar{
    /*height:0;*/
    background-color:#FF9800;
  }
  .dishes_topTages .el-tabs__header{
    margin:0 0 1px;
  }
  .dishes_topTages .el-tabs__nav{
    /*width:800px;
    display:flex;
    justify-content:space-between;*/
  }
  .dishes_search:focus{
    border-color:#cccccc;
  }
  .dishes_search .el-input__suffix,.dishes_search input::-webkit-input-placeholder,.dishes_search input{
    color:#a5a5a5;
    background-color:#e4e4e4;
  }
  .dishes_top_container{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:0 20px;    
    background-color: #ffffff;
    margin-bottom:15px;
    border-radius:5px;
  }
  .dishes_bottom{
    display:flex;
  }
  .dishes_bottom_left{
    width:190px;
    margin-right: 20px;
  }
  .dishes_bottom_left ul li{
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:15px;
    border-radius:5px;
    cursor:pointer;
    background-color: #a5a5a5;
    margin:5px 0;
    color:#ffffff;
  }
  .dishes_bottom_left ul li:hover{
    color:#000000;
    background-color:#ffffff;
  }
  .dishes_bottom_right{
    width:100%;
    min-width:970px;
    overflow-y:auto;
    max-height:815px;
  }
  .dishes_bottom_right_top{
    box-sizing:border-box;
    padding:5px 15px;
    margin:6px 0;
    border-radius:5px;
    background-color:#ffffff;
  }
  .dishes_bottom_right_top button{
    color:#000000;
    border-color:#000000;
    border-radius:70px;
  }
  .dishes_bottom_right_top button:hover{
    background-color:#000000;
    color:#ffffff;
  }  
  .dishes_bottom_right_top button:active{
    background-color:#000000;
    color:#ffffff;
  }
  .dishes_message{
    display:flex;
    justify-content:flex-start;
  }
  .dishes_img{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    color:#FF9800;
  }
  .dishes_img img{
    width:100px;
    height:100px;
  }
  .dishes_img i{
    margin-top:3px;
    cursor:pointer;
  }
  .dishes_img .el-loading-mask{
    z-index:0;
  }
  .dishes_tags ul{
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .dishes_detail{
    text-align:left;
    margin-left:7px;
    color:#696969;
  }
  .dishes_detail .dishes_detail_title{
    color:#000;
  }
  .dishes_tags ul li{
    box-sizing:border-box;
    padding:2px 5px;
    border-radius:8px;
    color:#fff;
    background-color:#ffc600;
    margin-right:5px;
  }
  .dishes_count{
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FF9800;
  }
  .dishes_count .el-input__inner{
    border:0;
    background-color:#fff!important;
    width:50px;
    padding:0;
    text-align:center;
  }
  .dishes_count .el-input{
    width:auto;
  }
  .dishes_count i{
    margin-left:5px;
    cursor:pointer;
  }
  .dishes_table thead tr th{
    background-color:#494949;
    color:#ffffff;
  }
  .dishes_sorts{
    box-sizing:border-box;
    padding:5px;
    background-color: #ed6f00;
    color:#ffffff;
    border-radius:100%;
  }
  .dishes_sorts_box{
    position:absolute;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .dishes_sorts_box ul li{
    box-sizing:border-box;
    padding:10px 15px;
    background-color:#ffffff;
    color:#000000;
  }
  .dishes_sorts_box ul li:hover{
    background-color:#EBEEF5;
  }
  .el-loading-parent--relative .el-loading-spinner i,.el-loading-parent--relative .el-loading-spinner .el-loading-text{
    color:#ed6f00;
  }
  .DishesSet{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:20px;
  }
  .dishesBox_bottom{
    box-sizing:border-box;
    padding:15px 0;
    text-align:center;
  }
  .dishes_comfired{
    background-color:#ff3b21;
    color:#fff;
    border-radius:30px;
    box-sizing:border-box;
    padding:10px 27px;
  }
  .dishes_box .el-dialog__body{
    padding:0;
  }
  .dishes_box thead tr th{
    background-color:#494949;
    color:#fff;
  }
  .dishes_box .el-dialog__header{
    background-color:#ed6f00;
    padding:10px;
  }
  .dishes_box .el-dialog__title{
    color:#ffffff;
  }
  .dishes_box .el-dialog__headerbtn{
    top:14px;
  }
  .dishes_box .el-dialog__headerbtn .el-dialog__close{
    color:#ffffff;
  }
  .dishes_cancel{
    box-sizing:border-box;
    padding:10px 25px;
    color:#fff;
    border-radius:30px;
  }
  .dishes_cancel:hover{
    color:#fff;
  }
</style>
