import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link , hashHistory } from 'react-router';
import cookie from 'react-cookie';

class logisticsInfo extends React.Component {
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
        this.props.dispatch(fetchPosts("logisticsInfo",header,params));
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.logisticsInfo.errorCode === 0){
            this.setState({
                loading:false
            })
        }
    }

    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
        }else{
            const {myOrderDetail,logisticsInfo} = this.props;
            const imgUrl = myOrderDetail.data.orderDetailForGoodsInfoVo.goodsPic ? myOrderDetail.data.orderDetailForGoodsInfoVo.goodsPic.split(",")[0]:myOrderDetail.data.orderDetailForGoodsInfoVo.goodsPic
            const traces = logisticsInfo.data.traces.reverse();
            return(
        	<div >

                <div className="logistics-box">
                    <div className="pic"><img src={imgUrl} alt="" /></div>
                    <div className="content">
                        <p>承运来源：<i>{logisticsInfo.data.shipperName}</i></p>
                        <p>运单编号：<i>{logisticsInfo.data.logisticCode}</i></p>
                    </div>
                </div>
                {traces.map((item)=>(
                    <div className="logistics-list" key={item.AcceptTime}>
                        <div className="time">{item.AcceptTime}</div>
                        <div className="info">{item.AcceptStation}</div>
                    </div>
                ))}

             </div>
        	)
        }
    }
}

logisticsInfo.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}
logisticsInfo.contextTypes = {
    router:React.PropTypes.object
}

function mapStateToProps(state){
  const { postsByApi } = state
    const {
    items: myOrderDetail
  } = postsByApi["myOrderDetail"] || {
    items: {}
  }
  const {
    isFetching,
    items: logisticsInfo
  } = postsByApi["logisticsInfo"] || {
    isFetching: false,
    items: {}
  }
  return {
    myOrderDetail,
    logisticsInfo,
    isFetching
  }
}
export default connect(mapStateToProps)(logisticsInfo);

