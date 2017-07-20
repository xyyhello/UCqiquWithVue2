# UCqiquWithVue2-基于Vue2的仿手机端UC奇趣百科的小项目
## 概况
	2.0用一个fork自snabbdom的轻量VirtualDOM实现对渲染层进行了重写。在其上层，Vue的模板编译器能够在编译时做一些智能的优化处理，例如分析并提炼出静态子树以避免界面重绘时不必要的比对。新的渲染层较之v1带来了巨大的性能提升，也让Vue2.0成为了最快速的框架之一。除此之外，它把你在优化方面需要做的努力降到了最低，因为Vue的响应系统能够在巨大而且复杂的组件树中精准的判断其中需要被重绘的那部分。还有个值得一提的地方，就是2.0的runtime-only包大小min+gzip过后只有16kb，即便把vue-router和vuex都包含进去也只有26kb，和 v1 核心的包大小相当！
但是，Vue2在于vue-router、vuex、vue-loader配置的时候，版本需要多加注意。本项目将尽量以最少的插件实现vue2的实现。由于本项目只是个demo，我没有为此建立数据库，只是用.txt文件模拟了一下。数据来源于UC奇趣百科，本项目只用于演示，不用于任何商业目的。如有任何版权问题，请尽快与我联系删除。
# 技术栈
本项目的技术栈将采用官方推荐的技术栈进行项目搭建：vue-router做路由，vuex做状态管理，实现单向数据流通，webpack进行编译及打包.
# 项目文件夹：
该项目的文件夹结构如下所示：<br>
```javascript
		┠ app 	 	开发文件件
			┃ ┠	components 存放vue组件
			┃ ┠	store react中不可细分的组件
				┃ ┠ actions 类似redux中的actions部分，存放需要dispatch的函数，一般异步请求讲放在这里，在这里进行commit mutation
				┃ ┠ mutation 需要commit的函数，这是项目改变状态的地方
				┃ ┠ store vuex的核心组件，里面管理state gettes mutations 和actions
			┃ ┠	directives.js 指令
			┃ ┠	main.js   入口文件
			┃ ┠	router.js	路由
		┠ assets	静态资源文件,存放	所有不需要跨域就能请求的静态资源比如images、css、js库等
		┠ dist		存放编译后的文件
			┃ ┠ bundle.js 编译后的文件
		┠  PHP     PHP接口
		┠	.babelrc	babel配置文件
		┠	index.html  主页
		┠	package.json 依赖文件
		┠	webpack.config.js  webpack配置文件		
```
# 项目启动
### 安装node & npm

[https://nodejs.org/](https://nodejs.org/)

### 安装 `cnpm`

```shell
npm --registry=http://registry.npm.taobao.org i -g cnpm
```

### 安装依赖

```shell
cnpm install
```


### 项目开发

```shell
npm run start
```
# 项目概述
## package.json:
```javascript
{
  "name": "ucqiquwithvue2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.1.10",          
    "vue-router": "^2.2.1",		
    "vuex": "^2.1.3"			
  },
  "devDependencies": {
    "babel-core": "^6.22.1",				
    "babel-loader": "^6.2.10",				
    "babel-plugin-transform-object-rest-spread": "^6.3.13", 
    "babel-plugin-transform-runtime": "^6.8.0",					
    "babel-preset-es2015": "^6.6.0",				
    "babel-preset-es2016": "^6.22.0",				
    "babel-runtime": "^6.0.0",					
    "css-loader": "latest",
    "extract-text-webpack-plugin": "^2.0.0",  
    "vue-hot-reload-api": "^1.2.0",
    "vue-html-loader": "^1.0.0",
    "vue-loader": "^11.1.3",
    "vue-style-loader": "^1.0.0",
    "vue-template-compiler": "^2.0.0",
    "webpack": "^2.2.1"
  }
}

```
## .babelrc:
```javascript
{
	"presets": [
		"es2015",
		"es2016" 
	],
	"plugins": [
		"transform-object-rest-spread",
		"transform-runtime"
	]
}
```
## webpack.config.json:
```javascript
var path = require("path");
var webpack = require("webpack");
 
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.min.js"
  },
  module: {             
    loaders:[
        {
          test:/\.vue$/,
          loader :"vue-loader",
          exclude:["/node_modules/"]
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          query: {presets: ['es2015','es2016']},
          exclude: /node_modules/
        }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  watch : true
};
```
## vue与vuex配合的mai.js 文件：
```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/store.js";
//插件,使用路由插件
Vue.use(VueRouter);
 
import router from "./router.js";
import directives from "./directives.js";

//注册全局指令
Vue.directive("mylink",directives.mylink);
Vue.directive("checkclass",directives.checkclass);
//注册全局组件
Vue.component("touch-slider",Vue.extend(require("./components/common/TouchSlider.vue")));
Vue.component("item-box",Vue.extend(require("./components/common/ItemBox.vue")));

//match函数
router.beforeEach(function(to,from,next){
	store.state.url = to.path;
	next();
});
 	 
//创建和挂载根实例，创建的时候Vue构造函数中要添加router属性；注册一下store, 这样所有的子组件中就都有store的定义域了
var app = new Vue({
	router ，
	store
}).$mount('#app');
```
## 每个子组件形如：
```javascript
<template>

</template>
<script>

</script>
<style>

</style>

```






