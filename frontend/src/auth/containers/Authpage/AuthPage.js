import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import './AuthPage.css'

const AuthPage = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = () => {
    setIsAuth((prevAuth) => !prevAuth);
  };

  return (
    <div id='form-container'>
      <button style={{ "fontSize": "50px" }} onClick={handleAuth}>
        CHANGE
      </button>
      {isAuth ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default AuthPage;
