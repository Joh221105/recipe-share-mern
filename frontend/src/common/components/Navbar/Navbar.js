import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../images/logo.png";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Perform logout action
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="navbar">
      <img
        className="logo"
        src={logo}
        alt="a logo of a plate with knife and fork crossed on top"
      />
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuth && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create-recipe">Create Recipe</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="signout-button">
                  Sign Out
                </button>
              </li>
            </>
          )}
          {!isAuth && (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
