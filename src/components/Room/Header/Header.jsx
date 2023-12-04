import React from "react";
import "./Header.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="leave justify-content-end">
        <button
          className="btn btn-outline-danger"
        >
          Leave
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
