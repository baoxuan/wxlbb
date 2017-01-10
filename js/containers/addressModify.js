import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';

class addressList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }
    componentWillMount() {
        document.title="修改收货地址";
        this.props.dispatch(reset("modifyAddress"));
    }
    componentDidMount() {
        const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":cookie.load("token")}
        this.props.dispatch(fetchPosts("queryAddressInfo",header));

    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.addressList.errorCode === 0){
        this.setState({
            loading:false,
            isChecked:(cookie.load('isDefault')==1)?true:false,
            provinceIndex:'-1',
            cityIndex:'-1',
            city:"",
            area:""
        })

      }
        if(nextProps.modifyAddress.errorCode ===0){
            this.context.router.push("/address");
        }
    }
    selectArea(event){
        alert("选择");
        event.preventDefault();
        event.stopPropagation();
    }

    modifyClick(event){
        let name = ReactDOM.findDOMNode(this.refs.consigneeName).value,
            recordId = ReactDOM.findDOMNode(this.refs.recordId).value,
            phone = ReactDOM.findDOMNode(this.refs.consigneePhone).value,
            province = ReactDOM.findDOMNode(this.refs.province).value,
            city = ReactDOM.findDOMNode(this.refs.city).value,
            area = ReactDOM.findDOMNode(this.refs.area).value,
            address = ReactDOM.findDOMNode(this.refs.address).value,
            isdefault=(ReactDOM.findDOMNode(this.refs.isdefault).checked==true)?1:0;
        //添加地址
        const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":'469213d3d2154175a5bbc49945f2843e'}
        const params = {"recordId":recordId,"consigneeName":name,"consigneePhone":phone,"province":province,"city":city,"area":area,"address":address,"isDefault":isdefault}
        this.props.dispatch(fetchPosts("modifyAddress",header,params));
        event.preventDefault();
        event.stopPropagation();
    }

_onClick(){
  this.setState({
    isChecked:!this.state.isChecked
  })
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
            const {addressList,modifyAddress} = this.props;
            const areaJson= window.__CITY__;
            return(
          <div >

  <ul className="address-list">
  <input type="hidden" name="recordId" ref="recordId" value={cookie.load('recordId')} />
    <li>收货人 <input type="text" name="consigneeName" ref="consigneeName" defaultValue={cookie.load('consigneeName')} /></li>
    <li>手机号码 <input type="text" maxLength="11" name="consigneePhone" ref="consigneePhone" defaultValue={cookie.load('consigneePhone')} /></li>
    <li>省份&nbsp;
        <select name="province" onChange={this.provinceChange.bind(this)} ref="province">
            <option key="-1" value="-1" data-index="-1">{cookie.load('province')}</option>
            {areaJson.map((item,index)=>(   
                <option key={index} data-index={index} value={item.name} >{item.name}</option>
            ))}
        </select>
    </li>
    <li>城市&nbsp;
        <select name="city" onChange={this.cityChange.bind(this)} ref="city">
            <option key="-1" value="-1"     data-index="-1">{cookie.load('city')}</option>
            {(this.state.provinceIndex=="-1")?"":
            areaJson[this.state.provinceIndex].city.map((item,index)=>(   
                <option key={index} data-index={index} value={item.name} >{item.name}</option>
            ))}
        </select>
    </li>
    <li>县区&nbsp;
        <select name="area"  ref="area">
            <option key="-1" value="-1" data-index="-1">{cookie.load('area')}</option>
            {(this.state.cityIndex=="-1")?"":
            areaJson[this.state.provinceIndex].city[this.state.cityIndex].area.map((item,index)=>(   
                <option key={index} data-index={index} value={item}>{item}</option>
            ))}
        </select>
    </li>
    <li><textarea name="address" ref="address" id="" cols="30" rows="10" defaultValue={cookie.load('address')} ></textarea></li>
    <li className="default">设为默认地址
        <div className="address-dbox">
          <label htmlFor="isDefault" onClick={this._onClick.bind(this)}>
          <input name="isDefault" type="checkbox" id="isDefault" value="1" ref="isdefault" defaultChecked={this.state.isChecked}  />
          <div className="default-btn">
            <i></i>
          </div>
          </label>
      </div>
    </li>
  </ul>

  <div className="address-add">
    <Link href="javascript:;" onClick={this.modifyClick.bind(this)}>修改</Link>
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
    items: modifyAddress
  } = postsByApi["modifyAddress"] || {
    items: {}
  }
  return {
    addressList,
    modifyAddress,
    isFetching
  }
}

export default connect(mapStateToProps)(addressList);

