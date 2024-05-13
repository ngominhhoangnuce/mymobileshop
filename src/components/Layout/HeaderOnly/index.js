import Header from "./Header";
import Navbar from "./Navbar";
import classNames from "classnames/bind";
import styles from "./HeaderOnly.module.scss";

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Navbar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
