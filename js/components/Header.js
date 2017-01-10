import React, { Component, PropTypes } from 'react'


class Header extends Component{
	render(){
				const {text} = this.props;
		return (
				<div  className="Header"> <button className="back" onClick={this._Click.bind(this)}></button>{text} </div>
			)
	}
	_Click(){
		this.context.router.goBack();
	}
}

Header.propTypes = {
  text: PropTypes.string.isRequired
}
Header.contextTypes = {
    router:React.PropTypes.object
}

export default Header