import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../axios/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true); // 1. Add loading state

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const storedToken = localStorage.getItem('token'); // Still get token if it exists
        setAuth({ user: user, token: storedToken });
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token'); // Ensure no "undefined" string
    }
    setAuth({ user, token: token || null });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
  };

  // Add a request interceptor to axios
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        if (auth.token) {
          config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Cleanup interceptor on component unmount
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
