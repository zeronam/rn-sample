import React, {Component} from 'react';
import { connect } from 'react-redux';
import SignIn from '../Login/Signin';
import './styles.css';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignin: false,
            showPopup: true
        }
    }
    componentDidMount() {
        this.setState({isSignin: this.props.signin});
    };

    closePopup = () => {
        this.setState({ showPopup: false });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.signin) {
            this.setState({isSignin : nextProps.signin});
        }
    };

    render() {
        let checkLogin = this.state.isSignin ? <p className="cartNotice">Your Shopping Cart is empty</p>
        : <SignIn show={this.state.showPopup} onClose={this.closePopup} />;
        return(
            <div>{checkLogin}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.SignInStore;
};


export default connect(mapStateToProps, null)(Cart);