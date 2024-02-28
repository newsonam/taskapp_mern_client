import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import '../style/style.css';
function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            navigate("/home");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };

    return (
    <div className="login">
        <h2 className='login-title'>LOGIN</h2>
        {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
        <form onSubmit={submit}>
        <div className='input-flex'>
            <label>Email: </label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className='input-flex'>
            <label>Password: </label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} required/>
            </div>
            <div className='btn-wrapper'>
            <input type="submit" value="Login" className="btn btn-login" />
            </div>
            </form>
            </div>
            );
        }
        export default Login;