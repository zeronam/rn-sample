import React, { Component } from 'react';
import ListLaptop from './listLaptop';
import ListMobile from './listMobile';

class ListProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'Mobile'
        }
    }


    changeTypeSelect = () => {
        if (this.typeProduct.value === 'Laptop') {
            this.setState({status: 'Laptop'});
        } else if (this.typeProduct.value === 'Mobile') {
            this.setState({status: 'Mobile'})
        }
    }

    render() {
        var checkStatus = this.state.status === 'Mobile' ? <ListMobile /> : <ListLaptop />;
        return (
            <div className="list_products">
                <select 
                name="typeProduct" 
                className="form-control selectType" 
                ref={(ref) => this.typeProduct = ref}
                onChange={this.changeTypeSelect}>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                </select>
                {checkStatus}
            </div>
        )
    }
}

export default ListProducts;