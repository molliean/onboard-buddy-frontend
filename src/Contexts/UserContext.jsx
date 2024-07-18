// src/Contexts/UserContext.jsx

import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children, loggedUser }) {
    // const [user, setUser] = useState('user');
    console.log('in UserProvider -->', loggedUser);
    return (
        <UserContext.Provider value={loggedUser}>
            {children}
        </UserContext.Provider>
    )
}

export function useLoggedUser() {
    return useContext(UserContext);
}