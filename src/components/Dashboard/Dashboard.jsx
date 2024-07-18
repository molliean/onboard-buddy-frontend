// src/components/Dashboard/Dashboard.jsx

import { Route, Routes } from 'react-router-dom'
import { useLoggedUser } from '../../Contexts/UserContext';
import Board from '../Boards/Boards'

const Dashboard = () => {
  const loggedUser = useLoggedUser();
  console.log(loggedUser, "<--logged in user")
  return (
    <main>
      <h1>Welcome, {loggedUser.username}</h1>
      <Routes>
        <Route path='/' element={<Board/>}></Route>
      </Routes>
    </main>
  );
};

export default Dashboard;
