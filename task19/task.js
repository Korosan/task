var data=[20,80,40,50,90];
function $$(id){
	return document.getElementById(id);
}
function addData(num){
	var oText=$$("text").value.trim();
	$$("text").value="";
	if(!oText.match(/^\d+$/)) {
		alert("空气质量指数必须为整数！");
		return;
	}else if(oText<10 || oText>100){
		alert("数字必须在10-100内");
		return;
	}else if(data.length>=60){
		alert("队列数量限制为60，超过不添加");
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
		oSpan.style.height = data[i]+"px";
		oSpan.style.marginTop = 100 - data[i] + "px";
		oSpan.title="高度："+data[i]+"；点击能删除";
		oSpan.num=i;
		$$("show").appendChild(oSpan);
	}
	
}
function bubbleSort(num){	//冒泡排序
	var temp;
	if(data.length==0){
		alert("没有数据");
		return;
	}
	for(var i=0;i<data.length;i++){
		for(var j=i+1;j<data.length;j++){
			switch (num) {
				case 0: 
					// statements_1
					if(data[i]>data[j]){	//从小到大
						temp=data[i];
						data[i]=data[j];
						data[j]=temp;
					}
					break;
				case 1:
					if(data[i]<data[j]){	//从大到小
						temp=data[i];
						data[i]=data[j];
						data[j]=temp;
					}
				default:
					// statements_def
					break;
			}
			
		}
	}
	render();
}
function init(){
	render();
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