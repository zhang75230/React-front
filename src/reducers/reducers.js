import ActionType from '../actions/actionType';

export const registerStatus = (state = '', action) => {
    switch(action.type) {
        case ActionType.REGISTER_STATUS:
            return action.payload;
        default:
            return state;
    }
}

export const loginStatus = (state ='', action) => {
    switch(action.type) {
        case ActionType.LOGIN_STATUS:
            return action.payload;
        default:
            return state;
    }
}

export const transferStatus = (state = '', action) => {
    switch(action.type) {
        case ActionType.TRANSFER_STATUS:
            return action.payload;
        default:
            return state;
    }
}

export const withdrawDepositStatus = (state = '', action) => {
    switch(action.type) {
        case ActionType.WITHDRAW_DEPOSIT_STATUS:
            return action.payload;
        default:
            return state;
    }
}

export const JWT = (state = null, action) => {
    switch (action.type) {
        case ActionType.JWT:
            return action.payload;
        default:
            return state;
    }
}

export const profile = (state = null, action) => {
    switch (action.type) {
        case ActionType.ADD_PROFILE:
            return action.payload;
        default:
            return state;
    }
}

export const checkings = (state = null, action) => {
    let newState;
    switch (action.type) {
        case ActionType.ADD_CHECKINGS:
            return action.payload;
        case ActionType.ADD_A_CHECKING:
            console.log('data',action.payload);
            newState = JSON.parse(JSON.stringify(state));
            newState.push(action.payload);
            return newState;
        case ActionType.UPDATE_CHECKINGS:
            let updatedAcc = action.payload;
            newState = JSON.parse(JSON.stringify(state));
            newState.forEach((acc, index, arr) => {
                if (acc.accountNumber === updatedAcc.accountNumber) {
                    arr[index] =updatedAcc;
                }
                return acc;
            })
            return newState;
        default:
            return state;
    }
}

export const savings = (state = null, action) => {
    let newState;
    switch (action.type) {
        case ActionType.ADD_SAVINGS:
            return action.payload;
        case ActionType.ADD_A_SAVING:
            newState = JSON.parse(JSON.stringify(state));
            newState.push(action.payload);
            return newState;
        case ActionType.UPDATE_SAVINGS:
            let updatedAcc = action.payload;
            newState = JSON.parse(JSON.stringify(state));
            newState.forEach((acc, index, arr) => {
                if (acc.accountNumber === updatedAcc.accountNumber) {
                    arr[index] =updatedAcc;
                }
                return acc;
            })
            return newState;
        default:
            return state;
    }
}

export const cds = (state = null, action) => {
    switch (action.type) {
        case ActionType.ADD_CDS:
            return action.payload;
        default:
            return state;
    }
}

export const accHolderRegisterStatus = (state = '', action) => {
    switch(action.type) {
        case ActionType.REGISTER_ACCOUNTHOLDER_STATUS:
            return action.payload;
        default:
            return state;
    }
}

export const currentSelectedAccount = (state = -1, action) => {
    switch(action.type) {
        case ActionType.SELECT_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}