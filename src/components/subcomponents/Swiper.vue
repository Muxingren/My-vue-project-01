<template>
    <div>
        <!-- v-for循环生成轮播图，一定要写key值 -->
        <!-- 谁使用轮播图，就要传lunbotuList -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <a :href="item.url">
                <img :src="item.img || item.src" :class="{full:'isfull'}">
                </a>
            </mt-swipe-item>
            
        </mt-swipe>
        <!-- 首页中的轮播图宽高都是100%，但不适用于商品详情中的轮播图，
        商品详情中的应该为高度100%，宽度自适应 -->
        <!-- 分歧点：宽度是100%还是自适应 -->
        <!-- 解决方法：定义一个宽度属性，让使用轮播图的调用者，手动指定宽度是否为100% -->
    </div>
</template>
<script>
export default {
    props:['lunbotuList','isfull']
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
    text-align: center;

    }
    .mint-swipe-item img{
    height: 100%;
    .isfull{
    width: 100%;
    }
    }
    
}

</style>