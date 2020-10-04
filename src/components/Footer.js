import React from 'react';

const Footer = () => {
    let year = new Date().getFullYear();
    return (
        <div className="footer">
            <p>© Huy Cam - {year} </p>
        </div>
    )
};

export default Footer;