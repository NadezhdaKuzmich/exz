import React, { useState } from "react";
import Button from "../../Buttons/Button";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./NavBarHome.module.css";

const NavBarHome = () => {
  const { user } = useSelector((state) => state.user);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.navbar}>
          <Link to="/" className={styles.navbarLogo} onClick={closeMobileMenu}>
            TASKS
          </Link>
          {!user.username ? (
            <>
              <div className={styles.icon} onClick={handleClick}>
                {click ? (
                  <CloseOutlined style={{ color: "#fff" }} />
                ) : (
                  <MenuOutlined style={{ color: "#fff" }} />
                )}
              </div>
              <ul
                className={
                  click ? `${styles.menu} ${styles.active}` : `${styles.menu}`
                }
              >
                <li className={styles.item}>
                  <Link
                    to="/"
                    className={styles.links}
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link
                    to="/about"
                    className={styles.links}
                    onClick={closeMobileMenu}
                  >
                    About
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link
                    to="/contacts"
                    className={styles.links}
                    onClick={closeMobileMenu}
                  >
                    Contacts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sign-in"
                    className={styles.linksMobile}
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
              <Button hide="hideBtn" text="Sign in"/>
            </>
          ) : (
            <Link to="/user">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#6775d842" }}
                className={styles.avatar}
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBarHome;
