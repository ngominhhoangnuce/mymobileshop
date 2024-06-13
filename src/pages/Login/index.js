import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import images from "~/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.scss"; // Đổi tên cho đúng
import { UserContext } from "../../contexts/UserContext"; // Đường dẫn tới UserContext

const cx = classNames.bind(styles);

const LoginForm = () => {
  const navigate = useNavigate();
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    // Kiểm tra xem có dữ liệu UserName và Password trong localStorage không
    const storedUserName = localStorage.getItem("UserName");
    const storedPassword = localStorage.getItem("Password");
    if (storedUserName && storedPassword) {
      setUsername(storedUserName);
      setPassword(storedPassword);
    }
  }, []);

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
        alert("Đăng nhập thành công");

        // Lưu UserName và Password vào localStorage
        localStorage.setItem("UserName", UserName);
        localStorage.setItem("Password", Password);

        setCurrentUser(true); // Cập nhật currentUser thành true
        navigate("/"); // Điều hướng tới trang homepage
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
        setCurrentUser(false); // Cập nhật currentUser thành false
      }
    } catch (error) {
      console.error("Error:", error);
      setCurrentUser(false); // Cập nhật currentUser thành false
    }
  };

  return (
    <div className={cx("login-form")} aria-label="Form đăng nhập">
      <form onSubmit={handleLogin}>
        <div className={cx("logo-login")}>
          <img src={images.logologin} alt="logologin" />
        </div>
        <div className={cx("form-group")}>
          <div className={cx("input-with-icon")}>
            <FontAwesomeIcon icon={faUser} className={cx("icon")} />
            <input
              type="text"
              id="UserName"
              placeholder="Tên đăng nhập"
              value={UserName}
              onChange={(e) => setUsername(e.target.value)}
              className={cx("input-field", "username")}
            />
          </div>
          <div className={cx("input-with-icon")}>
            <FontAwesomeIcon icon={faLock} className={cx("icon")} />
            <input
              type="password"
              id="Password"
              placeholder="Mật khẩu"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className={cx("input-field", "password")}
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
