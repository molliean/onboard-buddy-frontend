// src/components/NavBar/NavBar.jsx

import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLoggedUser } from '../../Contexts/UserContext';
import styles from './NavBar.module.css';

const NavBar = ({ handleSignout, boards }) => {
  const loggedUser = useLoggedUser();
  const [showBoards, setShowBoards] = useState(false);

  const toggleBoards = () => {
    setShowBoards(!showBoards);
  };

  return (
    <div className={styles.navContainer}>
      {loggedUser ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li onClick={toggleBoards} style={{ cursor: 'pointer' }}>
              My Boards
              {showBoards && (
                <ul className={styles.boardsList}>
                  {boards.map((board) => (
                    <li key={board._id}>
                      <Link to={`/boards/${board._id}`}>▶ {board.boardName}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
            
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default NavBar;
