
// export const baseUrl = "http://106.14.41.55/";
export const baseUrl = "https://api.hzyisu.com/";

// export const baseUrl = "/";

export const API = {
	getjsapiticket: 'wechat/getjsapiticket',//获取微信授权
	querySaleGoodsBannerInfo: 'salesgoods/querySaleGoodsBannerInfo',//banner 信息
	querySaleGoodsList: 'salesgoods/querySaleGoodsList',//列表
	buyNumConfig: 'config/buyNumConfig',//配置】获取一元秒商品购买上限相关配置
	getGoodsInfo: 'goods/getGoodsInfo',//详情页
	getWinningRecordHistoryList: 'winningrecord/getWinningRecordHistoryList',//往期揭晓列表
	getRecentlyAnnounced: 'winningrecord/getRecentlyAnnounced',//最近揭晓列表 
	getWinningAlgorithm: 'order/getWinningAlgorithm',//计算详情 
	CreateOrder: 'order/CreateOrder',//创建订单
	orderShow: 'order/orderShow',//创建订单
	getPaymentData:'order/getPaymentData', //获取支付信息  
	getListByOrderId:'luckyNumber/getListByOrderId',// 获取订单幸运号


	queryAddressInfo: 'userAddress/list',//获取用户地址信息
	delAddress: 'userAddress/delete',//获取删除用户地址信息
	addAddress: 'userAddress/insert',//获取添加用户地址信息
	modifyAddress: 'userAddress/update',//获取添加用户地址信息

	myOrderList: 'order/myorderlist',//获取我的抢宝记录
	myOrderDetail: 'order/orderDetail',//获取抢宝记录详情
	myShowInfo: 'order/getMyOrderShowInfo',//获取我的晒单记录
	myShowDetail: 'order/getOrderShowInfo',//获取晒单记录详情
	logisticsInfo: 'order/LogisticsInfo',//获取晒单记录详情
	winShowInfo: 'order/getOrderShowList',//获取赢家晒单记录
}
