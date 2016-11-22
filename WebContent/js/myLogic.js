


//从本地数据库读取用户数据
var readUserInfoFromWebSql = function(callback){
//	select('user_info','mobileNum',function(result){
//		if(result && result.rows && result.rows.item){
//			var data;
////			console.log("用户登录次数: result.rows.length ----------------------------------------------------------------------- " +　result.rows.length);
//			if(result.rows.length > 0){
//				data = result.rows.item(result.rows.length - 1);
//				console.log("readUserInfoFromWebSql 最后一次登录的用户:data.mobileNum = " + data.mobileNum);
//			}else{
//				console.log("还没有登陆过");
//			}
//			if(callback && typeof(callback) == 'function'){
//				callback(data);
//			}
//		}else{
//			console.log("还没有登陆过");
//		}
//	});

	var result = plus.storage.getItem('mobileNum');
	if(result){
		var data = {};
		data.mobileNum = result;
		if(callback && typeof(callback) == 'function'){
			callback(data);
		}
	}else{
		console.log("还没有登陆过");
	}
}

var printAllInWebSQL = function(callback){
	select('user_info','mobileNum',function(result){
		if(result && result.rows && result.rows.item){
			for(var i = 0;i < result.rows.length;i ++){
				console.log("i = " + result.rows.item(i));
			}
		}
	});
}

//监听自定义事件,页面需要刷新时使用fire触发'refresh'
var addRefreshEvent = function(callback){
	window.addEventListener('myrefresh',function(event){   
		if(callback && typeof(callback) == 'function'){
			callback(event.detail);
		}
    });
}

var addMyEvent = function(eventName,callback){
	window.addEventListener(eventName,function(event){   
		if(callback && typeof(callback) == 'function'){
			callback(event.detail);
		}
    });
}

//var baseServer = 'http://test1.cfrjkj.com/services/';
//var baseServer = 'http://192.168.56.21/services/';
var baseServer = 'http://192.168.33.56:8080/CFJZService/';
var baseUrl = baseServer + 'services/';
var imgActUrl = baseServer + 'actionImgs/';
var waitTime = 10000;

//操作数据库
var operateDB = function(partUrl,paramData,succes,error,datatp){
	var network = true;
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE){
		network = false;
	}
	console.log('operateDB : baseUrl + partUrl = ' + baseUrl + partUrl);
	if(network){
		mui.ajax(baseUrl + partUrl,{
			data:paramData,
			dataType:datatp ? datatp : 'json',//不指定的话, 服务器默认返回json格式数据
			type:'post',//HTTP请求类型
			timeout:waitTime,//超时时间设置为10秒；
			success:succes,
			error:error,
			crossDomain:true,
		});
	}else{
		mui.toast("当前网络不给力，请稍后再试");
	}
}

/**
 * 加载数据库数据
 * 调用此函数的页面需要实现refreshPage(userData)函数
 * 在mui.plusReady中调用
 * ---------------------------------------------------------->>>
 */
var loadUserData = function(data){
	if(data){
		console.log("loadUserData websql保存的数据 data,data.mobileNum,self.id = " + data + "," + data.mobileNum);
		//从数据库拿用户数据
		operateDB('user/getUserByMobileNum/',{mobileNum:data.mobileNum},loadSuccess,loadError);
	}
}
var loadSuccess = function(response){
	console.log("loadSuccess response = " + response);
	if(response && response.user && response.user.id > 0){
		console.log("读取用户数据成功");
		refreshPage(response);						//刷新页面
	}else if(response == -1 || response == '-1'){
		console.log("读取用户数据异常 response = " + response);
		refreshPage(null);
	}else{
		console.log("读取用户数据异常 response = " + response);
		refreshPage(null);
	}
}
var loadError = function(xhr,type,errorThrown){
	console.log("loadError 读取用户数据失败--");
	printObject(xhr,"xhr");
}
//加载用户数据------------------------------------------------<<<


/**
 * 前往登录页面
 * @param {Object} lastPage : 源页面, 登录页面登录后返回此页面
 */
var goLogin = function(lastPage){
	mui.openWindow({
	    url:'quick_login.html',
	    id:'quick_login.html',
	    extras:{
	        lastPage:lastPage,
	    }
	});
}


//function beecloudPay(bcChannel) {
//	var _appid = bcChannel == "UN_WEB"?"c37d661d-7e61-49ea-96a5-68c34e83db3b":"44f01a13-965f-4b27-ba9f-da678b47f3f5"
//	
//	var paySuccess = function(){
//		alert('保存付费记录成功');
//	}
//	var payError = function(){
//		alert('保存付费记录失败');
//	}
//	
//	/*
//	 * 构建支付参数 
//	 * 
//	 * app_id: BeeCloud控制台上创建的APP的appid，必填 
//	 * title: 订单标题，32个字节，最长支持16个汉字；必填
//	 * total_fee: 支付金额，以分为单位，大于0的整数，必填
//	 * bill_no: 订单号，8~32位数字和/或字母组合,确保在商户系统中唯一，必填
//	 * optional: 扩展参数,可以传入任意数量的key/value对来补充对业务逻辑的需求;此参数会在webhook回调中返回; 选填
//	 * bill_timeout: 订单失效时间,必须为非零正整数，单位为秒，必须大于360。选填 
//	 */
//	var payData = {
//		app_id: _appid,
//		channel: bcChannel,  
//		title: payTitle.innerHTML,  
//		total_fee: feeValue * 100, 
//		bill_no: beecloud.genBillNo(),    
//		optional: {'houseId':self.house.house.id},  
//		bill_timeout: 361,
//		return_url: "http://www.dcloud.io/demo/pay"//wap支付成功后的回跳地址
//	};
//	/*
//	 *  发起支付
//	 *  payData: 支付参数
//	 *  cbsuccess: 支付成功回调
//	 *  cberror: 支付失败回调
//	 */
//	beecloud.payReq(payData, function(result) {
//		alert('支付成功');
//	}, function(err) {
//		alert('支付失败');
//		printObject(err,"err");
//		//测试, 本应在支付成功时调用
//		if(self.feeType == 'water'){
//			operateDB('houseInfo/payWaterById/',{id:self.house.house.id,feeValue:feeValue},paySuccess,payError);
//		}else if(self.feeType == 'estate'){
//			operateDB('houseInfo/payEstateById/',{id:self.house.house.id,feeValue:feeValue},paySuccess,payError);
//		}
//	});
//}