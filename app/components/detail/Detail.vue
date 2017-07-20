<template>
	<div>
		<header class="detail_header">
			<h1>奇趣百科</h1>
		</header>
		<div class="detail_box">
			<span class="avatar">
				<img v-bind:src="info.avatar" alt="">
			</span>
			<span class="auther">
				{{info.user_name}}
			</span>
			<span class="title">
				{{info.title}}
			</span>
			<p>
				<img v-bind:src="info.imgUrl" alt="">
			</p>

			<div class="commet_box">
				<p>评论({{comment.comments.length}})</p>

				<comment-item v-for="(item,index) in pinglun"  v-bind:info="item"></comment-item>

				<button @click="showMoreBtn" v-show="!showMore">显示所有评论</button>
			</div>
		</div>

	</div>
</template>


<script type="text/javascript">
	import CommentItem from "./CommentItem.vue";
	export default {
		created(){
			var self = this;
			//这里发出一个Ajax了，不从state中转
			$.get("/php/detail.php",(data)=>{
				self.info = JSON.parse(data).data;
			});

			//请求评论
			$.get("/php/comment.php",(data)=>{
				self.comment = JSON.parse(data).data;
			});
		},
		data(){
			return {
				info : {},
				comment : {
					comments : []
				},
				showMore : false
			}
		},
		computed : {
			pinglun(){
				if(!this.showMore){
					return this.comment.comments.slice(0,3);
				}else{
					return this.comment.comments
				}
			}
		},
		methods : {
			showMoreBtn(){
				this.showMore = true;
			}
		},
		components : {
			CommentItem
		}
	}
</script>


<style>
	.detail_header{
		height: 50px;
		background: url(/assets/images/detail-header-bg.png) repeat-x;
		background-size: auto 50px;
	}
	.detail_header h1{
		text-align: center;
	}
	.detail_box{
		width: 100%;
		margin: 0 auto;
		margin-top: -20px;
		max-width: 560px;
		background-color: white;
	}
	.avatar{
		display: block;
		text-align: center;
	}
	.avatar img{
		width: 30px;
		height: 30px;
	}
	.auther{
		display: block;
		text-align: center;
	}

</style>