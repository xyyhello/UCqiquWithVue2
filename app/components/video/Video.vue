<template>
	<div class="container">
		<video-box v-for="(item,index) in $store.state.videos" v-bind:info="item"></video-box>
	</div>
</template>

<script>
	import VideoBox from "./VideoBox.vue";
	export default {
		created(){
			this.$store.dispatch("getVideo");
		},
		components : {
			VideoBox
		}
	}
</script>


<style>
	

</style>