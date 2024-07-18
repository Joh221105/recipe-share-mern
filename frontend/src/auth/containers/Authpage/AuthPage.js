import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import './AuthPage.css'

const AuthPage = () => {
  const [isAuth, setIsAuth] = useState(true);

  const handleAuth = () => {
    setIsAuth((prevAuth) => !prevAuth);
  };

  return (
    <div id='form-container'>
      {isAuth ? <LoginForm handleClick ={handleAuth}/> : <SignupForm handleClick ={handleAuth}/>}
    </div>
  );
};

export default AuthPage;
