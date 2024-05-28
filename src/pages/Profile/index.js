import React, { useState } from "react";
import classNames from "classnames/bind"; // Import classNames
import styles from "./Profile.scss"; // Import file SCSS cho phần giao diện
import images from "src/assets"; // Import ảnh từ thư mục assets

const cx = classNames.bind(styles); // Kết hợp styles với classNames

const MyProfile = () => {
  const [sex, setSex] = useState("Male"); // State to hold the selected sex
  const [dateOfBirth, setDateOfBirth] = useState(""); // State to hold the date of birth
  const homeAddress = "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi"; // Default home address
  const companyAddress = "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi"; // Default company address

  const handleSexChange = (event) => {
    setSex(event.target.value); // Update the selected sex when radio button changes
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value); // Update the date of birth
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
