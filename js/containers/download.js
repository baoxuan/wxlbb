import React, {Component, PropTypes}from 'react';


class download extends React.Component {
    render() {
    	return(
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
    		)


    }
_load(){

        var browser = {
            versions: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return { //移动终端浏览器版本信息
                    aa: u.indexOf('QQ') > -1,
                    bb: u.indexOf('qq') > -1,
                    cc: u.indexOf('MicroMessenger') > -1,
                    dd: u.indexOf('MQQBrowser') > -1,
                    ee: u.indexOf('Weibo') > -1,
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    iPhone: u.indexOf('iPhone') > -1,
                    iPad: u.indexOf('iPad') > -1,
                    iPod: u.indexOf('iPod') > -1,
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
            if (browser.versions.iPhone || browser.versions.iPad || browser.versions.iPod) {
            	window.location.href = "https://itunes.apple.com/cn/app/pp-ji-jin-zhuan-qian-shen/id982416928?mt=8";
            } else {
                window.location.href = "https:www.ppjijin.com/android/PP20.apk";
            }
}
}



export default download;

