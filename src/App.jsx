// src/App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import BoardDetails from './components/Boards/BoardDetails';
import TaskForm from './components/Tasks/TaskForm';

import * as authService from '../src/services/authService';
import * as boardService from '../src/services/boardService'

import { UserProvider, UserContext } from './Contexts/UserContext';
import BoardForm from './components/Boards/BoardForm';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);
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
        // console.log(data, " <-- data from express")
        setBoards(data.boards)
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

  async function handleAddTask(boardId, taskFormData) {
    console.log({ boardId, taskFormData }, '<-- task form data before API call'); // Add log here
    const newTask = await boardService.createTask(boardId, taskFormData);
    const updatedBoards = boards.map((board) => {
      if (board._id === taskFormData.boardId) {
        return {
          ...board,
          tasks: [...board.tasks, newTask],
        };
      } else {
        return board;
      }
    });
    setBoards(updatedBoards);
    setTasks([...tasks, newTask]);
    console.log({ boardId, taskFormData }, '<-- task form data after API call');
  }

  async function handleDeleteBoard(boardId) {
    try {
      await boardService.deleteBoard(boardId);
      const updatedBoards = boards.filter((board) => board._id !== boardId);
      setBoards(updatedBoards);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
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
              <Route path='/boards/:boardId' element={<BoardDetails handleDeleteBoard={handleDeleteBoard}/>}/>
              <Route path="/boards/:boardId/tasks/new" element={<TaskForm handleAddTask={handleAddTask}/>} /> 
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
