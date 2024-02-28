import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/layout/Header';
import Landing from './components/Landing';
import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/userContext';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateTask from './pages/CreateTask';
import ShowTasks from './pages/ShowTasks';
import EditTask from './pages/EditTask';
import ShowTaskDetails from './pages/ShowTaskDetails';
function App() {
  const [ userData, setUserData] = useState({token: undefined,user: undefined});
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({token,user: userRes.data,});
      }
    }
    checkLoggedIn();
  }, []);
  return (
    <div >
     <Router>
     <UserContext.Provider value={{ userData, setUserData }}>
     <Header />
        <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" exact element={<Landing/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<CreateTask/>} />
          <Route path="/show" element={<ShowTasks/>} />
          <Route path="/task/:id" element={<ShowTaskDetails/>} />
          <Route path="/postdetails" element={<ShowTaskDetails/>} />
          <Route path="/edit/:id" element={<EditTask/>} /> 
        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
