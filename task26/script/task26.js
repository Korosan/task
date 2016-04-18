var control={
	status:{
		speed:20,						//20px/s
		T:1000,							//1s
		time:100,						//100ms/次	定时器
		energyReduceRate:5,				//5/s
		energyRecoverRate:2,			//2/s
		sendflag:false,
		airships:[
			{
				id:1,					//飞船标识
				commond:"null",			//空状态，未创建飞船
				energy: "100%",			//能源
				deg:0,					//飞船位置
				moveflag:false,			//飞船能否启动
				openSystemflag:false,	//飞船能否开启能源恢复系统
				energyflag:false,		//飞船能源系统能否恢复能源
			},
			{
				id:2,
				commond:"null",
				energy: "100%",
				deg:0,
				moveflag:false,
				openSystemflag:false,
				energyflag:false,
			},
			{
				id:3,
				commond:"null",
				energy: "100%",
				deg:0,
				moveflag:false,
				openSystemflag:false,
				energyflag:false,
			},
			{
				id:4,
				commond:"null",
				energy: "100%",
				deg:0,
				moveflag:false,
				openSystemflag:false,
				energyflag:false,
			}
		],
	}

}

function createAirship(){
	var oScene = document.getElementById("scene");
	var oUl = oScene.getElementsByTagName("ul")[0];
	var createId=0;																		//船编号
	var Coloumn=0;																		//统计已用多少个空标识
	setTimeout(function(){
		Mediator();
		if(control.status.sendflag){
			for(var i=0,len=control.status.airships.length;i<len;i++){
				if(control.status.airships[i].commond=="null"){
					createId=control.status.airships[i].id;
					break;
				}else if(control.status.airships[i].commond!="null"){
					Coloumn++;
				}
			}
			if(Coloumn==4){
				info_add("##飞船数量已经到达上限，不能再创建飞船");
				return;
			}
			RandomAppear(createId);														// 0-360 角度 生成随机位置
			control.status.airships[createId-1].energy = "100%";						//新的飞船  能源满额
			var oLi = document.createElement("li");										//创建飞船整体
			oLi.shipid=createId;
			oLi.className="airship";
			oUl.appendChild(oLi);
			var oSpan1 = document.createElement("span");								//创建飞船头部
			oSpan1.className="ship_head";
			var oSpan2 = document.createElement("span");								//创建飞船身体
			oSpan2.className="ship_body";
			var oP = document.createElement("p");
			oP.innerHTML=createId+"号-"+control.status.airships[createId-1].energy;		//显示飞船信息
			oSpan2.appendChild(oP);
			oLi.appendChild(oSpan1);
			oLi.appendChild(oSpan2);
			control.status.airships[createId-1].commond="stop";							//新建的飞船状态都是静止的
			control.status.airships[createId-1].moveflag=true;							//可让飞船移动
			control.status.airships[createId-1].openSystemflag=true;					//可启动能源恢复系统
			control.status.airships[createId-1].energyflag=true;						//能否恢复的flag判断
			var r=-140-(createId-1)*55;	//半径
			circularmoving(createId,control.status.airships[createId-1].deg,r);			//飞船初始位置
			createControl(createId);													//创建控制台
			info_add("##成功创建"+createId+"号飞船");

		}else{
			info_add("##创建飞船失败");
		}
	}, 1000);
}

function RandomAppear(createId){												// 0-360 角度 生成随机位置
	var deg = Math.floor(Math.random()*360);
	control.status.airships[createId-1].deg=deg;
}



function createControl(createId){												//创建控制台
	var oControl = document.getElementById("control");
	var oDiv = document.createElement("div");
	oDiv.className = "forship";
	oDiv.shipId = createId;
	oDiv.innerHTML = "<label>对"+createId+"号飞船下达指令：</label>";
	oDiv.innerHTML += " <input type='button' value='开始飞行' onclick='startmove("+createId+")' />";
	oDiv.innerHTML += " <input type='button' value='停止飞行' onclick='stopmove("+createId+")' />";
	oDiv.innerHTML += " <input type='button' value='能源系统'  onclick='energyRecoverSystem("+createId+")' />";
	oDiv.innerHTML += " <input type='button' value='关闭系统'  onclick='stopRecoverSystem("+createId+")' />";
	oDiv.innerHTML += " <input type='button' value='销毁飞船'  onclick='destroy("+createId+")' />";
	oControl.appendChild(oDiv);

}
function startmove(createId){
	setTimeout(function(){
		Mediator();
		if(control.status.sendflag){
			var oControl = document.getElementById("control");
			var aDiv = oControl.getElementsByTagName("div");
			if(parseInt(control.status.airships[createId-1].energy)==0){
				control.status.airships[createId-1].commond="stop";
				control.status.airships[createId-1].moveflag=true;
				return;
			}
			var control_subline=0;
			for(var i=0,len=aDiv.length;i<len;i++){
				if(aDiv[i].shipId==createId){
					control_subline=i;
					break;
				}
			}
			control.status.airships[createId-1].commond="move";
			if(control.status.airships[createId-1].moveflag){
				movefunc(createId);
				info_add("##"+createId+"号飞船起飞");
			}else{
				info_add("##"+createId+"号飞船已经在飞行");
			}
		}else{
			info_add("##"+createId+"号飞船接收不到起飞指令");
		}
	}, 1000);
	
}
function movefunc(createId){
	var r=-140-(createId-1)*55;								//半径
	var deg=control.status.speed*360/(2*Math.PI*Math.abs(r)*control.status.T/control.status.time);
	//control.status.speed*360/(2*Math.PI*Math.abs(r)*10);	//0.1秒运行的角度 (20px/s)
	var degZ=control.status.airships[createId-1].deg;
	var mover=setInterval(function(){
		//energyRecoverSystem(createId,T,time);
		degZ=degZ+deg;
		control.status.airships[createId-1].deg=degZ;
		if(degZ>=360){
			degZ=0;
		}
		if(control.status.airships[createId-1].commond=="stop"){
			control.status.airships[createId-1].moveflag=true;
			clearInterval(mover);
			return;
		}else if(control.status.airships[createId-1].commond=="null"){
			control.status.airships[createId-1].moveflag=false;
			clearInterval(mover);
			return;
		}else if(control.status.airships[createId-1].commond=="move"){
				control.status.airships[createId-1].moveflag=false;
				circularmoving(createId,degZ,r);
				energyreducing(createId);
			
		}
	}, control.status.time);
	
}

function stopmove(createId){
	setTimeout(function(){
		Mediator();
		if(control.status.sendflag){
			var oControl = document.getElementById("control");
			var aDiv = oControl.getElementsByTagName("div");
			var control_subline=0;
			for(var i=0,len=aDiv.length;i<len;i++){
				if(aDiv[i].shipId==createId){
					control_subline=i;
					break;
				}
			}
			if(control.status.airships[createId-1].moveflag){
				info_add("##"+createId+"号飞船已经停止");
				return;
			}
			control.status.airships[createId-1].commond="stop";
			control.status.airships[createId-1].moveflag=true;
			info_add("##"+createId+"号飞船停止飞行");
		}else{
			info_add("##"+createId+"号飞船接收不到停止指令");
		}
	}, 1000);
	
}

function destroy(createId){
	setTimeout(function(){
		Mediator();
		if(control.status.sendflag){
			var oScene = document.getElementById("scene");
			var oControl = document.getElementById("control");
			var oUl = oScene.getElementsByTagName("ul")[0];
			var aLi = oUl.getElementsByTagName("li");
			var aDiv = oControl.getElementsByTagName("div");
			var ship_subline=0;
			var control_subline=0;
			for(var i=0,len=aLi.length;i<len;i++){
				if(aLi[i].shipid==createId){
					ship_subline=i;
					break;
				}
			}
			for(var i=0,len=aDiv.length;i<len;i++){
				if(aDiv[i].shipId==createId){
					control_subline=i;
					break;
				}
			}
			control.status.airships[createId-1].commond="null";
			oUl.removeChild(aLi[ship_subline]);
			oControl.removeChild(aDiv[control_subline]);
			info_add("##"+createId+"号飞船摧毁成功");
		}else{
			info_add("##"+createId+"号飞船接收不到摧毁指令");
		}
	}, 1000);
	
}

function energyreducing(createId){
	var energyReduce = control.status.energyReduceRate*control.status.time/control.status.T;	//减少的能源/100ms
	var allenergy = parseFloat(control.status.airships[createId-1].energy);
	allenergy = allenergy-energyReduce;
	allenergy = parseFloat(allenergy).toFixed(1);
	if(allenergy<0){
		allenergy=0;
		control.status.airships[createId-1].commond="stop";
		info_add("##"+createId+"号飞船能源耗尽，飞船停止飞行");
	}
	control.status.airships[createId-1].energy=allenergy+"%";
	p_word(createId);
}

function energyRecoverSystem(createId){
	setTimeout(function(){
		Mediator();
		if(control.status.sendflag){
			var currentEnergy = parseFloat(control.status.airships[createId-1].energy);
			if(currentEnergy==100){
				info_add("##"+createId+"号飞船能源已满，无法充能");
				return;
			}
			if(control.status.airships[createId-1].openSystemflag){
				energyRecoverfunc(createId);
				info_add("##"+createId+"号飞船开启能源系统");
			}else{
				info_add("##"+createId+"号飞船已经在充能");
			}
		}else{
			info_add("##"+createId+"号飞船接收不到补充能源指令");
		}
	}, 1000);
	
	
}

function  energyRecoverfunc(createId){
	var recover=setInterval(function(){
		if(control.status.airships[createId-1].energyflag){
			var currentEnergy = parseFloat(control.status.airships[createId-1].energy);
			if(currentEnergy>100-control.status.energyRecoverRate*control.status.time/control.status.T){
			control.status.airships[createId-1].energy="100%";
			control.status.airships[createId-1].energyflag=true;
			control.status.airships[createId-1].openSystemflag=true;
			p_word(createId);
			clearInterval(recover);
			info_add("##"+createId+"号飞船能源填充完毕");
			return;
			}else{
				control.status.airships[createId-1].openSystemflag=false;
				energyRecover(createId);
			}
		}else{
			control.status.airships[createId-1].openSystemflag=true;
			control.status.airships[createId-1].energyflag=true;
			clearInterval(recover);
		}
			
	}, control.status.time);
}

function stopRecoverSystem(createId){
	var oInfo_area = document.getElementById("info_area");
	setTimeout(function(){
		Mediator();
		if(control.status.sendflag){
			if(control.status.airships[createId-1].openSystemflag){
				info_add("##"+createId+"号飞船能源系统未开启");

			}else{
				control.status.airships[createId-1].energyflag=false;
				info_add("##"+createId+"号飞船能源系统成功关闭");
			}
		}else{
			info_add("##"+createId+"号飞船接收不到关闭能源系统指令");
		}
	}, 1000);
}

function energyRecover(createId){
	var energyRecover = control.status.energyRecoverRate*control.status.time/control.status.T;
	var allenergy = parseFloat(control.status.airships[createId-1].energy);
	allenergy = allenergy+energyRecover;
	allenergy = parseFloat(allenergy).toFixed(1);
	control.status.airships[createId-1].energy=allenergy+"%";
	p_word(createId);
}

function p_word(createId){
	var oScene = document.getElementById("scene");
	var oUl = oScene.getElementsByTagName("ul")[0];
	var aLi = oUl.getElementsByTagName("li");
	var ship_subline=0;
	for(var i=0,len=aLi.length;i<len;i++){
		if(aLi[i].shipid==createId){
			ship_subline=i;
			break;
		}
	}
	var oP = aLi[ship_subline].getElementsByTagName("p")[0];
	oP.innerHTML=createId+"号-"+control.status.airships[createId-1].energy;
}



function circularmoving(id,deg,r){		//飞船圆周运动
	var oScene = document.getElementById("scene");
	var oUl = oScene.getElementsByTagName("ul")[0];
	var aLi = oUl.getElementsByTagName("li");
	var ship_subline=0;
	for(var i=0,len=aLi.length;i<len;i++){
		if(aLi[i].shipid==id){
			ship_subline=i;
			break;
		}
	}
	var oP = aLi[ship_subline].getElementsByTagName("p")[0];
	radian = (2*Math.PI/360)*deg;
	x=Math.floor(r*Math.sin(radian));
	y=Math.floor(r*Math.cos(radian));
	aLi[ship_subline].style.marginTop = y+"px";
	aLi[ship_subline].style.marginLeft = -x+"px";
	aLi[ship_subline].style.transform = "rotate("+deg+"deg)";
	if(parseInt(deg)>=90 && parseInt(deg)<270){
		oP.style.transform = "rotate(180deg)";
	}else{
		oP.style.transform = "rotate(0)";
	}


}

function Mediator(){
	var oInfo_area = document.getElementById("info_area");
	var msg = document.getElementById("msg");
	var msg_end = document.getElementById("msg_end");
	if(Math.random()<0.3){		//30%丢包率
		var oP = document.createElement("p");
		oP.innerHTML="#控制台发送指令失败(；′⌒`)";
		oP.className="red";
		msg.appendChild(oP);
		msg_end.scrollIntoView();
		control.status.sendflag=false;
	}else{
		var oP = document.createElement("p");
		oP.innerHTML="#控制台发送指令成功O(∩_∩)O";
		oP.className="green";
		msg.appendChild(oP);
		msg_end.scrollIntoView();
		control.status.sendflag=true;

	}
}

function info_add(text){
	var msg = document.getElementById("msg");
	var msg_end = document.getElementById("msg_end");
	var oP = document.createElement("p");
	oP.innerHTML=text;
	msg.appendChild(oP);
	msg_end.scrollIntoView();
}
