const host = "http://localhost:8081";
export const APIs = {
    REGISTER_LINK: `${host}/authenticate/createUser`,
    SIGNIN_LINK: `${host}/authenticate`,
    REGISTER_ACCOUNT_HOLDER: `${host}/Me/AccountHolder`,
    WITHDRAW: `${host}/Me/BankAccount/withdraw`,
    DEPOSIT: `${host}/Me/BankAccount/deposit`,
    ADD_CHECKING_ACCOUNT: `${host}/Me/CheckingAccounts`,
    ADD_SAVING_ACCOUNT: `${host}/Me/SavingsAccounts`,
    TRANSFER: `${host}/Me/BankAccount/transfer`,
    GETME: `${host}/Me`
}
