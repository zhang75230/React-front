import React from 'react';
import {Control, LocalForm, Errors } from 'react-redux-form';

import { connect } from 'react-redux';

const required = val => val && val.length;
const maxLength = len =>{
    return val => !(val) || (val.length <= len);
} ;
const minLength = len => {
    return (val) => val && (val.length >= len); 
}
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class AccHolderForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.handleRegister(values);
    }

    componentWillUnmount() {  
        
    }

    render() {
        const Loading = () => {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div>
            <h1 className="title">Create Account Holder</h1>
            <p className="title-des">First time sign in, let add more info about you before creating anything</p>
            <LocalForm className="page-form" onSubmit={(values) => {
                this.handleSubmit(values)
            }} >
                <div className="form-group">
                    <Control.text model=".firstName" id="firstName" name="firstName" 
                        placeholder="First Name"
                        className="form-control"
                        validators= {{
                            required, maxLength: maxLength(30), minLength: minLength(3)
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".firstName"
                        show="touched"
                        messages={{
                            required: 'Required. ',
                            minLength: 'Must be greater than 2 characters. ',
                            maxLength: 'Must be 30 characters or less. '
                        }}
                        />
                </div>
                <div className="form-group">
                    <Control.text model=".middleName" id=".middleName" name=".middleName" 
                        placeholder="Middle Name"
                        className="form-control"
                    />
                    <Errors
                        className="text-danger"
                        model="..middleName"
                        show="touched"
                        messages={{
                            required: 'Required. ',
                            minLength: 'Must be greater than 2 characters. ',
                            maxLength: 'Must be 30 characters or less. '
                        }}
                    />
                </div>
                <div className="form-group">
                    <Control.text model=".lastName" id="lastName" name="lastName" 
                        placeholder="Last Name"
                        className="form-control"
                        validators= {{
                            required, maxLength: maxLength(30), minLength: minLength(3)
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".lastName"
                        show="touched"
                        messages={{
                            required: 'Required. ',
                            minLength: 'Must be greater than 2 characters. ',
                            maxLength: 'Must be 30 characters or less. '
                        }}
                        />
                </div>
                <div className="form-group">
                    <Control.text model=".email" id="email" name="email" 
                        placeholder="Email"
                        className="form-control"
                        validators= {{
                            required, maxLength: maxLength(30), minLength: minLength(3), validEmail
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".email"
                        show="touched"
                        messages={{
                            required: 'Required.',
                            minLength: 'Must be greater than 2 characters. ',
                            maxLength: 'Must be 30 characters or less. ',
                            validEmail: 'Must have a valid email format. '
                        }}
                        />
                </div>
                <div className="form-group">
                    <Control.text model=".ssn" id="ssn" name="ssn" 
                        placeholder="SSN"
                        className="form-control"
                        validators= {{
                            required, maxLength: maxLength(10), minLength: minLength(9), isNumber
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".ssn"
                        show="touched"
                        messages={{
                            required: 'Required' + '\n',
                            minLength: 'Must be greater than 2 characters \n',
                            maxLength: 'Must be 30 characters or less\n',
                            isNumber: 'Must only contain numbers\n'
                        }}
                    />
                </div>
                <div className="btn-ctn"><button type="submit" className="btn btn-primary">Submit</button></div>
                {this.props.accHolderRegisterStatus === 'PENDING' ? <Loading /> : ''}
            </LocalForm>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return ({
        accHolderRegisterStatus: state.accHolderRegisterStatus
    })
}

export default connect(mapStateToProps)(AccHolderForm);