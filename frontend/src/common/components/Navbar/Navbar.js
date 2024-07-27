import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from '../../../images/logo.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src = {logo} alt = "a logo of a plate with knife and fork crossed on top"/>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/recipe">Recipe</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/create-recipe">Create Recipe</Link>
          </li>
          <li>
            <Link to="/search">Discover</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;