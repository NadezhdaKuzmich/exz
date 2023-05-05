import React from "react";
import DropdDownUser from "./DropDownUser";
import "./NavBarUser.modules.css";

const NavBarUser = () => {
  return (
    <header>
      <div className="container">
        <div className="navbar-user">
          <span className="navbar-logo-user">
            TASKS
          </span>
          <DropdDownUser/>
        </div>
      </div>
    </header>
  );
};

export default NavBarUser;