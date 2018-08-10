import React, { Component } from 'react';
import ListLaptop from './listLaptop';
import ListMobile from './listMobile';
import ListUser from './listUser'; 

class ListProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'User'
        }
    }

    changeTypeSelect = () => {
        const type = this.typeProduct.value;
        this.setState({ type });
    }

    render() {

        return (
            <div className="list_products">
                <select 
                name="typeProduct" 
                className="form-control selectType" 
                ref={(ref) => this.typeProduct = ref}
                onChange={this.changeTypeSelect}>
                    <option value="User">User</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                </select>
                {this.state.type === "Mobile" && <ListMobile />}
                {this.state.type === "User" && <ListUser />}
                {this.state.type === "Laptop" && <ListLaptop />}
            </div>
        )
    }
}

export default ListProducts;