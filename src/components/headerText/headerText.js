import React from 'react';
import { NavLink } from 'react-router-dom';
import './headerText.css';

function HeaderText() {
    return (
        <div className="header_bottom">
            <div className="header_bottomLinks">
                <NavLink to='/'>9.9 DEALS</NavLink>
                <NavLink to='/parcel'>DEALS Parcel</NavLink>
                <NavLink to='/product'>Gebyar Promo di Blumart</NavLink>
                <NavLink to='/product1'>Dapatkan Promo di Blu.com</NavLink>
            </div>
        </div>
    )
}

export default HeaderText;
