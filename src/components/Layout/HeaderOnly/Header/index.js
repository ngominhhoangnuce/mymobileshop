import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "src/assets";
import { UserContext } from "~/contexts/UserContext";

const cx = classNames.bind(styles);

function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo-image")}>
          <Link to="/">
            <img src={images.logo} alt="logomobileshop" />
          </Link>
        </div>
        <h1 className={cx("header-title")}>Mobile Shopping</h1>

        <div className={cx("navigation-links")}>
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>

        {currentUser ? (
          <div className={cx("logo-user")} onClick={handleUserClick}>
            <img src={images.user} alt="logouser" />
            {showDropdown && (
              <div className={cx("dropdown-menu")}>
                <ul>
                  <li onClick={handleProfileClick}>Profile</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button className={cx("button-login")} onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
