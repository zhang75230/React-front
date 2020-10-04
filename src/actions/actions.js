import ActionType from './actionType';
import {APIs} from './API';
/*
Register page related actions
 */
export const registerUser = (body) => {
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body),
        redirect: 'follow'
      };

    return dispatch => {
        dispatch(updateRegisterStatus('PENDING'))
        fetch(APIs.REGISTER_LINK, myInit)
        .then(response => { 
            if (response.status === 201) {
                dispatch(updateRegisterStatus('SUCCESS'));
            } else {
                dispatch(updateRegisterStatus('FAILED'));
            }

            return response.json();
        })
        .then(json => {
            console.log(json);
           
            
        })
    }
}

export const updateRegisterStatus = (status) => {
    return ({
        type: ActionType.REGISTER_STATUS,
        payload: status
    })
}

/*
Sign in related actions
*/
export const signIn = (credentials) => {
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credentials),
        redirect: 'follow'
      };
    return dispatch => {
        fetch(APIs.SIGNIN_LINK, myInit)
        .then(response => { 
            if (response.status !== 200) {
                dispatch(updateLoginStatus('FAILED'));
            }

            return response.json();
        })
        .then(data=> {
            if (data.acc) {
                const {id,firstName,middleName,lastName,ssn, email} = data.acc;
                const {checkingAccounts, savingsAccounts, cdaccounts} = data.acc;

                dispatch(addProfile({
                    id,
                    firstName,
                    middleName,
                    lastName,
                    ssn,
                    email
                }))
                dispatch(addSavings(savingsAccounts));
                dispatch(addCheckings(checkingAccounts));
                dispatch(addCDs(cdaccounts));
            }

            if (data.jwt) {
                dispatch(updateJWT(data.jwt));

                dispatch(updateLoginStatus('SUCCESS'));
            }
            return data;
        });
    }
}

export const updateLoginStatus = (status) => {
    return ({
        type: ActionType.LOGIN_STATUS,
        payload: status
    })
}

export const updateJWT = (data) => {
    return ({
        type: ActionType.JWT,
        payload: data
    })
}

export const addProfile = (data) => {
    return ({
        type: ActionType.ADD_PROFILE,
        payload: data
    })
}

const addCheckings = (data) => {
    return ({
        type: ActionType.ADD_CHECKINGS,
        payload: data
    })
}

const addSavings = (data) => {
    return ({
        type: ActionType.ADD_SAVINGS,
        payload: data
    })
}

const addCDs = (data) => {
    return ({
        type: ActionType.ADD_CDS,
        payload: data
    })
}

/*
* Register AccountHolder related actions
*/

export const registerAccountHolder = (data, jwt) => {
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*'
          },
        body: JSON.stringify(data),
        redirect: 'follow'
      };
    return dispatch => {
        dispatch(updateAccHolderRegisterStatus('PENDING'));
        fetch(APIs.REGISTER_ACCOUNT_HOLDER, myInit)
        .then(response => { 
            if (response.status !== 201) {
                dispatch(updateAccHolderRegisterStatus('FAILED'));
            }

            return response.json();
        })
        .then(data=> {
            if (data) {
                console.log(data);
                const {id,firstName,middleName,lastName,ssn, email} = data;
                const {checkingAccounts, savingsAccounts, cdaccounts} = data;

                dispatch(addProfile({
                    id,
                    firstName,
                    middleName,
                    lastName,
                    ssn,
                    email
                }))
                dispatch(addSavings(savingsAccounts));
                dispatch(addCheckings(checkingAccounts));
                dispatch(addCDs(cdaccounts));

                dispatch(updateAccHolderRegisterStatus('SUCCESS'));
            }
        })
        .catch(error => console.log('error', error));;
    }
}

const updateAccHolderRegisterStatus = (status) => {
    return ({
        type: ActionType.REGISTER_ACCOUNTHOLDER_STATUS,
        payload: status
    })
}

/**
 * Log out
 */

export const logout = () => {
     return({
         type: ActionType.LOG_OUT
     })
 }

 /*
 ADD ACCOUNT, hasn't implement add a cd account
 */

 export const addAAccount = ({balance, accType}, jwt) => {
    let link = '';
    let action;
    switch(accType) {
        case 'checking':
            link = APIs.ADD_CHECKING_ACCOUNT;
            action = addAChecking;
            break;
        case 'saving':
            link= APIs.ADD_SAVING_ACCOUNT;
            action = addASaving;
            break;
        default:
            break;
    }


    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*'
          },
        body: JSON.stringify({
            balance
        }),
        redirect: 'follow'
      };
    return dispatch => {
        fetch(link, myInit)
        .then(response => { 
            if (response.status !== 200) {
                console.log('Error')
            }

            return response.json();
        })
        .then(data=> {
            if (data.accountNumber) {
                dispatch(action(data));
            }
        })
        .catch(error => console.log('error', error));;
    }
 }

 const addAChecking = (data) => {
     return {
         type: ActionType.ADD_A_CHECKING,
         payload: data
     }
 }

 const addASaving = (data) => {
    return {
        type: ActionType.ADD_A_SAVING,
        payload: data
    }
 }

 /* select a account */
export const selectAccount = (accountNumber) => {
    return {
        type: ActionType.SELECT_ACCOUNT,
        payload: accountNumber
    }
 }

 /**
  * Transaction related actions  
  */
 export const deposit = ({amount, accountNumber, accountType}, jwt) => {
    let action;
    switch(accountType) {
        case 'checking':
            action = updateCheckings;
            break;
        default:
            action = updateSavings;
            break;
    }
    const myInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*'
          },
        body: JSON.stringify({
            amount
        }),
        redirect: 'follow'
      };
    return dispatch => {
        dispatch(withdrawDepositStatus('PENDING'));
        fetch(`${APIs.DEPOSIT}/${accountNumber}`, myInit)
        .then(response => { 
            if (response.status !== 200) {
                console.log('Error')
            }

            return response.json();
        })
        .then(data=> {
            if (data.accountNumber) {
                dispatch(action(data));
                dispatch(withdrawDepositStatus(''));
            }
        })
        .catch(error => console.log('error', error));;
    }
 }

 export const withdraw = ({amount, accountNumber, accountType}, jwt) => {
    let action;
    switch(accountType) {
        case 'checking':
            action = updateCheckings;
            break;
        case 'saving':
            action = updateSavings;
            break;
        default:
            break;
    }

    const myInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*'
          },
        body: JSON.stringify({
            amount
        }),
        redirect: 'follow'
      };
    return dispatch => {
        dispatch(withdrawDepositStatus('PENDING'));
        fetch(`${APIs.WITHDRAW}/${accountNumber}`, myInit)
        .then(response => { 
            if (response.status !== 200) {
                console.log('Error')
            }

            return response.json();
        })
        .then(data=> {
            if (data.accountNumber) {
                dispatch(action(data));
                dispatch(withdrawDepositStatus(''));
            }
        })
        .catch(error => console.log('error', error));;
    }
 }

const updateCheckings = (updatedAccount) => {
    return ({
        type: ActionType.UPDATE_CHECKINGS,
        payload: updatedAccount
    })
}

const updateSavings = (updatedAccount) => {
    return ({
        type: ActionType.UPDATE_SAVINGS,
        payload: updatedAccount
    })
}

export const tranfer = ({originID, destID, amount}, jwt) => {
    const myInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*'
          },
        body: JSON.stringify({
            destID,
            amount
        }),
        redirect: 'follow'
      };
    return dispatch => {
        dispatch(transferState('PENDING'));
        fetch(`${APIs.TRANSFER}/${originID}`, myInit)
        .then(response => { 
            if (response.status !== 200) {
                console.log('Error with transfering money, response code ' + response.status0)
            } else {
                dispatch(transferState('SUCCESS'));
            }
        })
        .catch(error => console.log('Error in transfering money', error));;
    }
}

export const transferState = (status) => {
    return ({
        type: ActionType.TRANSFER_STATUS,
        payload: status
    })
}

export const getMe = (jwt) => {
    const myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*'
          },
        redirect: 'follow'
      };

    return dispatch => {
        fetch(APIs.GETME, myInit)
        .then(response => { 
            if (response.status !== 200) {
                console.log('Error with get me, response code ' + response.status)
            } else {
               
            }

            return response.json();
        })
        .then(data=> {
            if (data) {
                const {id,firstName,middleName,lastName,ssn, email} = data;
                const {checkingAccounts, savingsAccounts, cdaccounts} = data;

                dispatch(addProfile({
                    id,
                    firstName,
                    middleName,
                    lastName,
                    ssn,
                    email
                }))
                dispatch(addSavings(savingsAccounts));
                dispatch(addCheckings(checkingAccounts));
                dispatch(addCDs(cdaccounts));
            }

        });
    }
}

export const withdrawDepositStatus = (status) => {
    return ({
        type: ActionType.WITHDRAW_DEPOSIT_STATUS,
        payload: status
    })
}
