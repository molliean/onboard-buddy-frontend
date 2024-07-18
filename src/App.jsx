// src/App.jsx

import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';

import * as authService from '../src/services/authService'; 
import { UserProvider, UserContext } from './Contexts/UserContext';

const App = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <UserProvider>
        <NavBar handleSignout={handleSignout} />
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} /> : <Landing />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          {user && <Route path="/dashboard" element={<Dashboard user={user} />} />}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
