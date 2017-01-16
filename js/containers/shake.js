import React, {Component, PropTypes}from 'react';

import classnames from 'classnames';
import Events from '../utils/Events';
import { lottery } from '../utils';

const Data = [
    "139****7682  抽中168元理财红包",
    "150****6211  抽中一元抢iPhone的机会",
    "139****7682  抽中一元抢加油卡的机会",
    "139****7682  抽中一元抢IPad Air的机会",
    "139****7682  抽中一元抢乐视TV的机会",
    "139****7682  抽中一元抢小米平衡车的机会",
]

class download extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isShow:false,
        left:0,
        x:0,
        y:0,
        z:0,
        lastX:0,
        lastY:0,
        lastZ:0,
        speed:25
      };
    }

    componentWillMount() {
        console.log("componentWillMount");
        document.title = "摇一摇";
    }
    componentDidMount() {
        const warp = this.refs.warp,
                scrollWidth = warp.scrollWidth, //外框宽度
                offsetWidth = warp.offsetWidth;//内部元素宽度

        this.TimeId = setInterval(()=>{
            if(warp.scrollLeft ==Math.floor(scrollWidth/2)){
                warp.scrollLeft -= Math.floor(scrollWidth/2);
            }
             warp.scrollLeft ++;

        },30);
        if(window.DeviceMotionEvent){
            this._devicemotion = Events.on(window, 'devicemotion', this._shake.bind(this),false)
        }else{
            alert('你的手机不支持摇一摇！');
        }
    }
    componentWillUnmount() {
        this._devicemotion && this._devicemotion.off();
    }
    _shake(event){
        // var num = lottery();
        let acceleration = event.accelerationIncludingGravity;
        this.setState({
            x:acceleration.x,
            y:acceleration.y
        })
        // console.log(acceleration);
        if(Math.abs(this.state.x-this.state.lastX) > this.state.speed || Math.abs(this.state.y-this.state.lastY) > this.state.speed ){
            if (navigator.vibrate) {
                navigator.vibrate(1000); //震动1000毫秒
            } else if (navigator.webkitVibrate) {
                navigator.webkitVibrate(1000);
            }
            setTimeout(function() {
                                 alert('摇了');
                    this.setState({
                        isShow:true
                    })

                }, 1000);
        }

        this.setState({
            lastX:this.state.x,
            lastY:this.state.y
        })

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
                <div > x:{this.state.x} <br/> y:{this.state.y}</div>
                <div > lastX:{this.state.lastX} <br/> lastY:{this.state.lastY}</div>
            <div className="shake-box">
                <div className="marquee" ref="warp"  >
                    <ul ref="marquee1" >
                        <li>列表1列表1列表1列表1列表1列表1</li>
                        <li>列表2列表2列表2列表2列表2列表2</li>
                        <li>3列表3列表3列表3列表3列表3列表3</li>
                        <li>列表4列表4列表4列表4列表4列表4</li>
                        <li>列表5列表5列表5列表5列表5列表5</li>
                    </ul>
                    <ul ref="marquee1" >
                        <li>列表1列表1列表1列表1列表1列表1</li>
                        <li>列表2列表2列表2列表2列表2列表2</li>
                        <li>3列表3列表3列表3列表3列表3列表3</li>
                        <li>列表4列表4列表4列表4列表4列表4</li>
                        <li>列表5列表5列表5列表5列表5列表5</li>
                    </ul>
                 </div>

                <div className="content">
                    <h3>互动规则</h3>
                    <p>一、抽奖活动时间</p>
                    <p>2017年1月15日-1月25日期间</p>
                    <p>二、参与方式</p>
                    <p>1.关注路伯伯微信公众号，即可参与抽奖</p>
                    <p>2.每天每个用户最多抽奖3次</p>
                    <p>3.一元夺宝的商品中奖和发送规则根据路伯伯一元夺宝具体规则发放</p>
                    <p>4.如放弃领取，视为放弃中奖结果</p>
                </div>
            </div>
        </div>
    		)


    }

_load(){

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

