window.$ = window.zepto = require('../libs/zepto.js');
window.$ = window.jquery = require('jquery');
require("./rem");
require('../../css/reset2016.css', 'css|style');
require('../../css/public2016.css', 'css|style');
require('../../css/yiyuan.css', 'css|style');


$(".btn").click(function(){
    var ua = navigator.userAgent
       if (ua.toLowerCase().match(/MicroMessenger/i) == "micromessenger" && ua.indexOf('Android') > -1) {
            $("#tip1").show();
       }else{
           if( ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1){
                window.location.href = "http://img.hzyisu.com/android/lubobo.apk";
            } //android终端或者uc浏览器
            else if( !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                 window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yisu.expressway";
            }
    }
})

$("#tip1").click(function(){
          $("#tip1").hide();
})

