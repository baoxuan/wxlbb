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
        const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
        this.props.dispatch(fetchPosts("queryAddressInfo",header));

    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.addressList.errorCode === 0){
        this.setState({
            loading:false,
            isChecked:(cookie.load('isDefault')==1)?true:false
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
        const header= { "X-Client-Agent":"weixin", "X-APIVersion":"2.0", "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
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
    render() {

        if(this.state.loading){
            return(<div className="loading">loading</div>)
        }else{
            const {addressList,modifyAddress} = this.props;
            return(
          <div >


  <ul className="address-list">
  <input type="hidden" name="recordId" ref="recordId" value={cookie.load('recordId')} />
  <input type="hidden" name="province" ref="province" value={cookie.load('province')} />
  <input type="hidden" name="city" ref="city" value={cookie.load('city')} />
  <input type="hidden" name="area" ref="area" value={cookie.load('area')} />
    <li>收货人 <input type="text" name="consigneeName" ref="consigneeName" defaultValue={cookie.load('consigneeName')} /></li>
    <li>手机号码 <input type="text" maxLength="11" name="consigneePhone" ref="consigneePhone" defaultValue={cookie.load('consigneePhone')} /></li>
    <li className="array" onClick={this.selectArea}>所在地区 <span>{cookie.load('province')}{cookie.load('city')}{cookie.load('area')}</span> <i></i> </li>
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

