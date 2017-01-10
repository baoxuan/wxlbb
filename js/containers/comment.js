import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import ReactDOM from 'react-dom';
import Toast from '../components/Toast'
import { fetchPosts, fetchTicket,reset } from '../actions';
import Notifications, {notify} from 'react-notify-toast';
class comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],// 本地预览
            check:false,// 展示是否匿名
            serverId:"",// 上传到服务端的Media_id
            isShow:false,//控制toast 展示
            text:"",     //内容
        }
    }
    componentWillMount() {
       document.title = "评论"
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
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamps, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature,// 必填，签名，见附录1
              jsApiList: ['checkJsApi',
                  'chooseImage',
                  'previewImage',
                  'uploadImage',
                  'getLocation'] // 必填，需要使用的JS接口列表，
          });
          window.wx.ready(function(){
          });
      }
    if(nextProps.orderShow.errorCode ===0){
            this.context.router.push("/myOrderList");
        }
    }



    onOpenClick() {
      var that = this;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                that.setState({
                  files:that.state.files.concat(localIds)
                });
               wx.uploadImage({
                  localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                      var serverId = res.serverId; // 返回图片的服务器端ID
                      this.setState({
                        serverId:serverId.join(",")
                      })
                  }
               })
          }
      });
    }

_change(e){
  // 选择是否匿名
  this.setState({
    check:!this.state.check
  })
}
submit(){
  // 提交信息
  const { item } =  this.props.location.state;
  const header= {"X-Client-ID":"123456","X-Long-Token":cookie.load("token")}
  let myColor = { background: 'rgba(0,0,0,.5)', text: "#FFFFFF"};
  let params =  {
      evaluateContent:ReactDOM.findDOMNode(this.refs.text).value,
      evaluatePic:this.state.serverId,
      isAnonymous:this.state.check?1:0,
      orderId:item.orderId,
      barcode:item.barcode,
  }
      console.log(params)
  if(params.evaluatePic == ""){
    notify.show("晒单图片不能为空！", "custom", 1500, myColor);
  }else if(params.evaluateContent == ""){
    notify.show("评论内容不能为空！", "custom", 1500, myColor);
  }else{
    this.props.dispatch
  }

}

    render() {
    const { item } =  this.props.location.state;
     const imgUrl =  item.goodsPic && item.goodsPic.split(",")[0];
     return (
        <div>
        <Notifications />
           <div className="commnetConatiner">
                <div className="header">
                    <img src={imgUrl}/>
                </div>
                <div className="Msg">
                    <h3>{item.goodsName}</h3>
                    <p>期号：{item.goodsNo}</p>
                </div>
           </div>
           <textarea className="textarea" ref="text" placeholder = "写下您的购买体会和使用感受来帮助其他小伙伴吧~"></textarea>
                <div className="picList">
                {this.state.files.length > 0 ?
                <div className="pics">{this.state.files.map((file) => {
                 return <img key={file} src={file} />} )}</div>
                 : null}
                <button className="addPic" type="button" onClick={this.onOpenClick.bind(this)}>
                </button>
                </div>
                <div className="BtnBox bgf">
                    <button className="blueBtn" onClick={this.submit.bind(this)}>我要晒单</button>
                </div>
                <label htmlFor="check" >
                    <input type="checkBox" id="check" onChange={this._change.bind(this)} checked={this.state.check} />
                    <div className="checkBox"><i></i>匿名评价</div>
                </label>
            </div>
      );

    }


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
  const {
    items: orderShow
  } = postsByApi["orderShow"] || {
    items: {}
  }
  return {
    apiticket,
    orderShow,
    isFetching
  }
}


export default connect(mapStateToProps)(comment);
