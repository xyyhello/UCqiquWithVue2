import App from "./components/App.vue";
import VueRouter from "vue-router";
import Index from "./components/index/Index.vue";
import Video from "./components/video/Video.vue";
import Detail from "./components/detail/Detail.vue";
 
//路由清单
const routes = [
	{
		path : "/index" , 
		component : App,
		children : [
			{
				path : "index",
				component : Index
			},
			{
				path : "video",
				component : Video
			}
		]
	},
	{
		path : "/detail" , 
		component : Detail,
		name : "detail"
	},
	{  //让其他路由都自动跳转到/index/index去
		path : "/*" , 
		redirect : "/index/index"
	}
];

const router = new VueRouter({
  	routes : routes
});

export default router;