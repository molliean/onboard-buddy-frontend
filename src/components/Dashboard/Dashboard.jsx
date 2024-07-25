// src/components/Dashboard/Dashboard.jsx


import { Link } from 'react-router-dom'
import { useLoggedUser } from '../../Contexts/UserContext';


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
      {boards.map((board) => (
          <li key={board._id} className='board-tile-card'>
            <div>
              <h3>{board.boardName}</h3>
              <button className='card-btn'>
                <Link to={`/boards/${board._id}`}>View Board</Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
