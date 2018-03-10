import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SignUpActionType from './constants';

import Form from '../../../components/react-validation/components/form';
import Submit from '../../../components/react-validation/components/submit';
import Input from '../../../components/react-validation/components/input';
import * as Vali from '../../../utils/validator-helper';
import * as NotifyActionType from '../../../components/Notification/constatnts';
import { Loading } from '../../../components/Loading';
import './styles.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {},
            isLoading: false
        };
    };

    componentDidMount() {
    };

    onSubmit(e) {
        this.setState({isLoading: true});
        let param = this.form.getValues();
        this.props.dispatch({
            type: SignUpActionType.SIGNUP_ASYNC,
            params: {
                data: param,
            }
        });

        e.preventDefault();
    };


    componentWillReceiveProps(nextProps) {
        this.setState({isLoading: false});
        if(nextProps.signup) {
            this.props.dispatch({ type: NotifyActionType.NOTIFY_SUCCESS, data: "Create account success" });
            this.props.history.push(`/account`);
        } else {
            this.props.dispatch({ type: NotifyActionType.NOTIFY_ERROR, data: "Create account faild" });
        }

    };

    renderForm() {
        var showLoading = this.state.isLoading ? <Loading /> : '';
        return (
            <div className="admin_content">
                <p className="headtxt">Sign Up</p>
                <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)} className="signup_form">

                                    <label>First name <span className="text-danger">*</span></label>

                                    <Input type="text"
                                        name="firstName"
                                        ref={(ref) => this.userNameInput = ref}
                                        placeholder="firstName"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        validations={[Vali.required, Vali.maxlength]} />
                                        <label>Last name <span className="text-danger">*</span></label>

                                    <Input type="text"
                                        name="lastName"
                                        ref={(ref) => this.userNameInput = ref}
                                        placeholder="lastName"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        validations={[Vali.required, Vali.maxlength]} />

                                    <label>Email <span className="text-danger">*</span></label>
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
                                    <div className="center-buttons">                                        
                                        <Submit className="btn btn-primary btn-submit">Sign up</Submit>
                                    </div>
                </Form>
            </div>
        )
    }



    render() {
        return <div>{this.renderForm()}</div>;

    }
}

const mapStateToProps = (state) => {
    return state.SignUpStore;
};


export default connect(mapStateToProps, null)(SignUp);