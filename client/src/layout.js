import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.css';
import PubSub from './utils/pubsub-service';
import * as PubSubActionType from './utils/pubsub-actions';
import { ToastContainer, toast } from 'react-toastify';
import SignIn from './container/Login/Signin';
import cartIcn from './icn_cart.svg';

import logo from './logo.png';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      userName: '',
      isSignin: false,
      isSignout: false
    }
  }

  handleShow = () => {
    this.setState({ showPopup: true,  isSignout: false});
  }

  closePopup = () => {
    this.setState({ showPopup: false });
  }

  componentDidMount() {
    PubSub.subscribe(PubSubActionType.TOAST_SUCCESS, (msg, data) => {
      toast.success(data.msg, {});
    });

    PubSub.subscribe(PubSubActionType.TOAST_ERROR, (msg, data) => {
        toast.error(data.msg, {});
    });
  };

  componentWillUnmount() {
    PubSub.subscribe(PubSubActionType.TOAST_SUCCESS);
    PubSub.subscribe(PubSubActionType.TOAST_ERROR);
  };

  dataSignIn = (user) => {
    if(user.name) {
      this.setState({isSignin: true, userName: user.firstName});
    }
  }

  signOutAccount = (e) => {
    this.setState({isSignin: false,userName: '', isSignout: true});
    e.preventDefault();
  }


  renderNavbar() {
    return (
      <div className="mainnav navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar3" aria-expanded="true">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-left">
              <Link to="/"><img className="img-thumb logo_main" src={logo} alt="Logo"/></Link>
            </div>
          </div>
          <div className="rightbarnav">
          <ul className="personalact">
            <li><NavLink exact to="/cart" activeClassName="active" className="actionNav"><img src={cartIcn} className="cart-img" alt="cart" /> <span id="notification">0</span></NavLink></li>
            <li className="dropdown">                
                    {this.state.isSignin ?
                      <a href="" className="actionNav dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> {this.state.userName}</a>
                      : <button onClick={this.handleShow} className="signin"><i className="fa fa-user"></i></button>
                    }                
                  <ul className="dropdown-menu submenu is-dropdown-submenu first-sub">
                    <li><a href="" className="logout" onClick={this.signOutAccount}>Log out</a></li>
                  </ul>
                </li>
          </ul>
          <div className="collapse navbar-collapse navbar3">

            <ul className="nav navbar-nav navbar-right topnav">
              <li><NavLink to="/" exact>Home</NavLink></li>
              <li className="dropdown">
                <a href="" className="categlory products dropdown-toggle" data-toggle="dropdown">Products<b className="caret"></b></a>
                <ul className="dropdown-menu submenu is-dropdown-submenu first-sub">
                  <li><NavLink exact to="/products/mobile">Mobile</NavLink></li>
                  <li><NavLink exact to="/products/laptop">Laptop</NavLink></li>
                </ul>
              </li>              
              
              <li className="dropdown">
              <a href="" className="categlory products dropdown-toggle" data-toggle="dropdown">Admin<b className="caret"></b></a>
                <ul className="dropdown-menu submenu is-dropdown-submenu first-sub">
                  <li><NavLink exact to="/admin/upload">Upload</NavLink></li>
                  <li><NavLink exact to="/admin/listproduct">List Products</NavLink></li>
                </ul>
                </li>
              <li><NavLink exact to="/contact" activeClassName="active">Contact</NavLink></li>
 
            </ul>
          </div>
          </div>
        </div>
      </div>
    )
  };

  renderFooter() {
    return (
      <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <p className="col-md-6 col-sm-6 col-xs-12"><b>@2018 Created by zeronam</b> </p>
          {/* <img src="images/card.png" className="card" alt="Card payment"/></p> */}
          {/* <div id="footer-bottom" className="col-md-6 col-sm-6 col-xs-12">
              <img src="images/logo.png" alt="Logo"/>
          </div> */}
        </div>
      </div>
    </div>
    )
  }

  render() {
    return (
      <div className="App">        
        {this.renderNavbar()}        
        {/* <Button bsStyle="primary" onClick={this.handleShow}>Hello</Button> */}
        {/* <Popup show={this.state.showPopup} onClose={this.closePopup}>Content 123</Popup> */}
        <SignIn show={this.state.showPopup} onClose={this.closePopup} dataUser={this.dataSignIn} signout={this.state.isSignout}/>
        <div className="container">
        {this.props.children}
        <ToastContainer position="top-right" hideProgressBar autoClose={3000} />    
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

export default Layout;