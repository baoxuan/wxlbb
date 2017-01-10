import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link } from 'react-router'
import Swiper from 'react-id-swiper';

import BuyPop from '../components/BuyPop';
import Header from '../components/Header';
import { getPrecent } from '../utils';


class HistoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            isShow:false,
            item:{},
        }
    }
    componentWillMount() {
        document.title="揭晓详情";
    }
    componentDidMount() {
        const header= {"X-Client-ID":'123456'};
        const params = this.props.location.query;
        this.props.dispatch(reset("getGoodsInfo", header, params));
        this.props.dispatch(fetchPosts("getGoodsInfo", header, params));
    }
    componentWillReceiveProps(nextProps) {
    	console.log(nextProps);
    	if(nextProps.GoodsInfo.errorCode === 0){
    		this.setState({
            	loading:false,
    		})
    	}
    }


    render() {
    	if(this.state.loading){
    		return(<div className="loading"><span>loading</span></div> )
    	}else{
    		const { GoodsInfo } = this.props;
    		const params = {
	            pagination: '.swiper-pagination',
				paginationType: 'fraction',
	            loop:true,
	            autoplay:5000
    		}
    		const {orderMain,salesGoods,winningRecord} = GoodsInfo.data;
            if(salesGoods){
    		return(
    			<div>
    			<div >
	                <Swiper {...params} >
	                {salesGoods.goodsPic.split(",").map((item)=>(
	                        <div key={item} className="inforHeader">
	                          <img src={item} />
	                        </div>
	                    ))
	            	}
	                </Swiper>
                </div>
                <div className="infoContainer">
 					<div className="title">{salesGoods.goodsName}</div>
                	<div className="intor">{salesGoods.desc}</div>
                	<div className="luckBox">
                        <div className="header">
                            <img src={winningRecord.userHeadImg}/>
                        </div>
                        <div className="Msg">
                            <p>获奖用户：<i>{winningRecord.userName}</i></p>
                            <p>本期参与：<i>{winningRecord.joinNum} 人次</i></p>
                            <p>商品期数：<i className="blue">{winningRecord.periodsNum}</i></p>
                            <p>揭晓时间：{winningRecord.announcedTime}</p>
                        </div>
                    </div>
                    <div className="luckNum">幸运号码：<i>{winningRecord.luckyNum}</i> <Link to={{pathname:"formula", query:{goodsNo: salesGoods.goodsNo, periodsNum: salesGoods.periodsNum}}}>计算详情</Link></div>
                </div>
                <div className="infoList">
                	<ul>
                		<li>
                			 <Link to={{pathname:"GoodsDetail",state:{imageTextDetail: salesGoods.imageTextDetail} } }>商品详情</Link>
                		</li>
                        <li>
                            <Link to={{pathname:"winShowInfo", query:{barcode: salesGoods.barcode} }}>往期赢家晒单</Link>
                        </li>
                        <li>
                            <Link to={{pathname:"HistoryList", query:{barcode: salesGoods.barcode, goodsNo:salesGoods.goodsNo}} }>往期揭晓</Link>
                        </li>
                	</ul>
                </div>
                <div className="recordCotainer">
                	<div className="title">本期参与记录 <i>本期于{salesGoods.createTime}开始</i></div>
                	<ul className="recordList">
                	{orderMain.map((item)=>
                		<li key={item.createTime}>
                			<div className="lContainer">
                				<div className="header">
                					<img src={item.userHeadImg}/>
                				</div>
                				<div className="Msg">
	                				<h3>{item.userName}</h3>
	                				<p>{item.createTime}</p>
                				</div>
                			</div>
                			<div className="Number"><i>{item.joinNum}</i>次</div>
                		</li>
                		)}
                	</ul>
                </div>
                {salesGoods.isExistNext?
                (<div className="BtnBox">
                    <Link to={{pathname:"GoodsInfo", query:{goodsno: salesGoods.nextGoodsNo}} } className="blueBtn">前往最新期</Link>
                </div>):("")
                }
                </div>
    			)
            }
            return(<div className="Loading">暂无数据</div>)
    	}

    }

  join(item){
    //弹出购买框
        const header= {"X-Client-ID":'123456'}
        const params = {"goodsno":item.goodsNo}
        this.setState({
          item:item,
          isShow:true
        })
        this.props.dispatch(fetchPosts("buyNumConfig",header,params));

  }
  buy(e){//提交表单
    this.setState({
      isShow:false
    })
    console.log(e);
  }

}
HistoryDetail.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: GoodsInfo
  } = postsByApi["getGoodsInfo"] || {
    isFetching: false,
    items: {}
  }
  return {
    GoodsInfo,
    isFetching
  }
}


export default connect(mapStateToProps)(HistoryDetail);

