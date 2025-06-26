"use client";

import { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
// import Image from "next/image";
import { Check } from "lucide-react";
import Styles from "./Promotions.module.css";

export default function PromotionsPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  // Mock promotion data
  const promotions = [
    {
      id: "promo1",
      code: "VietMobile10",
      discount: "10%",
      description: "Giảm 10% cho tất cả sản phẩm",
      validUntil: "31/12/2023",
      applicableProducts: "all",
      minOrder: 1000000,
    },
    {
      id: "promo2",
      code: "IPHONE15",
      discount: "2.000.000₫",
      description: "Giảm 2 triệu khi mua iPhone 15 series",
      validUntil: "15/11/2023",
      applicableProducts: "phones",
      minOrder: 0,
    },
    {
      id: "promo3",
      code: "TABLET500K",
      discount: "500.000₫",
      description: "Giảm 500K khi mua tablet bất kỳ",
      validUntil: "30/11/2023",
      applicableProducts: "tablets",
      minOrder: 0,
    },
    {
      id: "promo4",
      code: "FREESHIP",
      discount: "Miễn phí vận chuyển",
      description: "Miễn phí vận chuyển cho đơn hàng từ 500K",
      validUntil: "31/12/2023",
      applicableProducts: "all",
      minOrder: 500000,
    },
  ];

  // Mock featured products for each promotion
  const featuredProducts = {
    all: [
      {
        id: "1",
        name: "iPhone 15 Pro",
        price: 27990000,
        image: "/images/phones/iphone15pro.png",
        category: "phones",
      },
      {
        id: "2",
        name: "iPad Pro M2",
        price: 23990000,
        image: "/images/tablets/ipad-pro.png",
        category: "tablets",
      },
      {
        id: "3",
        name: "AirPods Pro 2",
        price: 5990000,
        image: "/images/headphones/airpods-pro.png",
        category: "headphones",
      },
    ],
    phones: [
      {
        id: "1",
        name: "iPhone 15 Pro",
        price: 27990000,
        image: "/images/phones/iphone15pro.png",
        category: "phones",
      },
      {
        id: "p2",
        name: "Samsung Galaxy S24",
        price: 22990000,
        image: "/images/phones/samsung-s24.png",
        category: "phones",
      },
    ],
    tablets: [
      {
        id: "t1",
        name: "iPad Pro M2",
        price: 23990000,
        image: "/images/tablets/ipad-pro.png",
        category: "tablets",
      },
      {
        id: "t2",
        name: "Samsung Galaxy Tab S9",
        price: 19990000,
        image: "/images/tablets/galaxy-tab.png",
        category: "tablets",
      },
    ],
  };

  const copyToClipboard = (code, promoId) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(promoId);
      setTimeout(() => {
        setCopiedCode(null);
      }, 3000);
    });
  };

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Khuyến Mãi Đặc Biệt</h1>
      <p className={Styles.subtitle}>
        Khám phá các ưu đãi hấp dẫn từ VietMobile
      </p>

      <div className={Styles.promotionsList}>
        {promotions.map((promo) => (
          <div key={promo.id} className={Styles.promotionCard}>
            <div className={Styles.promotionHeader}>
              <div className={Styles.promotionCode}>{promo.code}</div>
              <div className={Styles.promotionDiscount}>{promo.discount}</div>
            </div>
            <div className={Styles.promotionBody}>
              <h3 className={Styles.promotionTitle}>{promo.description}</h3>
              <div className={Styles.promotionDetails}>
                <p>Hiệu lực đến: {promo.validUntil}</p>
                {promo.minOrder > 0 && (
                  <p>
                    Đơn hàng tối thiểu: {promo.minOrder.toLocaleString("vi-VN")}
                    ₫
                  </p>
                )}
              </div>
            </div>
            <div className={Styles.promotionProducts}>
              <h4 className={Styles.productsTitle}>Sản phẩm áp dụng:</h4>
              <div className={Styles.productsList}>
                {featuredProducts[promo.applicableProducts].map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={Styles.productItem}
                  >
                    <div className={Styles.productImage}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className={Styles.productInfo}>
                      <span className={Styles.productName}>{product.name}</span>
                      <span className={Styles.productPrice}>
                        {product.price.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </Link>
                ))}
                {promo.applicableProducts === "all" && (
                  <Link to="/category/all" className={Styles.viewAllLink}>
                    Xem tất cả
                  </Link>
                )}
              </div>
            </div>
            <button
              className={Styles.copyButton}
              onClick={() => copyToClipboard(promo.code, promo.id)}
            >
              {copiedCode === promo.id ? (
                <>
                  <Check className={Styles.copyIcon} />
                  Đã sao chép
                </>
              ) : (
                "Sao chép mã"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
