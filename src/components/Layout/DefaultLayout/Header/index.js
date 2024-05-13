import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "src/assets";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo-image")}>
          <Link to="/">
            <img src={images.logo} alt="logomobileshop" />
          </Link>
        </div>
        <h1 className={cx("header-title")}>Mobile Shopping</h1>
        <div className={cx("logo-user")}>
          <Link to="/login">
            <img src={images.user} alt="logouser" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
