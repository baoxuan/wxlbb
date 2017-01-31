import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,fetchTicket, reset } from '../actions';
import { Link } from 'react-router'
import Swiper from 'react-id-swiper';

import Events from '../utils/Events';
import BuyPop from '../components/BuyPop';
import { getPrecent } from '../utils';
import isEqual from 'lodash/isEqual'
import cookie from 'react-cookie';
class app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            isShow:false,
            item:{},
            pageindex:1,
            isLoading:true,
            listItems:[]
        }
    }
    componentWillMount() {
        document.title="一元夺宝";
    }
    componentDidMount() {
        const query = this.props.location.query;
        let qToken,qName;
        if(query.token){
            qToken = query.token,
            qName = query.userName;
            cookie.save("token",query.token);
            cookie.save("userName",query.userName);
        }else{
            qToken = cookie.load("token"),
            qName = cookie.load("userName");
        }
        const header= {"X-Client-ID":"123456"}
        this.props.dispatch(reset("querySaleGoodsList",header))
        this.props.dispatch(fetchPosts("querySaleGoodsBannerInfo",header))
        this.props.dispatch(fetchPosts("querySaleGoodsList",header,{"pageindex":this.state.pageindex,"pagesize":10}))
        this._scrollListener = Events.on(window, 'scroll', this.checkButtom.bind(this))
    }
    componentWillUnmount() {
        this._scrollListener && this._scrollListener.off();
    }
    addList(lists){
      this.setState({isLoading:lists.length == 10 ? true:false});
        if(this.state.pageindex == 1){
            this.setState({listItems:lists});
        }else{
         this.setState({listItems:this.state.listItems.concat(lists)});
        }
    }
    checkButtom(){
        const header= {"X-Client-ID":"123456"}
        let scrollTop = document.body.scrollTop,
            innerHeight = window.innerHeight,
            scrollHeight = document.body.scrollHeight,
            pageindex = this.state.pageindex,
            query = this.props.location.query;

            if(scrollTop + innerHeight >= scrollHeight && this.state.isLoading ){
                pageindex++;
                this.setState({pageindex:pageindex});
                this.props.dispatch(fetchPosts("querySaleGoodsList", header,
                    {
                      pageindex:pageindex,
                      pagesize:10
                    })
                )
            }

    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.BannerInfo.errorCode === 0  &&  nextProps.GoodsList.errorCode == 0){
        this.setState({
            loading:false
        })
      }
      if(nextProps.GoodsList.errorCode == 0 && !isEqual(nextProps.GoodsList, this.props.GoodsList)  ){
          this.addList(nextProps.GoodsList.data.saleGoods);
      }

    }

    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
        }else{
            const {BannerInfo, GoodsList,Config} = this.props;
            const params = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop:true,
            autoplay:5000
          };
            const params1 = {
              direction:"vertical",
              loop:true,
              autoplay:5000
          };
          return(
        	<div >
          <BuyPop
            show={this.state.isShow}
            item={this.state.item}
            config= {Config}
            closed={()=>this.setState({isShow:false})}
            submit={this.buy.bind(this)}/>
          <div className="Header">一元夺宝 <Link to={`RecentlyAnnounced`}></Link></div>

          <Swiper {...params} >
          {BannerInfo.data.banners.map((item)=>{

            if(item.url !== "" && item.linkType == 2){
              return(
                  <div key={item.recordId}>
                    <a href={item.url} >
                      <img src={item.imageUrl} />
                    </a>
                    </div>
                    )
              }else if(item.url !== "" && item.linkType == 1){
                return(
                  <div key={item.recordId}>
                   <Link to={`GoodsInfo`} query={{goodsno: item.url}}>
                      <img src={item.imageUrl} />
                    </Link>
                    </div>
                    )
              }else{
                return(
                    <div key={item.recordId}>
                      <img src={item.imageUrl} />
                    </div>
                    )
              }
              })
           }
          </Swiper>
          <div className="notice-box">
          <Swiper {...params1} >
          {BannerInfo.data.notices && BannerInfo.data.notices.map((item)=>(
                  <Link key={item.goodsNo} to={{pathname:"HistoryDetail", query:{goodsno:item.goodsNo}} } className="notice-bar">
                  <i></i><span>恭喜{item.winningUserName}刚刚获得 <em>{item.goodsName}</em></span></Link>
              ))
           }
           </Swiper>
           </div >
          {this.state.listItems.map((item)=>{
            const imgUrl = item.goodsPic ? item.goodsPic.split(",")[0]:item.goodsPic
            return(
            <div className="bgf" key={item.goodsNo} >
            <Link to={`GoodsInfo`} query={{goodsno: item.goodsNo}}  className="treasure-box">
              <div className="photo"><img src={imgUrl} alt={item.goodsName}/></div>
              <div className="content">
                <div className="title">{item.goodsName}</div>
                <div className="intor">{item.desc}</div>
                <div className="progress"><i style={{width:getPrecent(item.surplusJoinNum,item.totalJoinNum)}}></i></div>
                <div className="total">总量<i>{item.totalJoinNum}</i></div>
                <div className="surplus">剩余 <i>{item.surplusJoinNum}</i></div>
                <button className="join" onClick={this.join.bind(this, item)}>立即参与</button>
              </div>
            </Link>
            </div>
            )
          }
          )}
          {this.state.isLoading ? (<div className="Loading">正在加载更多</div>): null}
        </div>
        	)
        }
    }

  join(item,e){
    //弹出购买框
      e.preventDefault();
        const header= {"X-Client-ID":'123456'}
        const params = {"goodsno":item.goodsNo}
        this.setState({
          item:item,
          isShow:true
        })
        this.props.dispatch(fetchPosts("buyNumConfig",header,params));

  }
  buy(Msg){//提交表单
  console.log(Msg);
    this.setState({
      isShow:false
    })

    window.location.href = "http://weixin.hzyisu.com/pay.html?barcode="+Msg.barcode+"&goodsName="+Msg.goodsName+"&joinNum="+Msg.joinNum+"&periodsNum="+Msg.periodsNum+"&price="+Msg.price;

    // this.context.router.push({
    //     pathname:"/pay",
    //     state:{
    //         Msg:Msg
    //     }
    // });
  }

}
app.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}
app.contextTypes = {
    router:React.PropTypes.object
}
function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: BannerInfo
  } = postsByApi["querySaleGoodsBannerInfo"] || {
    isFetching: false,
    items: {}
  }
  const {
    items: GoodsList
  } = postsByApi["querySaleGoodsList"] || {
    items: {}
  }
  const {
    items: Config
  } = postsByApi["buyNumConfig"] || {
    items: {}
  }
    const {
    items: apiticket
  } = postsByApi["getjsapiticket"] || {
    isFetching: false,
  }
  return {
    BannerInfo,
    GoodsList,
    apiticket,
    Config,
    isFetching
  }
}


export default connect(mapStateToProps)(app);

