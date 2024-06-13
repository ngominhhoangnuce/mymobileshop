import Header from "./Header";
import Navbar from "./Navbar";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children, isLoggedIn }) {
  return (
    <div className={cx("wrapper")}>
      <Header isLoggedIn={isLoggedIn} />{" "}
      {/* Truyền trạng thái đăng nhập xuống Header */}
      <div className={cx("container")}>
        <Navbar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
