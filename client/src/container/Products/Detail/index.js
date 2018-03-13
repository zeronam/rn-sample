import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as IdActionType from './constants';

import ItemDetail from './Item';
// import styles from './styles.scss';

class Detail extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            content: {},
            hadContent: false
        };
    };

    componentDidMount() {
        var idParam = this.props.match.params.id;

        this.props.dispatch({
            type: IdActionType.ID_ASYNC,
            params: {
                id: idParam
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({content: nextProps.data, hadContent: true});
    };

    render() {
        const detailItem = this.state.hadContent ?  <ItemDetail data={this.state.content} />: null;


        return (
            <div className="container">
                {detailItem}
              
            </div>);
        }
}

const mapStateToProps = (state) => {
    return state.DetailStore;
};

export default connect(mapStateToProps, null)(Detail);