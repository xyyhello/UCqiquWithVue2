<template>
	<div>
		<div class="comment_item">
			 
			<img v-bind:src="info.extra.avatar" alt="">
			<p class="zuozhe">
				{{info.author}}
			</p>
			<p class="neirong">
				{{info.message}}
			</p>
			<p class="zan">
				 
				赞：{{info.like}}
			</p>

		</div>
	</div>
	 
</template>

<script type="text/javascript">
	export default {
		props : ["info"]
	}
</script>

<style type="text/css">
	.comment_item{
		height: 100px;
		border-bottom: 1px solid orange;
		padding-left: 60px;
		position: relative;
	}
	.comment_item img{
		position: absolute;
		top: 10px;
		left: 0px;
		width: 50px;
		height: 50px;
	}
	.comment_item .zuozhe{
		font-size: 16px;
		font-weight: bold;
		line-height: 200%;
	}
</style>