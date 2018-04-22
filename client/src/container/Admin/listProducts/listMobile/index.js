import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn  } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import * as MobileActionType from '../../../Products/Mobile/constants';
import * as NotifyActionType from '../../../../components/Notification/constatnts';
import NumberFormat from 'react-number-format';
import axios from 'axios';

class ListMobile extends Component {
    constructor(props) {
        super(props);

        this.state= {
            content: [],
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: MobileActionType.MOBILE_ASYNC,
        });
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if(nextProps.data.length > 0) {
            this.setState({content: nextProps.data});
        }
    };

    // goProduct(product) {
    //     this.props.history.push(`/detail/${product._id}`);
    // }

    priceFormatter(cell, row){
        return <div><NumberFormat value={cell} displayType={'text'} thousandSeparator={true} renderText={value => <span>{value}</span> }/> </div>;
    };

    imageFormatter(cell, row) {   
        return <button type="button" className="product-img-thumb" onClick={() => {this.goProduct(row)}}><img className="productThumb" src={`/uploads/${cell}`} alt={row.name}/></button>;
    };

    onDelete(product) {
        if ( confirm('Are you sure you want to delete?') ) { //eslint-disable-line
            axios.post('/delete', { product: product._id, image: product.imgUrl })
            .then(res => {
                if(res.data.statusCode === 200) {
                    this.props.dispatch({ type: NotifyActionType.NOTIFY_SUCCESS, data: res.data.message });
                    this.props.dispatch({
                        type: MobileActionType.REMOVE_MOBILE_ITEM,
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
                <TableHeaderColumn dataField="_id" isKey={true} dataAlign="center" dataSort={true} hidden={true}>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField="imgUrl" dataFormat={this.imageFormatter.bind(this)}>Image</TableHeaderColumn>
                <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter}>Product Price</TableHeaderColumn>
                <TableHeaderColumn dataField="typeProduct">Type Product</TableHeaderColumn>
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
    return state.MobileStore;
};


export default connect(mapStateToProps)(ListMobile);