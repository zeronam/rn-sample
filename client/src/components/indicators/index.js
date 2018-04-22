import React, { Component } from 'react';
//import Spinner from 'react-spinkit'; http://tobiasahlin.com/spinkit/
import './styles.css';

export class Indicator extends Component {

    render() {
        return <div id={this.props.id} className="cls-indicator">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>;
    }
}

