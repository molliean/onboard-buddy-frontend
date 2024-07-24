// src/components/NavBar/NavBar.jsx

import { Link } from 'react-router-dom';
import { useLoggedUser } from '../../Contexts/UserContext';
import styles from './NavBar.module.css';

const NavBar = ({ handleSignout }) => {
  const loggedUser = useLoggedUser();
  return (
    <div className={styles.navContainer}>
      {loggedUser ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
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
