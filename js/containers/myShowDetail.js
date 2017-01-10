import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link , hashHistory } from 'react-router';
import cookie from 'react-cookie';

class myShowDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }
    componentWillMount() {
        document.title="晒单记录";
    }
    componentDidMount() {
        const header= { "X-Client-ID":'123456',"X-Long-Token":cookie.load("token")}
        const params = this.props.location.query;
        this.props.dispatch(fetchPosts("myShowDetail",header,params));
        console.log("componentDidMount");
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.myShowDetail.errorCode === 0){
            this.setState({
                loading:false
            })
        }
    }

    render() {
        if(this.state.loading){
            return(<div className="loading"><span>loading</span></div>)
        }else{
            const {myShowDetail} = this.props;
            const evaluatePic = myShowDetail.data.evaluatePic.split(",")
            return(
        	<div >

            <div className="mysun-list">
        <div className="mysun-title">
            <div className="time">{myShowDetail.data.createTime}</div>
            <div className="pic"><img src={myShowDetail.data.userHeadImg} alt="" /></div>
            <div className="content">{myShowDetail.data.userName}</div>

        </div>
        <div className="mysun-info">{myShowDetail.data.evaluateContent||"晒单没有任何评语"}</div>
        <div className="mysun-pic-big">
            {(() => {
                        var pics = [];
                        for (var i=0; i < evaluatePic.length; i++) {
                            pics.push(<img src={evaluatePic[i]} key={evaluatePic[i]} />);
                        }
                        return pics;
                    })()}
        </div>

    </div>

    <div className="bottom-kong"></div>
    <div className="mysun-btn">
        <Link to="#">查看更多晒单</Link>
        <Link to="#">参与抢宝</Link>
    </div>

             </div>
        	)
        }
    }
}

myShowDetail.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}
myShowDetail.contextTypes = {
    router:React.PropTypes.object
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: myShowDetail
  } = postsByApi["myShowDetail"] || {
    isFetching: false,
    items: {}
  }
  return {
    myShowDetail,
    isFetching
  }
}
export default connect(mapStateToProps)(myShowDetail);

