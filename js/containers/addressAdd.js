import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';


class addressList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }
    componentWillMount() {
        document.title="添加收货地址";
        this.props.dispatch(reset("addAddress"));
    }
    componentDidMount() {
        const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
        this.props.dispatch(fetchPosts("queryAddressInfo",header))
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.addressList.errorCode === 0){
        this.setState({
            loading:false
        })
      }
      if(nextProps.addAddress.errorCode ===0){
            this.context.router.push("/address");
        }
    }
    selectArea(event){
        alert("选择");
        event.preventDefault();
        event.stopPropagation();
    }
    addClick(event){
        let name = ReactDOM.findDOMNode(this.refs.consigneeName).value,
            phone = ReactDOM.findDOMNode(this.refs.consigneePhone).value,
            province = ReactDOM.findDOMNode(this.refs.province).value,
            city = ReactDOM.findDOMNode(this.refs.city).value,
            area = ReactDOM.findDOMNode(this.refs.area).value,
            address = ReactDOM.findDOMNode(this.refs.address).value,
            isdefault=(ReactDOM.findDOMNode(this.refs.isdefault).checked==true)?1:0;
        //添加地址
        const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
        const params = {"consigneeName":name,"consigneePhone":phone,"province":province,"city":city,"area":area,"address":address,"isDefault":isdefault}
        this.props.dispatch(fetchPosts("addAddress",header,params));
        event.preventDefault();
        event.stopPropagation();
    }
    render() {
        if(this.state.loading){
            return(<div className="loading">loading</div>)
        }else{
            const {addressList,addAddress} = this.props;
            return(
        	<div >


  <ul className="address-list">
  <input type="hidden" name="province" ref="province" value="浙江" />
  <input type="hidden" name="city" ref="city" value="杭州" />
  <input type="hidden" name="area" ref="area" value="西湖区" />
    <li>收货人 <input type="text" name="consigneeName" ref="consigneeName" /></li>
    <li>手机号码 <input type="text" maxLength="11" name="consigneePhone" ref="consigneePhone" /></li>
    <li className="array" onClick={this.selectArea}>所在地区 <span></span> <i></i> </li>
    <li><textarea name="address" ref="address" id="" cols="30" rows="10" placeholder="填写详情地址，例如街道名称，楼层和门牌号等"></textarea></li>
    <li className="default">设为默认地址 
      <div className="address-dbox">
        <input name="isDefault" type="checkbox" id="isDefault" value="1" ref="isdefault" />
          <div className="default-btn">       
            <label htmlFor="isDefault"></label>
          </div>  
      </div>
    </li>
  </ul>

  <div className="address-add">
    <Link href="javascript:;" onClick={this.addClick.bind(this)}>添加</Link>
  </div>

             </div>
        	)
        }
    }
}
addressList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}
addressList.contextTypes = {
    router:React.PropTypes.object
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: addressList
  } = postsByApi["queryAddressInfo"] || {
    isFetching: false,
    items: {}
  }
  const {
    items: addAddress
  } = postsByApi["addAddress"] || {
    items: {}
  }
  return {
    addressList,
    addAddress,
    isFetching
  }
}

export default connect(mapStateToProps)(addressList);

