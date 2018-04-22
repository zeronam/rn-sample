import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MobileActionType from './constants';
import ListItem from '../../../components/List';
import { Loading } from '../../../components/Loading';

import './styles.css';

class MobileList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            content: {},
            hadContent: false
        };
    };

    componentDidMount() {        
        this.props.dispatch({
            type: MobileActionType.MOBILE_ASYNC,
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({content: nextProps.data, hadContent: true});
    };

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
      
    componentWillUpdate(nextProps, nextState) {

    }
    
    componentDidUpdate(prevProps, prevState) {

    }



    render() {
        const item = this.state.hadContent ? <ListItem data={this.state.content} /> : <Loading />;
        return (
            <div className="page-list">
                <p className="title-product">Mobile</p>
                {item}
            </div>);
        }
}

const mapStateToProps = (state) => {
    return state.MobileStore;
};

export default connect(mapStateToProps, null)(MobileList);