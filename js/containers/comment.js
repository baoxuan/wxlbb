import React, {Component, PropTypes}from 'react';
import FileUpload from 'react-fileupload'

class comment extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
       document.title = "优惠券说明"
    }
    componentDidMount() {
    }

    render() {
    /*指定参数*/
    var options={
        baseUrl:'http://127.0.0.1',
        param:{
            fid:0
        }
    }
    /*调用FileUpload,传入options。然后在children中*/
    /*传入两个dom(不一定是button)并设置其ref值。*/
    return (
        <FileUpload options={options}>
            <button ref="chooseBtn">choose</button>
            <button ref="uploadBtn">upload</button>
        </FileUpload>
    )
    }

}

comment.proTypes = {

}

export default comment;
