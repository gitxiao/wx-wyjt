var myUtils = {};

/**
 * 验证手机号码是否合法
 * @param {Object} mobile
 */
function verifyMobileNum(mobile){
	return /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile);
}

myUtils.stringStartWith = function(str1,str2){
	var reg = new RegExp("^" + str2);     
  	return reg.test(str1);        
}
myUtils.stringEndWith = function(str1,str2){
	var reg = new RegExp(str2 + '$');     
  	return reg.test(str1);        
}



var level_ = 1;
function _getSpace(level){
	var ret = "";
	for (var i = 0;i < level;i ++){
		ret = ret + "    ";
	}
	if (level > 1) {
		ret = ret + "|-  ";
	}
	return ret;
}
//t: 打印object,会循环遍历打印每一层,
//maxLevel: 为最大层数,默认为1
//type_name：打印指定类型的子对象
//当type_name!='object'时，不打印值为null的类型为object的数据
//自动插入空格使object层次分明
function myPrint(t,sign,maxLevel,type_name){
	maxLevel = maxLevel ? maxLevel : 1;
	if(typeof(t) != 'object'){
		console.log(typeof(t) + ": " + sign + " = " + t);
		return;
	}
	var v;
	
	for (var k in t){
		try{
			v = t[k];
			if (typeof(k) == "number") {
				k = "[" + k + "]";
			}
			if (maxLevel < level_){
				return;
			}
			if((type_name && typeof(v) == type_name) || !type_name) {
				if(!(!v && typeof(v) == 'object') || type_name == 'object'){
					if(typeof(v) == 'function'){
						console.log(_getSpace(level_) + typeof(v) + ":	" + k);
					}else{
						console.log(_getSpace(level_) + typeof(v) + ":	" + k + " = " + v);
					}
				}
			}
			if (typeof(v) == "object"){
				level_ = level_ + 1;
				myPrint(v, k, maxLevel,type_name);
				level_ = level_ - 1;
			}
		}catch(e){
			console.log(_getSpace(level_) + "异常 k = " + k + ", e = " + e);
		}
	}
}

/**打印对象里面的内容*/
function printObject(t,sign,maxLevel,typename){
	console.log(typeof(t) + ": " + sign + " >>>");
	myPrint(t,sign,maxLevel,typename);
	console.log(typeof(t) + ": " + sign + " <<<");
}


/**
 * 判断一个逻辑表达式是否为true
 * 字符串"0"和字符串"false"视为false. 与js本身定义相反
 */
function myIsTrue(param){
	if(param === "0" || param === "false"){
		return false;
	}else{
		return param;
	}
}

function getSafeCode(){
	var nurl = window.document.location.href;
	var codeIndex = nurl.indexOf("safecode");
	if(codeIndex==-1) return "false";
	var keyValue = nurl.substring(codeIndex,nurl.length);
	if(keyValue.indexOf("=")==-1) return false;
	var values = keyValue.split("=");
	if(values!=null&&values.length!=0){
		return values[1];
	}else{
		return "false";
	}
}

function getUserType(){
	var values = getSafeCode().split("|");
	if(values!=null&&values.length!=0){
		return values[0];
	}else{
		return "false";
	}
}
function getUserId(){
	var values = getSafeCode().split("|");
	if(values!=null&&values.length!=0){
		return values[1];
	}else{
		return "false";
	}
}
function getRandom(){
	var values = getSafeCode().split("|");
	if(values!=null&&values.length!=0){
		return values[2];
	}else{
		return "false";
	}
}
		

//页面中从href中获取userid, 可以用于生成订单编号, 生产单编号等
function getChildUserId(){
	var nurl = window.document.location.href;
	var codeIndex = nurl.indexOf("userid");
	if(codeIndex==-1) return "false";
	var keyValue = nurl.substring(codeIndex,nurl.length);
	if(keyValue.indexOf("=")==-1) return false;
	var values = keyValue.split("=");
	if(values!=null&&values.length!=0){
		return values[1];
	}else{
		return "false";
	}
}

//往有规律的一组name相同的控件中填充内容data, 这组控件的id要以name开头
function fillContents(name,data){
	var nameLength = name.length
	var txts = document.getElementsByName(name); 	//获取所有name=ddxq 的标签
    for (var i = 0; i < txts.length; i++) { 			//循环遍历标签
    	var id = txts[i].id;
    	$("#" + id).html(data[id.substr(nameLength,id.length)]);
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

//json返回的日期通常都是/Date(1354648740000)/这样的格式，下面的函数可以转换成常用的格式 如：2012-12-05 15:26:22.810
function jsonDateFormat(jsonDate) {
    try {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    } catch (ex) {
        return "";
    }
}

function myalert(spara){
	alert(spara);
}