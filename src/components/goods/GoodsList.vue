<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goodsInfo(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}</span>
                </p>
            </div>
        </div>
      <!-- 加载更多 -->
      <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            goodslist:[],//存放商品列表
            pageIndex:1
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status===0){
                    // this.goodslist=result.body.message;
                    //防止前面的被覆盖
                    this.goodslist=this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsList();
        },
        goodsInfo(id){
            this.$router.push({name:"goodsinfo",params:{id}});
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 49%;
        margin: 3px 0;
        border:1px solid #ccc;
        min-height: 293px;
        box-shadow: 0 0 5px #ccc;
        padding: 2px;
        h1{
            font-size: 14px;
            line-height: 16px;
        }
        img{
            width: 100%;
        }
        .info{
            font-size: 12px;
            background-color: #eee;
            
            p{
                margin:0;
                padding: 5px;
            }
            .price{
                .now{
                    color:red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
                
            }
            .sell{
                    display: flex;
                    justify-content: space-between;
                }
        }
    }
}
</style>