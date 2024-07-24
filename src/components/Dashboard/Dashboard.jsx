// src/components/Dashboard/Dashboard.jsx


import { Link } from 'react-router-dom'
import { useLoggedUser } from '../../Contexts/UserContext';
import styles from './Dashboard.module.css'


const Dashboard = ({boards}) => {
  const loggedUser = useLoggedUser();
  // console.log(loggedUser, "<--logged in user")
  // console.log(boards, '<-- boards in dashboard')

  return (
    <main>
      <h1>Welcome, {loggedUser.username}</h1>
      <h2>Your Task Boards</h2>
      <button className='create-btn'>
        <Link to="/boards/new">Create new board</Link>
      </button>
      <ul className='board-list'>
        {boards.map((board) => {
        // console.log(board, '<-- individual board');
          return (<li key={board._id} className='board-tile-card'>
             <Link to={`/boards/${board._id}`}>{board.boardName}</Link>
          </li>)
})}
      </ul>
    </main>
  );
};

export default Dashboard;
