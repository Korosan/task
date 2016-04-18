var Control={

	SquareState:{
		line:5,		//行
		list:5,		//列
		deg:0,
	},

	init:function(){
		Control.commond();
		Control.createElement();
		Control.dw();
	},

	commond:function(){
		var oBtn = document.getElementById("btn");
		oBtn.onclick=function(){
			var oCommond = document.getElementById("commond");
			var oSquare = document.getElementById("square");

			if(oCommond.value=="GO"){
				var deg = Control.SquareState.deg%360;
				if(deg==0){
					Control.move("top");
				}else if(deg==-270 || deg==90){
					Control.move("right");
				}else if(deg==180 || deg==-180){
					Control.move("bottom");
				}else if(deg==-90 || deg==270){
					Control.move("left");
				}
			}else if(oCommond.value=="TUN LEF"){
				Control.SquareState.deg -= 90;
				oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
			}else if(oCommond.value=="TUN RIG"){
				Control.SquareState.deg += 90;
				oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
			}else if(oCommond.value=="TUN BAC"){
				Control.SquareState.deg += 180;
				oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
			}else if(oCommond.value=="TRA LEF"){
				Control.move(oCommond.value);
			}else if(oCommond.value=="TRA TOP"){
				Control.move(oCommond.value);
			}else if(oCommond.value=="TRA RIG"){
				Control.move(oCommond.value);
			}else if(oCommond.value=="TRA BOT"){
				Control.move(oCommond.value);
			}else if(oCommond.value=="MOV LEF"){
				if(Control.SquareState.deg==270){
					Control.move("MOV LEF");
					return;
				}
				Control.SquareState.deg = 270;
				oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
				setTimeout(function(){
					Control.move("MOV LEF");
				}, 1000);
				
			}else if(oCommond.value=="MOV TOP"){
				if(Control.SquareState.deg==0){
					Control.move("MOV TOP");
					return;
				}
				Control.SquareState.deg = 0;
				oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
				setTimeout(function(){
					Control.move("MOV TOP");
				}, 1000);

			}else if(oCommond.value=="MOV RIG"){
				if(Control.SquareState.deg==90){
					Control.move("MOV RIG");
					return;
				}
				Control.SquareState.deg = 90;
				oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
				setTimeout(function(){
					Control.move("MOV RIG");
				}, 1000);

			}else if(oCommond.value=="MOV BOT"){
				if(Control.SquareState.deg==180){
					Control.move("MOV BOT");
					return;
				}
				Control.SquareState.deg = 180;
				oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
				setTimeout(function(){
					Control.move("MOV BOT");
				}, 1000);

			}else{
				return;
			}
		}
	},

	createElement:function(){
		var oTable = document.getElementById("table");
		var oSquare = document.createElement("div");
		oSquare.id = "square";
		oSquare.style.transform = "rotate("+Control.SquareState.deg+"deg)";
		var oSpan = document.createElement("span");
		oSquare.appendChild(oSpan);
		oTable.appendChild(oSquare);
	},

	dw:function(){
		var oSquare = document.getElementById("square");
		oSquare.style.top = (Control.SquareState.list-1)*50 + "px";
		oSquare.style.left = (Control.SquareState.line-1)*50 + "px";
	},

	move:function(direction){
		var oTable = document.getElementById("table");
		if(direction=="top" || direction=="TRA TOP" || direction=="MOV TOP"){
			if(Control.SquareState.list>1){
				Control.SquareState.list -= 1;
				Control.dw();						//新建小方块并定位
			}
		}else if(direction=="right" || direction=="TRA RIG" || direction=="MOV RIG"){
			if(Control.SquareState.line<10){
				Control.SquareState.line += 1;
				Control.dw();						//新建小方块并定位
			}
		}else if(direction=="bottom" || direction=="TRA BOT" || direction=="MOV BOT"){
			if(Control.SquareState.list<10){
				Control.SquareState.list += 1;
				Control.dw();						//新建小方块并定位
			}
		}else if(direction=="left" || direction=="TRA LEF" || direction=="MOV LEF"){
			if(Control.SquareState.line>1){
				Control.SquareState.line -= 1;
				Control.dw();						//新建小方块并定位
			}
			
		}
	},


}