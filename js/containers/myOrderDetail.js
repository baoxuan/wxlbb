import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link , hashHistory } from 'react-router';
import cookie from 'react-cookie';

class myOrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }
    componentWillMount() {
        document.title="晒单记录";
    }
    componentDidMount() {
        const header= { "X-Client-ID":'123456',"X-Long-Token":cookie.load("token")}
        const params = this.props.location.query;
        this.props.dispatch(fetchPosts("myOrderDetail",header,params));
        console.log("componentDidMount");
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.myOrderDetail.errorCode === 0){
            this.setState({
                loading:false
            })
        }
    }

    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
        }else{
            const {myOrderDetail} = this.props;
            const imgUrl = myOrderDetail.data.orderDetailForGoodsInfoVo.goodsPic ? myOrderDetail.data.orderDetailForGoodsInfoVo.goodsPic.split(",")[0]:myOrderDetail.data.orderDetailForGoodsInfoVo.goodsPic,
                      status =  (() => {
                                switch (myOrderDetail.data.grabStatus) {
                                  case 1: return "未中奖";
                                  case 2: return "已抢中";
                                  case 3: return "等待揭晓";
                                  case 4: return "等待支付";
                                  case 5: return "已取消";
                                }
                                })();
            const progress=((myOrderDetail.data.totalJoinNum-myOrderDetail.data.surplusJoinNum)/myOrderDetail.data.totalJoinNum)*100+"%";
            return(
        	<div >


                <div className="mytreasure-list">
                    <div className="mytreasure-box">
                        <div className="pic"><img src={imgUrl} alt="" /></div>
                        <div className="content">
                            <p>{myOrderDetail.data.orderDetailForGoodsInfoVo.goodsName}</p>
                            <i>{myOrderDetail.data.orderDetailForGoodsInfoVo.periodsNum}</i>
                            {(myOrderDetail.data.grabStatus==3)?<div className="progress"><i style={{width:progress}}></i></div>:<i>揭晓号码:{myOrderDetail.data.orderDetailForWinningVo.luckyNum}</i>}
                            <em>{(myOrderDetail.data.grabStatus==3)?<span>剩余 {myOrderDetail.data.surplusJoinNum}</span>:""} {status}</em>
                        </div>
                    </div>
                    {(myOrderDetail.data.grabStatus==1)?<div className="mytreasure-info"><em>参与{myOrderDetail.data.orderDetailForWinningVo.joinNum}人次</em><span>获奖者</span><img src={myOrderDetail.data.orderDetailForWinningVo.userHeadImg} alt="" /> <i>{myOrderDetail.data.orderDetailForWinningVo.userName}</i></div>:""}
                </div>
                {(myOrderDetail.data.grabStatus==3)?
                    <ul className="mytreasure-detail">
                        <li>参与号码：<i>{myOrderDetail.data.luckyNums}</i></li>
                        <li>参与次数：<i>{myOrderDetail.data.joinNum}</i></li>
                    </ul>
                :
                    <ul className="mytreasure-detail">
                        <li>获得者：<i>{myOrderDetail.data.orderDetailForWinningVo.userName}({myOrderDetail.data.province})</i></li>
                        <li>用户ID：<i>{myOrderDetail.data.orderDetailForWinningVo.userAccount}(唯一不变标识)</i></li>
                        <li>本期参与：<i>{myOrderDetail.data.orderDetailForWinningVo.joinNum}人次</i></li>
                        <li>幸运号码：<i className="blue">{myOrderDetail.data.orderDetailForWinningVo.luckyNum}</i></li>
                    </ul>
                }
                <ul className="mytreasure-detail">
                    <li>订单编号：<i>{myOrderDetail.data.orderId}</i></li>
                    <li>下单时间：<i>{myOrderDetail.data.createTime}（唯一不变标识）</i></li>
                    <li>在线支付：<i className="blue">{myOrderDetail.data.orderAmount}</i></li>
                </ul>
                {(myOrderDetail.data.grabStatus=="2")?
                    <ul className="mytreasure-detail">
                        <li className="black">收货地址：</li>
                        <li>姓名：<i>{myOrderDetail.data.consigneeName}</i></li>
                        <li>手机号：<i>{myOrderDetail.data.consigneePhone}</i></li>
                        <li>地址：<i>{myOrderDetail.data.province}{myOrderDetail.data.city}{myOrderDetail.data.area}{myOrderDetail.data.address}</i></li>
                    </ul>
                :""}

                <div className="bottom-kong"></div>

                <div className="mytreasure-btn">
                    {(myOrderDetail.data.grabStatus=="2" && myOrderDetail.data.address==""&& myOrderDetail.data.isNeedsAddress=="1")?<Link to={'addressAdd'} query={{orderId:myOrderDetail.data.orderId}} >添加收货地址</Link>:""}
                    {(myOrderDetail.data.grabStatus=="2" && myOrderDetail.data.address==""&& myOrderDetail.data.isNeedsAddress=="0")?<Link to={'address'} query={{orderId:myOrderDetail.data.orderId}} >选择收货地址</Link>:""}
                    {(myOrderDetail.data.grabStatus=="2" && myOrderDetail.data.address!=""&& myOrderDetail.data.isNeedsAddress=="0"&& myOrderDetail.data.deliverGoodsStatus==0)?<Link to={'address'} query={{orderId:myOrderDetail.data.orderId}} >修改收货地址</Link>:""}
                    {(myOrderDetail.data.grabStatus=="2" && myOrderDetail.data.address!=""&& myOrderDetail.data.isNeedsAddress=="0"&& myOrderDetail.data.deliverGoodsStatus==1)?<Link to={'logisticsInfo'} query={{orderId:myOrderDetail.data.orderId}} >查看物流</Link>:""}
                    {(myOrderDetail.data.address!=""&& myOrderDetail.data.isNeedsAddress=="0"&& myOrderDetail.data.nextGoodsNo==0)?"":<Link to={'logisticsInfo'} query={{orderId:myOrderDetail.data.orderId}} >再次参与</Link>}
                </div>



             </div>
        	)
        }
    }
}

myOrderDetail.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}
myOrderDetail.contextTypes = {
    router:React.PropTypes.object
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: myOrderDetail
  } = postsByApi["myOrderDetail"] || {
    isFetching: false,
    items: {}
  }
  return {
    myOrderDetail,
    isFetching
  }
}
export default connect(mapStateToProps)(myOrderDetail);

