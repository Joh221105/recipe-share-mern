import React from "react";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import tempImage from "../../../images/Placeholder.jpg";
import "./LoginForm.css";

const LoginForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); 
        alert("Login successful");
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
            <button type="button" style={{ fontSize: "50px" }} onClick={props.handleClick}>
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