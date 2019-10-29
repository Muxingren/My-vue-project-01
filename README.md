# 有灵魂的前端实习生，用心感受每一行代码中的诗情雅意

# 先运行cnpm install 安装依赖项

## 制作首页中的头部Header区域跟底部Tabbar区域
1. 头部使用Mnit-UI中的Header组件  
    1.1 在webpack4中需要多导入一个样式文件 -->`import 'mint-ui/lib/style.css'`  
2. 底部使用MUI中的Tabbar组件  
    2.1 需要在main.js中导入基本样式 -->`import './lib/mui/css/mui.min.css'`  
    2.2 在使用购物车小图标时需要多导入 -->`import './lib/mui/css/icons-extra.css' `  


## 将tabbar中的a链接改造成路由导航 router-link
1. 导入需要的包
    1.1 导入路由的包 -->`import VueRouter from 'vue-router' ` 
    1.2 安装路由 -->`Vue.use(VueRouter)`  
    1.3 导入自己的路由模块 -->`import router from './router.js' `
    1.4 将路由对象 router 挂载到Vue实例中 
2. 将a标签改为router-link 并将href改为to='/跳转位置'  



## 点击tabbar中的路由链接，进入对应的路由组件
1. 创建对应的.vue文件，并在router.js中导入路由组件  
2. 在routes中加入文件跳转位置与组件的名字
3. 设置自己的路由高亮 `linkACtiveClass：mui-active，`覆盖默认的（默认为router-link-active）  
4. 在App.vue中加入标签router-view组件，表示路由匹配到的组件渲染位置 

## 制作轮播图子组件
1. 使用Mnit-UI中的Swipe, SwipeItem组件，实现轮播图模版加入
2. 使用轮播图组件的父组件需要传入轮播图信息
3. 使用v-for进行循环渲染，必须要写上key值（唯一的字符串或数字，常用id）
4. 需在样式中为模版加入高度，否则无法显示  

## 加载首页轮播图中的数据
1. 导入vue-resource的包 -->`import VueResource from 'vue-resource'`
2. 安装vue-resource  -->`Vue.use(VueResource)  `
3. 设置请求的根路径 --> `Vue.http.options.root="http://www.liulongbin.top:3005"`
4. 使用vue-resource中的`this.$http.get`获取数据
5. 获取数据的方法需要在created函数中调用，即在页面加载完成后，还没有渲染页面之前拿到数据  
6. 获取的数据保存到data中的上,并通过属性传值的方式传给轮播图子组件  

## 改造主页中的九宫格模块
1. 使用MUI中的grid-default中的九宫格模块根据需求改成六宫格  
2. 将其中的被背景改成需求中的白色背景  
3. 将li中的边框设置为none  
4. 将它里面自带的图标改成自己的图片并给图片设置合适的大小一般为原照片的1/2倍  


## 給路由组件的切换增加动画效果
1. 在router-view标签外面用transition标签包裹起来  
2. 給`v-enter,v-leave-to,v-enter-active,v-leave-active`加上样式  
    2.1 为了使得组件内容能够从右边进左边出，`v-enter`的运动方向为`100%`,`v-leave-to`的则为`-100%` 
    2.2 当有组件切换动效的时候，一瞬间，页面的宽度会变成正常宽度的 2 倍，此时，需隐藏超出屏幕宽度的区域 
        給最上层div加`overflow-x:hidden`隐藏下滑动条  
    2.3 給v-leave-to设置绝对定位，防止页面跳动问题  


## 完成新闻资讯列表的路由配置
 1. 创建新闻列表路由组件页面NewsList.vue  
 2. 将HomeContainer.vue中的对应的a标签改为路由导航  
 3. 在路由文件中为路由添加对应规则  

 ## 绘制新闻资讯页面
 1. 使用mui中的media-list.html  
 2. 使用 `display: flex;`实现了css3弹性盒模型布局
 3. 让元素左右贴边；`justify-content: space-between;`
 4. 使用`this.$http.get`来获取数据，并把数据挂载到data()上
 5. 获取数据的方法同样是在created()函数中调用
 6. 将获取到的数据通过`v-for`指令循环渲染到页面上
  

 ## 定义全局的过滤器来格式化时间字符串
 1. 经过分析，整个项目中，许多组件都需要格式化时间，因此，推荐定义为全局的时间过滤器
 2. 在main.js文件中设置全局过滤器
 2. 定义全局过滤器的语法：`Vue.filter('dateFormat', function(dataStr){}) `   
 3. 调用过滤器的语法：`{{ item.add_time | dateFormat }}`
 4. 借助与第三方的`moment`插件来设置时间格式
    4.1 安装时间插件monent --> cnpm i moment -S
    4.2 导入格式化时间的插件 --> import moment from 'moment'  
 6.  为了提高用户体验（可能有的用户想要 最全的`年-月-日 时：分：秒`， 有的用户只想要`YYYY-MM-DD`），此时，我们可以为过滤器提供一个可选的格式字符串；

 ## 实现新闻列表跳转到新闻详情
 1. 创建新闻详情组件NewsInfo.vue  
 2. 改造每一个新闻列表项的a标签，为 router-link，其中， to 属性中的 id 值需要动态拼接给每一个     router-link, 因此，需要把 to属性用v-bind绑定，属性值中的 统一路径前缀：`'/home/newsinfo/'`，在后面拼接上item.id即可  
 3. 添加路由规则  
 4. 当实现了以上三步之后，我们想在页面中，获取路由传递过来的参数   
    通过`$route.params.id` 来获取，并将URL地址中的id挂载到data上，方便以后调用


# 渲染新闻详情页面
1. 获取数据  
2. 挂载数据到 data 上  
3. 渲染页面  

## 评论子组件的封装和引用  
1. 在项目的src文件中创建 --> `sub-components`目录； 
2. 在subcomponents目录中创建评论子组件`Comment.vue`  
3. 哪个页面需要引用这个评论组件了，就在页面的script 节点中，通过 import的形式，导入此组件  
4. 在页面的 script 中，通过 components属性注册导入的评论组件  
5. 把注册的组件名称，以标签形式，引入到页面上，就能够使用评论子组件


## 获取评论内容  
1. 前提： 在评论组件中，需要获取到该新闻资讯的id;  
2. 通过属性传递的形式，父组件为子组件传递新闻的Id；  
3. 定义根据新闻Id和页码，获取评论数据的方法，并在 created()函数中，调用此方法以获取数据；  
4. 把获取到的数据，挂载到data上的`comment-list`中，并渲染页面；  

## 点击加载更多的评论  
1. 为加载更多按钮，绑定点击事件；  
2. 在事件中，让 pageindex自增 + 1 
3. 当页码值+1之后，重新调用获取评论内容的方法；
 + 如果重新调用获取更多评论内容的方法，新获取到的那一页的数据， 会覆盖之前的评论数据；
 + 为了防止上述的问题，我们在获取到评论数据之后，不应该直接 `this.comments = data.message`，
   而是使用数组的拼接方法 ` this.comments=this.comments.concat(result.body.message)`



## 实现发表评论的功能 
 1. 将以`application/x-www-form-urlencodedMIME`类型的形式发送请求  
    1.1 可直接在main.js中加入`Vue.http.options.emulateJSON = true;`  
 2. 在点击发表评论按钮的时候，处理函数中，做一下非法值校验，防止评论内容为空！
 3. 如果校验通过，则调用API接口提交评论数据到后端；
 4. 当评论成功后需要在客户端，组织出一个新的评论对象，手动unshift到评论数组comments中；
 5. 还需将评论内容清空，以便用户继续发表评论


## 改造图片分享的路由跳转  
 1. 新建一个图片分享组件 `PhotoList.vue`
 2. 改造路由链接 HomeContainer.vue将对应的a标签改成router-link  
 3. 添加一个路由规则到router.js  

## 实现图片分享列表中顶部的滑动区域 
 1. 使用 MUI 的 `tab-top-webview-main.html` 控件  
 2. 当拿到 MUI 代码片段之后，需要把 `mui-fullscreen`去掉,否则会遮住头部Header区域  
 3. 当页面布局没有大问题之后，发现无法实现滑动效果，此时，需要使用官方推荐的形式，去初始化一下控件,具体初始化的方式，参考官方文档:`http://dev.dcloud.net.cn/mui/ui/#scroll`  
 

## 移除滑动区域的警告问题
+ 为 `mui-slider` 类样式，添加，`touch-action: pan-x;`属性样式，从而支持 此元素的 单指水平滑动效果，提高滑动的流畅度；

## 解决 tabbar 区域 和 图片分类列表JS行为冲突而无法点击跳转问题
1. 冲突的原因：每一个tabbar 按钮的 类样式mui--tab-item和JS行为有冲突；
2. 解决的思路：把所有和 `mui-tab-item`相关的样式粘出来，然后改个类名，重新把自己的类名，替换掉之前的即可

## 获取图片分类数据并加载到页面上
1. 获取分类数据  
2. 手动把添加`｛title:"全部", id:0｝` 分类信息，通过数组的 unshift 方法，头部追加到数组中  
3. 把 获取到的分类，挂载到 data 上的 cates 中  
4. 默认设置全部分类被高亮选中：通过 :class结合 三元表达式，把 id为0那一项分类，设置为默认选中； 

## 默认加载全部的分类数据
1. 定义一个`getImages`的方法， 接收一个分类Id，然后根据Id获取所有的图片列表  
2. 默认调用`getImages(0)`,加载全部分类数据，并把获取到的图片，挂载到list中  
3. 根据Mint-UI 的 `lazy-load` 组件，实现图片的懒加载效果  
  3.1在实现懒加载效果时候，需要注意：图片的 URL 地址，需要通过`v-lazy`来指定  
  3.2需要把图片的样式也粘贴到项目中，同时，把 image选择器修改成img标签选择器  


 ## 点击图片分类，切换图片列表数据
 1. 为每一个分类，添加点击事件`getImages(item.id)`，重新发起数据请求，来获取图片列表  

 ## 点击图片跳转到图片详情页面的路由改造
1. 把 每个图片的 li 改造成router-link同时，要添加tag="li"属性，而且，跳转的链接，需要使用:to来设置，因为需要传递这个图片的Id过去  
2. 添加一个路由的规则，在规则中，定义id:this.$route.params.id,来快速传递路由中的参数  
3. 在router.js文件中添加路由对应的组件  

## 开发图片的详情页面
1. 创建图片详情页面 `PhotoInfo.vue`
2. 根据`id:this.$route.params.id`中接收的父组件中的图片Id，获取图片的详情数据
3. 根据图片的详情，渲染页面最基本的结构
4. 发表评论的功能，直接引用现成的组件：
  4.1使用 import 把评论子组件导入到当前组件中 --> `import comment from '../subcomment/Comment.vue' `
  4.2把导入的评论组件对象`comment`，注册为当前图片详情页面的子组件 components
  4.3以标签形式，把注册好的评论子组件名称，引入到页面指定区域
  4.4注意：如果要实现评论的功能，需要在（以标签形式）引用评论子组件的时候，为其传递一个 `:id="newid" `的属性，属性值为当前图片的id;

 ## 实现缩略图的效果
 1. 先加载所有的图片并显示到页面上；
 2. 使用vue-preview插件来实现缩略图效果；
 3. 使用缩略图组件步骤：  
  3.1运行`npm i vue-preview -S `安装  
  3.2在main.js导入此包并使用`import VuePreview from 'vue-preview'`  ` Vue.use(VuePreview) ` 
  3.2在页面中，先把获取到的图片，按照标准的格式做一层包装：为每个图片添加`w、h、msrc`属性  
  3.3把官方提供的例子中的`vue-preview`标签粘贴到页面中，去渲染数据就行了



## 修改缩略图的样式
+ 官方文件表示必须要引入全局样式，故新建了一个global.css，用以修改缩略图的样式
  在main.js中导入  


## 点击商品购买跳转到商品列表页面
  1. 添加商品列表的组件 `GoodsList.vue` 
  2. 改造商品购买为router-link  
  3. 添加路由规则  

## 实现商品列表的经典两列布局
  1. 外层有一个 `goodslist-container`， 里面的每个商品都是`goodsinfo`  
  2. 给外层的`goodslist-container`设置 `display:flex;`布局，同时为了让一行只显示两个商品，我们为每个`goods-item`添加了宽度为49%;同时，设置`flex-wrap: wrap`  
  3. 通过 为父盒子添加`margin: 8px;` 来挤出左右的间距    
  4. 为了保留出中间的间隙，为父盒子`goodslist-container`添加了`justify-content: space-between ` 



## 改造进入商品详情页面的路由链接
1. 使用编程式导航跳转页面设置 `this.$router.push({ name: 'goodsinfo', params: { id } }) ` 
2. 创建商品详情页面 `GoodsInfo.vue` 
3. 添加路由和组件的对应规则:需要加上name属性，通过name属性来找到对应路径
   `{path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'}`


## 实现商品详情页面的卡片视图布局
1. 使用 MUI提供的 `card.html` 来实现即可  


## 实现商品详情页面的轮播图效果 
1. 在商品详情页面中调用轮播图子组件并通过props属性传值


## 实现首页和商品轮播图的宽高设置
1. 经过分析发现：首页和商品页面的轮播图，对于图片的宽有分歧：
   首页期望图片是：宽高100% ;商品详情页面期望图片是： 高度100%， 宽度自适应，图片居中显示   
2. 让轮播图组件，提供一个 `isfull` 属性，表示是否撑满父元素；如果为true,表示，宽和高都要是100%，如果为     `false`，表示，宽是 自适应，高度是100%，同时图片居中显示  


## 进入商品详情中的图文介绍和商品评论的编程式导航
1. 创建图文介绍组件页面`GoodsDesc.vue` 和商品评论组件页面`GoodsComment.vue`
2. 使用编程式导航跳转页面设置
 `{path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'}, ` 
 `{path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},`
3. 通过路径中的`this.$route.params.id`来拿到对应商品的id
4. 图文介绍页面以商品的id来配置请求路径，进行数据的请求，并根据请求得到的数据渲染页面
5. 商品评论页面中需使用评论子组件，通过props向评论子组件传商品的id以渲染页面


## 设置购买商品数量的数字选择框
1. 新建一个组件 `GoodsInfo_numberbox.vue`
2. 使用MUI库中数字选择框组件
3. 导入mui.js文件以初始化组件 --> `import mui from "../../../lib/mui/js/mui.js"`
3. 初始化数字选择框组件 ` mui('.mui-numbox').numbox();`

## 设置购买数量的最大值
1.这里需要父组件向子组件传值，使用Props:[]向子组件传递数据  
2.由于`this.$http.get`是异步加载，所以在子组件得到的件数最大值是undefined  
3.可以用`watch`监听机制，监听到max被赋值后，使用`mui('.mui-numbox').numbox().setOption('max',newval)`来給获得购买数量的最大值  


## 设置点击购物车出现小球半场动画
1.创建小球并给小球设置`position:absolute;`,确定小球的初始位置   
2.根据分析需要确定小球距页面顶端和左侧的距离
  及小球所要到达位置距页面顶端和左侧的距离
  进行相减操作获得动态数据  
 2.2使用`getBoundingClientRect()`方法可以获得元素的top,left值。  
 2.2給小球加上`ref="ball"`可以使用 `this.$refs.ball`获得元素 

## 得到加入购物车中的商品数量
1. 在子组件的input标签中设置change事件，当输入框中的数量发生改变就会调用里面的函数
    `changeCount()`
2. 在函数中设置自定义事件，数量每改变一次，就向父组件传一次最新值
    `this.$emit('getCount',parseInt(this.$refs.count.value));`
3. 在父组件商品详情页面中定义事件 `@getCount="getSelectCount"` 
   得到加入购物车中的商品数量 `selectCount`并挂载到data()中备用


 # 购物车页面的设置
1. 需要用到vuex来解决复杂的组件间共享数据问题
2. 在main.js中引入vuex:
   2.1 安装vuex的包 -->`cnpm i vuex -S`
   2.2 导入vuex -->`import Vuex from "vuex"`
   2.3 注册vuex到vue中 `Vue.use(Vuex)`
   2.4 `new Vuex.Store() `实例，得到一个数据仓储对象
   2.5 将store挂载到vm实例上

## 该项目中store对象里需要配置的有？
1. `state` 可以想象成组件中data 用来存放数据,仓库的默认状态
   + 组件中要想访问store中数据 只能通过`this.$store.state.xxx`
   + 本项目中的`state`里只存了一个`cart`数组，用以存放加入购物车中的商品信息
2. `mutations` 可以想象成Methods
    + 要想操作store中的数据，必须调用mutations中的方法，不推荐直接操作store中的数据，万一导致数据紊乱，
    不能快速定位到错误原因 要想调用mutations中的方法，只能通过 `this.$store.commit('方法名')`
    + `mutations` 的参数列表中，最多只能传两个参数，其中，第一个只能是`state`状态，第二个是通过`commit`提交过来的参数（参数多是，可以是一个对象）
    + 该项目中`mutations`中的所有方法最后都需要保存到本地存储中
3. `getters` 可以在里面配置模板，通过`this.$store.getters.xxx `调用，相当于计算属性
    + 项目中需要循环遍历`state`中得到新对象的方法都放在 `getters`中
    + `getters` 中的方法只需要传入一个参数 `state`

## 加入购物车事件
1. 给“加入购物车”按钮添加点击事件 `addToShopCart` 
2. 在data()中新建一个商品信息对象，存放商品信息 `goodsInfo:{}`
3. 在`addToShopCart`方法中定义一个商品信息对象 如下
    `var goodsInfoList={`
                `id:this.id,`
               ` count:this.selectCount,`
                `price:this.goodsInfo.sell_price,`
               ` selected:true,`
                `quantity:this.goodsInfo.stock_quantity`
    `};`
4. 通过调用`this.$store.commit('addToCart',goodsInfoList);` 将商品信息传到`mutations`中的`addToCart`方法里
5. `addToCart`方法:
    5.1 判断传过来的商品信息的id，如果是新的商品id，则通过`push`方法存到`state`中的`cart`里
    如果是之前已有的，则值该商品数量
    5.2 更新cart后，把cart数组存到本地存储localStorage中
    `localStorage.setItem('cart', window.JSON.stringify(state.cart))`

## 同步购物车中的商品数量与购物车图标中徽标里的数
1. 通过加入购物车事件，将子组件中的商品数量值传到`state`中的`cart`里
2. 定义`getters`中的方法 `getAllCount` 
   2.1 定义一个变量c，用以存放购物车里所有商品的数量
   2.2 通过循环遍历`cart`数组里的对象，将`count`值全部加起来
   2.3 返回变量 c
3. 在`App.vue`中修改`id="badge"`的值，通过调用`$store.getters.getAllCount`
            
   
 ## 购物车商品列表区域界面
 1. 左边的按钮使用了Mint-UI库中的 `mt-switch`
 2. 设置购买数量的数字选择框，需要设为readonly
    2.1 由于这里的数字选择框与商品详情中的不一样，故独立创建了子组件`Cart_numbox.vue`
    2.2 主要区别：当数量发生改变时，函数传值的对象不同
        商品详情中的传值对象是其父组件 商品详情页面
        购物车里的传值对象是本地存储
3. 通过请求得到的数据，使用v-for渲染列表区域
   + 需先获取到store中的商品id，并根据id配置请求路径，获取购物车商品列表


## 同步数据输入框中的件数与本地存储中的件数
1. 在`getters`中定义`getGoodsCount`方法
2. 在方法里新建一个对象o，循环遍历cart数组，将id作为索引值，
   count作为属性值，巧妙地将对应id的count值保存到对象o里面
3. 返回对象o
4. 通过props传值 将`$store.getters.getGoodsCount[item.id]`传给子组件
5. 在子组件`Cart_numbox.vue`中input的value值为传过来的props

## 更改购物车里的商品件数
1. 在子组件`Cart_numbox.vue`的input中添加change事件，监听事件的变化
2. 当输入框里的数据发生变化时，触发change事件里的`changeCount`函数
3. 将变化值和对应商品的id作为一个对象，通过`commit`传给`store`
4. 在`mutations`中定义`updateCount`方法，将传过来的对象的count值进行更新
5. 并保存到本地存储中

## 删除购物车中的商品
1. 定义点击事件`remove(id,index)`
2. 索引值`index`可通过v-for循环里的第二个参数拿到
3. 使用数组的`splice`方法，根据索引值index来删除购物车列表中的商品
4. 删除完后需要同步更新`store`中的数据
   4.1 将要删除商品的id值传给store
       `this.$store.commit('removeFromCart',id);`
   4.2 在`mutations`中定义`removeFromCart`方法，同样是根据传过来的Id找到对应的索引值进行删除
   4.3 要记得保存到localStorage中

## 得到购物车中商品的选中状态
1. 默认状态为选中
2. 在`getters`中定义方法以获得商品的选中状态（方法参照得到商品件数）
3. 根据当前商品的id拿到对应的默认选中状态
3. 在组件`mt-switch`中通过绑定value值为`$store.getters.getSelected[item.id]`

## 更改购物车中的商品选中状态
1. 为`mt-switch`添加点击事件`selectedChange`
2. 通过点击事件将商品的id和状态的改变传给`store`
3. 在`mutations`中定义`updateGoodsSelected`方法，根据传过来对象的id，对选中状态进行更新
4. 并保存到本地存储中

## 得到商品结算区域的已选中商品的件数和总值
1. 在`getters`中定义`getGoodsAmount`方法
2. 方法里新建一个对象a,里面保存的是被选中商品的数量和单价，通过数量和单价计算总值

## 顶部返回键的设置
1. 使用Mint-ui库中的`mt-button `
2. 为返回键添加点击事件
3. 通过编程式导航设置后退路径 `this.$router.go(-1)`
4. 当页面为主页面时，返回键隐藏
5. 故需要一个watch监听器路由路径，用v-show来控制返回键的显示与隐藏



