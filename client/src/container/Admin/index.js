import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AdminActionType from './constants';

import Form from '../../components/react-validation/components/form';
import Submit from '../../components/react-validation/components/submit';
import Input from '../../components/react-validation/components/input';
import Textarea from '../../components/react-validation/components/text-area';
import * as Vali from '../../utils/validator-helper';
// import { ToastContainer, toast } from 'react-toastify';
import Select from '../../components/react-validation/components/select';
import * as NotifyActionType from '../../components/Notification/constatnts';
import './styles.scss';

class Admin extends Component {
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
            type: AdminActionType.CREATE_ADMIN_ASYNC,
            params: {
                data: param,
            }
        });

        e.preventDefault();
    };


    componentWillReceiveProps(nextProps) {

        if (nextProps.create) {
            this.props.dispatch({ type: NotifyActionType.NOTIFY_SUCCESS, data: "Product created" });
            this.props.history.push(`/products`);
            this.props.dispatch({
                type: AdminActionType.ADMIN_RESET,
            });
        } 
        else {
            this.props.dispatch({ type: NotifyActionType.NOTIFY_ERROR, data: "Create faild" });
        }
    };

    renderForm() {
        return (
            <div className="admin_content">
                <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>

                                    <label>Tên sản phẩm <span className="text-danger">*</span></label>

                                    <Input type="text"
                                        name="name"
                                        ref={(ref) => this.nameInput = ref}
                                        placeholder="Product name"
                                        className="form-control"
                                        max="100"
                                        error="error"
                                        validations={[Vali.required, Vali.maxlength]} />
                                    <label>Giá sản phẩm<span className="text-danger">*</span></label>

                                    <Input type="text"
                                        name="price"
                                        ref={(ref) => this.priceInput = ref}
                                        placeholder="Price"
                                        className="form-control"
                                        max="200"
                                        validations={[Vali.required, Vali.maxlength]} />

                                    <label>Hình ảnh <span className="text-danger">*</span></label>
          
                                    <Input type="text"
                                        name="imgUrl"
                                        ref={(ref) => this.priceInput = ref}
                                        placeholder="imgUrl"
                                        className="form-control"
                                        max="200"
                                        validations={[Vali.required, Vali.maxlength]} />


                                    <label>Mô tả <span className="text-danger">*</span></label>

                                    <Textarea name="description"
                                        ref={(ref) => this.descInput = ref}
                                        placeholder="Description"
                                        className="form-control desc"
                                        row="8"
                                        validations={[Vali.required, Vali.maxlength]}></Textarea>

                                    <label>Loại sản phẩm</label>
        
                                    <Select value="Mobile" name="typeProduct" className="form-control" validations={[Vali.required]}>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Laptop">Laptop</option>
                                    </Select>
        
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
    return state.AdminStore;
};


export default connect(mapStateToProps, null)(Admin);