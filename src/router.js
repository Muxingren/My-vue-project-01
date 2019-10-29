import VueRouter from 'vue-router'
//导入对应的路由组件
import HomeContainer from "../src/components/tabbar/HomeContainer.vue"
import VipContainer from "../src/components/tabbar/VipContainer.vue"
import CartContainer from "../src/components/tabbar/CartContainer.vue"
import SearchContainer from "../src/components/tabbar/SearchContainer.vue"
import NewsList from "../src/components/news/NewsList.vue"
import NewsInfo from "../src/components/news/NewsInfo.vue"
import PhotoList from "../src/components/photos/PhotoList.vue"
import PhotoInfo from "../src/components/photos/PhotoInfo.vue"
import GoodsList from "../src/components/goods/GoodsList.vue"
import GoodsInfo from "../src/components/goods/GoodsInfo.vue"
import GoodsDesc from "../src/components/goods/GoodsDesc.vue"
import GoodsComment from "../src/components/goods/GoodsComment.vue"

// 创建路由对象
const router = new VueRouter({ //配置路由对象
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/vip',component:VipContainer},
    {path:'/cart',component:CartContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newsinfo/:id',component:NewsInfo},//注意：需要拼接id
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},
    {path:'/home/goodslist',component:GoodsList},
    {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
    {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
    {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},


  ],
  linkActiveClass:'mui-active'//覆盖默认的路由高亮的类，默认类为 router-link-active
})

export default router