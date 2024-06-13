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
  const [isMenuVisible, setMenuVisible] = useState(true); // Đặt trạng thái mặc định là true để menu luôn hiển thị

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible); // Thay đổi trạng thái hiển thị của menu khi click vào icon-wrapper
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
      {isMenuVisible && ( // Chỉ hiển thị menu nếu isMenuVisible là true
        <div className={cx("menu")}>
          <ul>
            <li className={cx("menu-item")} onClick={() => handleNavigate("/")}>
              <FontAwesomeIcon icon={faShop} className={cx("item-icon")} />
              Shop
            </li>
            <li
              className={cx("menu-item")}
              onClick={() => handleNavigate("/cart")}
            >
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
