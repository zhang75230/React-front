import React, { Component } from 'react';
import {Control, LocalForm, Errors, ChangeOptions } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser, updateRegisterStatus } from '../actions/actions';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Warning from '../components/Warning';

import '../styles/signup.css';

const required = val => val && val.length;
const maxLength = len =>{
    return val => !(val) || (val.length <= len);
} ;
const minLength = len => {
    return (val) => val && (val.length >= len); 
}
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackHome = this.handleBackHome.bind(this);

    }

    handleSubmit(values) {
        console.log("Current submit " + JSON.stringify(values));
        this.props.registerUser(values);
    }
    
    handleBackHome() {
        setTimeout(() => {
            this.props.history.push('/');
            this.props.updateRegisterStatus('');
        }, 2000);
        
    }

    componentWillUnmount() {  
        this.props.updateRegisterStatus('');
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

        if (this.props.registerStatus === "SUCCESS") {
            return (<div className="signup-page">
            <Header mapType="homemap" currentTab=""/>
            <div className="beautify-height">
            <h1>Successfully created a bank account, redirecting to home in a couple sec</h1>
            <Loading />
            </div>
            {this.handleBackHome()}
            <Footer />
            </div>);
        }
        return (
            <div className="signup-page ">
            <Header mapType="homemap" currentTab=""/>
            <div className="beautify-height">
            <h1 className="title">Sign Up</h1>
            <LocalForm className="page-form" onSubmit={(values) => {
                this.handleSubmit(values)
            }} >
                <div className="form-group">
                    <Control.text model=".username" id="username" name="username" 
                        placeholder="User Name"
                        className="form-control"
                        validators= {{
                            required, maxLength: maxLength(30), minLength: minLength(3)
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".username"
                        show="touched"
                        messages={{
                            required: 'Required\n',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 30 characters or less'
                        }}
                        />
                </div>
                <div className="form-group">
                    <Control.password model=".password" id="password" name="password" 
                        placeholder="Password"
                        className="form-control"
                        validators= {{
                            required, maxLength: maxLength(30), minLength: minLength(3)
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".password"
                        show="touched"
                        messages={{
                            required: 'Required\n',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 30 characters or less'
                        }}
                    />
                </div>
                <div className="btn-ctn"><button type="submit" className="btn btn-primary">Submit</button></div>
                {this.props.registerStatus === "PENDING"  ? <Loading/> : '' }
                {this.props.registerStatus === "FAILED" ? <Warning text={"Failed to register, user name may has been taken."}/> : ''}
            </LocalForm>
            </div>
            <Footer />
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        registerStatus: state.registerStatus
    }
}

const mapDispatchToProps = (dispatch) => () => {
    return {
        registerUser: bindActionCreators(registerUser, dispatch),
        updateRegisterStatus: bindActionCreators(updateRegisterStatus, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);