import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router'
import Swiper from 'react-id-swiper';

import BuyPop from '../components/BuyPop';
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
        document.title="一元夺宝";
    }
    componentDidMount() {
        const header= {"X-Client-ID":'123456'};
        const params = this.props.location.query;
        this.props.dispatch(fetchPosts("getGoodsInfo", header, params))
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
    		return(<div>loading</div> )
    	}else{
    		const { GoodsInfo } = this.props; 
    		const params = {
	            pagination: '.swiper-pagination',
				paginationType: 'fraction',
	            loop:true,
	            autoplay:5000
    		}
    		const {orderMain,salesGoods} = GoodsInfo.data;
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
                	<div className="number">期号：{salesGoods.barcode}</div>
                	<div className="progress"><i style={{width:getPrecent(salesGoods.surplusJoinNum,salesGoods.totalJoinNum)}}></i></div>
                	<div className="total">总量 <i>{salesGoods.totalJoinNum}</i> 人次</div>
                	<div className="surplus">剩余 <i>{salesGoods.surplusJoinNum}</i> 人次</div>
                </div>
                <div className="infoList">
                	<ul>
                		<li>
                			<Link to="#">商品详情</Link>
                		</li>
                		<li>
                			<Link to={`HistoryList`} query={{barcode: salesGoods.barcode}}>往期赢家晒单</Link>
                		</li>
                		<li>
                			<Link to="#">往期揭晓</Link>
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
                <button className="blueBtn" onClick={this.join.bind(this, salesGoods)}>立即参与</button>
                </div>
    			)
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

