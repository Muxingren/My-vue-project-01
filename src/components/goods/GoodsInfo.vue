<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
       <!-- 商品轮播图区域 -->
       <div class="mui-card">
           <div class="mui-card-content">
               <div class="mui-card-content-inner">
                  <!-- 使用轮播图组件 -->
                  <swiper :lunbotuList="imagesList" :isfull="false"></swiper>
               </div>
           </div>
       </div>
       <!-- 商品购买区域 -->
       <div class="mui-card">
           <div class="mui-card-header">{{ goodsInfo.title }}</div>
           <div class="mui-card-content">
               <div class="mui-card-content-inner">
                   <p class="price">
                       市场价：<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">
                           ￥{{ goodsInfo.sell_price }}
                       </span>
                   </p>
                   <p>购买数量：
                       <numberbox @getCount="getSelectCount" :max="goodsInfo.stock_quantity"></numberbox>
                   </p>
                   <p>
                       <mt-button type="primary" size="small">立即购买</mt-button>
                       <mt-button type="danger" size="small" @click="addToShopCart">加入购物车</mt-button>
                   </p>
               </div>
           </div>
       </div>
       <!-- 商品参数区域 -->
        <div class="mui-card">
           <div class="mui-card-header">商品参数</div>
           <div class="mui-card-content">
               <div class="mui-card-content-inner">
                   <p>商品货号：{{ goodsInfo.goods_no }}</p>
                   <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
                   <p>上架时间：{{ goodsInfo.add_time | dateFormat}}</p>
               </div>
           </div>
           <div class="mui-card-footer">
               <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
               <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
           </div>
       </div>
    </div>
</template>

<script>
import swiper from "../subcomponents/Swiper.vue"
import numberbox from "../goods/GoodsInfo_numberbox.vue"
export default {
    data(){
        return{
            imagesList:[],//存放商品轮播图图片
            id:this.$route.params.id,
            goodsInfo:{}, //存放商品信息
            ballFlag:false,//小球是否显示
            selectCount:1,//默认选中数量为1
        }
    },
    components:{
        swiper,
        numberbox
    },
    created(){
        this.getImagesList();
        this.getGoodsInfo();
    },
    methods:{
        getImagesList(){ //得到商品轮播图图片
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.imagesList=result.body.message;
                }
            })
        },
        getGoodsInfo(){ //得到商品信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsInfo=result.body.message[0];
                }
            })
        },
        goDesc(id){ //到商品详情页面
            this.$router.push({name:'goodsdesc',params:{id}});
        },
        goComment(id){ //到商品评论页面
            this.$router.push({name:'goodscomment',params:{id}});
        },
        addToShopCart(){ //加入购物车事件
            this.ballFlag=!this.ballFlag;
            //定义一个商品信息对象
            var goodsInfoList={
                id:this.id,
                count:this.selectCount,
                price:this.goodsInfo.sell_price,
                selected:true,
                quantity:this.goodsInfo.stock_quantity
            };
            this.$store.commit('addToCart',goodsInfoList);
            // console.log(this.$store.state.cart);
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;
            //获取小球在页面中的位置
            const ballPosition=this.$refs.ball.getBoundingClientRect();
            //获取购物车徽标在页面中的位置
            const badgePosition=document.getElementById('badge').getBoundingClientRect();
            const xDist=badgePosition.left-ballPosition.left;
            const yDist=badgePosition.top-ballPosition.top;
            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition="all 0.5s cubic-bezier(.46,-0.4,1,.49)"
            done();
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag;
        },
        getSelectCount(count){
            this.selectCount=count;
        }

    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin:15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: 363px;
        left: 152px;
        z-index: 99;
    }
}
</style>