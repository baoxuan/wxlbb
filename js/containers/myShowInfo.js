import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link , hashHistory } from 'react-router';
import cookie from 'react-cookie';
import Events from '../utils/Events';
import isEqual from 'lodash/isEqual'

class myShowInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            pageindex:1,
            isLoading:true,
            listItems:[]
        }
    }
    componentWillMount() {
        document.title="晒单记录";
    }
    componentDidMount() {
        const header= { "X-Client-ID":'123456',"X-Long-Token":cookie.load("token")}
        const params = {"pageindex":1,"pagesize":4}
        this.props.dispatch(fetchPosts("myShowInfo",header,params));
        this._scrollListener = Events.on(window, 'scroll', this.checkButtom.bind(this))
    }
    componentWillUnmount() {
        this._scrollListener && this._scrollListener.off();
    }
    addList(lists){
        //console.log(lists);
      this.setState({isLoading:lists.length == 4 ? true:false});
        if(this.state.pageindex == 1){
            this.setState({listItems:lists});
        }else{
         this.setState({listItems:this.state.listItems.concat(lists)});
         
        }
    }
    checkButtom(){
        const header= {"X-Client-ID":"123456","X-Long-Token":cookie.load("token")}
        let scrollTop = document.body.scrollTop,
            innerHeight = window.innerHeight,
            scrollHeight = document.body.scrollHeight,
            pageindex = this.state.pageindex

            if(scrollTop + innerHeight >= scrollHeight && this.state.isLoading ){
                pageindex++;
                this.setState({pageindex:pageindex});
                this.props.dispatch(fetchPosts("myShowInfo", header,
                    {
                      pageindex:pageindex,
                      pagesize:4
                    })
                )
            }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.myShowInfo.errorCode === 0){
            this.setState({
                loading:false
            })
        }
        if(nextProps.myShowInfo.errorCode == 0 && !isEqual(nextProps.myShowInfo, this.props.myShowInfo)  ){
          this.addList(nextProps.myShowInfo.data);
        }
    }

    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
        }else{
            const {myShowInfo} = this.props;
            return(
        	<div >

            <div className="mytreasure-bar">
                <Link to="myOrderListAll">抢宝记录</Link>
                <Link to="myOrderList">抢中记录</Link>
                <Link to="myShowInfo" className="curr">晒单记录</Link>
            </div>

            <div className="top-kong"></div>

            {this.state.listItems.map((item)=>{
                const goodsPics = item.goodsPic.split(","),
                evaluatePic = item.evaluatePic.split(",")
                return(

                <Link to={{pathname:'myShowDetail',query:{recordid:item.recordId}}}  className="mysun-list" key={item.createTime}>
                <div className="mysun-title">
                    <div className="pic"><img src={goodsPics[0]} alt="" /></div>
                    <div className="content">{item.goodsName}</div>
                </div>
                <div className="mysun-info">{item.evaluateContent||"晒单没有任何评语"}</div>
                <div className="mysun-pic">
                    {(() => {
                        var pics = [];
                        for (var i=0; i < evaluatePic.length; i++) {
                            pics.push(<img src={evaluatePic[i]} key={evaluatePic[i]} />);
                        }
                        return pics;
                    })()}
                </div>
                <div className="mysun-time">{item.createTime}</div>
            </Link>
            )
            })}

             </div>
        	)
        }
    }
}

myShowInfo.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}
myShowInfo.contextTypes = {
    router:React.PropTypes.object
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: myShowInfo
  } = postsByApi["myShowInfo"] || {
    isFetching: false,
    items: {}
  }
  return {
    myShowInfo,
    isFetching
  }
}
export default connect(mapStateToProps)(myShowInfo);

