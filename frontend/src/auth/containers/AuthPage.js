import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [isAuth, setIsAuth] = useState(true);

  const handleAuth = () => {
    setIsAuth((prevAuth) => !prevAuth);
  };

  return (
    <div className = "h-screen" id="form-container">
      {isAuth ? (
        <LoginForm handleClick={handleAuth} />
      ) : (
        <SignupForm handleClick={handleAuth} />
      )}
    </div>
  );
};

export default AuthPage;
