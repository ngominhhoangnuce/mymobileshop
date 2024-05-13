import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShop,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Navbar() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleNavigate = (route) => {
    // Thực hiện điều hướng tới route
    window.location.href = route;
  };

  return (
    <aside className={cx("wrapper")}>
      <div className={cx("header")}>
        <span className={cx("header-text")}>Menu</span>
        <div className={cx("icon-wrapper")} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className={cx("icon")} />
        </div>
      </div>
      {isMenuVisible && (
        <div className={cx("menu")}>
          <ul>
            <li
              className={cx("menu-item")}
              onClick={() => handleNavigate("/")}
            >
              {" "}
              {/* Gọi hàm handleNavigate khi click vào mục "Shop" */}
              <FontAwesomeIcon icon={faShop} className={cx("item-icon")} />
              Shop
            </li>
            <li
              className={cx("menu-item")}
              onClick={() => handleNavigate("/cart")}
            >
              {" "}
              {/* Gọi hàm handleNavigate khi click vào mục "Cart" */}
              <FontAwesomeIcon
                icon={faCartShopping}
                className={cx("item-icon")}
              />
              Cart
            </li>
            <li
              className={cx("menu-item")}
              onClick={() => handleNavigate("/profile")}
            >
              {" "}
              {/* Gọi hàm handleNavigate khi click vào mục "My Profile" */}
              <FontAwesomeIcon icon={faUser} className={cx("item-icon")} />
              My Profile
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}

export default Navbar;
