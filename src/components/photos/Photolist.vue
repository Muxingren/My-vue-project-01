<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control
             mui-segmented-control-inverted">
             <div class="mui-scroll">
                 <a :class="['mui-control-item',item.id==0?'mui-active' : '']" v-for="item in cates" 
                 :key="item.id" @click="getImages(item.id)">
                     {{ item.title }}</a>
             </div>
        </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
            <!-- 使用懒加载 -->
            <img v-lazy="item.img_url">
            <div class="info">
                <h1 class="info-title">{{ item.title }}</h1>
                <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
        </router-link>
    </ul>
    </div>
</template>

<script>
//导入 mui的js文件
import mui from '../../../lib/mui/js/mui.js'

export default {
    data(){
        return{
            cates:[],//存放图片分类列表
            list:[],//存放图片列表
        }
    },
    created(){
        this.getAllCatagory();
        //刚进入页面时，默认调用全部图片列表
        this.getImages(0);
    },
    mounted(){
    //初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
        deceleration:0.0005
    });
    },
    methods:{
        getAllCatagory(){//获取图片分类列表
            this.$http.get('api/getimgcategory').then(result=>{
                if(result.body.status===0){
                    result.body.message.unshift({ title:'全部',id:0 });
                    this.cates=result.body.message;
                }
            })
        },
        getImages(cateId){//根据图片分类id，获取图片列表
            this.$http.get('api/getimages/'+cateId).then(result=>{
                if(result.body.status===0){
                    this.list=result.body.message;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;
}
.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    li{
    position: relative;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px #999;
    img[lazy="loading"]{
        width: 40px;
        height: 300px;
        margin:auto;
    }
    img{
        width: 100%;
        vertical-align: middle;
    }
    .info{
        position: absolute;
        bottom: 0;
        color:white;
        background-color: rgba(0,0,0,0.4);
        text-align: left;
        max-height: 86px;
        .info-title{
            font-size: 16px;
        }
        .info-body{
            font-size: 13px;
        }
    }
    }
}

</style>