import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';

import cookie from 'react-cookie';
import isEmpty from 'lodash/isEmpty'
class addressList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            provinceIndex:'-1',
            cityIndex:'-1',
            city:"",
            area:""
        }
    }
    componentWillMount() {
        document.title="添加收货地址";
        this.props.dispatch(reset("addAddress"));
    }
    componentDidMount() {
        const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":cookie.load("token")}
        this.props.dispatch(fetchPosts("queryAddressInfo",header))
    }
    componentWillReceiveProps(nextProps) {
    let myColor = { background: 'rgba(0,0,0,.5)', text: "#FFFFFF"};
      if(nextProps.addressList.errorCode === 0){
        this.setState({
            loading:false,
        })
      }
      if(nextProps.addAddress.errorCode ===0){
            this.context.router.push("/address");
        }
        if(!isEmpty(nextProps.addAddress) && nextProps.addAddress.errorCode !== 0){
            notify.show("地址输入有误", "custom", 1500, myColor);
        }
    }
    addClick(event){
        let myColor = { background: 'rgba(0,0,0,.5)', text: "#FFFFFF"};
        let name = ReactDOM.findDOMNode(this.refs.consigneeName).value,
            phone = ReactDOM.findDOMNode(this.refs.consigneePhone).value,
            province = ReactDOM.findDOMNode(this.refs.province).value,
            city = ReactDOM.findDOMNode(this.refs.city).value,
            area = ReactDOM.findDOMNode(this.refs.area).value,
            address = ReactDOM.findDOMNode(this.refs.address).value,
            isdefault=(ReactDOM.findDOMNode(this.refs.isdefault).checked==true)?1:0;
        if(name==""){
            notify.show("请输入姓名", "custom", 1500, myColor);
        }else if(phone==""){
            notify.show("请输入手机号", "custom", 1500, myColor);
        }else if(province=="-1"){
            notify.show("请选择省份", "custom", 1500, myColor);
        }else if(city=="-1"){
            notify.show("请选择城市", "custom", 1500, myColor);
        }else if(area=="-1"){
            notify.show("请选择县区", "custom", 1500, myColor);
        }else if(address==""){
            notify.show("请输入地址", "custom", 1500, myColor);
        }else{
        //添加地址
            const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":cookie.load("token")}
            const params = {"consigneeName":name,"consigneePhone":phone,"province":province,"city":city,"area":area,"address":address,"isDefault":isdefault}
            this.props.dispatch(fetchPosts("addAddress",header,params));
        }
        event.preventDefault();
        event.stopPropagation();
    }
    provinceChange(event){
        var e = event.target;
        this.setState({
            provinceIndex:e.options[e.selectedIndex].getAttribute("data-index")
        })
    }
    cityChange(event){
        var e = event.target;
        this.setState({
            cityIndex:e.options[e.selectedIndex].getAttribute("data-index")
        })
    }
    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
        }else{
            const {addressList,addAddress} = this.props;
            const areaJson= window.__CITY__;
            return(
    <div >
    <Notifications />
  <ul className="address-list">
    <li>收货人 <input type="text" name="consigneeName" ref="consigneeName" /></li>
    <li>手机号码 <input type="text" maxLength="11" name="consigneePhone" ref="consigneePhone" /></li>
    <li>省份&nbsp;
        <select name="province" onChange={this.provinceChange.bind(this)} ref="province">
            <option key="-1" value="-1" data-index="-1">请选择省份</option>
            {areaJson.map((item,index)=>(   
                <option key={index} data-index={index} value={item.name} >{item.name}</option>
            ))}
        </select>
    </li>
    <li>城市&nbsp;
        <select name="city" onChange={this.cityChange.bind(this)} ref="city">
            <option key="-1" value="-1"     data-index="-1">请选择城市</option>
            {(this.state.provinceIndex=="-1")?"":
            areaJson[this.state.provinceIndex].city.map((item,index)=>(   
                <option key={index} data-index={index} value={item.name} >{item.name}</option>
            ))}
        </select>
    </li>
    <li>县区&nbsp;
        <select name="area"  ref="area">
            <option key="-1" value="-1" data-index="-1">请选择县区</option>
            {(this.state.cityIndex=="-1")?"":
            areaJson[this.state.provinceIndex].city[this.state.cityIndex].area.map((item,index)=>(   
                <option key={index} data-index={index} value={item}>{item}</option>
            ))}
        </select>
    </li>
    <li><textarea name="address" ref="address" id="" cols="30" rows="10" placeholder="填写详情地址，例如街道名称，楼层和门牌号等"></textarea></li>
    <li className="default">设为默认地址 
      <div className="address-dbox">
          <label htmlFor="isDefault" >
          <input name="isDefault" type="checkbox" id="isDefault" value="1" ref="isdefault"   />
          <div className="default-btn">
            <i></i>
          </div>
          </label>
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

