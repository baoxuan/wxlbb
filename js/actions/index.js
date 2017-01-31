import fetch from 'isomorphic-fetch';
import {requestGet,requestTicket, requestPost,requestGetParams,requestPostByForm} from "../utils/Api";
import {getRandomCode} from "../utils";
import merge from 'lodash/merge'

import * as TYPES from '../constants';


//获取，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
export function fetchPosts(ApiName, header, param) {
  let headers = merge({"Content-Type":"application/json","X-Client-Agent":"weixin", "X-APIVersion":"2.0"}, header);
  let params = param || "";
  return requestPost(ApiName,headers,params);
}


export function fetchTicket(ApiName, header, param) {
  let headers = merge({"Content-Type":"application/json","X-Client-Agent":"weixin", "X-APIVersion":"2.0"}, header);
  let params = param || "";
  return requestTicket(ApiName,headers,params);
}




export function fetchGET(ApiName, params) {
  var header = {"Content-Type":"application/json", "code":params.code, "token":params.token};
  return requestGet(ApiName,header);
}

export function fetchGETParams(ApiName, params) {
  var header = {"Content-Type":"application/json"};
  return requestGet(ApiName, header, params);
}



//导出提交表单的方法
export function _submitForm(ApiName, params) {
  var header = {"Content-Type":"application/json", "code":getRandomCode()};
    return dispatch => {
      dispatch(fetchPostsByForm(ApiName, header, params));
  };
}

export function fetchPostsByForm(ApiName, header, params) {
  // 使用fetch。部分浏览器不兼容，改用reqwest。
  return requestPostByForm(ApiName, header, params);
}

//导出前端检测的方法
export function show_error(ApiName, params) {
  return {
    type: TYPES.SHOW_ERROR,
    ApiName: ApiName,
    posts:params
  };
}

export function reset(ApiName) {
  return {
    type: TYPES.RESET,
    ApiName
  };
}




//这些方法都导出,在其他文件导入时候,使用import * as actions 就可以生成一个actions对象包含所有的export
//
// 切换交易记录type
export function changeType(value){
  return{
    type:TYPES.CHANGE_TYPE,
    value
  }
}
export function selectPaytypelog(name, value){
  return{
    type:TYPES.SELECT_PAY_TYPE_LOG,
    name,
    value
  }
}
export function selectPaytype(name, value){
  return{
    type:TYPES.SELECT_PAY_TYPE,
    name,
    value
  }
}


//  保存数据
export function saveDate(value){
  return{
    type:TYPES.SAVE_DATE,
    value
  }
}
//  保存数据
export function getDate(){
  return{
    type:TYPES.GET_DATE,
  }
}







