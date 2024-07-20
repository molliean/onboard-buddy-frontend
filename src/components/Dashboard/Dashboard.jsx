// src/components/Dashboard/Dashboard.jsx


import { Link } from 'react-router-dom'
import { useLoggedUser } from '../../Contexts/UserContext';


const Dashboard = ({boards}) => {
  const loggedUser = useLoggedUser();
  console.log(loggedUser, "<--logged in user")
  console.log(boards, '<-- boards in dashboard')

  return (
    <main>
      <h1>Welcome, {loggedUser.username}</h1>
      <h2>Your Task Boards</h2>
      <button>
        <Link to="/boards/new">Create new board</Link>
      </button>
      <ul>
        {boards.map((board) => {
        console.log(board, '<-- individual board');
          return (<li key={board._id}>
            Board: {board.boardName}
          </li>)
})}
      </ul>
    </main>
  );
};

export default Dashboard;
