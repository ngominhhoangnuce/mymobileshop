import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <h1>Giỏ Hàng</h1>
      {/* Hiển thị thông tin sản phẩm */}
      <div>
        <p>{product.name}</p>
        <p>{product.price} VND</p>
        {/* Hiển thị các thông tin khác của sản phẩm */}
      </div>
    </div>
  );
}

export default Cart;
