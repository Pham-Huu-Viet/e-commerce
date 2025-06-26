"use client";

import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const slides = [
    {
      id: 1,
      image: "/images/hero.png",
      alt: "Tech devices showcase",
    },
    {
      id: 2,
      image: "/images/phones/iphone15pro.png",
      alt: "iPhone 15 Pro",
    },
    {
      id: 3,
      image: "/images/tablets/ipad-pro.png",
      alt: "iPad Pro M2",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    // Auto slide
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  return (
    <section className={Styles.hero}>
      <div className={Styles.container}>
        <div className={Styles.content}>
          <h1 className={Styles.title}>
            Công nghệ mới nhất cho cuộc sống hiện đại
          </h1>
          <p className={Styles.description}>
            Khám phá bộ sưu tập sản phẩm công nghệ chính hãng với giá ưu đãi và
            dịch vụ hậu mãi tốt nhất.
          </p>
          <div className={Styles.actions}>
            <Link to="/category/phones" className={Styles.primaryButton}>
              Mua sắm ngay
            </Link>
            <Link to="/promotions" className={Styles.secondaryButton}>
              Xem khuyến mãi
            </Link>
          </div>
        </div>

        <div className={Styles.carousel}>
          <div
            className={Styles.carouselInner}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className={Styles.slide}>
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  className={Styles.heroImage}
                />
              </div>
            ))}
          </div>

          <button
            className={`${Styles.carouselControl} ${Styles.prev}`}
            onClick={prevSlide}
          >
            <ChevronLeft />
          </button>
          <button
            className={`${Styles.carouselControl} ${Styles.next}`}
            onClick={nextSlide}
          >
            <ChevronRight />
          </button>

          <div className={Styles.indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${Styles.indicator} ${
                  currentSlide === index ? Styles.active : ""
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
