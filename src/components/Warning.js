import React from 'react';

const Warning = (props) => {
    return (
        <div class="alert alert-danger" role="alert">
            {props.text}
        </div>
    )
}

export default Warning;