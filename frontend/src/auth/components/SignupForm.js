// SignupForm.js
import React from "react";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";
import tempImage from "../../images/Placeholder.jpg";

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
        props.handleClick(); // Switch to login form after successful signup
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Sign up failed");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#D9E6D9]">
      <Navbar />
      <div className="flex flex-1">
        {/* Left Side */}
        <div className="flex-1 bg-primary-light flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold text-secondary text-center">WELCOME TO RECIPE CIRCLE</h1>
          <img alt="Sunflower placeholder" src={tempImage} className="w-full mx-auto mt-10 border-r-2 pr-10 ml-7 border-accent" />
        </div>
        {/* Right Side */}
        <div className="flex-1 bg-card-background flex flex-col justify-center p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="font-bold text-lg text-secondary">
              Username
              <input type="text" name="username" required className="font-light mt-1 p-3 border border-primary rounded-md w-full" />
            </label>
            <label className="font-bold text-lg text-secondary">
              Email
              <input type="text" name="email" required className="font-light mt-1 p-3 border border-primary rounded-md w-full" />
            </label>
            <label className="font-bold text-lg text-secondary">
              Password
              <input type="password" name="password" required className="font-light mt-1 p-3 border border-primary rounded-md w-full" />
            </label>
            <label className="font-bold text-lg text-secondary">
              Confirm Password
              <input type="password" name="confirmPassword" required className="font-light mt-1 p-3 border border-primary rounded-md w-full" />
            </label>
            <button type="submit" className="w-full p-3 text-white bg-secondary rounded-md hover:bg-[#6bbab1] transition duration-200 font-bold">Sign up</button>
            <p className="text-center">Have an account?</p>
            <button type="button" onClick={props.handleClick} className="w-full p-3 bg-primary text-white hover:bg-accent rounded-md font-bold">Log in</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
