import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn  } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import * as MobileActionType from '../../../Products/Mobile/constants';
import * as UserActionType from './constants';
import * as NotifyActionType from '../../../../components/Notification/constatnts';
import axios from 'axios';

class ListUser extends Component {
    constructor(props) {
        super(props);

        this.state= {
            content: [],
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: UserActionType.GET_USER_LIST_ASYNC,
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.length > 0) {
            this.setState({content: nextProps.data});
        }
    };

    onDelete(product) {
        if ( confirm('Are you sure you want to delete?') ) { //eslint-disable-line
            axios.post('/delete-user', { product: product._id, image: product.imgUrl })
            .then(res => {
                if(res.data.statusCode === 200) {
                    this.props.dispatch({ type: NotifyActionType.NOTIFY_SUCCESS, data: res.data.message });
                    this.props.dispatch({
                        type: UserActionType.REMOVE_USER,
                        data: 
                        {   
                            product
                        }
                    });
                }
            })
        }
    };

    deleteFormatter(cell, row) {
        return  <button type="button" 
                id="removeButton" 
                onClick={() => {this.onDelete(row)}} 
                className="btn btn-danger btn-sm">
                Remove
                </button>;
    };

    renderTable() {
        return (
            <BootstrapTable data={this.state.content}>
                <TableHeaderColumn dataField="_id" isKey={true} dataSort={false}>ID</TableHeaderColumn>
                {/* <TableHeaderColumn dataField="imgUrl" dataFormat={this.imageFormatter.bind(this)}>Image</TableHeaderColumn> */}
                {/* <TableHeaderColumn dataField="name">Name</TableHeaderColumn> */}
                {/* <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter}>Product Price</TableHeaderColumn> */}
                <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                <TableHeaderColumn dataField="button" dataFormat={this.deleteFormatter.bind(this)}></TableHeaderColumn>
            </BootstrapTable>
        )        
    }

    render() {
        return (
            <div>{this.renderTable()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.UserStore);
    return state.UserStore;
};


export default connect(mapStateToProps)(ListUser);