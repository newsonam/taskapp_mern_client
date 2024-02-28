import React, { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import './style.css';

function Home() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userData.user)
            navigate("/login");
     // eslint-disable-next-line       
    }, [userData]);
    return (
        <div className='home-wrapper'>
            {userData.user ? (
                <>
                    
                <div className='create-link-wrapper'>
                <Link
                    to="/create"

                >
                    <button className="btn btn-create btn-lg fw-bold">Create Task</button>
                </Link>

                <Link
                    to="/show"

                >
                    <button className="btn btn-show btn-lg fw-bold">Show Tasks</button>
                </Link>
                </div>
            </>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
}
export default Home;