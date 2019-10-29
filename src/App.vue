<template>
    <div class="app-container">
        <!--顶部Header-->
        <mt-header fixed title="新手小白——vue项目">
            <span slot="left" @click="goBack" v-show="flag">
            <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        
        <!--中间的路由区域-->
       <transition>
        <router-view></router-view>
	   </transition>
	  
         <!--底部Tabbar-->
          <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-q " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-q" to="/vip">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-q" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-q" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
            flag:true
        }
    },
    created(){
        if(this.$route.path==='/home'){
            this.flag=false;
        }
    },
    methods:{
        goBack(){ //点击后退
            this.$router.go(-1);
        }
    },
    watch:{
        '$route.path':function(newVal){
            if(newVal==='/home'){
                this.flag=false;
            }else{
                this.flag=true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.app-container{
	width:100%;
    padding-top:40px;
	padding-bottom: 50px;
	position: absolute;
	overflow-x: hidden;
}
 .v-enter{
	opacity: 0;
 	transform: translateX(100%); 
 }
 .v-leave-to{
	position: absolute;
	opacity: 0;
 	transform: translateX(-100%);
 }
 .v-enter-active,
 .v-leave-active{
 	transition: all 0.5s ease;
 }
//修改tabbar里的nav的类名
.mui-bar-tab .mui-tab-item-q.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-q {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-q .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-q .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>


