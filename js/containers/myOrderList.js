import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link , hashHistory } from 'react-router';
import cookie from 'react-cookie';
import Events from '../utils/Events';
import isEqual from 'lodash/isEqual'

class myOrderList extends React.Component {
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
        document.title="抢宝记录";
    }
    componentDidMount() {
        const header= { "X-Client-ID":'123456',"X-Long-Token":cookie.load("token")}
        const params = {"grabStatus":2,"pageindex":1,"pagesize":4}
        this.props.dispatch(fetchPosts("myOrderList",header,params));
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
                this.props.dispatch(fetchPosts("myOrderList", header,
                    {
                      pageindex:pageindex,
                      pagesize:4
                    })
                )
            }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.myOrderList.errorCode === 0){
            this.setState({
                loading:false
            })
        }
        if(nextProps.myOrderList.errorCode == 0 && !isEqual(nextProps.myOrderList, this.props.myOrderList)  ){
          this.addList(nextProps.myOrderList.data);
      }
    }

    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
        }else{
            const {myOrderList} = this.props;
            return(
        	<div >

            <div className="mytreasure-bar">
                <Link to="myOrderListAll">抢宝记录</Link>
                <Link to="myOrderList" className="curr">抢中记录</Link>
                <Link to="myShowInfo">晒单记录</Link>
            </div>

            <div className="top-kong"></div>

            {this.state.listItems.map((item)=>{
                const imgUrl = item.goodsPic ? item.goodsPic.split(",")[0]:item.goodsPic,
                      status =  "已抢中"


                return(
                <div  className="mytreasure-list" key={item.orderId}>
                    <Link to={'myOrderDetail'} query={{orderId:item.orderId}} className="mytreasure-box">
                        <div className="pic"><img src={imgUrl} alt="" /></div>
                        <div className="content">
                            <p>{item.goodsName}</p>
                            <i>{item.periodsNum}</i>
                            <em>此单参与{item.joinNum}人次</em>
                        </div>
                    </Link>
                    <div className="mytreasure-action">
                        <p>
                           <span>{status}</span>
                            {(item.showJoin==true)?<Link to={'GoodsInfo'} query={{goodsNo: item.goodsNoNext}} className="again">再次参与</Link>:""}
                            {(item.showLogistics==true)?<Link to={'logisticsInfo'} query={{orderId: item.orderId}} className="again">查看物流</Link>:""}
                            {(item.showOrderShow==false)?<Link to={'comment'} state={{item: item}} className="again">去晒单</Link>:""}
                            {(item.showPrintAddress==true)?<Link to={'addressList'} className="again">填写地址</Link>:""}
                        </p>
                    </div>
                </div>
                )
            })}

             </div>
        	)
        }
    }
}

myOrderList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}
myOrderList.contextTypes = {
    router:React.PropTypes.object
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: myOrderList
  } = postsByApi["myOrderList"] || {
    isFetching: false,
    items: {}
  }
  return {
    myOrderList,
    isFetching
  }
}
export default connect(mapStateToProps)(myOrderList);

