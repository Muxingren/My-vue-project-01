<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="count" @change="changeCount">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from "../../../lib/mui/js/mui.js"
export default {
    mounted(){
        //初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    methods:{
        changeCount(){
            this.$emit('getCount',parseInt(this.$refs.count.value));
        }
    },
    props:['max'],
    watch:{
        //属性监听 防止在max值还没收到时就输入无效的值
        max:function(newVal,oldVal){
            //使用JS API 设置numbox的最大值
            mui('.mui-numbox').numbox().setOption("max",newVal);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>