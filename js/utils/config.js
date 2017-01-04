
export const baseUrl = "http://106.14.41.55/";

// export const baseUrl = "/";

export const API = {
	querySaleGoodsBannerInfo: 'salesgoods/querySaleGoodsBannerInfo',//banner 信息
	querySaleGoodsList: 'salesgoods/querySaleGoodsList',//列表
	buyNumConfig: 'config/buyNumConfig',//配置】获取一元秒商品购买上限相关配置
	getGoodsInfo: 'goods/getGoodsInfo',//详情页
	// getOrderShowList: 'order/getOrderShowList',//往期晒单列表
	getWinningRecordHistoryList: 'winningrecord/getWinningRecordHistoryList',//往期揭晓列表
	getRecentlyAnnounced: 'winningrecord/getRecentlyAnnounced',//最近揭晓列表 
	queryAddressInfo: 'userAddress/list',//获取用户地址信息
	delAddress: 'userAddress/delete',//获取删除用户地址信息
	addAddress: 'userAddress/insert',//获取添加用户地址信息
	modifyAddress: 'userAddress/update',//获取添加用户地址信息

}
