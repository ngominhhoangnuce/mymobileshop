import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "src/actions/cartActions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import { calculateCartCount } from "src/reducers/cartReducer";

const cx = classNames.bind(styles);

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null); // State lưu thông tin sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const dispatch = useDispatch(); // useDispatch để gửi action đến Redux store
  const navigate = useNavigate(); // Hook navigate từ react-router-dom
  const cartItems = useSelector((state) => state.cart.items); // Lấy danh sách sản phẩm trong giỏ hàng từ Redux store
  const cartCount = useSelector((state) => calculateCartCount(cartItems)); // Lấy tổng số lượng sản phẩm trong giỏ hàng

  useEffect(() => {
    // Hàm async để fetch dữ liệu sản phẩm từ API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7202/api/Product/Get/${productId}`
        );
        setProduct(response.data); // Cập nhật thông tin sản phẩm vào state
        setLoading(false); // Đã load thành công, không còn loading
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setError(error); // Có lỗi xảy ra, cập nhật state error
        setLoading(false); // Đã load xong (thành công hoặc thất bại)
      }
    };

    fetchProduct(); // Gọi hàm fetchProduct khi component được render và mỗi khi productId thay đổi
  }, [productId]);

  const handleBuyNow = () => {
    // Xử lý khi người dùng nhấn "Mua ngay"
    dispatch(addToCart({ ...product, quantity: 1 })); // Thêm sản phẩm vào giỏ hàng với quantity là 1
    navigate("/cart"); // Điều hướng đến trang giỏ hàng
  };

  const handleCartIconClick = () => {
    navigate("/cart"); // Điều hướng đến trang giỏ hàng khi nhấn vào biểu tượng giỏ hàng
  };

  const handleAddToCart = () => {
    // Xử lý khi người dùng nhấn "Thêm vào Giỏ Hàng"
    dispatch(addToCart({ ...product, quantity: 1 })); // Thêm sản phẩm vào giỏ hàng với quantity là 1
  };

  if (loading) {
    return <p>Đang tải sản phẩm...</p>; // Nếu đang loading, hiển thị thông báo
  }

  if (error) {
    return <p>Có lỗi xảy ra khi tải sản phẩm: {error.message}</p>; // Nếu có lỗi, hiển thị thông báo lỗi
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
            src={`https://localhost:7202/images/iphone1.jpg`}
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
};

export default ProductDetail;
