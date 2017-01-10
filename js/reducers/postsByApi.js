import * as TYPES from '../constants';


function posts(state = {
  //是否正在获取最新
  isFetching: false,
  //内容
  items: {}
}, action) {
  switch (action.type) {
    case TYPES.REQUEST_POSTS:
    case TYPES.REQUEST_BEGIN:
      return Object.assign({}, state, {
        isFetching: true
      })
    case TYPES.RECEIVE_DONE:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    case TYPES.SHOW_ERROR:
    case TYPES.REQUEST_FORM:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    case TYPES.RECEIVE_FORM:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        // code:action.header.code
      })
    case TYPES.RESET:
      return Object.assign({}, state, {
        isFetching: false,
        items:{}
      })
    default:
      return state
  }
}
//废弃、接收到、开始接受新闻后，将state.postsByReddit设为相关参数
export default function postsByApi(state = {}, action) {
  switch (action.type) {
    case TYPES.REQUEST_BEGIN:
    case TYPES.RECEIVE_DONE:
    case TYPES.REQUEST_POSTS:
    case TYPES.SHOW_ERROR:
    case TYPES.REQUEST_FORM:
    case TYPES.RECEIVE_FORM:
    case TYPES.RESET:
      return Object.assign({}, state, {
        [action.ApiName]: posts(state[action.ApiName], action)
      })
    default:
      return state
  }
}