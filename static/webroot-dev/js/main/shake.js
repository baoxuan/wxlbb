// window.$ = window.zepto = require('../libs/zepto.js');
window.$ = window.jQuery = require("jquery");
require("./rem");
require('../../css/reset2016.css', 'css|style');
require('../../css/public2016.css', 'css|style');
require('../../css/yiyuan.css', 'css|style');

var API = require("../libs/ApiUtil");



var speed=50;
var marquee1 = document.getElementById("marquee1");
var marquee2 = document.getElementById("marquee2");
var scroll_div = document.getElementById("scroll_div");

function Marquee(){
if(marquee2.offsetWidth-scroll_div.scrollLeft<=0)
	scroll_div.scrollLeft-=marquee1.offsetWidth;
	else
	scroll_div.scrollLeft++;
}

var MyMar=setInterval(Marquee,speed);



var flat = true;

//摇一摇(使用DeviceMotion事件, 推荐,应为可以计算加速度)
if(window.DeviceMotionEvent) {
    var speed = 25;    // 用来判定的加速度阈值，太大了则很难触发
    var x, y, z, lastX, lastY, lastZ;
    x = y = z = lastX = lastY = lastZ = 0;

    window.addEventListener('devicemotion', function(event){
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {

                if($("#tip1").is(":hidden") && $("#tip2").is(":hidden") && flat){
                    flat = false;
                    queryNum();

                }

        lastX = x;
        lastY = y;
    	}
    }, false);
}



// $("#btn").click(function(){
//     queryNum();

// });

wx.config({
// 配置信息
});

 wx.ready(function(){
    var audio = document.getElementById("audio");
    audio.src = "http://img.hzyisu.com/audio/shake.mp3";
    audio.load();
 })



function queryNum(){
  //播放

    $("#shake").show();
    var audio = document.getElementById("audio");
    audio.src = "http://img.hzyisu.com/audio/shake.mp3";
    audio.play();
    var GET = API.GetURLParams();
    var token = GET["token"];
    var url="activity/queryLotteryCount";
    var header={
        'X-Client-Agent':"weixin",
        'X-APIVersion':"2.0",
        'X-Client-ID':'123456',
        'X-Long-Token':token,
        };
     API.getOA(url,"",header,function(res){
        if(res.data > 0){

            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是用户设备的加速度大于我们设置的阈值

            if (navigator.vibrate) {
                navigator.vibrate(1000); //震动1000毫秒
            } else if (navigator.webkitVibrate) {
                navigator.webkitVibrate(1000);
            }

            setTimeout(function(){
                lottery();
                $("#shake").hide();
            },2000);


        }else{
            setTimeout(function(){
                $("#shake").hide();
                $("#tip2").show();
                flat = true;
            },2000);

        }
     })

}



function savePrize(prize,num){
    var GET = API.GetURLParams();
    var token = GET["token"];
    var url="activity/savePrizeRecord";
    var params = new Object();
    params.productName = prize;
    var data = JSON.stringify(params);
    var header={
        'content-type': 'application/json; charset=UTF-8',
        'X-Client-Agent':"weixin",
        'X-APIVersion':"2.0",
        'X-Client-ID':'123456',
        'X-Long-Token':token,
        };

     API.postOA(url,data,header,function(res){
       if(res.errorCode == 0){
            $("#prize_box").removeClass().addClass("prize_box"+num);

             if(num == 1){
                $(".btn").attr("href","https://www.tronker.com/center/register?service=https%3A%2F%2Fwww.tronker.com%2Fwork%2Ffinancing%2Findex.html%3F_u_%3D1%26invitation%3D149204%26name%3D%25E6%259D%258E%25E6%2598%2586%25E9%25BE%2599%26channel%3Djf");
             }else{
                $(".btn").attr("href","http://weixin.hzyisu.com/download.html");
             }

           $("#tip1").show();
           flat = true;
       }
     })

}
$(".pop_bg").click(function(){
        $(".pop_bg").hide();
})

function lottery(){
    // 1 15% 新人理财， 2 17%用户iphone 3 17% ipad Air 4  17% 小米平衡车 5  64寸乐视TV 6 17%石油卡
    var Number = parseInt(Math.random()*100);
    if(Number >=0 && Number < 15){
        savePrize("新人理财",1);
    }else if(Number >=15 && Number < 32){
        savePrize("iphone抽奖机会",2);
    }else if(Number >=32 && Number < 49){
        savePrize("ipad air抽奖机会",3);
    }else if(Number >=49 && Number < 66){
        savePrize("小米平衡车抽奖奖机会",4);
    }else if(Number >=66 && Number < 83){
        savePrize("64寸乐视TV抽奖机会",5);
    }else{
        savePrize("石油卡抽奖机会",6);
    }
}