import React from 'react';

const Logout = (props) => {
    return (
        <div>
            <button onClick={props.logout} className="btn btn-secondary">Log out</button>
        </div>
    )
}

export default Logout;