import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from '../../../images/logo.png'
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Use useNavigate directly here

  const handleLogout = () => {
    logout(); // Perform logout action
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="a logo of a plate with knife and fork crossed on top" />
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
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#FFFFEC', fontWeight: 'bold', fontSize: '1.5rem', cursor: 'pointer' }}>
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
          <li>
            <Link to="/search">Discover</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;