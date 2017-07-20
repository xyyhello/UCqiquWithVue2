<template>
	<div>
		<header ref="myheader">
			<div class="header-bg"></div>
			<nav>
				<ul>
					<li v-bind:class="{cur:$store.state.url=='/index/index'}"><a v-mylink="'/index/index'">精选</a></li>
					<li v-bind:class="{cur:$store.state.url=='/index/video'}"><a v-mylink="'/index/video'">视频</a></li>
					<li v-bind:class="{cur:$store.state.url=='/index/a'}"><a v-mylink="'/index/index'">段子</a></li>
					<li v-bind:class="{cur:$store.state.url=='/index/b'}"><a v-mylink="'/index/video'">发现</a></li>
					<li v-bind:class="{cur:$store.state.url=='/index/c'}"><a v-mylink="'/index/video'">奇趣专栏</a></li>
				</ul>
			</nav>
		</header>
		<router-view>
			
		</router-view>
	</div>
</template>


<script>
 	export default {
 		created(){
 			$(window).on("scroll",()=>{
 				var A = $(window).scrollTop();
 				if(A > 400){
 					$(this.$refs.myheader).addClass("q");
 				}else{
 					$(this.$refs.myheader).removeClass("q");
 				}
 			})
 		}
 	}
</script>

<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
	body{
		font-family: "Microsoft Yahei";
		padding-top: 100px;
		background-color: #eee;
	}
	header{
		height: 100px;
		background-color: #fff8de;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
		transition:all 0.2s ease 0s;
	}
	header.q{
		top: -62px;
	}
	.header-bg{
		height: 62px;
		background: url("/assets/images/header-bg-ui2.png") no-repeat center;
		background-size: auto 62px;
	}
	header nav{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 38px;
		background-color: #f79100;
	}
	header nav ul{
		list-style: none;
		width: 100%;
		max-width: 520px;
		margin: 0 auto;
		transition:all 0.2s ease 0s;
	}
	header nav ul li{
		float: left;
		width: 20%;
		text-align: center;
		line-height: 38px;
		transition:all 0.2s ease 0s;
	}
	header nav ul li a{
		color:#764000;
		font-size: 14px;
	}
	header nav ul li.cur{
		background-color: orange;
	}
</style>