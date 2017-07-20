export const mutations = {
	//得到banner，更改state对象
 	GETBANNER(state,bannerarray){
 		state.jingxuanbanner = bannerarray;
 	},

 	//得到小贱，更改state对象
 	GETXIAOJIAN(state,xiaojianarr){
 		state.xiaojian = xiaojianarr;
 	},


 	GETJINGXUAN(state,o){
 		//两个数组合并，把请求来的新数组，合并到老数组的后面
 		state.jingxuan = state.jingxuan.concat(o.shuju);
 	},

 	CHOOSELIKE(state,o){
 		//遍历自己的精华帖子，然后找到哪个帖子的id是o.id，然后把这个帖子的_incr的like++
 		state.jingxuan.map((item)=>{
 			if(item._id == o.id){
 				item._incrs.like++;
 			}
 		})
 	},

 	GETVIDEO(state,obj){
 		
 		state.videos = state.videos.concat(obj.data);
 	}
}