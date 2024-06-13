import React, { useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "src/actions";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductItem.scss";

const cx = classNames.bind(styles);

const ProductItem = ({ product, addToCart }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <li className={cx("product-item")}>
      <div className={cx("product-info")}>
        {product.name} - {product.price} VND
      </div>
      <div className={cx("product-actions")}>
        <button onClick={handleAddToCart} disabled={showMessage}>
          {showMessage ? "Đã mua" : "Mua ngay"}
        </button>
        {showMessage && (
          <p className={cx("success-message")}>Thêm vào giỏ hàng thành công</p>
        )}
        <Link to="/cart" className={cx("link-to-cart")}>
          Đến giỏ hàng
        </Link>
      </div>
    </li>
  );
};

export default connect(null, { addToCart })(ProductItem);
