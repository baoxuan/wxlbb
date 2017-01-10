import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchTicket,reset } from '../actions';
import { Link } from 'react-router'
class map extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'index';
        this.id = props.id || 'allmap';
    }
    componentWillMount() {
       document.title = "本地服务"
    }
    componentDidMount() {
      const header= {"X-Client-ID":'123456'}
      const params = {"url":location.href.split('#')[0]}
      this.props.dispatch(fetchTicket("getjsapiticket", header, params));

    }
    componentWillReceiveProps(nextProps) {
      var that = this;

      if(nextProps.apiticket && nextProps.apiticket.errorCode == 0){
          const { data } = nextProps.apiticket;
          window.wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamps, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature,// 必填，签名，见附录1
              jsApiList: ['checkJsApi',
                  'openLocation',
                  'getLocation'] // 必填，需要使用的JS接口列表，
          });
          window.wx.ready(function(){

            window.wx.getLocation({
              type:'wgs84',
              success: function (res) {
                  var latitude = res.latitude || 120, // 纬度，浮点数，范围为90 ~ -90
                      longitude = res.longitude || 31; // 经度，浮点数，范围为180 ~ -180。
                  that._map = new BMap.Map("allmap");
                  that._map.centerAndZoom(new BMap.Point(longitude,latitude), 11);//(经度，纬度)
                  that._local = new BMap.LocalSearch(that._map, {
                   renderOptions: { map: that._map,panel: "r-result" }
                  });
                  that._local.search("加油站");
              }
            })
          });
      }
    }

    render() {
        return(
        <div>
          <div id="allmap" style={{width:"100%", height:300}}></div>
          <div id="r-result"></div>
         </div>
        );
    }

    search(event) {
      this._local.search(event.target.value);
    }
}

map.proTypes = {

  id: React.PropTypes.string,

  onSelect: React.PropTypes.func
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: apiticket
  } = postsByApi["getjsapiticket"] || {
    isFetching: false,
    items: {}
  }
  return {
    apiticket,
    isFetching
  }
}


export default connect(mapStateToProps)(map);