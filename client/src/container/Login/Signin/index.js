import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SignInActionType from './constants';

import Form from '../../../components/react-validation/components/form';
import Submit from '../../../components/react-validation/components/submit';
import Input from '../../../components/react-validation/components/input';
import * as Vali from '../../../utils/validator-helper';
// import * as NotifyActionType from '../../../components/Notification/constatnts';
import { NavLink } from 'react-router-dom';
import { Loading } from '../../../components/Loading';

import Modal from '../../../components/Modal';
import ErrorMessage from '../../../components/ErrorMessage';
import './styles.css';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {},
            isLoading: false,
            showError: ''
        };
    };

    onClosePopup = () => {
        this.props.onClose();
    }

    onSubmit(e) {
        this.setState({isLoading: true});
        let param = this.form.getValues();
        this.props.dispatch({
            type: SignInActionType.SIGNIN_ASYNC,
            params: {
                data: param,
            }
        });

        e.preventDefault();
    };

    handleChange = (user) => {
        this.props.dataUser(user);
    } 


    componentWillReceiveProps(nextProps) {
        this.setState({isLoading: false});
        if(nextProps.signin) {
            this.onClosePopup();
            this.handleChange(nextProps.data);     
            // this.props.dispatch({ type: NotifyActionType.NOTIFY_SUCCESS, data: "Login success" });
        } 
        if(nextProps.status === 'Login faild') {
            this.setState({showError: true});
        }
    };

    renderForm() {
        var showLoading = this.state.isLoading ? <Loading /> : '';
        var showErrorMessage = this.state.showError ? <ErrorMessage error="Username or password is incorrect"/> : null;
        return (
                <Modal show={this.props.show} 
                    onClose={this.onClosePopup}
                    title="Sign in">
                <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)} className="signin_form">

                                    <label>Username <span className="text-danger">*</span></label>

                                    <Input type="email"
                                        name="name"
                                        ref={(ref) => this.userNameInput = ref}
                                        placeholder="Username"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        validations={[Vali.required, Vali.maxlength]} />
                                    <label>Password <span className="text-danger">*</span></label>

                                    <Input type="password"
                                        name="password"
                                        ref={(ref) => this.emailInput = ref}
                                        placeholder="Password"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        validations={[Vali.required, Vali.maxlength]} />                                    
                                    {showLoading}
                                    {showErrorMessage}
                                    <div className="center-buttons">
                                        <NavLink to="/register" className="btn btn-danger btn-register" onClick={this.onClosePopup}>Register</NavLink>
                                        <Submit className="btn btn-primary btn-submit">Sign In</Submit>
                                    </div>
                </Form>
                </Modal>
        )
    }



    render() {
        return <div>{this.renderForm()}</div>;

    }
}

const mapStateToProps = (state) => {
    return state.SignInStore;
};


export default connect(mapStateToProps, null)(SignIn);