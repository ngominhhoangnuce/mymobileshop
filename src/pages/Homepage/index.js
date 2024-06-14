import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Homepage.scss";

const cx = classNames.bind(styles);

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7202/api/Product/GetAll"
        );

        const productsData = response.data.map((product) => ({
          ...product,
          image: product.images[0]?.path || "default-image-path.jpg",
          rating: product.rating || 0, // Sử dụng rating từ dữ liệu API, nếu không có thì mặc định là 0
        }));

        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const applyFilters = (productsToFilter = products) => {
    const filtered = productsToFilter.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;
      const matchesRating =
        product.rating >= minRating && product.rating <= maxRating;
      return matchesSearch && matchesPrice && matchesRating;
    });
    setFilteredProducts(filtered);
  };

  const handleFilterClick = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const handleFilterByPrice = async () => {
    setShowFilterPopup(false); // Ẩn popup lọc giá
    try {
      setLoading(true); // Đang tải dữ liệu

      const response = await axios.get(
        "https://localhost:7202/api/Product/FilterSanphams/filter",
        {
          params: {
            minPrice,
            maxPrice,
            minRating,
            maxRating,
          },
        }
      );

      const filteredProductsData = response.data.map((product) => ({
        ...product,
        image: product.images[0]?.path || "default-image-path.jpg",
        rating: product.rating || 0, // Sử dụng rating từ dữ liệu API, nếu không có thì mặc định là 0
      }));

      setFilteredProducts(filteredProductsData);
      setLoading(false); // Dừng tải dữ liệu

      if (filteredProductsData.length === 0) {
        console.log("Không có sản phẩm nào trong khoảng giá này");
        // Hiển thị thông báo hoặc xử lý khi không có sản phẩm nào trong khoảng giá
      }
    } catch (error) {
      console.error("Lỗi khi lọc sản phẩm theo giá:", error);
      setError(error);
      setLoading(false); // Dừng tải dữ liệu
    }
  };

  const handleFilterByRating = () => {
    applyFilters(products);
    setShowFilterPopup(false);
  };

  const filterProductsBySearchTerm = (products, searchTerm) => {
    const searchTerms = searchTerm.toLowerCase().split(" ");
    return products.filter((product) => {
      return searchTerms.every((term) =>
        product.name.toLowerCase().includes(term)
      );
    });
  };

  // Tìm kiếm theo tên
  const handleSearchClick = async () => {
    setShowSearch(!showSearch); // Đảo ngược trạng thái hiển thị popup tìm kiếm
    if (!showSearch) {
      // Nếu đang ẩn popup tìm kiếm, thực hiện logic tìm kiếm
      try {
        const response = await axios.post(
          "https://localhost:7202/api/Product/GetTypeProduct",
          { name: searchTerm }
        );

        const productsData = response.data.products.map((product) => ({
          ...product,
          image: product.images[0]?.path || "default-image-path.jpg",
          rating: product.rating || 0, // Sử dụng rating từ dữ liệu API, nếu không có thì mặc định là 0
        }));

        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
        setError(error);
      }
    }
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className={cx("icons")}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={cx("iconsearch")}
                onClick={handleSearchClick}
              />
              <div className={cx("filter-icon-container")}>
                <FontAwesomeIcon
                  icon={faFilter}
                  className={cx("iconfilter")}
                  onClick={handleFilterClick}
                />
                {showFilterPopup && (
                  <div className={cx("popup")}>
                    <div className={cx("filter-group")}>
                      <h3>Giá</h3>
                      <label>
                        Từ:
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                        />
                      </label>
                      <label>
                        Đến:
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                      </label>
                      <button onClick={handleFilterByPrice}>Lọc Giá</button>
                    </div>
                    <div className={cx("filter-group")}>
                      <h3>Đánh giá</h3>
                      <label>
                        Từ:
                        <input
                          type="number"
                          value={minRating}
                          onChange={(e) => setMinRating(Number(e.target.value))}
                          min={0}
                          max={5}
                        />
                      </label>
                      <label>
                        Đến:
                        <input
                          type="number"
                          value={maxRating}
                          onChange={(e) => setMaxRating(Number(e.target.value))}
                          min={0}
                          max={5}
                        />
                      </label>
                      <button onClick={handleFilterByRating}>
                        Lọc Đánh Giá
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={cx("homepage-background")}>
        <div className={cx("products")}>
          {loading ? (
            <p> Đang tải...</p>
          ) : error ? (
            <p> Đã có lỗi xảy ra: {error.message}</p>
          ) : (
            <div className={cx("product-list")}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={cx("product-item")}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={cx("product-image")}
                    onClick={() => handleProductClick(product.id)}
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
                            gold: index < product.rating,
                          })}
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
