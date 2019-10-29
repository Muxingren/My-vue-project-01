<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='$store.getters.getStockQuantity[this.goodsId]' height="25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" ref="count" @change="changeCount" readonly>
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
            // this.$emit('getCount',parseInt(this.$refs.count.value));
           this.$store.commit('updateCount',{
               id:this.goodsId,//商品的id
               count:this.$refs.count.value //商品的件数
           })
        }
    },
    props:['initCount','goodsId']
   
    
}
</script>
<style lang="scss" scoped>

</style>