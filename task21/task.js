
var Tags=["HTML","CSS","Javascript"];
var Hobbies=[];
function $$(id){
	return document.getElementById(id);
}
function addTags(){
	$$("Tagtext").onfocus=function(){
		document.onkeydown=function(ev){
			var ev = ev || window.event;
			if(ev.keyCode==13){
				var oText=$$("Tagtext").value.trim();
				if(oText==""){
					alert("输入值不能为空");
					$$("Tagtext").value="";
					return;
				}
				for(var i=0;i<Tags.length;i++){
					if(oText==Tags[i]){
						$$("Tagtext").value="";
						return;
					}
				}
				if(Tags.length>=10){
					Tags.shift();
					Tags.push(oText);
					$$("Tagtext").value="";
					render("tagContents",Tags);
					return;
				}
				Tags.push(oText);
				$$("Tagtext").value="";
				render("tagContents",Tags);
			}

		}
	}
	$$("Tagtext").onblur=function(){
		document.onkeydown=function(ev){
			var ev = ev || window.event;
			if(ev.keyCode==13){
				return;
			}
		}
	}

}

function delTags(num){
	Tags.splice(num, 1);
	render("tagContents",Tags);
}
function render(id,arr){
	$$(id).innerHTML="";
	for(var i=0;i<arr.length;i++){
		var oSpan = document.createElement("span");
		oSpan.innerHTML=arr[i];
		oSpan.title="点击删除数据";
		oSpan.num=i;
		$$(id).appendChild(oSpan);
	}
	
}

function addHobbies(){
	var oText=$$("hobbies").value.trim();
	var myarray  = oText.split(/[,，_、.。:：;；\s\t\n\r]/);
	$$("hobbies").value="";
	/*for(var i=0;i<myarray.length;i++){
		if(myarray[i].trim()!=""){
			if(Hobbies.length==0){
				Hobbies.push(myarray[i]);
				render("confirmFav",Hobbies);
			}else{
				for(var j=0;j<Hobbies.length;j++){
					if(myarray[i]==Hobbies[j]){
						return;
					}else{
						Hobbies.push(myarray[i]);
						render("confirmFav",Hobbies);
						break;
					}
				}
			}
			
			
		}
		
	}*/

	for(var i=0,len=myarray.length;i<len;i++){
		if(myarray[i].trim()!=""){
			if(Hobbies.length==0){
				Hobbies.push(myarray[i].trim());
				render("confirmFav",Hobbies);
			}else{
				for(var j=0;j<Hobbies.length;j++){
					if(myarray[i].trim()==Hobbies[j]){
					}else{
						Hobbies.push(myarray[i].trim());
					}
				}
			}
			
			
		}
	}
	render("confirmFav",Hobbies);
	
	
}



function init(){
	render("tagContents",Tags);
	render("confirmFav",Hobbies);
	addTags();

	$$("Btn").onclick=function(){
		addHobbies();
	}

	$$("tagContents").onclick=function(event){
		var ev = event || window.event;
		var target = ev.target || ev.srcElement;
		if(target.nodeName.toLowerCase()=="span"){
			delTags(target.num);
		}
	}

	$$("tagContents").onmouseover=function(event){
		var ev = event || window.event;
		var target = ev.target || ev.srcElement;
		if(target.nodeName.toLowerCase()=="span"){
			var aSpan = this.getElementsByTagName("span");
			for(var i=0;i<aSpan.length;i++){
				if(aSpan[i].num==target.num){
					aSpan[i].style.background="red";
					aSpan[i].innerHTML="点击删除"+Tags[target.num];
				}
			}
		}
	}

	$$("tagContents").onmouseout=function(event){
		var ev = event || window.event;
		var target = ev.target || ev.srcElement;
		if(target.nodeName.toLowerCase()=="span"){
			var aSpan = this.getElementsByTagName("span");
			for(var i=0;i<aSpan.length;i++){
				if(aSpan[i].num==target.num){
					aSpan[i].style.background="rgb(132,204,255)";
					aSpan[i].innerHTML=Tags[target.num];
				}
			}
		}
	}

}
init();