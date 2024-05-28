import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Homepage.scss"; // Cập nhật đường dẫn nếu cần
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import axios from "axios";

const cx = classNames.bind(styles);

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7202/api/Product/GetAll"
        );
        const productsData = response.data.map((product) => ({
          ...product,
          image: product.IdImage,
          rating: 0, // Mặc định đánh giá là 0 nếu không có
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleRatingChange = (productId, rating) => {
    const productName = products.find(
      (product) => product.id === productId
    ).name;
    console.log(
      `Đã đánh giá ${rating} sao cho sản phẩm "${productName}" (ID: ${productId})`
    );

    // Cập nhật đánh giá cho sản phẩm cụ thể
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, rating };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className={cx("homepage")}>
      <header className={cx("homepage-header")}>
        <div className={cx("header-top")}>
          <h1>Shop</h1>
        </div>
        <div className={cx("header-bottom")}>
          <h1>Shop</h1>
          <div className={cx("search-container")}>
            <input
              type="text"
              placeholder="Search..."
              className={cx("search-input")}
            />
            <div className={cx("icons")}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={cx("iconsearch")}
              />
              <FontAwesomeIcon icon={faFilter} className={cx("iconfilter")} />
            </div>
          </div>
        </div>
      </header>
      <div className={cx("homepage-background")}>
        <div className={cx("products")}>
          {loading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p>Đã có lỗi xảy ra: {error.message}</p>
          ) : (
            <div className={cx("product-list")}>
              {products.map((product) => (
                <div key={product.id} className={cx("product-item")}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={cx("product-image")}
                    onClick={() => handleProductClick(product.id)} // Chuyển hướng khi click vào ảnh
                  />
                  <div className={cx("product-details")}>
                    <h3 onClick={() => handleProductClick(product.id)}>
                      {product.name}
                    </h3>

                    <p>Giá: {product.price} VND</p>
                    <div className={cx("rating")}>
                      {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          className={cx("star-icon", {
                            yellow: index < product.rating,
                          })}
                          onClick={() =>
                            handleRatingChange(product.id, index + 1)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
