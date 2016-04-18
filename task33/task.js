
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
		switch (direction) {
			case "top":
				// statements_1
				if(Control.SquareState.list>1){
					Control.SquareState.list -= 1;
					Control.dw();						//小方块定位
				}
				break;
			case "right":
				// statements_2
				if(Control.SquareState.line<10){
					Control.SquareState.line += 1;
					Control.dw();						
				}
				break;
			case "bottom":
				// statements_3
				if(Control.SquareState.list<10){
					Control.SquareState.list += 1;
					Control.dw();						
				}
				break;
			case "left":
				// statements_4
				if(Control.SquareState.line>1){
					Control.SquareState.line -= 1;
					Control.dw();						
				}
				break;
			default:
				// statements_def
				break;
		}
	},


}