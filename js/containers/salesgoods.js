import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router'
import Swiper from 'react-id-swiper';

import BuyPop from '../components/BuyPop';
import { getPrecent } from '../utils';


class salesgoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            isShow:false,
            item:{},
        }
    }
    componentWillMount() {
        document.title="一元夺宝";
    }
    componentDidMount() {
        const header= {"X-Client-ID":'123456'}
        this.props.dispatch(fetchPosts("querySaleGoodsBannerInfo",header))
        this.props.dispatch(fetchPosts("querySaleGoodsList",header,{"pageindex":1,"pagesize":10}))
    }
    componentWillReceiveProps(nextProps) {

      if(nextProps.BannerInfo.errorCode === 0  &&  nextProps.GoodsList.errorCode == 0){
        this.setState({
            loading:false
        })
      }
    }


    render() {
        if(this.state.loading){
            return(<div>loading</div>)
        }else{
            const {BannerInfo, GoodsList,Config} = this.props;
            const params = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
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
                <Swiper {...params} >
                {BannerInfo.data.banners.map((item)=>(
                        <div key={item.recordId}>
                          <img src={item.imageUrl} />
                        </div>
                    ))
            }
                </Swiper>
          {BannerInfo.data.notices.length > 0?
            (<Link to="#" className="notice-bar"><i></i><span>恭喜{BannerInfo.data.notices[0].winningUserName}刚刚获得 <em>{BannerInfo.data.notices[0].goodsName}</em></span></Link>)
            :(<Link to="#" className="notice-bar">
            <i></i><span>恭喜张三刚刚获得 <em>周六福3D皇冠金戒指</em></span></Link>)
          }
          {GoodsList.data.saleGoods.map((item)=>{
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
  buy(e){//提交表单
    this.setState({
      isShow:false
    })
    console.log(e);
  }

}
salesgoods.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
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
  return {
    BannerInfo,
    GoodsList,
    Config,
    isFetching
  }
}


export default connect(mapStateToProps)(salesgoods);

