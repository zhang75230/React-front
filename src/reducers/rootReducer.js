import { combineReducers } from 'redux';
import { registerStatus, JWT, loginStatus, cds, checkings, savings, profile, 
    accHolderRegisterStatus, currentSelectedAccount, transferStatus, withdrawDepositStatus} from './reducers';
import ActionType from '../actions/actionType';

const appReducer = combineReducers({
    registerStatus: registerStatus,
    loginStatus,
    accHolderRegisterStatus,
    transferStatus,
    profile,
    JWT,
    savings,
    checkings,
    cds,
    currentSelectedAccount,
    withdrawDepositStatus
});

const RootReducer = (state, action) => {
    if (action.type === ActionType.LOG_OUT) {
        state = undefined
    }

    return appReducer(state, action)
  }

export default RootReducer;