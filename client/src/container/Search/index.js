import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SearchActionType from './constants';

import Form from '../../components/react-validation/components/form';
import Submit from '../../components/react-validation/components/submit';
import Input from '../../components/react-validation/components/input';
import * as Vali from '../../utils/validator-helper';
import ListItem from '../../components/List';
import { Loading } from '../../components/Loading';
// import { ToastContainer, toast } from 'react-toastify';
import './styles.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {},
            keyword: '',
            hadContent:false
        };
    };

    componentDidMount() {
    };

    onSubmit(e) {
        this.setState({hadContent: false});
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
        if(nextProps.search){
            this.setState({content: nextProps.data, hadContent: true, keyword: nextProps.keyword});
        }
    };

    renderForm() {
        return (
            <div className="admin_content search">
                <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>
                                    <Input type="text"
                                        name="keyword"
                                        ref={(ref) => this.nameInput = ref}
                                        placeholder="Search product"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        value={this.state.keyword}
                                        validations={[Vali.maxlength]} />
        
                                    <div className="center-buttons">
                                        <Submit className="btn btn-primary btn-submit">Search</Submit>
                                    </div>
                </Form>
            </div>
        )
    }

    render() {
        var searchItem = this.state.hadContent > 0 ? <ListItem data={this.state.content} /> : <Loading />;
    return (
    <div className="page-list">
        {this.renderForm()}
        <p className="search_result"> {this.state.content.length} results </p>
        {searchItem}
    </div>);

    }
}

const mapStateToProps = (state) => {
    return state.SearchStore;
};


export default connect(mapStateToProps)(Search);