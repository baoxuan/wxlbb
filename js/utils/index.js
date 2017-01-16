
// 获取随机数
export function getRandomCode(){
   var result = [];
    for(var i=0;i<20;i++){
      var t = Math.floor(Math.random()*10);
      result+=t;
    }
    return result;
}


export function FormatMoney(s) {
      var s = (s!== void 0 && s!== null) && s.toString();
        if (/[^0-9\.]/.test(s)){ 
          return "";
        }
        s = s.replace(/^(\d*)$/, "$1.");//对一个匹配的数字后面加.
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s)){
                s = s.replace(re, "$1,$2");
              }
        s = s.replace(/,(\d\d)$/, ".$1");
        return  s.replace(/^\./, "0.");

}
 export function get2Decimals(decimal){
    var decimal = (Math.floor(decimal*10000)/100).toString();
    var index = decimal.indexOf(".");
    if(index < 0){
      decimal += ".00";
    };
    while(decimal.length <= index+2){
      decimal +="0";
    };
    return decimal;
  }//取两位小数
 export function getPrecent(decimal1, decimal2){
    //decimal1:剩余 decimal2：总量
    var decimal = (decimal1 == decimal2)?"0%" : Math.floor((decimal2-decimal1)/decimal2*100)+"%";
    return decimal;
  }//取两位小数
 export function getTime(t){
       t = t &&  t.substring(0, 10)+ " "+ t.substring(11, 16);
        return t;
    }
 export function getTime1(t){
       t = t &&  t.substring(0, 10);
        return t;
    }

export function GetURLParams(param){
    //获取url参数
    var params = param.search.substr(1).split("&");
    var aGets = [];
    if(params.length >0){
        for(var i=0;i<params.length;i++){
            var temp = params[i].split("=");
            aGets[temp[0]] = temp[1];
        }
    }
    return aGets;
}

export function lottery(){
    // 15% 新人理财，17%用户iphone 17% ipad Air 17% 小米平衡车 64寸乐视TV 17%石油卡
    let Number = Math.floor( Math.random()* 100);
    if(Number >=0 && Number < 15){
        return 1;
    }else if(Number >=15 && Number < 32){
        return 2;
    }else if(Number >=32 && Number < 49){
        return 3;
    }else if(Number >=49 && Number < 66){
        return 4;
    }else if(Number >=66 && Number < 83){
        return 5;
    }else{
        return 6;
    }
}



export function h5ToApp(mobileOS, ApiName, Msg){
    const OS = mobileOS.toLowerCase();
        if(mobileOS == "ios"){
            if(ApiName == 'nativeShare'){
                nativeShare(Msg);
            }else if(ApiName == "nativeUpdateToken"){
                nativeUpdateToken(Msg);
            }else if(ApiName == "nativeJumpPage"){
                nativeJumpPage(Msg);
            }else if(ApiName == "nativeJump"){
                nativeJump(Msg);
            }
            else{
                alert(ApiName +"is error");
            }
        }else if(mobileOS == "android"){
            if(ApiName == 'nativeShare'){
                window.ppNative.nativeShare(Msg);
            }else if(ApiName == "nativeUpdateToken"){
                window.ppNative.nativeUpdateToken(Msg);
            }else if(ApiName == "nativeJumpPage"){
                window.ppNative.nativeJumpPage(Msg);
            }else if(ApiName == "nativeJump"){
                window.ppNative.nativeJump(Msg);
            }else{
                alert(ApiName +"is error");
            }
        }else{
            alert("mobileOS is error");
        }

    }
