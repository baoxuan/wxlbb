import React from 'react'
import { Route } from 'react-router'

import map from './containers/map'// 本地服务
import app from './containers/app'// 一元夺宝
import GoodsInfo from './containers/GoodsInfo'// 详情页
import HistoryList from './containers/HistoryList'// 往期揭晓列表
import HistoryDetail from './containers/HistoryDetail'// 往期揭晓详请
import RecentlyAnnounced from './containers/RecentlyAnnounced'// 最近揭晓列表
import comment from './containers/comment'// 最近揭晓列表
import formula from './containers/formula'// 计算规则
import GoodsDetail from './containers/GoodsDetail'// 商品详情
import pay from './containers/pay'// 商品详情

import address from './containers/address'// 收货地址
import addressAdd from './containers/addressAdd'// 新增收货地址
import addressModify from './containers/addressModify'// 修改收货地址


import myOrderListAll from './containers/myOrderListAll'// 全部抢宝记录
import myOrderList from './containers/myOrderList'// 抢中的记录
import myOrderDetail from './containers/myOrderDetail'// 抢宝详情
import myShowInfo from './containers/myShowInfo'// 我的晒单记录
import myShowDetail from './containers/myShowDetail'// 晒单详情
import winShowInfo from './containers/winShowInfo'
import logisticsInfo from './containers/logisticsInfo'// 物流信息
import download from './containers/download'// 物流信息


const routes = (
	<Route>
	    <Route path="/" component={app} />

	    <Route path="/GoodsInfo" component={GoodsInfo} />
	    <Route path="/HistoryList" component={HistoryList} />
	    <Route path="/HistoryDetail" component={HistoryDetail} />
	    <Route path="/RecentlyAnnounced" component={RecentlyAnnounced} />
	    <Route path="/comment" component={comment} />
	    <Route path="/formula" component={formula} />
	    <Route path="/GoodsDetail" component={GoodsDetail} />
	    <Route path="/pay" component={pay} />

	    <Route path="/map" component={map} />

	    <Route path="/address" component={address} />
	    <Route path="/addressAdd" component={addressAdd} />
	    <Route path="/addressModify" component={addressModify} />

	    <Route path="/myOrderListAll" component={myOrderListAll} />
	    <Route path="/myOrderList" component={myOrderList} />
	    <Route path="/myOrderDetail" component={myOrderDetail} />
	    <Route path="/myShowInfo" component={myShowInfo} />
	    <Route path="/myShowDetail" component={myShowDetail} />

	    <Route path="/logisticsInfo" component={logisticsInfo} />
	    <Route path="/winShowInfo" component={winShowInfo} />
	    <Route path="/download" component={download} />
	</Route>

	)
export default routes;