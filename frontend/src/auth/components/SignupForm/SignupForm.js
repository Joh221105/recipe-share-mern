import React from "react";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import tempImage from "../../../images/Placeholder.jpg";

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
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Left Side */}
        <div className="flex-1 bg-green-100 flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">WELCOME TO RECIPE CIRCLE</h1>
          <img alt="Sunflower placeholder" src={tempImage} className="w-full max-w-xs mx-auto mt-4" />
        </div>
        {/* Right Side */}
        <div className="flex-1 bg-white flex flex-col justify-center p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="text-lg text-gray-700">
              Username
              <input type="text" name="username" required className="mt-1 p-3 border border-gray-300 rounded-md w-full" />
            </label>
            <label className="text-lg text-gray-700">
              Email
              <input type="text" name="email" required className="mt-1 p-3 border border-gray-300 rounded-md w-full" />
            </label>
            <label className="text-lg text-gray-700">
              Password
              <input type="password" name="password" required className="mt-1 p-3 border border-gray-300 rounded-md w-full" />
            </label>
            <label className="text-lg text-gray-700">
              Confirm Password
              <input type="password" name="confirmPassword" required className="mt-1 p-3 border border-gray-300 rounded-md w-full" />
            </label>
            <button type="submit" className="w-full p-3 text-white bg-green-600 rounded-md hover:bg-green-500 transition duration-200">Sign up</button>
            <p className="text-center">Have an account?</p>
            <button type="button" onClick={props.handleClick} className="w-full p-3 text-whitehover:underline">Log in</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
