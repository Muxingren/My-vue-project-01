<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="这个用户很懒，什么也没留下(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in comments" :key="item.id">
                <div class="cmt-title" >
                    第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
            <div class="cmt-body">{{ item.content }}</div>
            
            </div>

        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            pageIndex:1,//默认第一页的评论
            comments:[],//保存评论数据
            msg:''//评论内容
        }
    },
    props:['id'],
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status===0){
                    // this.comments=result.body.message;
                    //每当加载更多时，让旧的数据不要被覆盖
                    this.comments=this.comments.concat(result.body.message);
                }
                else{
                    Toast('获取评论失败');
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComments(){
            //参数1：请求的地址
            //参数2：提交给服务器的对象
            //参数3：定义提交的时候，表单中的数据格式
            this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()}).then(result=>{
                 if(this.msg.length===0){
                    Toast('请输入评论内容');
                    }
                    var cmt={
                    user_name:'匿名用户',
                    add_time:Date.now(),
                    content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg='';
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-item{
        margin:5px 0;
        font-size: 13px;
        .cmt-title{
            line-height: 30px;
            background-color: #ccc;
        }
        .cmt-body{
            line-height: 30px;
            text-indent: 2em;
        }
    }
}
</style>