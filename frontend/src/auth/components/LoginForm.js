import React, { useContext } from "react";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";
import tempImage from "../../images/Placeholder.jpg";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
        login(data.token, email);
        navigate("/profile");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Left Side */}
        <div className="flex-1 bg-blue-100 flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">WELCOME BACK TO RECIPE CIRCLE</h1>
          <img alt="Sunflower placeholder" src={tempImage} className="w-full max-w-xs mx-auto mt-4" />
        </div>
        {/* Right Side */}
        <div className="flex-1 bg-white flex flex-col justify-center p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="text-lg text-gray-700">
              Email
              <input type="text" name="email" required className="mt-1 p-3 border border-gray-300 rounded-md w-full" />
            </label>
            <label className="text-lg text-gray-700">
              Password
              <input type="password" name="password" required className="mt-1 p-3 border border-gray-300 rounded-md w-full" />
            </label>
            <button type="submit" className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200">Log in</button>
            <p className="text-center">Don't have an account?</p>
            <button type="button" onClick={props.handleClick} className="w-full p-3 bg-green-600 text-white hover:underline">Sign up</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
