<template>
  <div>
    <!--规格-->
    <el-input
      v-for="(items,index) in standard"
      v-model="items.name"
      :key="items.name"
      size="small"
      style="width:80px;margin-right:10px;"
      placeholder="请输入规格">
      <i
        class="el-icon-close el-input__icon tag_close"
        slot="suffix"
        @click="deleteTag(index,items)">
      </i>
    </el-input>
    <el-input
      style="width:80px;"
      v-if="tagShow"
      v-model="tagValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="tagConfirm"
      @blur="tagConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 规格</el-button>
    <!--规格属性-->
    <div style="display:flex;align-items:center;" v-for="(items,index) in standard">
      <span style="padding-right:10px;">{{items.name}}:</span>
      <el-input
        v-for="(item,val) in standard[index].props"
        v-model="item.type"
        :key="val"
        size="small"
        style="width:80px;margin-right:10px;"
        placeholder="请输入规格属性">
        <i
          class="el-icon-close el-input__icon tag_close"
          slot="suffix"
          @click="deleteTagProps(index,val,item)">
        </i>
      </el-input>
      <el-input
        style="width:80px;"
        v-if="items.bool"
        v-model="tagPropsValue"
        ref='saveTagPropsInput'
        size="small"
        @keyup.enter.native="tagPropsConfirm(index,items)"
        @blur="tagPropsConfirm(index,items)"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInputProps(index,items)">+ 规格属性</el-button>
    </div>
    <!--价格设置-->
    <div v-for="(items,index) in standard" :key="index" style="width:520px;">
      <el-table
        :data="standard[index].props"
        class="tag"
        style="width: 100%;">
        <el-table-column
          prop="name"
          align="center"
          label="规格">
        </el-table-column>
        <el-table-column
          align="center"
          label="规格属性">
          <template slot-scope="scope">
            {{scope.row.type == undefined?'':scope.row.type}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="自提价格">
          <template slot-scope="scope">
            <div style="display:flex;align-items:center;">
              <el-input class="tag_input" @blur="dishesPrice" v-model="scope.row.goStorePrice == undefined?'':scope.row.goStorePrice" placeholder="自提价格"></el-input>
              <span>&nbsp;元</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="外卖价格">
          <template slot-scope="scope">
            <div style="display:flex;align-items:center;">
              <el-input class="tag_input" @blur="dishesPrice" v-model="scope.row.goHomePrice == undefined?'':scope.row.goHomePrice" placeholder="外卖价格"></el-input>
              <span>&nbsp;元</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="餐盒费">
          <template slot-scope="scope">
            <div style="display:flex;align-items:center;">
              <el-input class="tag_input" @blur="dishesPrice" v-model="scope.row.boxPrice == undefined?'':scope.row.boxPrice" placeholder="餐盒费"></el-input>
              <span>&nbsp;元</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
    props:{
      standard:{
        type: Array  //规格集合
      }
    },
    data () {
      return {
        // standard:[{
        //   name:'123',
        //   bool:false,
        //   props:[{
        //     name:'123',
        //     type:'asd'
        //   }]
        // },{
        //   name:'aaa',
        //   bool:false,
        //   props:[]
        // }],
        // standard:[],
        tagShow:false,
        tagValue:'',
        tagPropsValue:''
      }
    },
    mounted(){

    },
    methods:{
      //规格标签
      showInput() {
        this.tagShow = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      deleteTag(val,data){
        this.$stamp(null,val)
        this.$stamp(null,data)
        this.$delete(this.standard,val)
        this.$emit('dishesPrice',this.standard)
      },
      tagConfirm() {
        let tagValue = this.tagValue;
        if(this.standard.length == 0){
            if (tagValue) {
              this.standard.push({name:tagValue,props:[]});
            }
            this.tagShow = false;
            this.tagValue = '';
        }else{
          let ab = true
          for(let i = 0;i<this.standard.length;i++){
            if(this.standard[i].name == tagValue){
              ab = false;
              break;
            }
          }
          if(ab == true){
            if (tagValue) {
              this.standard.push({name:tagValue,props:[]});
            }
            this.tagShow = false;
            this.tagValue = '';
          }else{
            this.$message.error('规格名字不能重复!!!')
            this.tagShow = false;
            this.tagValue = '';
          }
        }
        this.$emit('dishesPrice',this.standard)
      },
      //规格属性标签
      showInputProps(val,data) {
        this.$set(this.standard,val,{name:data.name,bool:true,props:data.props})
        this.$nextTick(_ => {
          this.$refs.saveTagPropsInput[0].$refs.input.focus();
        });
      },
      deleteTagProps(index,val,data){
        this.$stamp(null,val)
        this.$stamp(null,data)
        this.$delete(this.standard[index].props,val)
        this.$emit('dishesPrice',this.standard)
      },
      tagPropsConfirm(val,data) {
        let tagPropsValue = this.tagPropsValue;
        if(this.standard[val].props.length == 0){
          if (tagPropsValue) {
            this.standard[val].props.push({name:data.name,type:tagPropsValue,goStorePrice:'',goHomePrice:'',boxPrice:''});
          }
          this.$set(this.standard,val,{name:data.name,bool:false,props:data.props})
          this.tagPropsValue = '';
        }else{
          let ab = true
          for(let i = 0;i<this.standard[val].props.length;i++){
            if(this.standard[val].props[i].type == tagPropsValue){
              ab = false;
              break;
            }
          }
          if(ab == true){
            if (tagPropsValue) {
              this.standard[val].props.push({name:data.name,type:tagPropsValue,goStorePrice:'',goHomePrice:'',boxPrice:''});
            }
            this.$set(this.standard,val,{name:data.name,bool:false,props:data.props})
            this.tagPropsValue = '';
          }else{
            this.$message.error('规格属性名字不能重复!!!')
            this.$set(this.standard,val,{name:data.name,bool:false,props:data.props})
            this.tagPropsValue = '';
          }
        }
        this.$emit('dishesPrice',this.standard)
      },
      // 给父组件传递最后的数据
      dishesPrice(){
        this.$emit('dishesPrice',this.standard)
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
  .tag_close{
    cursor:pointer;
  }
  .tag_close:hover{
    color:rgb(255, 152, 0);
  }
  
  .tag thead tr th{
	  background-color: #494949;
    color:#ffffff;
    padding:0;
  }
  .tag thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .tag thead tr th:nth-child(5){
    border-radius:0 5px 0 0;
  }
  .tag_input input{
    border:0;
    height:auto;
    line-height:1;
    padding:0;
    background-color:#e4e4e4;
    color:#a5a5a5;
    padding:4px;
  }
  .tag_input thead{
    display:none;
  }
</style>
