import React from "react";
import End from "../../../assets/ToolBar/end-call.svg";
import "./Header.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="end">
        <img 
          src={End}
          alt="End Button" 
        />
      </div>
    </nav>
  );
}

export default NavBar;
