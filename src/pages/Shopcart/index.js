import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, removeAllFromCart } from "src/actions/cartActions"; // Import cả hàm xóa tất cả

import classNames from "classnames/bind"; // Import classNames/bind
import styles from "./Shopcart.module.scss"; // Import SCSS module

const cx = classNames.bind(styles); // Bind styles to classNames

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllFromCart());
  };

  return (
    <div className={cx("cart-container")}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} VND
                <button
                  className={cx("remove-button")}
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
          <button
            className={cx("remove-all-button")}
            onClick={handleRemoveAllFromCart}
          >
            Xóa tất cả
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
