import React, { createContext, useState, useEffect } from "react";

// creates an authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false); // tracks if the user is authenticated
  const [user, setUser] = useState(null); // stores user profile information, object 
  const [userId, setUserId] = useState(null); // stores user ID 

  // Check for existing token and email in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setIsAuth(true); 
      fetchUserProfile(email); // fetch user profile based on email
    }
  }, []);

  // updates user state with new profile information
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // handle user login, storing token and email in localStorage
  const login = (token, email) => {
    localStorage.setItem("token", token); 
    localStorage.setItem("email", email); 
    setIsAuth(true); 
    fetchUserProfile(email); 
  };

  // fetches the user profile from the server using the email
  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5001/user/email/${encodeURIComponent(email)}`, // requests user profile by email
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data.user); 
        setUserId(data.user._id); 
      } else {
        console.log("Error retrieving user profile", data.message);
      }
    } catch (error) {
      console.log("Error retrieving user profile", error);
    }
  };

  // handles user logout by clearing localStorage and resetting states
  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("email"); 
    setIsAuth(false); 
    setUser(null); 
    setUserId(null); 
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, userId, login, logout, updateUser }}>
      {children} 
    </AuthContext.Provider>
  );
};