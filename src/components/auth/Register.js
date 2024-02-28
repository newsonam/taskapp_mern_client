import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import '../style/style.css';
function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [firstname, setfirstName] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { email, password, confirmpassword, firstname };
            await axios.post("/register", newUser);
            const loginResponse = await axios.post("/login",
                {
                    email, password, confirmpassword
                });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            navigate("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };
    return (
        <div className="register">
            <h2 className='signup-title'>SIGN UP</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <div className='input-flex'>
                <label>Display name: </label>
                <input type="text" id="firstname" onChange={e => setfirstName(e.target.value)} required />
                </div>
                <div className='input-flex'>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className='input-flex'>
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} required/>
                </div>
                <div className='input-flex'>
                <label>Confirm Password: </label>
                <input type="password" id="confirmpassword"  onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div className='btn-wrapper'>
                <input type="submit" value="Sign Up" className="btn btn-register" />
                </div>
            </form>
        </div>
    );
}
export default Register;