import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = () => {
    setIsAuth((prevAuth) => !prevAuth);
  };

  return (
    <div>
      <button style={{ "font-size": "50px" }} onClick={handleAuth}>
        CHANGE
      </button>
      {isAuth ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default AuthPage;
