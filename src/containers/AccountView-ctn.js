import React from 'react';
import {Control, LocalForm, Errors } from 'react-redux-form';
import {Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deposit, withdraw, tranfer, transferState, getMe } from '../actions/actions';
import Table from '../components/Table';
import Loading from '../components/Loading';

const isNumber = (val) => !isNaN(Number(val));
const positive = (val) => parseFloat(val) > 0;

class AccountView extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showTransfer: false,
            transactionType: ''
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseTransfer = this.handleCloseTransfer.bind(this);
        this.handleShowTransfer = this.handleShowTransfer.bind(this);
    }

    handleSubmit(values) {
        if (this.state.transactionType === 'deposit') {
            this.props.deposit({
                amount: values.amount,
                accountNumber: this.props.currentAccount.acc.accountNumber,
                accountType: this.props.currentAccount.accountType,
            }, this.props.jwt)
            this.handleClose();
        } else if (this.state.transactionType === 'withdraw') {
            this.props.withdraw({
                amount: values.amount,
                accountNumber: this.props.currentAccount.acc.accountNumber,
                accountType: this.props.currentAccount.accountType,
            }, this.props.jwt)
            this.handleClose();
        } else if (this.state.transactionType === 'transfer') {
            const transferData = {
                originID: this.props.currentAccount.acc.accountNumber,
                destID: values.destID,
                amount: values.amount
            }
            this.props.transfer(transferData, this.props.jwt);
            this.handleCloseTransfer();
        }
        
    }
    
    handleClose() {
        this.setState({
            show: false,
            transactionType: ''
        })
    }

    handleCloseTransfer() {
        this.setState({
            showTransfer: false,
            transactionType: ''
        })
    }
    
    handleShow(transactionType) {
        this.setState({
            show: true,
            transactionType: transactionType
        })
    }

    handleShowTransfer() {
        this.setState({
            showTransfer: true,
            transactionType: 'transfer'
        })
    }

    componentDidUpdate() {
        if (this.props.transferStatus === 'SUCCESS') {
            this.props.transferState('');
            this.props.getMe(this.props.jwt);
        }
        console.log('updated', this.props.transferStatus === 'SUCCESS');
    }

    render() {
        const loadingState = this.props.transferStatus === 'PENDING' || this.props.withdrawDepositStatus === 'PENDING';
        if (this.props.currentAccount) {
            const {balance, accountNumber } = this.props.currentAccount.acc;
            return(
                <>
                {loadingState ? <div className="overlay"><Loading  /></div> : ''}
                <h2 className="account-type">Account Number: <strong>{accountNumber}</strong></h2>
                <p className="balance">Balance: <strong>{new Intl.NumberFormat('en-emodeng',{ style: 'currency' ,currency: 'USD'}).format(balance)}</strong></p>
                <div className="trans-func">
                    <button onClick={() => this.handleShow('deposit')} className="btn btn-secondary">Deposit</button>
                    <button onClick={() => this.handleShow('withdraw')} className="btn btn-secondary">Withdraw</button>
                    <button onClick={() => this.handleShowTransfer()} className="btn btn-secondary">Transfer</button>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                <LocalForm className="pop-up" onSubmit={(values) => {
                            this.handleSubmit(values)
                        }} >
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.transactionType.toUpperCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Control.text model=".amount" id="amount" name="amount" 
                                className="form-control form-field"
                                parser={val => (parseFloat(val) || 0)}
                                validators= {{
                                    isNumber, positive
                                }}
                    />
                    <Errors
                        className="text-danger"
                        model=".balance"
                        show="touched"
                        messages={{
                            isNumber: 'Must be numbers. ',
                            positive: 'Must be positive. '
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Modal.Footer>
                </LocalForm>
                </Modal>

                <Modal show={this.state.showTransfer} onHide={this.handleClose}>
                <LocalForm className="pop-up" onSubmit={(values) => {
                            this.handleSubmit(values)
                        }} >
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.transactionType.toUpperCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Receiver Account Number
                    <Control.text model=".destID" id="destID" name="destID" 
                    className="form-control form-field"
                    parser={val => (parseFloat(val) || 0)}
                    validators= {{
                        isNumber, positive
                    }}
                    />
                    <Errors
                        className="text-danger"
                        model=".destID"
                        show="touched"
                        messages={{
                            isNumber: 'Must be numbers. ',
                            positive: 'Must be positive. '
                        }}
                    />
                    Amount
                    <Control.text model=".amount" id="amount" name="amount" 
                                className="form-control form-field"
                                parser={val => (parseFloat(val) || 0)}
                                validators= {{
                                    isNumber, positive
                                }}
                    />
                    <Errors
                        className="text-danger"
                        model=".balance"
                        show="touched"
                        messages={{
                            isNumber: 'Must be numbers. ',
                            positive: 'Must be positive. '
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseTransfer}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Modal.Footer>
                </LocalForm>
                </Modal>
                <Table />
                
                </>
            )
        } else {
            return (<div></div>);
        }
    
    }
}

const mapStateToProps = (state) => {
    return {
        jwt: state.JWT,
        transferStatus: state.transferStatus,
        withdrawDepositStatus: state.withdrawDepositStatus
    }
}

const mapDispatchToProps = (dispatch) => () => {
    return {
        deposit: bindActionCreators(deposit, dispatch),
        withdraw: bindActionCreators(withdraw, dispatch),
        transfer: bindActionCreators(tranfer, dispatch),
        transferState: bindActionCreators(transferState, dispatch),
        getMe: bindActionCreators(getMe, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);