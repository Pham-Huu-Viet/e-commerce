"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
// import Link from "next/link";
import { Link } from "react-router-dom";
// import Image from "next/image";
import { ShoppingCart, Heart, X } from "lucide-react";
import { addToCart } from "../../store/slices/cartSlice";
import { showNotification } from "../../store/slices/uiSlice";
import Styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const [isWishlist, setIsWishlist] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(
      showNotification({
        message: `${product.name} đã được thêm vào giỏ hàng`,
        type: "success",
      })
    );
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    dispatch(
      showNotification({
        message: `${product.name} ${
          isWishlist ? "đã bị xóa khỏi" : "đã được thêm vào"
        } danh sách yêu thích`,
        type: isWishlist ? "info" : "success",
      })
    );
  };

  const openPopup = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.wishlistButton}>
          <button
            className={`${Styles.iconButton} ${
              isWishlist ? Styles.active : ""
            }`}
            onClick={toggleWishlist}
          >
            <Heart
              className={`${Styles.icon} ${
                isWishlist ? Styles.heartActive : ""
              }`}
            />
            <span className="sr-only">Add to wishlist</span>
          </button>
        </div>

        <div className={Styles.imageContainer} onClick={openPopup}>
          <div className={Styles.imageWrapper}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className={Styles.image}
            />
          </div>
        </div>

        <Link to={`/product/${product.id}`} className={Styles.content}>
          <h3 className={Styles.title}>{product.name}</h3>
          <p className={Styles.price}>
            {product.price.toLocaleString("vi-VN")}₫
          </p>
        </Link>

        <div className={Styles.actions}>
          <button className={Styles.button} onClick={handleAddToCart}>
            <ShoppingCart className={Styles.buttonIcon} />
            Thêm vào giỏ
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="overlay" onClick={closePopup}>
          <div className={Styles.popup} onClick={(e) => e.stopPropagation()}>
            <button className={Styles.closeButton} onClick={closePopup}>
              <X className={Styles.closeIcon} />
            </button>
            <div className={Styles.popupContent}>
              <div className={Styles.popupImageContainer}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={Styles.popupImage}
                />
              </div>
              <div className={Styles.popupInfo}>
                <h3 className={Styles.popupTitle}>{product.name}</h3>
                <p className={Styles.popupPrice}>
                  {product.price.toLocaleString("vi-VN")}₫
                </p>
                <div className={Styles.popupDescription}>
                  <p>Sản phẩm chính hãng, bảo hành 12 tháng</p>
                  <p>Giao hàng miễn phí toàn quốc</p>
                  <p>Thanh toán khi nhận hàng (COD)</p>
                </div>
                <div className={Styles.popupActions}>
                  <button
                    className={Styles.popupButton}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className={Styles.buttonIcon} />
                    Thêm vào giỏ
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className={Styles.popupViewButton}
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
