import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link, hashHistory } from 'react-router';

class Pop extends Component{
	render(){
		const {title, content, show, callbackParent} = this.props;
		return (
			<div className={classnames(
				"pop_bg",
				{"show":show}
				)} onClick ={this._click.bind(this)}>
				<div className="pop_container pop_container1">
					<h3><div className="colsed" ></div><div className="title">{title}</div></h3>
					<button onClick={this._jump.bind(this)}>去下载</button>
				</div>
			</div>
			);
	}
	_click(){
		this.props.popClick();
	}
	_jump(){
		 window.location.href= "http://weixin.hzyisu.com/download.html"
	}


}

Pop.propTypes = {
	title: PropTypes.string.isRequired
};

export default Pop;