import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SearchActionType from './constants';

import Form from '../../components/react-validation/components/form';
import Submit from '../../components/react-validation/components/submit';
import Input from '../../components/react-validation/components/input';
import * as Vali from '../../utils/validator-helper';
// import { ToastContainer, toast } from 'react-toastify';
import './styles.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {},
        };
    };

    componentDidMount() {
    };

    onSubmit(e) {

        let param = this.form.getValues();
        this.props.dispatch({
            type: SearchActionType.SEARCH_ASYNC,
            params: {
                param,
            }
        });
        e.preventDefault();
    };


    componentWillReceiveProps(nextProps) {

            this.props.history.push(`/search`);
            // this.props.dispatch({
            //     type: SearchActionType.ADMIN_RESET,
            // });
    };

    renderForm() {
        return (
            <div className="admin_content">
                <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>
                                    <Input type="text"
                                        name="keyword"
                                        ref={(ref) => this.nameInput = ref}
                                        placeholder="Product name"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        validations={[Vali.maxlength]} />
        
                                    <div className="center-buttons">
                                        <Submit className="btn btn-primary btn-submit">Add</Submit>
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
    return state.SearchStore;
};


export default connect(mapStateToProps)(Search);