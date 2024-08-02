import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setIsAuth(true);
      fetchUserProfile(email);
    }
  }, []);

  const login = (token, email) => {
    localStorage.setItem("token", token); // store token in localStorage
    localStorage.setItem("email", email); // store email in localStorage
    setIsAuth(true);
    fetchUserProfile(email);
  };

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5001/user/email/${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data.user); // sets user to the user profile info
        setUserId(data.user._id); // sets the user ID in state (for objectId reference in recipe creation)
      } else {
        console.log("Error retrieving user profile", data.message);
      }
    } catch (error) {
      console.log("Error retrieving user profile", error);
    }
  };

  // clears localStorage and resets states
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsAuth(false);
    setUser(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
