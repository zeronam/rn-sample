import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import Popup from './components/Modal';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
// import { EmailInput } from './components/Input';

// import withProgressBar from './components/ProgressBar';

// import ListItem from './components/List';
// import NameInput from './components/Input';
// import Button from './components/Button';
import './index.scss';
import PubSub from './utils/pubsub-service';
import * as PubSubActionType from './utils/pubsub-actions';
import { ToastContainer, toast } from 'react-toastify';
class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
    }
  }

  handleShow = () => {
    this.setState({ showPopup: true });
    // setTimeout(() => { alert('true') }, 3000);
  }

  closePopup = () => {
    this.setState({ show: false });
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
              <Link to="/"><img className="img-thumb logo_main" src="./logo.png" alt="Logo"/></Link>
            </div>
          </div>
          <div className="collapse navbar-collapse navbar3">
            <ul className="nav navbar-nav navbar-right topnav">
              <li><NavLink to="/" exact>Trang chủ</NavLink></li>
              <li className="dropdown">
                <a href="" className="categlory products dropdown-toggle" data-toggle="dropdown">Sản phẩm<b className="caret"></b></a>
                <ul className="dropdown-menu submenu is-dropdown-submenu first-sub">
                  <li><NavLink exact to="/products/mobile">Điện thoại</NavLink></li>
                  <li><NavLink exact to="/products/laptop">Laptop</NavLink></li>
                </ul>
              </li>
              <li><NavLink exact to="/account" activeClassName="active">Tài khoản</NavLink></li>
              <li><NavLink exact to="/user" activeClassName="active">Giỏ hàng</NavLink></li>
              <li><NavLink exact to="/admin" activeClassName="active">Quản lý</NavLink></li>
            </ul>
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
          <p className="col-md-6 col-sm-6 col-xs-12"><b>Payment with</b> <img src="images/card.png" className="card" alt="Card payment"/></p>
          <div id="footer-bottom" className="col-md-6 col-sm-6 col-xs-12">
              <img src="images/logo.png" alt="Logo"/>
          </div>
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
        <Popup show={this.state.show} onClose={this.closePopup}>Content 123</Popup>
        <div className="container">
        {this.props.children}
        <ToastContainer position="top-right" hideProgressBar autoClose={3000} />    
        </div>
      </div>
    );
  }
}

export default Layout;
