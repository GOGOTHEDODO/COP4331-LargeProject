import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = ({ isAuthenticated, handleLogout }) => {
  return (
    <header className="header">
      <h1 className="logo">Fitness Tracker</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/planner">Planner</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
