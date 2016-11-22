


var STATE_NEW = 0;			//刚提交的新订单,待分配
var STATE_DISTRIBUTED = 1;	//已分配订单,待评估
var STATE_APPRAISED = 2;	//已评估的订单,待用户确认
var STATE_DONE = 3;			//已完工的订单,待支付
var STATE_PAYED = 4;			//已支付的订单
var STATE_CANCELED = 5;		//被取消的订单
var STATE_DISTRIBUTED_2 = 6;		//已分配, 待施工
var STATE_CONFIRMED = 7;	//用户已确认