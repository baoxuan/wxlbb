import React, {Component, PropTypes}from 'react';

import classnames from 'classnames'
class download extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isShow:false
      };
    }

    componentWillMount() {
        document.title = "下载页";
    }
    render() {
    	return(
            <div>
                <div className={classnames(
                    "pop_bg",
                    {"show":this.state.isShow})
                } onClick={ ()=>this._hide()}>
                    <div className="showToop"></div>
                </div>

    		<div style={{height:window.innerHeight,background: "#3f4041"}}>
			<div className="download-box">
				<div className="pic"><img src={require(`../../public/images/download01.png`)} /></div>
				<div className="logo"><img src={require(`../../public/images/download02.png`)} /></div>
				<div className="text">
					<p>路伯伯</p>
					<i>一路有我，与你相伴</i>
				</div>
				<div className="btn" onClick={()=>this._load()}>立即下载</div>
			</div>
			</div>
        </div>
    		)


    }
_load(){
    alert(window.location.href);
    var ua = navigator.userAgent
       if (ua.toLowerCase().match(/MicroMessenger/i) == "micromessenger" && ua.indexOf('Android') > -1) {
            this.setState({isShow:true})
       }else{
           if( ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1){
                window.location.href = "http://img.hzyisu.com/android/lubobo.apk";
            } //android终端或者uc浏览器
            else if( !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                 window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yisu.expressway";
            }
    }
}

    _hide(){
        this.setState({isShow:false})
    }
}

export default download;

