import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CreateActionType from './constants';
import Products from '../Products';
import Slider from '../../components/Slide';
import Search from '../Search';
import './styles.css';

class Home extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            content: {},
        };
    };

    componentDidMount() {
        this.props.dispatch({
            type: CreateActionType.CREATE_ASYNC,
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({content: nextProps.data});
    }


    render() {
        const homeLink = this.props.match.path === '/' ? <Products /> : null;
        return (
            
            <div>
                <Slider />
                {/* <Search /> */}
                {homeLink}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.CreateStore;
};

export default connect(mapStateToProps, null)(Home);