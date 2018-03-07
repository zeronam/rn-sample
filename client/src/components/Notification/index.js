import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

class Notification extends Component{
    renderToast() {
        toast.success(this.props.txt);
    }

    render(){
        return (
            <div>
                {this.renderToast()}
                <ToastContainer position="top-right" hideProgressBar autoClose={3000} />
            </div>
            
        )
    }
    componentWillReceiveProps(nextProps) {
  }
}

const mapStateToProps = (state) => {
    return state.Notification;
};

export default connect(mapStateToProps, null)(Notification);