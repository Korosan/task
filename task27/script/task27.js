var control={
	status:{
		speed:20,						//20px/s
		T:1000,							//1s
		time:100,						//100ms/次	定时器
		energyReduceRate:5,				//5/s
		energyRecoverRate:2,			//2/s
		sendflag:false,
		BUS_time:300,				//ms


		powerSystem:[
			{
				name:"前进号",
				speed:30,
				energyReduceRate:5,
			},
			{
				name:"奔腾号",
				speed:50,
				energyReduceRate:7,
			},
			{
				name:"超越号",
				speed:80,
				energyReduceRate:9,
			},
		],

		energySystem:[

			{
				name:"劲量型",
				energyRecoverRate:2,
			},
			{
				name:"光能型",
				energyRecoverRate:3,
			},
			{
				name:"永久型",
				energyRecoverRate:4,
			},
		],



		airships:[
			{
				id:1,					//飞船标识
				commond:"null",			//空状态，未创建飞船
				energy: "",			//能源
				deg:0,					//飞船位置
				moveflag:false,			//飞船能否启动
				openSystemflag:false,	//飞船能否开启能源恢复系统
				energyflag:false,		//飞船能源系统能否恢复能源
				powerSystemName:"",
				energySystemName:"",
				speed:0,
				energyReduceRate:0,
				energyRecoverRate:0,

			},
			{
				id:2,
				commond:"null",
				energy: "",
				deg:0,
				moveflag:false,
				openSystemflag:false,
				energyflag:false,
				powerSystemName:"",
				energySystemName:"",
				speed:0,
				energyReduceRate:0,
				energyRecoverRate:0,
			},
			{
				id:3,
				commond:"null",
				energy: "",
				deg:0,
				moveflag:false,
				openSystemflag:false,
				energyflag:false,
				powerSystemName:"",
				energySystemName:"",
				speed:0,
				energyReduceRate:0,
				energyRecoverRate:0,
			},
			{
				id:4,
				commond:"null",
				energy: "",
				deg:0,
				moveflag:false,
				openSystemflag:false,
				energyflag:false,
				powerSystemName:"",
				energySystemName:"",
				speed:0,
				energyReduceRate:0,
				energyRecoverRate:0,
			}
		],
	},


	returnChoose:function(id){
		var choose = document.getElementsByName(id);
		for(var i=0;i<choose.length;i++){
			if(choose[i].checked){
				return choose[i].value;
			}
		}
	},

	createAirship:function(){
		var oScene = document.getElementById("scene");
		var oUl = oScene.getElementsByTagName("ul")[0];
		setTimeout(function(){
			control.BUS();
			if(control.status.sendflag){
				var createId=0;																//船编号
				var Coloumn=0;																//统计已用多少个空标识
				for(var i=0,len=control.status.airships.length;i<len;i++){
					if(control.status.airships[i].commond=="null"){
						createId=control.status.airships[i].id;
						break;
					}else if(control.status.airships[i].commond!="null"){
						Coloumn++;
					}
				}
				if(Coloumn==4){
					control.info_add("##飞船数量已经到达上限，不能再创建飞船");
					return;
				}
				control.status.airships[createId-1].powerSystemName = control.returnChoose("speedchoose");
				control.status.airships[createId-1].energySystemName = control.returnChoose("energychoose");
				for(var i=0;i<control.status.powerSystem.length;i++){
					if(control.status.powerSystem[i].name==control.status.airships[createId-1].powerSystemName){
						control.status.airships[createId-1].speed=control.status.powerSystem[i].speed;
						control.status.airships[createId-1].energyReduceRate=control.status.powerSystem[i].energyReduceRate;
						
					}
				}
				for(var i=0;i<control.status.energySystem.length;i++){
					if(control.status.energySystem[i].name==control.status.airships[createId-1].energySystemName){
						control.status.airships[createId-1].energyRecoverRate=control.status.energySystem[i].energyRecoverRate;
					}
				}

				var deg = Math.floor(Math.random()*360);									// 0-360 角度 生成随机位置
				control.status.airships[createId-1].deg=deg;

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
				control.circularmoving(createId,control.status.airships[createId-1].deg,r);	//飞船初始位置
				control.createControl(createId);											//创建控制台
				control.info_add("##成功创建"+createId+"号飞船,"+control.status.airships[createId-1].powerSystemName+","+control.status.airships[createId-1].energySystemName);

			}else{
				control.info_add("##创建飞船失败");
			}
		}, control.status.BUS_time);
	},

	createControl:function(createId){														//创建控制台
		var oControl = document.getElementById("control");
		var oDiv = document.createElement("div");
		oDiv.className = "forship";
		oDiv.shipId = createId;
		oDiv.innerHTML = "<label>对"+createId+"号飞船下达指令：</label>";
		oDiv.innerHTML += " <input type='button' value='开始飞行' onclick='control.startmove("+createId+")' />";
		oDiv.innerHTML += " <input type='button' value='停止飞行' onclick='control.stopmove("+createId+")' />";
		oDiv.innerHTML += " <input type='button' value='能源系统' onclick='control.energyRecoverSystem("+createId+")' />";
		oDiv.innerHTML += " <input type='button' value='关闭系统' onclick='control.stopRecoverSystem("+createId+")' />";
		oDiv.innerHTML += " <input type='button' value='销毁飞船' onclick='control.destroy("+createId+")' />";
		oControl.appendChild(oDiv);
	},


	startmove:function(createId){
		setTimeout(function(){
			control.BUS();
			if(control.status.sendflag){
				var oControl = document.getElementById("control");
				var aDiv = oControl.getElementsByTagName("div");
				if(parseInt(control.status.airships[createId-1].energy)==0){
					control.status.airships[createId-1].commond="stop";
					control.status.airships[createId-1].moveflag=true;
					control.info_add("##"+createId+"号飞船能源耗尽，无法起飞");
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
					control.movefunc(createId);
					control.info_add("##"+createId+"号飞船起飞");
				}else{
					control.info_add("##"+createId+"号飞船已经在飞行");
				}
			}else{
				control.info_add("##"+createId+"号飞船接收不到起飞指令");
			}
		}, control.status.BUS_time);
	},

	movefunc:function(createId){
		var r=-140-(createId-1)*55;															//半径
		var deg=control.status.airships[createId-1].speed*360/(2*Math.PI*Math.abs(r)*control.status.T/control.status.time);
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
					control.circularmoving(createId,degZ,r);
					control.energyreducing(createId);
				
			}
		}, control.status.time);
	},

	stopmove:function(createId){
		setTimeout(function(){
			control.BUS();
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
					control.info_add("##"+createId+"号飞船已经停止");
					return;
				}
				control.status.airships[createId-1].commond="stop";
				control.status.airships[createId-1].moveflag=true;
				control.info_add("##"+createId+"号飞船停止飞行");
			}else{
				control.info_add("##"+createId+"号飞船接收不到停止指令");
			}
		}, control.status.BUS_time);
	},

	destroy:function(createId){
		setTimeout(function(){
			control.BUS();
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
				control.status.airships[createId-1].moveflag=true;
				control.status.airships[createId-1].energyflag=false;

				oUl.removeChild(aLi[ship_subline]);
				oControl.removeChild(aDiv[control_subline]);
				control.info_add("##"+createId+"号飞船摧毁成功");
			}else{
				control.info_add("##"+createId+"号飞船接收不到摧毁指令");
			}
		}, control.status.BUS_time);
	},

	energyRecoverSystem:function(createId){
		setTimeout(function(){
			control.BUS();
			if(control.status.sendflag){
				var currentEnergy = parseFloat(control.status.airships[createId-1].energy);
				if(currentEnergy==100){
					control.info_add("##"+createId+"号飞船能源已满，无法充能");
					return;
				}
				if(control.status.airships[createId-1].openSystemflag){
					control.energyRecoverfunc(createId);
					control.info_add("##"+createId+"号飞船开启能源系统");
				}else{
					control.info_add("##"+createId+"号飞船已经在充能");
				}
			}else{
				control.info_add("##"+createId+"号飞船接收不到补充能源指令");
			}
		}, control.status.BUS_time);
	},

	stopRecoverSystem:function(createId){
		var oInfo_area = document.getElementById("info_area");
		setTimeout(function(){
			control.BUS();
			if(control.status.sendflag){
				if(control.status.airships[createId-1].openSystemflag){
					control.info_add("##"+createId+"号飞船能源系统未开启");

				}else{
					control.status.airships[createId-1].energyflag=false;
					control.info_add("##"+createId+"号飞船能源系统成功关闭");
				}
			}else{
				control.info_add("##"+createId+"号飞船接收不到关闭能源系统指令");
			}
		}, control.status.BUS_time);
	},

	energyreducing:function(createId){
		var energyReduce = control.status.airships[createId-1].energyReduceRate*control.status.time/control.status.T;	//减少的能源/100ms
		var allenergy = parseFloat(control.status.airships[createId-1].energy);
		allenergy = allenergy-energyReduce;
		allenergy = parseFloat(allenergy).toFixed(1);
		if(allenergy<0){
			allenergy=0;
			control.status.airships[createId-1].commond="stop";
			control.info_add("##"+createId+"号飞船能源耗尽，飞船停止飞行");
		}
		control.status.airships[createId-1].energy=allenergy+"%";
		control.p_word(createId);
	},


	energyRecoverfunc:function(createId){
		var recover=setInterval(function(){
			if(control.status.airships[createId-1].energyflag){
				var currentEnergy = parseFloat(control.status.airships[createId-1].energy);
				if(currentEnergy>100-control.status.airships[createId-1].energyRecoverRate*control.status.time/control.status.T){
				control.status.airships[createId-1].energy="100%";
				control.status.airships[createId-1].energyflag=true;
				control.status.airships[createId-1].openSystemflag=true;
				control.p_word(createId);
				clearInterval(recover);
				control.info_add("##"+createId+"号飞船能源填充完毕");
				return;
				}else{
					control.status.airships[createId-1].openSystemflag=false;
					control.energyRecover(createId);
				}
			}else{
				control.status.airships[createId-1].openSystemflag=true;
				control.status.airships[createId-1].energyflag=true;
				clearInterval(recover);
			}
				
		}, control.status.time);
	},

	energyRecover:function(createId){
		var energyRecover = control.status.airships[createId-1].energyRecoverRate*control.status.time/control.status.T;
		var allenergy = parseFloat(control.status.airships[createId-1].energy);
		allenergy = allenergy+energyRecover;
		allenergy = parseFloat(allenergy).toFixed(1);
		control.status.airships[createId-1].energy=allenergy+"%";
		control.p_word(createId);
	},

	p_word:function(createId){
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
	},

	circularmoving:function(id,deg,r){		//飞船圆周运动
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
	},


	BUS:function(){
		var oInfo_area = document.getElementById("info_area");
		var msg = document.getElementById("msg");
		var msg_end = document.getElementById("msg_end");
		if(Math.random()<0.1){		//30%丢包率
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
	},

	info_add:function(text){
		var msg = document.getElementById("msg");
		var msg_end = document.getElementById("msg_end");
		var oP = document.createElement("p");
		oP.innerHTML=text;
		msg.appendChild(oP);
		msg_end.scrollIntoView();
	},






}

