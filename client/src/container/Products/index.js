import React, {Component} from 'react';
import LaptopList from './Laptop';
import MobileList from './Mobile';

class ProductList extends Component {
    render() {
        return(
            <div>
                <MobileList />
                <LaptopList />
            </div>
        )
    }
}

export default ProductList;