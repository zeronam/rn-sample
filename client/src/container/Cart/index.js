import React, {Component} from 'react';
import { connect } from 'react-redux';
import SignIn from '../Login/Signin';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './styles.css';

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
        // this.setState({isSignin: this.props.login.signin});
    };

    closePopup = () => {
        this.setState({ showPopup: false });
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        // if(nextProps.login.signin) {
        //     this.setState({isSignin : nextProps.login.signin});
        // }
    };

    priceFormatter(cell, row){
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    };

    imageFormatter(cell, row){
        return "<img class='productThumb' src='"+cell+"'/>" ;
    };

    renderTable() {
        return (
            <BootstrapTable data={this.state.products}>
                <TableHeaderColumn dataField="_id" isKey={true} dataAlign="center" dataSort={true} width='25%' hidden={true}>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField="imgUrl" width='25%' dataFormat={this.imageFormatter}>Image</TableHeaderColumn>
                <TableHeaderColumn dataField="name" width='25%'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField="price" dataFormat={this.priceFormatter} width='25%'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        )        
    }

    render() {
        for(var i=0; i< this.props.listCart.length; i++ ){
            this.state.products.push(this.props.listCart[i].product);
        }
        let status = this.props.listCart.length > 0 ? `Your cart have ${this.props.listCart.length} product` 
        : 'Your cart is empty';
        let checkLogin = this.state.isSignin ? null
        : <SignIn show={this.state.showPopup} onClose={this.closePopup} />;
        return(
            <div>
                <p className="cartNotice">{status}</p>
                {/* {checkLogin} */}
                {this.renderTable()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {listCart: state.CartStore};
    // return {login: state.SignInStore, listCart: state.CartStore};
};


export default connect(mapStateToProps)(Cart);