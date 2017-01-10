import React, {Component, PropTypes}from 'react';
import Dropzone from 'react-dropzone'
import ReactDOM from 'react-dom';
class comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            check:false
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
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
    }


    onDrop(acceptedFiles) {
      this.setState({
        files:this.state.files.concat(acceptedFiles)
      });
    }

    onOpenClick() {
      this.dropzone.open();
    }
    _onClick(){
        this.setState({
           check:true
           })
    }


    render() {

     return (
        <div>
           <div className="commnetConatiner">
                <div className="header">
                    <img src={require(`../../public/images/treasure01.jpg`)}/>
                </div>
                <div className="Msg">
                    <h3>iphone7</h3>
                    <p>期号：1234566</p>
                </div>
           </div>
           <textarea className="textarea" onChange = {this.handleChange} placeholder = "写下您的购买体会和使用感受来帮助其他小伙伴吧~"></textarea>
                <Dropzone style={{display:"none"}}  ref={(node) => { this.dropzone = node; }} 
                onDrop={this.onDrop.bind(this)}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <div className="picList">
                {this.state.files.length > 0 ?
                <div className="pics">{this.state.files.map((file) => {
                console.log(file);
                 return <img key={file.lastModified} src={file.preview} />} )}</div>
                 : null}
                <button className="addPic" type="button" onClick={this.onOpenClick.bind(this)}>
                </button>
                </div>
                <div className="BtnBox bgf">
                    <button className="blueBtn">立即参与</button>
                </div>
                <label htmlFor="check" onClick={this._onClick.bind(this)}>
                    <input type="checkBox" id="check"  defaultChecked={this.state.check}/>
                    <div className="checkBox"><i></i>匿名评价</div>
                </label>
            </div>
      );

    }


}

comment.proTypes = {

}

export default comment;
