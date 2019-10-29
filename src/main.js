// 项目的入口文件
import Vue from "vue"

import app from "./App.vue"

//导入路由的包
import VueRouter from "vue-router"
//安装路由
Vue.use(VueRouter)


//安装时间插件monent  cnpm i moment -S
//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern);
})

//导入 vue-resource
import VueResource from "vue-resource"
//安装 vue-resource
Vue.use(VueResource)

import MintUI from 'mint-ui'
Vue.use(MintUI);
//导入样式文件
import 'mint-ui/lib/style.css'
import "../lib/mui/css/mui.min.css"
import "../lib/mui/css/icons-extra.css"
import "../src/CSS/global.css"

//安装图片预览插件
import VurPreview from 'vue-preview'
Vue.use(VurPreview);

//导入自己的router.js路由模块
import router from "./router.js"

//设置请求的根路径
Vue.http.options.root="http://www.liulongbin.top:3005"

//全局设置post时表单数据格式组织样式
Vue.http.options.emulateJSON=true;

//安装vuex的包 cnpm i vuex -S
//导入vuex
import Vuex from "vuex"
//注册vuex到vue中
Vue.use(Vuex);
//new Vuex.Store() 实例，得到一个数据仓储对象

//每次刚进入网站，肯定会先调用main.js，在刚调用时把本地存储中的购物车数据拿出来，存到store中去
var cart=JSON.parse(localStorage.getItem('cart') || '[]');
var store=new Vuex.Store({
  state:{
    //组件中要想访问store中数据 只能通过this.$store.state.xxx
    cart:cart,//存放购物车中商品的数据 里面是一个个商品对象{id:商品的id ,count:要购买的数量 ,price:商品单价,selected:是否被选中结算}
  },
  mutations:{
    //mutations的参数列表中，最多只能传两个参数，其中，第一个只能是state状态，第二个是通过commit提交过来的参数（可以是一个对象）
    addToCart(state,goodsInfoList){
      var flag=false;
      state.cart.some(item=>{
        if(item.id===goodsInfoList.id){
          item.count+=goodsInfoList.count;
          flag=true;
          return true;
        }
      })
      if(!flag){
        state.cart.push(goodsInfoList);
      }
      //更新cart后，把cart数组存到本地存储localStorage中
      localStorage.setItem('cart', window.JSON.stringify(state.cart))     
    },
    updateCount(state,goodsInfoList){ //当购物车里的商品数量发生变化时，需要将变化值传到cart中
      state.cart.some(item=>{
        if(item.id==goodsInfoList.id){//不能用绝对等于
          item.count=parseInt(goodsInfoList.count);
          return true;
        }
      })
      //要记得保存到localStorage中
      localStorage.setItem('cart', window.JSON.stringify(state.cart))     
    },
    removeFromCart(state,id){
      //根据传过来的id值删除购物车里的商品
      state.cart.some((item,index)=>{
        if(item.id==id){
          state.cart.splice(index,1);
          return true;
        }
      })
       //要记得保存到localStorage中
       localStorage.setItem('cart', window.JSON.stringify(state.cart))     
    },
    updateGoodsSelected(state,info){
      //更新购物车中的商品选中状态
      state.cart.some(item=>{
        if(item.id==info.id){
          item.selected=!item.selected;
        }
      })
       //要记得保存到localStorage中
       localStorage.setItem('cart', window.JSON.stringify(state.cart))     
    }
    

  },
  getters:{
    //this.$store.getters.xxx 相当于计算属性
    getAllCount(state){
      var c=0;
      state.cart.forEach(item => {
        c+=item.count;
      })
      return c;
    },
    getGoodsCount(state){ //新建一个对象o，循环遍历cart数组，将id作为索引值，count作为属性值，巧妙地将对应id的count值拿出来
      var o={};
      state.cart.forEach(item=>{
        o[item.id]=item.count;
      })
      return o;
    },
    getSelected(state){ //新建一个对象s，里面保存的是商品的id值及其对应的selected值
      var s={};
      state.cart.forEach(item=>{
        s[item.id]=item.selected;
      })
      return s;
    },
    getGoodsAmount(state){ //新建一个对象a,里面保存的是被选中商品的数量和单价，通过数量和单价计算总值
      var a={
        count:0,//勾选商品数量
        amount:0 //勾选商品总价
      };
      state.cart.forEach(item=>{
        if(item.selected){
          a.count+=item.count;
          a.amount+=item.count*item.price;
        }
      })
      return a;
    },
    getStockQuantity(state){ //新建一个对象q，存放被选中商品的库存量
      var q={};
      state.cart.forEach(item=>{
        q[item.id]=item.quantity;
      })
      return q;
    }
  }
})



var vm=new Vue({
  el:"#app",
  render:c=>c(app),
  //挂载路由对象到vm实例中
  router,
  store//将store挂载到vm实例上
})