import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as laptopActionType from './constants';
import ListItem from '../../../components/List';
import {Loading} from '../../../components/Loading';

import './styles.scss';

class LaptopList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            content: {},
            hadContent: false
        };
    };

    componentDidMount() {        
        this.props.dispatch({
            type: laptopActionType.LAPTOP_ASYNC,
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({content: nextProps.data, hadContent: true});
    };

    render() {
        const item = this.state.hadContent ? <ListItem data={this.state.content} /> : <Loading />;
        return (
            <div className="page-list">
                <p className="title-product">Laptop</p>
                {item}
            </div>);
        }
}

const mapStateToProps = (state) => {
    return state.LaptopStore;
};

export default connect(mapStateToProps, null)(LaptopList);