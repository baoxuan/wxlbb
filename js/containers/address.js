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
        const query= this.props.location.query;
        let qToken,qName;
        if(query.token){
            qToken = query.token,
            qName = query.userName;
            cookie.save("token",query.token);
            cookie.save("userName",query.userName);
        }else{
            qToken = cookie.load("token"),
            qName = cookie.load("userName");
        }
        const header= { "X-Client-ID":'123456',"X-Long-Token":qToken}
        this.props.dispatch(fetchPosts("queryAddressInfo",header));
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.addressList.errorCode === 0){
            this.setState({
                loading:false
            })
        }
        if(nextProps.delAddress.errorCode ===0){
            this.props.dispatch(reset("delAddress"));
            const header= { "X-Client-ID":'123456',"X-Long-Token":'469213d3d2154175a5bbc49945f2843e'}
            this.props.dispatch(fetchPosts("queryAddressInfo",header));
        }
        if(nextProps.modifyAddress.errorCode ===0){
            this.props.dispatch(reset("modifyAddress"));
            const header= { "X-Client-ID":'123456',"X-Long-Token":'469213d3d2154175a5bbc49945f2843e'}
            this.props.dispatch(fetchPosts("queryAddressInfo",header));
        }
    }
    
    defaultClick(item,event){
        //删除地址
        const header= { "X-Client-ID":'123456',"X-Long-Token":'469213d3d2154175a5bbc49945f2843e'}
        const params = {"recordId":item.recordId,"consigneeName":item.consigneeName,"consigneePhone":item.consigneePhone,"province":item.province,"city":item.city,"area":item.area,"address":item.address,"isDefault":1}
        this.props.dispatch(fetchPosts("modifyAddress",header,params));
        event.preventDefault();
        event.stopPropagation();
    }
    delClick(recordId,event){
        //删除地址
        const header= { "X-Client-ID":'123456',"X-Long-Token":'469213d3d2154175a5bbc49945f2843e'}
        const params = {"recordId":recordId}
        this.props.dispatch(fetchPosts("delAddress",header,params));
        event.preventDefault();
        event.stopPropagation();
    }
    modifyClick(item,event){
        cookie.save('consigneeName', item.consigneeName, { path: '/' });
        cookie.save('consigneePhone', item.consigneePhone, { path: '/' });
        cookie.save('province', item.province, { path: '/' });
        cookie.save('city', item.city, { path: '/' });
        cookie.save('area', item.area, { path: '/' });
        cookie.save('address', item.address, { path: '/' });
        cookie.save('isDefault', item.isDefault, { path: '/' });
        cookie.save('recordId', item.recordId, { path: '/' });
        this.context.router.push("/addressModify?recordId="+item.recordId);
        //修改地址
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
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
                  <button onClick={this.modifyClick.bind(this, item)} className="address-modify">编辑</button>
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

