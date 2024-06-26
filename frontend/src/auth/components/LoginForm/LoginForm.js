import React from "react";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import TempImage from "../../../images/Placeholder.jpg";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="login-form-container">
      <Navbar />
      <div className="login-content">
        <div className="login-left">
          <h1>WELCOME BACK</h1>
          <img alt="Temporary sunflower" src={TempImage} />
        </div>
        <div className="login-right">
          <form id='login-form'>
            <label>
              Email
              <input type="text" />
            </label>
            <label>
              Password
              <input type="password" />
            </label>
            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;