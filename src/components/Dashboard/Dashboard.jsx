// src/components/Dashboard/Dashboard.jsx

import { UserContext, useLoggedUser } from '../../Contexts/UserContext';
import { useContext } from 'react';

const Dashboard = () => {
  const loggedUser = useLoggedUser();
  console.log(loggedUser, "<--logged in user")
  return (
    <main>
      <h1>Welcome, {loggedUser.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
};

export default Dashboard;
