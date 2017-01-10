import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

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
					<Link to="/download">去下载</Link>
				</div>
			</div>
			);
	}
	_click(){
		this.props.popClick();
	}

}

Pop.propTypes = {
	title: PropTypes.string.isRequired,
 	content: PropTypes.string.isRequired
};

export default Pop;