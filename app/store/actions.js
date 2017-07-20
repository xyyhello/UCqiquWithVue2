import store from "./store.js";

export const actions = {
	//罗列Action，非常像React + Redux中的action文件
	getBanner({commit}){
		$.get("php/banner.php",function(data){
			 commit("GETBANNER",JSON.parse(data));
		});
	},
	getXiaojian({commit}){
		$.get("php/xiaojianribao.php?page=0",function(data){
			commit("GETXIAOJIAN",JSON.parse(data).data);
		});
	},
	getJingxuan({commit},o){
		$.get("php/jingxuan.php",{"page": o.page},function(data){
			commit("GETJINGXUAN",{shuju: JSON.parse(data).data});
			//执行回调函数
			if(o.callback != undefined){
				o.callback(JSON.parse(data).data.length);
			}
		});
	},
	chooselike({commit},o){
		commit("CHOOSELIKE",o);
	},
	getVideo({commit}){
		$.get("/php/video.php",{page:0},(data)=>{
			commit("GETVIDEO",{data:JSON.parse(data).data});
		})
	}
}