//task.js

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var citySelect = document.getElementById("city-select");
var aOption = citySelect.getElementsByTagName("option");
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = dat.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ""
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}


/**
 * 渲染图表
 */
function renderChart() {
  var aqiChart = document.getElementById("aqiChart");
  aqiChart.innerHTML="";                              //清空
  var oTable = document.createElement("table");
  var oTr = document.createElement("tr");
  aqiChart.appendChild(oTable);
  oTable.appendChild(oTr);
  for(var i=0;i<chartData[citySelect.value][pageState.nowGraTime].length;i++){
    var oTd = document.createElement("td");
    var oSpan = document.createElement("span");
    oSpan.style.height = chartData[citySelect.value][pageState.nowGraTime][i]+"px";
    oSpan.className=pageState.nowGraTime;
    if(chartData[citySelect.value][pageState.nowGraTime][i]>50){
      oSpan.style.background="blue";
    }else{
      oSpan.style.background="green";
    }
    if(chartData[citySelect.value][pageState.nowGraTime][i]>100){
      oSpan.style.background="red";
    }
    if(chartData[citySelect.value][pageState.nowGraTime][i]>150){
      oSpan.style.background="purple";
    }
    if(chartData[citySelect.value][pageState.nowGraTime][i]>200){
      oSpan.style.background="black";
    }
    oTd.appendChild(oSpan);
    oTr.appendChild(oTd);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
  // 确定是否选项发生了变化 
  if(radio.value!=pageState.nowGraTime){


  // 设置对应数据
  	pageState.nowGraTime=radio.value;
  // 调用图表渲染函数
  	renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  
  if(citySelect.options.selectedIndex!=pageState.nowSelectCity){
  // 设置对应数据
    pageState.nowSelectCity=citySelect.options.selectedIndex;
  // 调用图表渲染函数
  	renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radios = document.getElementsByName("gra-time");
	for(var i=0;i<radios.length;i++){
		radios[i].onclick=function(){
			graTimeChange(this);
		}
	}
	

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  citySelect.innerHTML="";
  for(var key in aqiSourceData){
  	var oOption = document.createElement("option");
  	oOption.innerHTML=key;
  	citySelect.appendChild(oOption);
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange=function(){
  	citySelectChange();
  }
  
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  var city=[];
  var day={};
  var week={};
  var month={};
  var cityMonthdate={}; //该城市有多少个月的数据
  // 将原始的源数据处理成图表需要的数据格式
  for(var key in aqiSourceData){
    city.push(key);
    day[key]=[];
    cityMonthdate[key]=[];
    for(var keyday in aqiSourceData[key]){
      day[key].push(aqiSourceData[key][keyday]);
      //计算每个城市有多少个月
      cityMonthdate[key].push(keyday.substr(5,2)); 
      if(cityMonthdate[key].length>=2){
        if(cityMonthdate[key][cityMonthdate[key].length-1]==cityMonthdate[key][cityMonthdate[key].length-2]){                 //最后一个数据与前面一个数据相等时
          cityMonthdate[key].pop(); //删除最后一个数据
        }
      }
    }
  }

  //每个城市每周的平均值
  for(var key in day){
    week[key]={};
    var allweek=Math.ceil(day[key].length/7);   //所有周数
    var Num = 0;                                //记录是否已经一周
    var Sum = 0;                                //一周总和
    var Avg = 0;                                //一周均值
    var k=0;                                    //记录经过的天数
    for(var i=0;i<allweek;i++){
      for(var j=k;j<day[key].length;j++){
        k++;
        Num++;
        Sum=Sum+day[key][j];
        if(Num==7){                             //7天一循环
          Num=0;
          Avg=Sum/7;
          Sum=0;
          week[key][i+1]=Avg;
          break;
        }
      }
    }
  }




  //每个城市每个月的平均值month
  for(var i=0;i<city.length;i++){
    month[city[i]]={};
    //cityMonthdate[city[i]]该城市有多少个月的数据
    for(var j=0;j<cityMonthdate[city[i]].length;j++){
      //该城市每个月的数据  声明为数组
      month[city[i]][cityMonthdate[city[i]][j]]=[];
    }
    for(var j=0;j<cityMonthdate[city[i]].length;j++){
      for(var keyday in aqiSourceData[city[i]]){
        if(keyday.substr(5,2)==cityMonthdate[city[i]][j]){
          //获取每个月中每天的数值
          month[city[i]][cityMonthdate[city[i]][j]].push(aqiSourceData[city[i]][keyday]); 
        }
      }
    }
    for(var j=0;j<cityMonthdate[city[i]].length;j++){
      var Sum=0;      //月总值
      var Avg=0;      //月均值
      //计算每个月的总值
      for(var k=0;k<month[city[i]][cityMonthdate[city[i]][j]].length;k++){
        Sum=Sum+month[city[i]][cityMonthdate[city[i]][j]][k];   
      }
      //计算每个月的均值
      Avg=Sum/month[city[i]][cityMonthdate[city[i]][j]].length;
      //重新赋值
      //该城市每个月的平均值
      month[city[i]][cityMonthdate[city[i]][j]]=Avg;
    }
  }







  // 处理好的数据存到 chartData 中

  for(var i=0;i<city.length;i++){
    chartData[city[i]]={};
    chartData[city[i]]["day"]=[];
    chartData[city[i]]["week"]=[];
    chartData[city[i]]["month"]=[];

    chartData[city[i]]["day"]=day[city[i]];

    for(var key in week[city[i]]){
      chartData[city[i]]["week"].push(week[city[i]][key]);
    }

    for(var key in month[city[i]]){
      chartData[city[i]]["month"].push(month[city[i]][key]);
    }
  }
  /*alert(chartData["北京"]["day"]);
  alert(chartData["北京"]["week"]);
  alert(chartData["北京"]["month"]);*/
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();