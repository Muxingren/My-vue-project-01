<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsInfoList.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsInfoList.add_time | dateFormat }}</span>
            <span>点击：{{ newsInfoList.click }}次</span>
        </p>
        <hr>
    <div class="content" v-html="newsInfoList.content">
    </div>
    <comment :id="this.id"></comment>
    </div>
</template>

<script>
//导入提示组件
import { Toast } from 'mint-ui'
//导入评论子组件
import comment from "../subcomponents/Comment.vue"
export default {
    data(){
        return{
            id:this.$route.params.id,//将URL地址中的id挂载到data上，方便以后调用
            newsInfoList:{} //用以保存新闻资讯对象
        }
    },
    created(){
        this.getNewsInfo();
    },
    components:{
        comment,
    }
    ,
    methods:{
        getNewsInfo(){ //根据Id请求得到新闻资讯对象
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.newsInfoList=result.body.message[0];
                }
                else{
                    Toast('获取新闻资讯错误');
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .newsinfo-container{
        padding:0 4px;
        .title{
            font-size: 16px;
            color: red;
            text-align: center;
            margin:15px 0;
        }
        .subtitle{
            color: #226aff;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>