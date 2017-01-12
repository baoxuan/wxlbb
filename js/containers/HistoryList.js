import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router'
import merge from 'lodash/merge'

import BuyPop from '../components/BuyPop';
import Header from '../components/Header';
import { getPrecent } from '../utils';


class HistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            isShow:false,
            pageindex:1,
        }
    }
    componentWillMount() {
        document.title="往期揭晓";
    }
    componentDidMount() {
        const header= {"X-Client-ID":'123456'};
        const params = {barcode:this.props.location.query.barcode, pageindex:this.state.pageindex, pagesize:10};
        this.props.dispatch(fetchPosts("getWinningRecordHistoryList", header, params))
    }
    componentWillReceiveProps(nextProps) {
    	console.log(nextProps);
    	if(nextProps.HistoryList.errorCode === 0){
    		this.setState({
            	loading:false,
    		})
    	}
    }


    render() {
    	if(this.state.loading){
    		return(<div className="loading"><span>loading</span></div> )
    	}else{
    		const { HistoryList } = this.props;
            if(HistoryList.data.length >0){
    		return(
    			<div>
                {HistoryList.data.map((item)=>
                <div key={item.periodsNum} className="historyCotainer">
                	<div className="title">第{item.periodsNum}期 <i>揭晓时间：{item.announcedTime}</i></div>
                	<ul className="historyList">
                		<li>
                			<div className="lContainer">
                				<div className="header">
                					<img src={item.userHeadImg}/>
                				</div>
                				<div className="Msg">
                                    <p>获得者：<i>{item.userName}({item.province})</i></p>
                                    <p>用户ID：<i>{item.userAccount}（唯一不变识别码）</i></p>
                                    <p>本期参与：<i>{item.joinNum}人次</i></p>
	                				<p>幸运号码：<i className="blue">{item.luckyNum}</i></p>
                				</div>
                			</div>
                		</li>
                	</ul>
                </div>
               )}
                </div>
    			)
            }
            return(<div className="loading"><span>未找到相关内容</span></div> )

    	}

    }

}
HistoryList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: HistoryList
  } = postsByApi["getWinningRecordHistoryList"] || {
    isFetching: false,
    items: {}
  }
  return {
    HistoryList,
    isFetching
  }
}


export default connect(mapStateToProps)(HistoryList);

