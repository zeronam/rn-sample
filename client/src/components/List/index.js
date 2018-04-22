import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.listItems = props.data.map(
            (data, index) => <li key={data._id} value={data.name} className="col-md-3 col-sm-6 col-xs-12">
                
                <div className="inner">
                    <NavLink to={`/detail/${data._id}`} className="navlink" title={data.name}>
                    <img src={`/uploads/${data.imgUrl}`} alt={data.name}/> 
                    <p className="product-name">{data.name}</p>
                    <NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} renderText={value => <p className="price">{value}</p>} />
                    </NavLink>
                    {/* <button className="button secondary">Chi tiết</button>      */}
                </div>           
                
            </li>
        );
    }

    render() {
        return(<ul className="row list-group">
                {this.listItems}
            </ul>
        );
    }
}

export default ListItem;