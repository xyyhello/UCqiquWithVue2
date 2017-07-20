<template>
	<div>
		<div class="item_box">
			<div class="hd">
				<div class="avatar_box">
					<img :src="info.avatar" class="avatar">
					<p>{{info.user_name}}</p>
				</div>
				<p class="title">{{info.title}}</p>
			</div>
			<div class="bd">
				<div>
					<div class="picbox" ref="picbox">
						<div class="playbtn" ref="playbtn"  v-show="!showPlayer"></div>
						<img  ref="pic" :src="mobile_img_url" class="mobile_pic" v-show="!showPlayer">
						 
						<video width="100%" v-bind:src="shipindizhi" controls v-if="showPlayer" autoplay ></video>
					</div>
				</div>

				<div class="numbers">
					<div class="number1">
						<span class="i1" ref="likebtn" v-bind:class="{done:alreadyLike}">{{info._incrs.like}}</span>
						<span class="i2">{{info._incrs.dislike}}</span>
					</div>
					<div class="number2"><span  ref="pinglunbtn" class="i3">{{info.comment_total}} </span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import router from "../../router.js";
	export default{
		props : ["info"],
		mounted(){
			var self = this;
			//给图片盒子添加监听
			$(this.$refs.picbox).on("tap",function(){
				self.showPlayer = true;
			});	

			 
			//喜欢按钮监听
			$(this.$refs.likebtn).bind("tap",()=>{
				if(self.alreadyLike) return;
				self.alreadyLike = true;
				this.$store.dispatch("chooselike",{id:this.info._id})
			});

			//评论按钮监听
			$(this.$refs.pinglunbtn).bind("tap",()=>{
				 //跳转
				router.push({"name":"detail","query":{"id":this.info._id}});
			});
		},
		computed : {
			mobile_img_url(){
				if(this.info.media_data && Array.isArray(this.info.media_data)){
					return this.info.media_data[0].mobile_img_url;
				}
				return "";
			},
			format(){
				if(this.info.media_data && Array.isArray(this.info.media_data)){

					return this.info.media_data[0].format.toLowerCase();
				}
				return "";
			},
			shipindizhi(){
				return "/assets/mp4/1.mp4";
			}
		},
		data(){
			return {
				alreadyLike : false,
				showPlayer : false
			}
		}
	}
</script>

<style lang="css">
	.item_box{
		background-color: white;
		width: 98%;
		border:6px solid #e1e1e1;
		box-sizing:border-box;
		position: relative;
	}
	.item_box .avatar_box{
	 	width: 100px;
	 	margin: 0 auto;
	 	text-align: center;
	}
	.item_box .avatar{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.item_box .title{
		padding: 20px;
	}
	.item_box .hd{
		padding-top: 20px;
		position: relative;
	}
	.item_box .bd{
		clear: both;
		margin-top: 20px;
		overflow: hidden;
		padding: 20px 0;
		position: relative;
	}
	.item_box .bd .number1{
		float: left;
		text-align: center;
		padding-left: 20px;
	}
	.item_box .bd .number2{
		float: right;
		text-align: center;
	}
	.item_box .bd  span{
		padding-left: 20px;
		position: relative;
		margin-right: 20px;
	}
	.item_box .bd  span::before{
		content:"";
		width: 20px;
		height: 20px;
		background: url(/assets/images/icons.png) -25px -100px;
	    background-size: 250px 237.5px;
    	background-repeat: no-repeat;
    	position: absolute;
    	top: 0;
    	left: -6px;
	}
	.item_box .bd  span.done::before{
		background-position: 0 -100px;
	}
	.item_box .bd  span.i2::before{
		 background-position: -75px -100px;
	}
	.item_box .bd  span.i3::before{
		 background-position: -200px -100px;
	}
	.mobile_pic{
		width: 100%;
	}
	.item_box .bd .numbers{
		margin-top: 20px;
	}
	.item_box .picbox{
		position: relative;
	}
	.item_box .picbox .playbtn{
		background: url(/assets/images/icons.png)  -200px -125px;
		background-size: 250px 237.5px;
		background-repeat: no-repeat;   
		width: 45px;
		height: 45px;
		margin-left: -22.5px;
		margin-top: -22.5px;
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 1;
	}
	.item_box .picbox .loading{
		background: url(/assets/images/loading.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;   
		width: 45px;
		height: 45px;
		margin-left: -22.5px;
		margin-top: -22.5px;
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 1;
		animation:rotate 1s linear 0s infinite;
		display: none;
		transform-origin: 50% 50% !important; 
	}

	@-webkit-keyframes rotate{
		from{
			transform:rotate(0);
		}
		to{
			transform:rotate(360deg);
		}
	}
</style>