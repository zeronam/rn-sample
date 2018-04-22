import React, { Component } from 'react';
import { MyMapComponent } from '../../components/google-map';

import Form from '../../components/react-validation/components/form';
import Submit from '../../components/react-validation/components/submit';
import Input from '../../components/react-validation/components/input';
import Textarea from '../../components/react-validation/components/text-area';
import * as Vali from '../../utils/validator-helper';

import './styles.css';

class Contact extends Component {
    onSubmit(e) {

    }

    render() {
        return (
            <div className="contact">
                <div className="row">
                    <h1>Contact</h1>
                    <div className="col-md-6">
                        <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>
                            <Input type="text"
                                name="yourName"
                                ref={(ref) => this.nameInput = ref}
                                placeholder="Your name"
                                className="form-control"
                                max="100"
                                error="error"
                                validations={[Vali.required, Vali.maxlength]} />


                            <Input type="email"
                                name="yourEmail"
                                ref={(ref) => this.priceInput = ref}
                                placeholder="Your Email"
                                className="form-control"
                                max="200"
                                validations={[Vali.required, Vali.maxlength]} />



                            <Input type="text"
                                name="phoneNumber"
                                ref={(ref) => this.priceInput = ref}
                                placeholder="Your phone number"
                                className="form-control"
                                max="200"
                                validations={[Vali.required, Vali.maxlength]} />




                            <Textarea name="description"
                                ref={(ref) => this.descInput = ref}
                                placeholder="Description"
                                className="form-control desc"
                                row="10"
                                validations={[Vali.required, Vali.maxlength]}></Textarea>

                            <div className="center-buttons">
                                <Submit className="btn btn-primary btn-submit">Send</Submit>
                            </div>
                        </Form>
                    </div>
                    <div className="col-md-6 mapLocation">
                        <MyMapComponent isMarkerShown />
                    </div>
                </div>
            </div>

        )
    }
}

export default Contact;