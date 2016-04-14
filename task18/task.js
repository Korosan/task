var data=[];
function $$(id){
	return document.getElementById(id);
}
function addData(num){
	var oText=$$("text").value.trim();
	$$("text").value="";
	if(!oText.match(/^\d+$/)) {
		alert("空气质量指数必须为整数！");
		return;
	}
	switch (num) {
		case 0:
			data.unshift(oText);
			break;
		case 1:
			data.push(oText);
			break;
		default:
			// statements_def
			break;
	}
	render();

	
}
function delData(num){
	data.splice(num, 1);
	render();
}
function render(){
	$$("show").innerHTML="";
	for(var i=0;i<data.length;i++){
		var oSpan = document.createElement("span");
		oSpan.innerHTML=data[i];
		oSpan.title="点击删除数据";
		oSpan.num=i;
		$$("show").appendChild(oSpan);
	}
	
}
function init(){
	$$("leftIn").onclick=function(){
		addData(0);
		
	}
	$$("rightIn").onclick=function(){
		addData(1);
	}

	$$("leftOut").onclick=function(){
		if(data.length!=0){
			data.shift();
			render();
		}else{
			alert("没有数据");
		}
		
	}
	$$("rightOut").onclick=function(){
		if(data.length!=0){
			data.pop();
			render();
		}else{
			alert("没有数据");
		}
	}
	$$("show").onclick=function(event){
		var ev = event || window.event;
		var target = ev.target || ev.srcElement;
		if(target.nodeName.toLowerCase()=="span"){
			delData(target.num);
		}
	}

}
init();