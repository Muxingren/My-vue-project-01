<template>
    <div>
        <!-- 评论区域 -->
        <cmtbox :id="id"></cmtbox>
    </div>
</template>

<script>
import cmtbox from "../subcomponents/Comment.vue"
export default {
    data(){
        return{
            id:this.$route.params.id
        }
    },
    components:{
        cmtbox
    }
}
</script>
<style lang="scss" scoped>

</style>