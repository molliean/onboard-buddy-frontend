// src/components/NavBar/NavBar.jsx

import { Link } from 'react-router-dom';
import { useLoggedUser } from '../../Contexts/UserContext';

const NavBar = ({ handleSignout }) => {
  const loggedUser = useLoggedUser();
  return (
    <>
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
    </>
  );
};
export default NavBar;
