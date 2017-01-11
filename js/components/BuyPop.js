import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

class BuyPop extends Component{
	constructor(props) {
		super(props);
		this.state = {
			value:1,
			total:""
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.config.errorCode === 0){
			this.setState({total:nextProps.config.data.remindValue})
		}
	}
	render(){
		const {show, item, config, closed, submit} = this.props;
		if(config.errorCode === 0){
		const imgUrl = item.goodsPic ? item.goodsPic.split(",")[0]:item.goodsPic
		return (
			<div className={classnames(
				"pop_bg",
				{"show":show}
				)}>
				<div className="pop_container">
					<h3><div className="colsed" onClick={this._closed.bind(this)} ></div><div className="title">请选择参与人次</div></h3>
		              <div className ="pop_content">
			              <div className="photo"><img src={imgUrl} alt=""/></div>
			              <div className="content">
			                <div className="title">{item.goodsName}</div>
			                <div className="intor">{item.desc}</div>
			             </div>
		             </div>
		             <div className="selects">
		             {config.data.defaultBuyNum.split(",").map((item)=>
		             		<button key={item} data-value={item} onClick={this._select.bind(this)} className={(item == this.state.value)?"selected":""}>{item}次</button>
		             	)}

		             </div>
		             <div className="boxContainer">
		             <div className="inputBox">
		             	<button onClick={this._reduce.bind(this)} className="reduce">-</button>
		             	<input type="text" value={this.state.value} onChange={this._onChange.bind(this)}/>
	             		<button onClick={this._add.bind(this)} className="add">+</button>
		             </div>
		             <div className="msg">剩余<span>{this.state.total}次</span></div>
		             </div>
					<div className="footer">
						<div className="total">合计：<span>￥{this.state.value}</span></div>
						<button className="buyBtn" onClick={this._submit.bind(this)}>立即购买</button>
					</div>
				</div>
			</div>
			);
	}else{
		return (<div></div>);
	}

	}
	_onChange(event) {
	    this.setState({
	      value: event.target.value,
	      total:this.props.config.data.remindValue - event.target.value
	    });
	}
	_closed(){
		this.props.closed();
		this.setState({
			value:1
		})
	}
	_select(e){
		this.setState({
			value:e.currentTarget.dataset.value,
			total:this.props.config.data.remindValue - e.currentTarget.dataset.value
		});
	}
	_reduce(){
		 if(this.state.value>1){
			this.setState({
				value: Number(this.state.value)-1,
				total:Number(this.state.total) + 1
			});
		}
	}
	_add(){
		if(this.state.value< this.props.config.data.remindValue ){
			this.setState({
				value:Number(this.state.value)+1,
				total:Number(this.state.total) -1
			});
		}

	}
	_submit(){
		let params = {goodsName:this.props.item.goodsName,barcode:this.props.item.barcode,joinNum:this.state.value, periodsNum:this.props.item.periodsNum}
		this.props.submit(params);
		this.setState({
			value:1
		})
	}
}

BuyPop.propTypes = {
	show: PropTypes.bool.isRequired,
 	item: PropTypes.object.isRequired,
 	config: PropTypes.object.isRequired,
 	closed: PropTypes.func.isRequired,
};

export default BuyPop;