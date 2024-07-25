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
        console.log(data, " <-- data from express")
        const userBoards = data.filter((board)=>board?.owner?._id===user._id)
        console.log(userBoards)
        setBoards(userBoards)
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
    console.log(newBoard, '<-- new board details')
    setBoards([...boards, newBoard])
    console.log(boardFormData, '<-- board form data')
    navigate('/')
  }

  async function handleAddTask(boardId, taskFormData) {
    console.log({ boardId, taskFormData }, '<-- task form data before API call');
    const newTask = await boardService.createTask(boardId, taskFormData);
    console.log(newTask)
    const updatedBoards = boards.map((board) => {
      if (board._id === taskFormData.boardId) {
        console.log(board)
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

  async function handleDeleteTask(boardId, taskId) {
    try {
      await boardService.deleteTask(boardId, taskId);
      const updatedBoards = boards.map((board) => {
        if (board._id === boardId) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task._id !== taskId),
          };
        } else {
          return board;
        }
      });
      setBoards(updatedBoards);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateTask(boardId, taskId, taskFormData) {
    try {
      const updatedTask = await boardService.updateTask(boardId, taskId, taskFormData);
      const updatedBoards = boards.map((board) => {
        console.log(board)
        if (board._id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task._id === taskId) {
                return updatedTask;
              } else {
                return task;
              }
            }),
          };
        } else {
          return board;
        }
      });
      setBoards(updatedBoards);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div >
      <UserProvider loggedUser={user}>
        <NavBar handleSignout={handleSignout} boards={boards}/>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} boards={boards} />} />
              <Route path='/boards/new' element={<BoardForm handleAddBoard={handleAddBoard}/>} />
              <Route path='/boards/:boardId' element={<BoardDetails handleDeleteBoard={handleDeleteBoard} />}/>
              <Route path="/boards/:boardId/tasks/new" element={<TaskForm handleAddTask={handleAddTask}/>} /> 
              <Route path="/boards/:boardId/tasks/:taskId/edit" element={<TaskForm handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask}/>}/>
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />



        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
