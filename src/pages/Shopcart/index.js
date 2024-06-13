import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  removeAllFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "src/actions/cartActions";

import classNames from "classnames/bind";
import styles from "./Shopcart.module.scss";
import { calculateSubtotal, calculateTotal } from "src/reducers/cartReducer";

const cx = classNames.bind(styles);

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllFromCart());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Tính giá tiền tạm tính và tổng thanh toán
  const subtotal = calculateSubtotal(cartItems);
  const total = calculateTotal(cartItems);

  return (
    <div className={cx("cart-container")}>
      <header className={cx("cart-header")}>
        <h1>Cart</h1>
      </header>
      <div className={cx("cart-content")}>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className={cx("cart-item")}>
                  <div className={cx("item-details")}>
                    <img
                      src={`https://localhost:7202/images/iphone1.jpg`}
                      alt={item.name}
                      className={cx("item-image")}
                    />
                    <div className={cx("details")}>
                      <span className={cx("item-name")}>{item.name}</span>
                      <span className={cx("item-description")}>
                        {item.detail}
                      </span>
                      <span className={cx("item-price")}>{item.price} VND</span>

                      <div className={cx("item-quantity")}>
                        <button
                          className={cx("quantity-button")}
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className={cx("quantity-value")}>
                          {item.quantity}
                        </span>
                        <button
                          className={cx("quantity-button")}
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className={cx("remove-button")}
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
            <div className={cx("total-section")}>
              <p>SubTotal: {subtotal.toFixed(2)} VND</p>
              <p>Tax: {(subtotal * 0.1).toFixed(2)} VND</p>
              <p className={cx("total-price")}>Total: {total.toFixed(2)} VND</p>
            </div>
            <button
              className={cx("remove-all-button")}
              onClick={handleRemoveAllFromCart}
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
