import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CreateActionType from './constants';
import Products from '../Products';
import Slider from '../../components/Slide';
import Form from '../../components/react-validation/components/form';
import Submit from '../../components/react-validation/components/submit';
import Input from '../../components/react-validation/components/input';
import * as Vali from '../../utils/validator-helper';
import * as SearchActionType from '../Search/constants';
import './styles.css';

class Home extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            content: {},
        };
    };

    componentDidMount() {
        this.props.dispatch({
            type: CreateActionType.CREATE_ASYNC,
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({content: nextProps.data});
       
    }

    onSubmit(e) {
        let param = this.form.getValues();
        this.props.dispatch({
            type: SearchActionType.SEARCH_ASYNC,
            params: {
                param,
            }
        });
        this.props.history.push(`/search`);
        e.preventDefault();
    };


    render() {
        const homeLink = this.props.match.path === '/' ? <Products /> : null;
        return (
            
            <div>
                <Slider />
                <div className="admin_content search">
                <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>
                                    <Input type="text"
                                        name="keyword"
                                        ref={(ref) => this.nameInput = ref}
                                        placeholder="Search product"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        validations={[Vali.maxlength]} />
        
                                    <div className="center-buttons">
                                        <Submit className="btn btn-primary btn-submit">Search</Submit>
                                    </div>
                </Form>
            </div>
                {homeLink}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.CreateStore;
};

export default connect(mapStateToProps, null)(Home);