window.$ = window.jQuery = require("jquery");
require("./rem");
require('../../css/reset2016.css', 'css|style');
require('../../css/public2016.css', 'css|style');
require('../../css/yiyuan.css', 'css|style');

var API = require("../libs/ApiUtil");
var Cookies = require("js-cookie");
var pingpp = require('pingpp-js');

var GET = API.GetURLParams();

var barcode = GET["barcode"];
var goodsName = decodeURI(GET["goodsName"]);
var joinNum = GET["joinNum"];
var periodsNum = GET["periodsNum"];
var price = GET["price"];



$("#list").html("<li> 商品名称 <i>"+goodsName +"</i></li><li> 总需支付 <i>"+ joinNum * price +"开心豆</i></li>")
$("#money").html(joinNum * price + ".00元");

var params = {
	periodsNum:periodsNum,
	joinNum:joinNum,
	barcode:barcode
}
    var params = new Object();
    params.periodsNum = periodsNum;
    params.joinNum = joinNum;
    params.barcode = barcode;

var data = JSON.stringify(params);
var header={
	   	"Content-Type": "application/json; charset=UTF-8",
        'X-Client-Agent':"weixin",
        'X-APIVersion':"2.0",
        'X-Client-ID':'123456',
        'X-Long-Token':Cookies.get("token"),
        };


API.postOA("order/CreateOrder",data,header,function(res){
       if(res.errorCode == 0){
       		$("#orderId").val(res.data.orderId);
       }
     })



$("#btn").click(function(){
	window.location.href= "http://weixin.hzyisu.com/download.html";
})

$(".pop_bg").click(function(){
      $(".pop_bg").hide();
})

$(".blueBtn").click(function(){
  // if(Cookies.get("userName") == "FÎvε"){
	   	var params = new Object();
			params.orderId = $("#orderId").val();
			params.paymentChannel = 3;
		var data = JSON.stringify(params);

		API.postOA("order/getPaymentData",data,header,function(res){
		       if(res.errorCode == 0){
        			var charge = res.data.chargeObj;
			          pingpp.createPayment(charge, function(result, err){
			            if (result == "success") {
						window.location.href= "http://weixin.hzyisu.com/#/result?goodsName="+goodsName+"&joinNum="+joinNum+"&periodsNum="+periodsNum+"&orderId="+$("#orderId").val();

			              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
			            } else if (result == "fail") {
			              // alert("fail");
			              // charge 不正确或者微信公众账号支付失败时会在此处返回
			            } else if (result == "cancel") {
			              // 微信公众账号支付取消支付
			              // alert("cancel");
			            }
			      })
		       }
		     })
 // }else{
 //   $(".pop_bg").show();
 // }


})