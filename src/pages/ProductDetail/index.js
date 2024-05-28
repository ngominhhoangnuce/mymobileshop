import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductDetail.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0); // State to track cart count
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Thực hiện các thao tác khi nhấp vào nút "Mua Ngay" ở đây
    console.log("Mua Ngay");
    // Chờ 5 giây trước khi chuyển hướng
    setTimeout(() => {
      navigate("/cart");
    }, 500); //độ trễ
  };

  const handleAddToCart = () => {
    // Thực hiện các thao tác khi nhấp vào nút "Thêm vào Giỏ Hàng" ở đây
    setTimeout(() => {
      setCartCount(cartCount + 1);
      console.log("Thêm vào Giỏ Hàng");
    }, 200); // Thực thi sau 500ms (0.5 giây)
  };
  const handleCartIconClick = () => {
    navigate("/cart");
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7202/api/Product/Get/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Đã có lỗi xảy ra: {error.message}</p>;
  }

  return (
    <div className={cx("product-detail")}>
      <div>
        <header className={cx("productdetail-header")}>
          <div className={cx("productdetail-top")}>
            <h1>Shop</h1>
          </div>
          <div className={cx("productdetail-bottom")}>
            <h1>Shop/Product</h1>
            <div className={cx("search-container")}>
              <div className={cx("icons")}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={cx("iconfaCartShopping")}
                  onClick={handleCartIconClick}
                />
                {cartCount > 0 && (
                  <span className={cx("cart-count")}>{cartCount}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className={cx("product-detail-page")}>
          <img
            src={product.image}
            alt={product.name}
            className={cx("product-image")}
          />
          <div className={cx("detail")}>
            <h1>{product.name}</h1>
            <div className={cx("description")}>
              <p>{product.detail}</p>
              <p className={cx("price")}>Giá: {product.price} VND</p>
            </div>
            <div className={cx("rating")}>
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={cx("star-icon", {
                    yellow: index < product.rating,
                  })}
                />
              ))}
            </div>
            <div className={cx("button-container")}>
              <button className={cx("buy-now-button")} onClick={handleBuyNow}>
                Mua Ngay
              </button>
              <button
                className={cx("add-to-cart-button")}
                onClick={handleAddToCart}
              >
                Thêm vào Giỏ Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
