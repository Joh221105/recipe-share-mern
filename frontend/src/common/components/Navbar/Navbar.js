import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50">
      <div className="flex items-center justify-between px-10 py-2">
        <Link to="/">
          <img
            className="h-10"
            src={logo}
            alt="a logo of a plate with knife and fork crossed on top"
          />
        </Link>
        <div className="menu">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white font-bold text-lg hover:text-blue-400">Home</Link>
            </li>
            {isAuth ? (
              <>
                <li>
                  <Link to="/profile" className="text-white font-bold text-lg hover:text-blue-400">Profile</Link>
                </li>
                <li>
                  <Link to="/create-recipe" className="text-white font-bold text-lg hover:text-blue-400">Create Recipe</Link>
                </li>
                <li>
                  <Link to="/search" className="text-white font-bold text-lg hover:text-blue-400">Search</Link>
                </li>
                <li>
                  <Link 
                    to="/" 
                    onClick={handleLogout} 
                    className="text-white font-bold text-lg hover:text-blue-400"
                  >
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="text-white font-bold text-lg hover:text-blue-400">Log in</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
