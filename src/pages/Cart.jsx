"use client";

import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import Styles from "./Cart.module.css";

// Mock cart data
const initialCartItems = [
  {
    id: "p1",
    name: "iPhone 15 Pro",
    price: 27990000,
    image: "/images/phones/iphone15pro.png",
    quantity: 1,
  },
  {
    id: "h1",
    name: "AirPods Pro 2",
    price: 5990000,
    image: "/images/headphones/airpods-pro.png",
    quantity: 1,
  },
  {
    id: "a1",
    name: "Sạc dự phòng 20000mAh",
    price: 990000,
    image: "/images/accessories/powerbank.png",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === "TECHSTORE10") {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 2000000 ? 0 : 50000;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className={Styles.emptyCart}>
          <div className={Styles.emptyCartIcon}>
            <ShoppingBag size={64} />
          </div>
          <h2 className={Styles.emptyCartTitle}>Giỏ hàng trống</h2>
          <p className={Styles.emptyCartText}>
            Bạn chưa có sản phẩm nào trong giỏ hàng.
          </p>
          <Link to="/" className={Styles.continueShoppingButton}>
            <ArrowLeft className={Styles.buttonIcon} />
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className={Styles.cartContent}>
          <div className={Styles.cartItems}>
            <div className={Styles.cartHeader}>
              <div className={Styles.productColumn}>Sản phẩm</div>
              <div className={Styles.priceColumn}>Giá</div>
              <div className={Styles.quantityColumn}>Số lượng</div>
              <div className={Styles.totalColumn}>Tổng</div>
              <div className={Styles.actionColumn}></div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className={Styles.cartItem}>
                <div className={Styles.productColumn}>
                  <div className={Styles.productInfo}>
                    <div className={Styles.productImage}>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className={Styles.image}
                      />
                    </div>
                    <div className={Styles.productDetails}>
                      <Link
                        to={`/product/${item.id}`}
                        className={Styles.productName}
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={Styles.priceColumn}>
                  <div className={Styles.price}>
                    {item.price.toLocaleString("vi-VN")}₫
                  </div>
                </div>
                <div className={Styles.quantityColumn}>
                  <div className={Styles.quantityControl}>
                    <button
                      className={Styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className={Styles.icon} />
                    </button>
                    <span className={Styles.quantityValue}>
                      {item.quantity}
                    </span>
                    <button
                      className={Styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className={Styles.icon} />
                    </button>
                  </div>
                </div>
                <div className={Styles.totalColumn}>
                  <div className={Styles.itemTotal}>
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </div>
                </div>
                <div className={Styles.actionColumn}>
                  <button
                    className={Styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className={Styles.icon} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={Styles.cartSummary}>
            <div className={Styles.summaryCard}>
              <h2 className={Styles.summaryTitle}>Tóm tắt đơn hàng</h2>

              <div className={Styles.summaryDetails}>
                <div className={Styles.summaryRow}>
                  <span className={Styles.summaryLabel}>Tạm tính</span>
                  <span className={Styles.summaryValue}>
                    {subtotal.toLocaleString("vi-VN")}₫
                  </span>
                </div>
                <div className={Styles.summaryRow}>
                  <span className={Styles.summaryLabel}>Phí vận chuyển</span>
                  <span className={Styles.summaryValue}>
                    {shipping === 0
                      ? "Miễn phí"
                      : shipping.toLocaleString("vi-VN") + "₫"}
                  </span>
                </div>
                {discount > 0 && (
                  <div className={`${Styles.summaryRow} ${Styles.discountRow}`}>
                    <span className={Styles.summaryLabel}>Giảm giá</span>
                    <span className={Styles.summaryValue}>
                      -{discount.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                )}
                <div className={Styles.summaryDivider}></div>
                <div className={`${Styles.summaryRow} ${Styles.totalRow}`}>
                  <span className={Styles.summaryLabel}>Tổng cộng</span>
                  <span className={Styles.totalValue}>
                    {total.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>

              <div className={Styles.promoCodeSection}>
                <h3 className={Styles.promoTitle}>Mã giảm giá</h3>
                <div className={Styles.promoInputWrapper}>
                  <input
                    type="text"
                    className={Styles.promoInput}
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className={Styles.promoButton}
                    onClick={applyPromoCode}
                  >
                    Áp dụng
                  </button>
                </div>
                {promoCode && promoCode !== "TECHSTORE10" && (
                  <p className={Styles.promoError}>Mã giảm giá không hợp lệ</p>
                )}
                {promoApplied && (
                  <p className={Styles.promoSuccess}>
                    Đã áp dụng mã giảm giá: Giảm 10%
                  </p>
                )}
              </div>

              <button className={Styles.checkoutButton}>
                Thanh toán
                <ArrowRight className={Styles.buttonIcon} />
              </button>

              <div className={Styles.paymentMethods}>
                <p className={Styles.paymentText}>Chúng tôi chấp nhận:</p>
                <div className={Styles.paymentIcons}>
                  <div className={Styles.paymentIcon}>
                    <img
                      src="/placeholder.svg?height=30&width=40"
                      alt="Visa"
                      width={40}
                      height={30}
                    />
                  </div>
                  <div className={Styles.paymentIcon}>
                    <img
                      src="/placeholder.svg?height=30&width=40"
                      alt="Mastercard"
                      width={40}
                      height={30}
                    />
                  </div>
                  <div className={Styles.paymentIcon}>
                    <img
                      src="/placeholder.svg?height=30&width=40"
                      alt="PayPal"
                      width={40}
                      height={30}
                    />
                  </div>
                  <div className={Styles.paymentIcon}>
                    <img
                      src="/placeholder.svg?height=30&width=40"
                      alt="Momo"
                      width={40}
                      height={30}
                    />
                  </div>
                </div>
              </div>

              <Link to="/" className={Styles.continueShoppingLink}>
                <ArrowLeft className={Styles.buttonIcon} />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
