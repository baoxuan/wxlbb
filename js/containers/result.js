import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,fetchTicket, reset } from '../actions';

import classnames from 'classnames';
import cookie from 'react-cookie';

class result extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            loading:true
        }
    }

    componentWillMount() {
        document.title = "支付成功";
    }


    render() {

           const query = this.props.location.query;
        	return(
                <div>
                    <div className="resultConainer">
                        <h3>恭喜你，参与成功</h3>
                        <h3>请等待系统为您揭晓</h3>

                        <div className="btns">
                            <button className="blueBtn" onClick={this._jump1.bind(this)}>再次夺宝</button>
                            <button onClick={this._jump2.bind(this)}>查看夺宝记录</button>
                        </div>
                    </div>

                </div>
        	)
    }
    _jump1(){
        this.context.router.push({
            pathname:"/",
        });
    }
    _jump2(){
        this.context.router.push({
            pathname:"/myOrderListAll",
        });
    }
}




result.contextTypes = {
    router:React.PropTypes.object
}




export default result;


