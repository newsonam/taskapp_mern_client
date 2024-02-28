import React, { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './layout/Header';
import './style/style.css';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className='landing-wrapper'>
            {/* <Header /> */}
            <div className='landingleftright'>
                <div className='landing-title'>
                    <h1>Task Management App makes it easier for teams to manage projects and tasks</h1>
                    <h5>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.</h5>
                    </div>
                    <div>
                        <img src='/img/Taskapp.png' alt="loading" className='landing-img' />
                    </div>
                
            </div>
        </div>
    );
}
export default Landing;