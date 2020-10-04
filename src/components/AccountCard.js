import React from 'react';

const AccountCard = ({accountType, balance, handleSelectAccount, id, isSelected}) => {
    return(
        <div onClick={() => handleSelectAccount(id)} className={`bank-card `+ (isSelected ? 'selected' : '') }>
            <h2 className="account-type">{accountType}</h2>
            <p className="balance">{new Intl.NumberFormat('en-emodeng',{ style: 'currency' ,currency: 'USD'}).format(balance)}</p>
        </div>
    );
}

export default AccountCard;