import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn  } from 'react-bootstrap-table';
import './styles.css';

import NumberFormat from 'react-number-format';
import * as CartActionType from '../Products/Detail/Item/constants';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignin: false,
            showPopup: true,
            products: [],
        }
    }
    componentDidMount() {        
    };

    componentWillReceiveProps(nextProps) {
        this.setState({products: []});
        var notify = document.getElementById('notification');
        notify.innerHTML = nextProps.listCart.length;
    }

    closePopup = () => {
        this.setState({ showPopup: false });
    }

    onDelete(product) {
        if ( confirm('Are you sure you want to delete?') ) { //eslint-disable-line
            this.props.dispatch({
                type: CartActionType.REMOVE_ITEM_CART,
                data: 
                {   
                    product
                }
            });
        }        
    };

    goProduct(product) {
        this.props.history.push(`/detail/${product._id}`);
    }

    priceFormatter(cell, row){
        return <div><NumberFormat value={cell} displayType={'text'} thousandSeparator={true} renderText={value => <span>{value}</span> }/> </div>;
    };

    imageFormatter(cell, row) {   
        return <button type="button" className="product-img-thumb" onClick={() => {this.goProduct(row)}}><img className="productThumb" src={`/uploads/${cell}`} alt={row.name}/></button>;
    };

    totalFormatter(cell, row){
        var total = row.quanlity * row.price;
        return <div><NumberFormat value={total} displayType={'text'} thousandSeparator={true} renderText={value => <b>{value} VND</b> }/> </div>;
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
            <BootstrapTable data={this.state.products}>
                <TableHeaderColumn dataField="_id" isKey={true} dataAlign="center" dataSort={true} hidden={true}>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField="imgUrl" dataFormat={this.imageFormatter.bind(this)}>Image</TableHeaderColumn>
                <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter}>Product Price</TableHeaderColumn>
                <TableHeaderColumn dataField="quanlity">Quanlity</TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.totalFormatter}>Total</TableHeaderColumn>
                <TableHeaderColumn dataField="button" dataFormat={this.deleteFormatter.bind(this)}></TableHeaderColumn>
            </BootstrapTable>
        )        
    }

    render() {
        if (this.props.listCart.length > 0) {     
            for(var i=0; i< this.props.listCart.length; i++ ){
                this.state.products.push(this.props.listCart[i].product);
            }
        }

        let status = this.props.listCart.length > 0 ? `Your cart have ${this.props.listCart.length} product` 
        : 'Your cart is empty';

        return(
            <div>
                <p className="cartNotice">{status}</p>
                {this.renderTable()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {listCart: state.CartStore};
};


export default connect(mapStateToProps)(Cart);