import React, {Component, PropTypes}from 'react';
import { connect } from 'react-redux';
import { fetchPosts,reset } from '../actions';
import { Link } from 'react-router'
import Swiper from 'react-id-swiper';

import BuyPop from '../components/BuyPop';
import Header from '../components/Header';
import { getPrecent } from '../utils';


class GoodsDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        document.title="商品详情";
    }


    render() {
        return(
            <div>
            <div dangerouslySetInnerHTML={{__html:this.props.location.state.imageTextDetail}}>
            </div>
            </div>)

    }

}
GoodsDetail.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { postsByApi } = state
  const {
    isFetching,
    items: GoodsInfo
  } = postsByApi["getGoodsInfo"] || {
    isFetching: false,
    items: {}
  }
  const {
    items: Config
  } = postsByApi["buyNumConfig"] || {
    items: {}
  }
  return {
    GoodsInfo,
    Config,
    isFetching
  }
}


export default connect(mapStateToProps)(GoodsDetail);

