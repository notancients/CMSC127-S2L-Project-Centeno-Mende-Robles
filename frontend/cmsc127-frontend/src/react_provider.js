import React, { createContext, useState } from 'react';

const LoginContext = createContext({
  isLoggedIn: false, // Initial state
  login: () => {}, // Placeholder function
  logout: () => {}, // Placeholder function
});

function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your logic

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
    </LoginContext.Provider>
    );
}

export { LoginContext, LoginProvider };
