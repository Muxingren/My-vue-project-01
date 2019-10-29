<template>
    <div>
        <ul class="mui-table-view">
            <!-- v-for循环生成新闻资讯列表 -->
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class="mui-ellipsis">
                            <span>发布时间：{{ item.add_time | dateFormat }}</span>
                            <span class="click">点击：{{ item.click }}次</span>
                        </p> 
                    </div>
                </router-link>
            </li>  
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
    return{
        newsList:[],//用以保存新闻资讯列表
    }
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){ //得到新闻资讯列表
            this.$http.get('api/getnewslist').then(result=>{
                if(result.body.status===0){
                    this.newsList=result.body.message;
                }
                else{
                    Toast('新闻列表加载错误');
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
        width: 100%;
        font-size: 12px;
        color:#226aff;
        display: flex;
        justify-content: space-between;
    }
    }
    
}
</style>