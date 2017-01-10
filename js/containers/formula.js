import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link } from 'react-router'
import Swiper from 'react-id-swiper';

import Header from '../components/Header';
import { getPrecent } from '../utils';


class formula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            isShow:false,
        }
    }
    componentWillMount() {
        document.title="计算详情";
    }
    componentDidMount() {
        const header= {"X-Client-ID":'123456'};
        const params = this.props.location.query;
        this.props.dispatch(fetchPosts("getWinningAlgorithm", header, params));
    }
    componentWillReceiveProps(nextProps) {
    	if(nextProps.Algorithm.errorCode === 0){
    		this.setState({
            	loading:false,
    		})
    	}
    }


    render() {
    	if(this.state.loading){
    		return(<div className="loading"><span>loading</span></div>)
    	}else{
    		const { Algorithm } = this.props; 
    		const params = {
	            pagination: '.swiper-pagination',
				paginationType: 'fraction',
	            loop:true,
	            autoplay:5000
    		}
    		return(
    			<div>
    				<div className="formulaBox tCenter">
    					<h3>计算公式</h3>
    					<p>(数值A÷商品总需人数) 取余数+{Algorithm.data.defaultNum}</p>
    				</div>
    				<div className="formulaBox">
    					<h3 className="tCenter">数值A</h3>
    					<p className="gray">=截止该商品最后夺宝时间最后100条数据</p>
    					<p className="gray">=<span className="blue">{Algorithm.data.luckyNum}</span>  
                        <button onClick={this._onClick.bind(this)}>展开</button></p>
    				</div>
                        <div className={this.state.isShow ? "listContainer ":"listContainer none"}>
                            <dl>
                                <dt>夺宝时间</dt>
                                <dd>用户账号</dd>
                            </dl>
                            {Algorithm.data.winningAlgorithmVos.map((item)=>(
                            <dl key={item.algorithmNum}>
                                <dt>{item.orderTime} <i></i><span className="blue">{item.algorithmNum}</span></dt>
                                <dd>{item.userAccount}</dd>
                            </dl>
                                ))}
                        </div>
    				<div className="formulaBox tCenter bb0">
    					<h3>计算结果</h3>
    					<p>幸运号码:<span className="blue">{Algorithm.data.luckyNum}</span></p>
    				</div>
                </div>
    			)
    	}

    }
_onClick(){
    this.setState({
        isShow:true
    })
}

}
formula.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: Algorithm
  } = postsByApi["getWinningAlgorithm"] || {
    isFetching: false,
    items: {}
  }
  return {
    Algorithm,
    isFetching
  }
}


export default connect(mapStateToProps)(formula);

