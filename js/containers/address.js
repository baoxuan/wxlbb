import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link , hashHistory } from 'react-router';
import cookie from 'react-cookie';

class addressList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }
    componentWillMount() {
        document.title="收货地址";
        this.props.dispatch(reset("delAddress"));
        this.props.dispatch(reset("modifyAddress"));
    }
    componentDidMount() {
        const header= { "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
        this.props.dispatch(fetchPosts("queryAddressInfo",header));
        console.log("componentDidMount");
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.addressList.errorCode === 0){
            this.setState({
                loading:false
            })
        }
        if(nextProps.delAddress.errorCode ===0){
            this.props.dispatch(reset("delAddress"));
            const header= { "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
            this.props.dispatch(fetchPosts("queryAddressInfo",header));
        }
        if(nextProps.modifyAddress.errorCode ===0){
            this.props.dispatch(reset("modifyAddress"));
            const header= { "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
            this.props.dispatch(fetchPosts("queryAddressInfo",header));
        }
    }

    defaultClick(item){
        //删除地址
        const header= { "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
        const params = {"recordId":item.recordId,"consigneeName":item.consigneeName,"consigneePhone":item.consigneePhone,"province":item.province,"city":item.city,"area":item.area,"address":item.address,"isDefault":1}
        this.props.dispatch(fetchPosts("modifyAddress",header,params));
    }
    delClick(recordId,event){
        //删除地址
        const header= { "X-Client-ID":'123456',"X-Long-Token":'88eeab5ee8b94a8ab8ff552e94967ba7'}
        const params = {"recordId":recordId}
        this.props.dispatch(fetchPosts("delAddress",header,params));
        event.preventDefault();
        event.stopPropagation();
    }
    modifyClick(recordId,consigneeName,consigneePhone,province,city,area,address,isdefault,event){
        cookie.save('consigneeName', consigneeName, { path: '/' });
        cookie.save('consigneePhone', consigneePhone, { path: '/' });
        cookie.save('province', province, { path: '/' });
        cookie.save('city', city, { path: '/' });
        cookie.save('area', area, { path: '/' });
        cookie.save('address', address, { path: '/' });
        cookie.save('isDefault', isdefault, { path: '/' });
        cookie.save('recordId', recordId, { path: '/' });
        this.context.router.push("/addressModify?recordId="+recordId);
        //修改地址
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        if(this.state.loading){
            return(<div className="loading">loading</div>)
        }else{
            const {addressList,delAddress,modifyAddress} = this.props;
            return(
        	<div >
            {addressList.data.map((item)=>(
                <div key={item.recordId} className="address-box"> 
                <div className="address-info">
                  <div className="address-name">{item.consigneeName}</div>
                  <div className="address-tel">{item.consigneePhone}
                    <i>{item.province}{item.city}{item.area}{item.address}</i>
                  </div>
                </div>
                <div className="address-action">
                  <div onClick={this.defaultClick.bind(this, item)} className={item.isDefault==1 ? "address-default curr" : "address-default"}><i></i> 默认地址</div>
                  <button onClick={this.modifyClick.bind(this, item.recordId,item.consigneeName,item.consigneePhone,item.province,item.city,item.area,item.address,item.isDefault)} className="address-modify">编辑</button>
                  <button onClick={this.delClick.bind(this,item.recordId)} className="address-del">删除</button>
                </div>
              </div>
            ))}
            <div className="address-add">
                <Link to={'addressAdd'}>添加新地址</Link>
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
    items: delAddress
  } = postsByApi["delAddress"] || {
    items: {}
  }
  const {
    items: modifyAddress
  } = postsByApi["modifyAddress"] || {
    items: {}
  }
  return {
    addressList,
    delAddress,
    modifyAddress,
    isFetching
  }
}
export default connect(mapStateToProps)(addressList);

