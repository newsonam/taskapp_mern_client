import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import AuthOptions from '../auth/AuthOptions';
import './style.css';
class Header extends Component {
    render() {
        return (
            <header className="header">
               <h1 className="tasktitle">Task Management App</h1>
                <AuthOptions />
            </header>
        );
    }
}
export default Header;