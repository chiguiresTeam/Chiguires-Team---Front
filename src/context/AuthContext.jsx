import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../axios/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null }); // Removed token from state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuth({ user: user }); // Only set user
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem('user'); // Only remove user
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user) => { // Removed token parameter
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ user }); // Only set user
  };

  const logout = () => {
    localStorage.removeItem('user'); // Only remove user
    setAuth({ user: null }); // Only set user to null
  };

  // Removed the axios interceptor useEffect - not needed for cookie-based auth

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
};