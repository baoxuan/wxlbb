import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link } from 'react-router'
import cookie from 'react-cookie';

import Pop from '../components/Pop';


class pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check:true,
            isShow:false
        }
    }
    componentWillMount() {
        document.title="支付";
    }
    componentDidMount() {
        const header= {"X-Client-ID":'123456',"X-Long-Token":cookie.load("token")};
        const { Msg }  = this.props.location.state;
        console.log(this.props.location.state);
        this.props.dispatch(fetchPosts("CreateOrder", header, Msg));

    }
    componentWillReceiveProps(nextProps) {
    	console.log(nextProps.CreateOrder);
    	if(nextProps.CreateOrder.errorCode === 0){
    		this.setState({
            	loading:false,
              lastTime:nextProps.CreateOrder
    		})
    	}
    }

    _onClick(){
        this.setState({
           check:!this.state.check
           })
    }

    render() {
		const { CreateOrder } = this.props;
        const { Msg } = this.props.location.state;

    	if(this.state.loading){
    		return(<div className="loading"><span>loading</span></div> )
    	}else{
	    	return(
          <div>
         <Pop 
             title={'下载APP,完成支付！'}
              show={this.state.isShow}
              popClick={()=>this.setState({isShow:false})} />
	    	<div className="payContainer ">
	    		<div className="payTime"><i></i>支付剩余时间30:00</div>
	    		<div className="payList">
	    			<ul>
	    				<li> 商品名称 <i>{Msg.goodsName}</i></li>
	    				<li> 总需支付 <i>{Msg.joinNum} 开心豆</i></li>
	    			</ul>
	    		</div>
	    		<div className="payList">
	    			<ul>
	    				<li> 支付方式 <i className="blue">{Msg.joinNum}元</i></li>
	    				<li><span className="logo"></span>微信 <i className="gou"></i> </li>
	    			</ul>
	    		</div>
	               <label htmlFor="check" onClick={this._onClick.bind(this)}>
	                    <input type="checkBox" id="check"  defaultChecked={this.state.check}/>
	                    <div className="checkBox"><i></i>我已阅读并同意《一元夺宝用户服务协议》</div>
	                </label>
	            <div className="BtnBox bgf"><button className="blueBtn" onClick={this._pay.bind(this)}>立即支付</button></div>
	    	</div>
        </div>
	    	)
	    }
    }
_pay(){
   this.setState({
    isShow:true
   })

}

}
pay.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: CreateOrder
  } = postsByApi["CreateOrder"] || {
    isFetching: false,
    items: {}
  }
  return {
    CreateOrder,
    isFetching
  }
}


export default connect(mapStateToProps)(pay);

