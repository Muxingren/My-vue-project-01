<template>
    <div>
        <!-- 使用轮播图组件 -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        
        <!-- 九宫格到六宫格的改造 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-x3-4 mui-col-sm-3">
            <router-link to="/home/newslist">    
            <img src="../../images/menu1.png">
            <div class="mui-media-body">新闻资讯</div>
            </router-link>
            </li>   
            <li class="mui-table-view-cell mui-media mui-col-x3-4 mui-col-sm-3">
            <router-link to="/home/photolist">   
            <img src="../../images/menu2.png">
            <div class="mui-media-body">图片分享</div>
            </router-link>
            </li>   
            <li class="mui-table-view-cell mui-media mui-col-x3-4 mui-col-sm-3">
            <router-link to="/home/goodslist">   
           <img src="../../images/menu3.png">
            <div class="mui-media-body">商品购买</div>
            </router-link>
            </li>   
            <li class="mui-table-view-cell mui-media mui-col-x3-4 mui-col-sm-3">
            <a href="#">   
           <img src="../../images/menu4.png">
            <div class="mui-media-body">留言反馈</div>
            </a>
            </li>   
            <li class="mui-table-view-cell mui-media mui-col-x3-4 mui-col-sm-3">
            <a href="#">   
           <img src="../../images/menu5.png">
            <div class="mui-media-body">视频专区</div>
            </a>
            </li>   
            <li class="mui-table-view-cell mui-media mui-col-x3-4 mui-col-sm-3">
            <a href="#">   
                <img src="../../images/menu6.png">
                <div class="mui-media-body">联系我们</div>
            </a>
            </li>   
            
        </ul> 
    </div>
</template>

<script>
import Toast from 'mint-ui'
import swiper from "../subcomponents/Swiper.vue"
export default {
    data(){
        return{
            lunbotuList:[]//存放轮播图的数组，数组里面是一个个轮播图对象
        }
    },
    created(){
        this.getLunbotu();
    }
    ,
    methods:{
        getLunbotu(){
            this.$http.get('api/getlunbo').then(result=>{
                if(result.body.status===0){
                    this.lunbotuList=result.body.message;
                }
                else{
                    Toast('加载轮播图失败');
                }
            })
        }
    },
    components:{
        swiper
    }
}
</script>

<style>
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border:0;
}
.mui-grid-view.mui-grid-9 .mui-media{
    background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    width:125px;
    border:0;
}
.mui-grid-view.mui-grid-9 img{
    width: 60px;
    height: 60px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 13px;
}
</style>