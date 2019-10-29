<template>
    <div class="cart-container">
       <div class="goods-list">
           <!-- 商品列表区域 -->
           <div class="mui-card" v-for="(item,index) in cartList" :key="item.id">
           <div class="mui-card-content">
               <div class="mui-card-content-inner">
                  <mt-switch :value="$store.getters.getSelected[item.id]" @change="selectedChange(item.id,$store.getters.getSelected[item.id])"></mt-switch>
                  <img :src="item.thumb_path">
                  <div class="info">
                      <h1>{{ item.title }}</h1>
                      <p>
                          <span class="price">￥{{ item.sell_price }}</span>
                          <numbox readonly :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                          <a href="#" @click.prevent="remove(item.id,index)">删除</a>
                      </p>
                  </div>
               </div>
           </div>
       </div>
       <!-- 商品结算区域 -->
       <div class="mui-card">
           <div class="mui-card-content">
               <div class="mui-card-content-inner account" >
                 <div class="left">
                     <p>总计(不含运费)</p>
                     <p>已勾选商品<span class="red">{{ $store.getters.getGoodsAmount.count }}</span>件，总价 <span class="red">￥{{ $store.getters.getGoodsAmount.amount }}</span></p>
                 </div>
                 <mt-button type="danger">去结算</mt-button>
               </div>
           </div>
       </div>
       </div>
    </div>
</template>

<script>
import numbox from "../subcomponents/Cart_numbox.vue"
export default {
    data(){
        return{
            cartList:[]
        }
    },
    created(){
        this.getCartList();
    },
    methods:{
        getCartList(){
            //获取到 store中所有的商品的Id,拼接出一个 用逗号分隔的字符串
            var idArr=[];
            this.$store.state.cart.forEach(item => {
                idArr.push(item.id);
                if(idArr.length<=0){
                    return;
                }
            });
            //获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
                if(result.body.status===0){
                    this.cartList=result.body.message;
                }
            })
        },
        remove(id,index){ //根据索引值i来删除购物车列表中的商品
            this.cartList.splice(index,1);
            //将要删除商品的id值传给store
            this.$store.commit('removeFromCart',id);
        },
        selectedChange(id,val){ //根据id来传递是否选中购物车列表中的商品参与结算
            this.$store.commit('updateGoodsSelected',{id,selected:val})
        }
    },
     components:{
        numbox
    },
}
</script>

<style lang="scss" scoped>
.cart-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
            margin:0 5px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color:red;
                font-weight: bold;
            }
        }
        .account{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                font-size: 16px;
                color: red;
                font-weight: bold;
            }
        }
    }
}
</style>