<template>
    <div class="pbotoinfo-container">
        <h3>{{ imagesInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ imagesInfo.add_time | dateFormat }}</span>
            <span>点击：{{ imagesInfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="image-container">
            <!-- <img class="preview-img" v-for="(item,index) in list" :key="item.src" :src="item.src"
            height="100"  @click="$preview.open(index,list)"> -->
             <vue-preview :slides="list"></vue-preview>
        </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="imagesInfo.content"></div>

        <!-- 评论区 -->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponents/Comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            imagesInfo:[],//用以保存图片列表
            list:[] //用以保存轮播图数据
        }
    },
    created(){
        this.getImagesInfo();
        this.getThumbs();
    },
    components:{
        "cmt-box":comment
    },
    methods:{
        getImagesInfo(){ //得到图片数据
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.imagesInfo=result.body.message[0];
                }
            })
        },
        getThumbs(){ //得到轮播图数据
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    //循环每个图片数据，补全图片的宽和高
                    result.body.message.forEach(item => {
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src;
                    });
                    //把完整的数据保存到list中
                    this.list=result.body.message;
                }
            })
        },
        
    }
}
</script>

<style lang="scss">
.pbotoinfo-container{
    padding: 3px;
    h3{
        font-size: 15px;
        color:#26a2ff;
        margin: 15px 0;
        text-align: center;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    
}

</style>