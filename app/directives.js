import router from "./router.js";

const directives = {
	mylink(el,params){
		//加事件
		$(el).on("tap",function(){
			//push表示压如history栈，此时网页将跳转
			console.log(params.value)
			router.push(params.value);
		});
	} 

}

export default directives;