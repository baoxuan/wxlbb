function getOA(url,data,header,success,error,beforeSend){ 
    $.ajax({
        type:"get",
        url:"https://api.hzyisu.com/"+url,
        cache:false,
        data:data,
        headers:header,
        dataType:"json",
        beforeSend:beforeSend,
        success:success,
        error:error,
    });
}

function postOA(url,data,header,success,error,beforeSend){
    $.ajax({
        type:"post",
        url:"https://api.hzyisu.com/"+url,
        cache:false,
        data:data,
        headers:header,
        beforeSend:beforeSend,
        success:success,
        error:error,
    });
}


function GetURLParams(){
    var params = window.location.search.substr(1).split("&");
    var aGets = [];
    if(params.length >0){
        for(var i=0;i<params.length;i++){
            var temp = params[i].split("=");
            aGets[temp[0]] = temp[1];
        }
    }
    return aGets;
}


module.exports={
    getOA:getOA, //ajax get·
    postOA:postOA, //ajax post·
	GetURLParams:GetURLParams
}


