import React, { Component } from 'react';
import UploadButton from '../../../components/upload-button';
import { Loading } from '../../../components/Loading';

import Form from '../../../components/react-validation/components/form';
import Submit from '../../../components/react-validation/components/submit';
import Input from '../../../components/react-validation/components/input';
import Textarea from '../../../components/react-validation/components/text-area';
import * as Vali from '../../../utils/validator-helper';
import Select from '../../../components/react-validation/components/select';
import axios from 'axios';
import { connect } from 'react-redux';

import * as AdminActionType from '../constants';
import * as NotifyActionType from '../../../components/Notification/constatnts';

class UploadProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {},
            selectedFile: '',
            imgUrl: 'default-image.png',
            isUpload: true,
            isLoading: false
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.create) {
            this.props.dispatch({ type: NotifyActionType.NOTIFY_SUCCESS, data: "Product created" });
            this.props.history.push(`/`);
            this.props.dispatch({
                type: AdminActionType.ADMIN_RESET,
            });
        }
        else {
            this.props.dispatch({ type: NotifyActionType.NOTIFY_ERROR, data: "Create faild" });
        }
    };

    onSubmit(e) {
        let param = this.form.getValues();
        param['imgUrl'] = this.state.imgUrl;
        this.props.dispatch({
            type: AdminActionType.CREATE_ADMIN_ASYNC,
            params: {
                data: param,
            }
        });

        e.preventDefault();
    };

    handleUpload = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const fd = new FormData();
        fd.append('image', event.target.files[0]);
        axios.post('/upload', fd)
            .then(res => {
                this.setState({ imgUrl: res.data.item, isUpload: false, isLoading: false });
            })
    }

    discardHandler = () => {
        axios.post('/discard', { itemDiscard: this.state.imgUrl })
            .then(res => {
                this.setState({ isUpload: true, imgUrl: 'default-image.png' });
            })
    }

    render() {
        var isLoading = this.state.isLoading ? <Loading />
            : <img className="img-responsive" src={`/uploads/${this.state.imgUrl}`} alt="img upload" />;
        var checkDiscard = this.state.isUpload ?
            <div><label>Image Upload <span className="text-danger">*</span></label>
                <UploadButton
                    name="imgUrl"
                    label="Select image..."
                    tooltip="Select image"
                    onChange={this.handleUpload.bind(this)}
                    ref={el => this.imgInput = el}
                /></div> : <button className="btn btn-danger" onClick={this.discardHandler}>Discard image</button>
        return (
            <div className="upload_page">
                <div className="imagearea col-md-4">
                    <div className="imgthumb">
                        {isLoading}
                    </div>
                    {checkDiscard}
                </div>
                <div className="admin_content col-md-8">
                    <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>
                        <label>Product name <span className="text-danger">*</span></label>
                        <Input type="text"
                            name="name"
                            ref={(ref) => this.nameInput = ref}
                            placeholder="Product name"
                            className="form-control"
                            max="100"
                            error="error"
                            validations={[Vali.required, Vali.maxlength]} />
                        <label>Price<span className="text-danger">*</span></label>

                        <Input type="text"
                            name="price"
                            ref={(ref) => this.priceInput = ref}
                            placeholder="Price"
                            className="form-control"
                            max="200"
                            validations={[Vali.required, Vali.maxlength]} />

                        <label>Description <span className="text-danger">*</span></label>

                        <Textarea name="description"
                            ref={(ref) => this.descInput = ref}
                            placeholder="Description"
                            className="form-control desc"
                            row="8"
                            validations={[Vali.required, Vali.maxlength]}></Textarea>

                        <label>Type product</label>

                        <Select value="Mobile" name="typeProduct" className="form-control selectType typeProduct" validations={[Vali.required]}>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                        </Select>

                        <div className="center-buttons">
                            <Submit className="btn btn-primary btn-submit">Add</Submit>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.AdminStore;
};

export default connect(mapStateToProps, null)(UploadProduct);