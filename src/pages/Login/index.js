import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thay đổi import
import classNames from "classnames/bind";
import images from "src/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.scss";

const cx = classNames.bind(styles);

const LoginForm = () => {
  const navigate = useNavigate(); // Khởi tạo navigate từ hook useNavigate
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7202/api/Login/Login",
        {
          UserName,
          Password,
        }
      );

      if (response.status === 200) {
        // Xác thực thành công
        alert("Đăng nhập thành công");
        navigate("/"); // Điều hướng tới trang homepage
      } else {
        // Xác thực thất bại
        alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error("Error:", error);
    }
  };
  return (
    <div className={cx("login-form")} aria-label="Form đăng nhập">
      <form onSubmit={handleLogin}>
        <div className={cx("logo-login")}>
          <img src={images.logologin} alt="logologin" />
        </div>
        <div className={cx("form-group")}>
          <div className={cx("input-without-icon")}>
            <FontAwesomeIcon icon={faUser} className={cx("icon")} />
            <input
              type="UserName"
              id="UserName"
              placeholder="Tên đăng nhập"
              value={UserName}
              onChange={(e) => setUsername(e.target.value)}
              className={cx("input-field")}
            />
          </div>
        </div>
        <div className={cx("form-group")}>
          <div className={cx("input-without-icon")}>
            <FontAwesomeIcon icon={faLock} className={cx("icon")} />
            <input
              type="Password"
              id="Password"
              placeholder="Mật khẩu"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className={cx("input-field")}
            />
          </div>
        </div>
        <div className={cx("form-group")}>
          <div className={cx("checkbox-forgot-Password")}>
            <label className={cx("checkbox-label")} htmlFor="remember-me">
              <input type="checkbox" id="remember-me" />
              Lưu đăng nhập
            </label>
            <a
              href="https://www.google.com/?hl=vi"
              className={cx("forgot-Password")}
            >
              Bạn quên mật khẩu?
            </a>
          </div>
        </div>
        <div className={cx("button-container")}>
          <button type="submit">Đăng nhập</button>
        </div>
        <div className={cx("register-link")}>
          <p>
            Nếu bạn có thắc mắc hay cần giải đáp, vui lòng liên hệ số điện
            thoại: <span>19001000</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
