// src/Contexts/UserContext.jsx

import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    console.log('in UserProvider -->', user);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useLoggedUser() {
    return useContext(UserContext);
}