// src/components/Dashboard/Dashboard.jsx

import { UserContext } from '../../Contexts/UserContext';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const {user} = useContext(UserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
};

export default Dashboard;
