import React, { useState } from "react";
import Button from "../../Buttons/Button";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./NavBarHome.modules.css";

const NavBarHome = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            TASKS
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <CloseOutlined style={{ color: "#fff" }} />
            ) : (
              <MenuOutlined style={{ color: "#fff" }} />
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contacts"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                to="/sign-in"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          <Button />
        </nav>
      </div>
    </header>
  );
};

export default NavBarHome;
