// src/components/NavBar/NavBar.jsx

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';

const NavBar = ({ handleSignout }) => {
  const {user} = useContext(UserContext);
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
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
    </>
  );
};
export default NavBar;
