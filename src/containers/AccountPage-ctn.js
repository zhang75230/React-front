import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AccountView from './AccountView-ctn';
import AccountCard from '../components/AccountCard';
import Profile from './Profile-ctn';
import AddAAccountForm from './AddAAccountForm-ctn';
import AccHolderForm from './AccHolderForm-ctn';
import Logout from '../components/LogoutBtn';

import { registerAccountHolder, logout, addAAccount, selectAccount } from '../actions/actions';

import '../styles/accounts.css';

const mockData = null;

class Account extends Component {
    constructor(props) {
        super(props);

        this.handleRegisterAccountHolder = this.handleRegisterAccountHolder.bind(this);
        this.handleSelectAccount = this.handleSelectAccount.bind(this);
    }

    handleSelectAccount(accountNumber) {
        this.props.selectAccount(accountNumber);
        // console.log(e.target);
    }

    renderAccountCard() {
        const { checkings, savings, cds } = this.props;

        const checkingArray = checkings.map(acc => {
            return <AccountCard id={acc.accountNumber} 
                handleSelectAccount={this.handleSelectAccount}  
                accountType="checking" balance={acc.balance} 
                isSelected = {acc.accountNumber === this.props.currentSelectedAccount}
                />
        });

        const savingsArray = savings.map(acc => {
            return <AccountCard 
            id={acc.accountNumber} 
            handleSelectAccount={this.handleSelectAccount} 
            accountType="saving" balance={acc.balance} 
            isSelected = {acc.accountNumber === this.props.currentSelectedAccount}
            />
        });

        const cdArray = cds.map(acc => {
            return <AccountCard 
            id={acc.accountNumber} 
            handleSelectAccount={this.handleSelectAccount} 
            accountType="cd" balance={acc.balance} 
            isSelected = {acc.accountNumber === this.props.currentSelectedAccount}
            />
        });

        return [...checkingArray, ...savingsArray, ...cdArray];
    }

    handleRegisterAccountHolder(values) {
        this.props.registerAccountHolder(values, this.props.jwt);
    }

    getCurrentSelectedAccount() {
        const { checkings, savings, cds } = this.props;

        let selectedAccount = checkings.find(acc => acc.accountNumber == this.props.currentSelectedAccount);
        if (selectedAccount) {
            return ({
                acc: selectedAccount,
                accountType: 'checking'
            });
        }

        selectedAccount = savings.find(acc => acc.accountNumber == this.props.currentSelectedAccount);
        if (selectedAccount) {
            return ({
                acc: selectedAccount,
                accountType: 'saving'
            });
        }
        
        selectedAccount = cds.find(acc => acc.accountNumber == this.props.currentSelectedAccount);
        if (selectedAccount) {
            return ({
                acc: selectedAccount,
                accountType: 'cd'
            });
        }

        return null;
    }

    render() {
        /*
        Can't access this route without having a jwt props
        uncomment if statement below when you start to hookup REST call
        */
        if (!this.props.jwt) {
            this.props.history.push('/');
        }

        /**
         * First time customer will need to create an Account Holder infomation
         */
        if (!this.props.cds) {
            return (
                <>
                <Header mapType="accountmap" currentTab="Account"/>
                <div className ="beautify-height">
                    <AccHolderForm handleRegister={this.handleRegisterAccountHolder}/>
                </div>
                <Footer />
                </>
            )
        }

        const currentSelectedAccount = this.getCurrentSelectedAccount();
        return (
            <div>
            <Header mapType="accountmap" currentTab="Account"/>
                <div className="container main-view beautify-height">
                    <div className="function-ctn d-flex justify-content-center">
                        <div className="ctn"><Profile /></div>
                        <div className="ctn"><AddAAccountForm /></div>
                        <div className="ctn"><Logout logout={this.props.logout}/></div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            {this.renderAccountCard()}
                        </div>
                        <div className="col-md-9">
                           <AccountView currentAccount={currentSelectedAccount}/>
                        </div>
                    </div>
                </div>
            <Footer />
            </div>);
    }
}

// TransactionForm-ctn <TransactionForm />

const mapStateToProps = (state) => {
    return ({
        jwt: state.JWT,
        checkings: state.checkings,
        savings: state.savings,
        cds: state.cds,
        currentSelectedAccount: state.currentSelectedAccount
    })
}

const maptDispatchToProps = (dispatch) => () => {
    return ({
        registerAccountHolder: bindActionCreators(registerAccountHolder, dispatch),
        logout: bindActionCreators(logout, dispatch),
        addAAccount: bindActionCreators(addAAccount, dispatch),
        selectAccount: bindActionCreators(selectAccount, dispatch)
    })
}

export default connect(mapStateToProps, maptDispatchToProps)(Account);