import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      fetchUserProfile(); 
    }
  }, []);

  const login = (token, email) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
    fetchUserProfile(email); 
  };

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`http://localhost:5001/user/email/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        console.log('Error retrieving user profile', data.message);
      }
    } catch (error) {
      console.log('Error retrieving user profile', error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};