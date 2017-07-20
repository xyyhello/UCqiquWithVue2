<template>
	<section class="container">
		<touch-slider class="main_slider" v-bind:picArr="$store.state.jingxuanbanner" speed="200" autoplay="2000"></touch-slider >
	 	
	 	<xiaojianribao v-bind:info="xiaojian"></xiaojianribao>
 		
	  
 		<item-box v-for="item in $store.state.jingxuan" v-bind:info="item"></item-box> 
	 	 
	</section>
</template>

<script>
	import Xiaojianribao from "./Xiaojianribao.vue";
	export default {
		mounted(){
			//首页精选页数
			var page = 0;
			//发出action ， action替我们commit一个mutation
			this.$store.dispatch("getBanner");
			//请求小贱日报
			this.$store.dispatch("getXiaojian");
			//请求首页精选
			this.$store.dispatch("getJingxuan",{"page":page});

			var self = this;
			//函数节流
			var lock = true;
			//这里加滚动的监听
			$(window).on("scroll",()=>{
				if(!lock) return;
				//计算一个比例
				var rate = $(window).scrollTop() / ($(document).height() + $(window).height());
				//大于0.9的时候请求更多的数据
				if(rate > 0.9){
					//关锁
					lock = false;
					//发出dispatch
					this.$store.dispatch(
						"getJingxuan",{
							"page": page + 1 , 
							"callback" : (length)=>{
								if(length != 0){
									page++;
									lock = true;
								}
							}
						}
					);
				}
			});
		},
		computed : {
			//小贱日报的验证。看看数组是否返回了。
			xiaojian(){
				if(this.$store.state.xiaojian.length > 0){
					return this.$store.state.xiaojian[0];
				}
				return [];
			}
		},
		methods : {
			 
		},
		components : {
			Xiaojianribao
		}
	}
</script>

<style>
	.container{
		padding-top: 20px;
		background-color: #e1e1e1;
	}
	.main_slider{
		margin-bottom: 10px;
	}
	 
</style>