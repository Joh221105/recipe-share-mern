import React from "react";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import tempImage from "../../../images/Placeholder.jpg";
import "./SignupForm.css";

const SignupForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Sign up successful");
        props.handleAuth(); // Switch to login form after successful signup
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Sign up failed");
    }
  };

  return (
    <div className="signup-form-container">
      <Navbar />
      <div className="signup-content">
        <div className="signup-left">
          <h1>WELCOME TO RECIPE CIRCLE</h1>
          <img alt="Sunflower placeholder" src={tempImage}></img>
        </div>
        <div className="signup-right">
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input type="text" name="username" required />
            </label>
            <label>
              Email
              <input type="text" name="email" required />
            </label>
            <label>
              Password
              <input type="password" name="password" required />
            </label>
            <label>
              Confirm Password
              <input type="password" name="confirmPassword" required />
            </label>
            <button type="submit">Sign up</button>
            <p>Have an account?</p>
            <button style={{ fontSize: "20px" }} onClick={props.handleClick}>
              Log in
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;