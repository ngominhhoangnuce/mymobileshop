import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.scss";
import images from "src/assets";

const cx = classNames.bind(styles);

const MyProfile = () => {
  const [sex, setSex] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const homeAddress = "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi";
  const companyAddress = "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi";

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      {/* Phần 1 */}
      <div className={cx("profileContainer")}>
        <h2 className={cx("profileTitle")}>My Profile</h2>
        <div className={cx("avatar")}>
          <img src={images.profile} alt="Avatar" />
        </div>
      </div>

      {/* Phần 2 */}
      <div className={cx("userInfo")}>
        <h2>MR. USER</h2>
        <p>
          <strong>Email:</strong> user@example.com
        </p>
        <div>
          <strong>Sex:</strong>
          <label>
            <input
              type="radio"
              value="Male"
              checked={sex === "Male"}
              onChange={handleSexChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={sex === "Female"}
              onChange={handleSexChange}
            />
            Female
          </label>
        </div>
        <div>
          <strong>Date of birth:</strong>
          <input
            type="date"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <div className={cx("addressHome")}>
          <strong>Address Home:</strong> {homeAddress}
        </div>
        <div className={cx("addressCompany")}>
          <strong>Address Company:</strong> {companyAddress}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
