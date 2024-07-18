// src/App.jsx

import { useState, useContext, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';

import * as authService from '../src/services/authService'; 

const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <UserContext.Provider value={user}>
        <NavBar handleSignout={handleSignout} />
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} /> : <Landing />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          {user && <Route path="/dashboard" element={<Dashboard user={user} />} />}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
