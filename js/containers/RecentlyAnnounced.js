import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router'
import merge from 'lodash/merge'

import BuyPop from '../components/BuyPop';
import { getPrecent } from '../utils';


class RecentlyAnnounced extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            isShow:false,
            pageindex:1,
        }
    }
    componentWillMount() {
        document.title="一元夺宝";
    }
    componentDidMount() {
        const header= {"X-Client-ID":'123456'};
        const params = {pageindex:this.state.pageindex, pagesize:10};
        this.props.dispatch(fetchPosts("getRecentlyAnnounced", header, params))
    }
    componentWillReceiveProps(nextProps) {
    	console.log(nextProps);
    	if(nextProps.RecentlyAnnounced.errorCode === 0){
    		this.setState({
            	loading:false,
    		})
    	}
    }


    render() {
    	if(this.state.loading){
    		return(<div>loading</div> )
    	}else{
    		const { RecentlyAnnounced } = this.props;
            console.log(RecentlyAnnounced);

    		return(
                <div  className="RecentlyCotainer">
                	<ul>
                {RecentlyAnnounced.data.salesGoods.map((item)=>{

	            const imgUrl = item.goodsPic ? item.goodsPic.split(",")[0]:item.goodsPic;
                return(
                		<li key={item.periodsNum}>
                				<div className="header">
                					<img src={imgUrl}/>
                				</div>
                				<div className="Msg">
                                    <h3>{item.goodsName}</h3>
                                    <p>期号：<i>{item.periodsNum}</i></p>
                                    {item.winning?
                                    	(<div><p>幸运号码：<i className="blue">{item.winningRecord.luckyNum}</i></p>
                                    		<p>参与人数：<i>{item.winningRecord.joinNum}</i></p>
                                    		<p>获奖用户：<i>{item.winningRecord.userName}</i></p>
                                    		<p>揭晓时间：<i>{item.winningRecord.announcedTime}</i></p></div>)
	                				:(<div><p><i className="blue">即将揭晓</i></p></div>)}
                				</div>
                		</li>

            		)}
               )}
                		<li>
                				<div className="header">
                					<img src=""/>
                				</div>
                				<div className="Msg">
                                    <h3>ppp</h3>
                                    <p>期号：<i>1111</i></p>
                                    <div>
                                    <p className="blue"><em></em>即将揭晓</p>
	                				<div className="time">03:32:14</div>
	                				</div>
                				</div>
                		</li>
                	</ul>
                </div>
    			)
    	}

    }

}
RecentlyAnnounced.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: RecentlyAnnounced
  } = postsByApi["getRecentlyAnnounced"] || {
    isFetching: false,
    items: {}
  }
  return {
    RecentlyAnnounced,
    isFetching
  }
}


export default connect(mapStateToProps)(RecentlyAnnounced);

