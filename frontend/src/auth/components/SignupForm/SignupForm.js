import React from "react";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import tempImage from "../../../images/Placeholder.jpg";
import "./SignupForm.css";

const SignupForm = () => {
  return (
    <div className="signup-form-container">
      <Navbar />
      <div className="signup-content">
        <div className="signup-left">
          <h1>WELCOME TO RECIPE CIRCLE</h1>
          <img alt="Sunflower placeholder" src={tempImage}></img>
        </div>
        <div className="signup-right">
          <form>
            <label>
              Email
              <input type="text" />
            </label>
            <label>
              Password
              <input type="password" />
            </label>
            <label>
              Confirm Password
              <input type="password" />
            </label>
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;