
var servicePageInit = function(){
	self = plus.webview.currentWebview();
	self.lastWebviewId = '../server/' + self.serviceId + '.html';
	
	console.log('进入页面: self.serviceId = ' + self.serviceId);
	
	addRefreshEvent(function(data){
		console.log(self.serviceId + ' ---------------------------------------------------------- refreshEvent');
		self.mobileNum = data.mobileNum;
	});		

					
	btnTapped = function(event){
		if(!event.detail){
			//tap事件会触发两次,当第二次时,event.detail为空不处理该事件
			return;
		}
		if(self.mobileNum){
			//进入选择服务地址页
//				disableCommitBtn(true);
			mui.openWindow({
			    url:'../client/address.html',
			    extras:{
			    	mode:'select',								//进入地址页面的模式,分两种, select和show.
			    	mobileNum:self.mobileNum,
			    	serviceId:self.serviceId,
			    	lastWebviewId:self.lastWebviewId,
			    }
			});
		}else{
			mui.openWindow({
			    url:'../client/quick_login.html',
			    extras:{
			    	lastWebviewId:self.lastWebviewId,
			    }
			});
		}
	}
	
	var apponit_btn = $(".apponit_btn");
	if(apponit_btn){
		$(".apponit_btn").on('tap',btnTapped);
	}
}

var serviceList = {
	bingXiangQingXi:{
		name:'冰箱清洗',
		unit:'冰箱台数:'
	},
	biZhiQingJie:{
		name:'壁纸清洁',
		unit:'壁纸面积:'
	},
	chuFangBaoYang:{
		name:'厨房保养',
		unit:'厨房套数:'
	},
	diBanBaoYang:{
		name:'地板保养',
		unit:'地板面积:'
	},
	guanDaoShuTong:{
		name:'管道疏通',
		unit:'疏通次数:'
	},
	xiuDianShi:{
		name:'电视维修',
		unit:'电视台数:'
	},
	xiuBingXiang:{
		name:'冰箱维修',
		unit:'冰箱台数:'
	},
	xiuXiYiJi:{
		name:'修洗衣机',
		unit:'洗衣机数量:'
	},
	xiuKongTiao:{
		name:'空调维修',
		unit:'空调台数:'
	},
	kaiHuangBaoJie:{
		name:'开荒保洁',
		unit:'建筑面积:'
	},
	kongQiZhiLi:{
		name:'空气治理',
		unit:'治理面积:'
	},
	kongTiaoQingXi:{
		name:'空调清洗',
		unit:'空调台数:'
	},
	riChangBaoJie:{
		name:'日常保洁',
		unit:'保洁面积:'
	},
	shaFaBaoYang:{
		name:'沙发保养',
		unit:'沙发数量:'
	},
	weiShengJianBaoYang:{
		name:'卫生间保养',
		unit:'卫生间数:'
	},
	xiYiJiQingXi:{
		name:'洗衣机清洗',
		unit:'洗衣机数:'
	},
	yinShuiJiQingXi:{
		name:'饮水机清洗',
		unit:'饮水机数:'
	},
	youYanJiQingXi:{
		name:'油烟机清洗',
		unit:'油烟机数:'
	},

	muYingHuLi:{
		name:'母婴护理',
		unit:'时间:'
	},
	qiYeBaoJie:{
		name:'企业保洁',
		unit:'时间:'
	},
	yangLaoHuLi:{
		name:'养老护理',
		unit:'时间:'
	},
};
