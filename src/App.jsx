// src/App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';

import * as authService from '../src/services/authService';
import * as boardService from '../src/services/boardService'

import { UserProvider, UserContext } from './Contexts/UserContext';
import BoardForm from './components/Boards/BoardForm';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    async function fetchBoards() {
      try {
        const data = await boardService.index()
        console.log(data, " <-- data from express")
        setBoards(data.boards)
        // if (Array.isArray(data)) {
        //   setBoards(data.boards);
        // } else {
        //   setBoards([]);
        //   console.error("Fetched data is not an array:", data);
        // }
        setError('')
      } catch (error) {
        console.log(error)
        setError('Could not load boards. Please try again.')
      }
    }
    if (user) fetchBoards();
  }, [user])

  async function handleAddBoard(boardFormData) {
    const newBoard = await boardService.create(boardFormData);
    setBoards([newBoard, ...boards])
    console.log(boardFormData, '<-- board form data')
    navigate('/')
  }

  return (
    <>
      <UserProvider loggedUser={user}>
        <NavBar handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} boards={boards} />} />
              <Route path='/boards/new' element={<BoardForm handleAddBoard={handleAddBoard}/>} />

            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />



        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
