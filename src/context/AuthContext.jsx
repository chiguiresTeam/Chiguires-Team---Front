import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../axios/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuth({ user: user }); 
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem('user'); 
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user) => { 
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ user }); 
  };

  const logout = () => {
    localStorage.removeItem('user'); 
    setAuth({ user: null }); 
  };


  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
};