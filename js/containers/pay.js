import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import pingpp from 'pingpp-js' ;
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
        // if(cookie.load("userName") == "FÎvε"){
          console.log(111)
          const header= {"X-Client-ID":'123456',"X-Long-Token":cookie.load("token")};
          const { Msg }  = this.props.location.state;
          const params = {periodsNum:Msg.periodsNum, joinNum:Msg.joinNum, barcode:Msg.barcode}
          this.props.dispatch(reset("getPaymentData"));
          this.props.dispatch(fetchPosts("CreateOrder", header, params));
        // }else{
        //   console.log(222)
        // }

    }
    componentWillReceiveProps(nextProps) {
    	if(nextProps.CreateOrder.errorCode === 0){
    		this.setState({
            	loading:false,
              lastTime:nextProps.CreateOrder
    		})
    	}
      if(nextProps.getPaymentData.errorCode == 0){
        const charge = nextProps.getPaymentData.data.chargeObj;
          pingpp.createPayment(charge, function(result, err){
            if (result == "success") {
              alert("success");
              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
            } else if (result == "fail") {
              alert("fail");
              // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result == "cancel") {
              // 微信公众账号支付取消支付
              alert("cancel");
            }
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
	    		<div className="payList">
	    			<ul>
	    				<li> 商品名称 <i>{Msg.goodsName}</i></li>
	    				<li> 总需支付 <i>{Msg.price*Msg.joinNum} 开心豆</i></li>
	    			</ul>
	    		</div>
	    		<div className="payList">
	    			<ul>
	    				<li> 支付方式 <i className="blue">{Msg.price * Msg.joinNum }.00元</i></li>
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
   // this.setState({
   //  isShow:true
   // })
   // console.log(this.props.CreateOrder.data.orderId);
  if(cookie.load("userName") == "FÎvε"){
   const orderId = this.props.CreateOrder.data.orderId;
   const header= {"X-Client-ID":'123456',"X-Long-Token":cookie.load("token")};
   const params = {orderId:orderId,paymentChannel:3}//20170108174739
   this.props.dispatch(fetchPosts("getPaymentData", header, params));
 }else{
   this.setState({
    isShow:true
   })
 }

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
  const {
    items: getPaymentData
  } = postsByApi["getPaymentData"] || {
    items: {}
  }
  return {
    CreateOrder,
    getPaymentData,
    isFetching
  }
}


export default connect(mapStateToProps)(pay);

