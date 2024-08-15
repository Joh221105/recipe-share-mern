import React, { useContext } from "react";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import tempImage from "../../../images/Placeholder.jpg";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = (props) => {
  const { login } = useContext(AuthContext); // login function from AuthContext
  const navigate = useNavigate(); // initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value; // email input value
    const password = event.target.password.value; // password input value

    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // send email and password to server
      });

      const data = await response.json(); // parse response JSON
      if (response.ok) {
        login(data.token, email); // log in user with token
        navigate("/profile"); // redirect to profile page after logging in
      } else {
        alert(data.message || "Login failed"); 
      }
    } catch (error) {
      console.error("Error:", error); 
      alert("Login failed");
    }
  };

  return (
    <div className="login-form-container">
      <Navbar />
      <div className="login-content">
        <div className="login-left">
          <h1>WELCOME BACK TO RECIPE CIRCLE</h1>
          <img alt="Sunflower placeholder" src={tempImage}></img>
        </div>
        <div className="login-right">
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input type="text" name="email" required />
            </label>
            <label>
              Password
              <input type="password" name="password" required />
            </label>
            <button type="submit">Log in</button>
            <p>Don't have an account?</p>
            <button className = "sign-up-button"
              type="button"
              onClick={props.handleClick}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
