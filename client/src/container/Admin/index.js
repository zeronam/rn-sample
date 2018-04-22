import React, { Component } from 'react';

import UploadProduct from './uploadProduct';
import ListProducts from './listProducts';
import './styles.css';

import {Tabs, Tab} from 'react-bootstrap';

class Admin extends Component {    

    renderForm() {
        return (
            <div className="row">
                <Tabs defaultActiveKey={1} id="nav-menu-admin">
                    <Tab eventKey={1} title="Upload Product" href="/admin/upload">
                        <UploadProduct />
                    </Tab>
                    <Tab eventKey={2} title="List Product" href="/admin/listproduct">
                        <ListProducts />
                    </Tab>
                </Tabs>
            </div>
        )
    }



    render() {
        return <div>{this.renderForm()}</div>;
    }
}




export default Admin;