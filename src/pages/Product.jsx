"use client";

import { useState, useEffect, useRef } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link"
import { Link, useParams } from "react-router-dom";
// import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  ChevronLeft,
  Check,
  User,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { addToCart } from "../store/slices/cartSlice";
import { showNotification } from "../store/slices/uiSlice";
import ProductCard from "../components/HomePage/ProductCard";
import Styles from "./Product.module.css";

// Mock data - in a real app, this would come from an API or database
const getProductById = (id) => {
  const allProducts = [
    {
      id: "p1",
      name: "iPhone 15 Pro",
      price: 27990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      description:
        "iPhone 15 Pro với chip A17 Pro mạnh mẽ, camera 48MP và màn hình Super Retina XDR.",
      longDescription:
        "iPhone 15 Pro đánh dấu một bước tiến lớn trong công nghệ smartphone với chip A17 Pro mạnh mẽ, hệ thống camera chuyên nghiệp 48MP và màn hình Super Retina XDR tuyệt đẹp. Thiết bị được chế tác từ titanium cấp hàng không vũ trụ, mang đến độ bền vượt trội cùng trọng lượng nhẹ hơn. Với khả năng quay video 4K ProRes và chụp ảnh định dạng ProRAW, iPhone 15 Pro là công cụ hoàn hảo cho những người sáng tạo nội dung.",
      specs: [
        "Màn hình: 6.1 inch, Super Retina XDR, 120Hz",
        "Chip: A17 Pro",
        "RAM: 8GB",
        "Bộ nhớ: 128GB/256GB/512GB/1TB",
        "Camera sau: 48MP (chính) + 12MP (góc siêu rộng) + 12MP (tele 3x)",
        "Camera trước: 12MP, Face ID",
        "Pin: 3200mAh, sạc nhanh 20W, sạc không dây MagSafe 15W",
        "Kháng nước: IP68",
        "Hệ điều hành: iOS 17",
      ],
      features: [
        "Chip A17 Pro với 6 nhân CPU và 6 nhân GPU",
        "Camera Pro 48MP với khả năng zoom quang học 3x",
        "Quay video 4K ProRes và Dolby Vision",
        "Màn hình Always-On với ProMotion 120Hz",
        "Khung viền titanium bền bỉ, nhẹ hơn",
        "Nút Action tùy chỉnh mới",
        "Cổng USB-C hỗ trợ USB 3",
      ],
      colors: ["Đen", "Trắng", "Xanh", "Titan tự nhiên"],
      rating: 4.8,
      reviews: 124,
      stock: 50,
      warranty: "12 tháng chính hãng",
      additionalImages: [
        "/images/phones/iphone15pro.png",
        "/images/phones/samsung-s24.png",
        "/images/phones/xiaomi14.png",
        "/images/phones/pixel8.png",
        "/images/phones/iphone15pro.png",
        "/images/phones/samsung-s24.png",
      ],
      reviewsList: [
        {
          id: 1,
          user: "Nguyễn Văn A",
          rating: 5,
          date: "15/03/2024",
          comment:
            "Sản phẩm tuyệt vời, camera chụp đẹp, pin trâu, màn hình sắc nét. Rất hài lòng với sản phẩm này!",
        },
        {
          id: 2,
          user: "Trần Thị B",
          rating: 4,
          date: "10/03/2024",
          comment:
            "Điện thoại đẹp, chạy mượt, camera chụp đẹp. Chỉ tiếc là giá hơi cao.",
        },
        {
          id: 3,
          user: "Lê Văn C",
          rating: 5,
          date: "05/03/2024",
          comment:
            "Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Màn hình 120Hz mượt mà, camera chụp đẹp không tưởng.",
        },
        {
          id: 4,
          user: "Phạm Thị D",
          rating: 4,
          date: "01/03/2024",
          comment:
            "Sản phẩm tốt, đáng tiền. Chỉ có điều pin không được trâu như mong đợi.",
        },
        {
          id: 5,
          user: "Hoàng Văn E",
          rating: 5,
          date: "25/02/2024",
          comment:
            "Quá xuất sắc, từ thiết kế đến hiệu năng đều hoàn hảo. Đáng đồng tiền bát gạo!",
        },
      ],
    },
    {
      id: "p2",
      name: "Samsung Galaxy S24",
      price: 22990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      description:
        "Samsung Galaxy S24 với chip Exynos 2400, camera 50MP và màn hình Dynamic AMOLED 2X.",
      longDescription:
        "Samsung Galaxy S24 là flagship mới nhất của Samsung với nhiều cải tiến đáng kể. Máy được trang bị chip Exynos 2400 mạnh mẽ, hệ thống camera 50MP với khả năng zoom quang học 3x và màn hình Dynamic AMOLED 2X sắc nét. Galaxy S24 còn được tích hợp các tính năng AI tiên tiến, giúp tối ưu hóa trải nghiệm người dùng từ chụp ảnh đến dịch thuật thời gian thực.",
      specs: [
        "Màn hình: 6.2 inch, Dynamic AMOLED 2X, 120Hz",
        "Chip: Exynos 2400",
        "RAM: 8GB",
        "Bộ nhớ: 128GB/256GB/512GB",
        "Camera sau: 50MP (chính) + 12MP (góc siêu rộng) + 10MP (tele 3x)",
        "Camera trước: 12MP",
        "Pin: 4000mAh, sạc nhanh 25W, sạc không dây 15W",
        "Kháng nước: IP68",
        "Hệ điều hành: Android 14, One UI 6.1",
      ],
      features: [
        "AI Camera với khả năng tối ưu hóa cảnh chụp",
        "Galaxy AI với các tính năng thông minh",
        "Màn hình Vision Booster cải thiện hiển thị ngoài trời",
        "Khung viền Armor Aluminum bền bỉ",
        "Kính cường lực Gorilla Glass Victus 2",
        "Hỗ trợ S Pen (bán riêng)",
        "Cập nhật phần mềm 7 năm",
      ],
      colors: ["Đen", "Trắng", "Xanh", "Tím"],
      rating: 4.7,
      reviews: 98,
      stock: 45,
      warranty: "12 tháng chính hãng",
      additionalImages: [
        "/images/phones/samsung-s24.png",
        "/images/phones/iphone15pro.png",
        "/images/phones/xiaomi14.png",
        "/images/phones/pixel8.png",
        "/images/phones/samsung-s24.png",
        "/images/phones/iphone15pro.png",
      ],
      reviewsList: [
        {
          id: 1,
          user: "Trần Văn F",
          rating: 5,
          date: "20/03/2024",
          comment:
            "Galaxy S24 là chiếc điện thoại Android tốt nhất mà tôi từng dùng. Màn hình đẹp, hiệu năng mạnh mẽ.",
        },
        {
          id: 2,
          user: "Nguyễn Thị G",
          rating: 4,
          date: "15/03/2024",
          comment:
            "Sản phẩm tốt, camera chụp đẹp, nhưng pin hơi yếu so với mong đợi.",
        },
        {
          id: 3,
          user: "Lê Minh H",
          rating: 5,
          date: "10/03/2024",
          comment:
            "Các tính năng AI rất hữu ích, đặc biệt là khả năng dịch ngôn ngữ thời gian thực.",
        },
        {
          id: 4,
          user: "Phạm Văn I",
          rating: 5,
          date: "05/03/2024",
          comment:
            "Màn hình 120Hz mượt mà, camera chụp đẹp trong mọi điều kiện ánh sáng.",
        },
      ],
    },
  ];

  return allProducts.find((product) => product.id === id);
};

// Get similar products based on category
const getSimilarProducts = (category, currentId) => {
  const allProducts = [
    {
      id: "p1",
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
    {
      id: "p3",
      name: "Xiaomi 14",
      price: 18990000,
      image: "/images/phones/xiaomi14.png",
      category: "phones",
    },
    {
      id: "p4",
      name: "Google Pixel 8",
      price: 19990000,
      image: "/images/phones/pixel8.png",
      category: "phones",
    },
    {
      id: "p5",
      name: "OPPO Find X7",
      price: 21990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
    },
    {
      id: "p6",
      name: "Vivo X100 Pro",
      price: 23990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
    },
    {
      id: "p7",
      name: "iPhone 14 Pro",
      price: 23990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
    },
    {
      id: "p8",
      name: "Samsung Galaxy S23",
      price: 18990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
    },
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
    {
      id: "h1",
      name: "AirPods Pro 2",
      price: 5990000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
    },
    {
      id: "h2",
      name: "Sony WH-1000XM5",
      price: 8490000,
      image: "/images/headphones/sony-wh1000xm5.png",
      category: "headphones",
    },
    {
      id: "a1",
      name: "Sạc dự phòng 20000mAh",
      price: 990000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
    },
  ];

  return allProducts.filter(
    (product) => product.category === category && product.id !== currentId
  );
};

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("specifications");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const dispatch = useDispatch();

  // Refs for carousels
  const thumbnailsRef = useRef(null);
  const similarProductsRef = useRef(null);

  // Thay đổi phần carousel sản phẩm tương tự
  const [currentSimilarPage, setCurrentSimilarPage] = useState(0);
  const productsPerPage = 4;
  const totalSimilarPages = Math.ceil(similarProducts.length / productsPerPage);

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setSelectedImage(0);
      const similar = getSimilarProducts(fetchedProduct.category, id);
      setSimilarProducts(similar);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity,
        })
      );
      dispatch(
        showNotification({
          message: `${product.name} đã được thêm vào giỏ hàng`,
          type: "success",
        })
      );
    }
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    if (product) {
      dispatch(
        showNotification({
          message: `${product.name} ${
            isWishlist ? "đã bị xóa khỏi" : "đã được thêm vào"
          } danh sách yêu thích`,
          type: isWishlist ? "info" : "success",
        })
      );
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      thumbnailsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollSimilarProducts = (direction) => {
    if (similarProductsRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      similarProductsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the review to the server
    alert(
      `Cảm ơn bạn đã đánh giá ${reviewForm.rating} sao và nhận xét: ${reviewForm.comment}`
    );
    setReviewForm({ rating: 5, comment: "" });
  };

  const handleRatingChange = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  // Thêm hàm để chuyển trang carousel
  const goToSimilarPage = (pageIndex) => {
    setCurrentSimilarPage(pageIndex);
    if (similarProductsRef.current) {
      similarProductsRef.current.scrollTo({
        left: pageIndex * similarProductsRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  if (!product) {
    return (
      <div className={Styles.loadingContainer}>
        <div className={Styles.loadingSpinner}></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  const allImages = [product.image, ...(product.additionalImages || [])];

  return (
    <div className={Styles.container}>
      <div className={Styles.breadcrumbs}>
        <Link to="/">Trang chủ</Link>
        <ChevronRight className={Styles.breadcrumbIcon} />
        <Link to={`/category/${product.category}`}>
          {product.category === "phones"
            ? "Điện thoại"
            : product.category === "tablets"
            ? "Tablet"
            : product.category === "headphones"
            ? "Tai nghe"
            : "Phụ kiện"}
        </Link>
        <ChevronRight className={Styles.breadcrumbIcon} />
        <span>{product.name}</span>
      </div>

      <div className={Styles.productSection}>
        <div className={Styles.productGallery}>
          <div className={Styles.mainImage}>
            <img
              src={allImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className={Styles.productImage}
            />
          </div>

          {allImages.length > 1 && (
            <div className={Styles.thumbnailsWrapper}>
              <button
                className={`${Styles.thumbnailControl} ${Styles.prev}`}
                onClick={() => scrollThumbnails("left")}
              >
                <ChevronLeft size={16} />
              </button>

              <div className={Styles.thumbnails} ref={thumbnailsRef}>
                {allImages.map((image, index) => (
                  <div
                    key={index}
                    className={`${Styles.thumbnail} ${
                      selectedImage === index ? Styles.activeThumbnail : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Ảnh ${index + 1}`}
                      width={80}
                      height={80}
                    />
                  </div>
                ))}
              </div>

              <button
                className={`${Styles.thumbnailControl} ${Styles.next}`}
                onClick={() => scrollThumbnails("right")}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div className={Styles.productInfo}>
          <h1 className={Styles.productTitle}>{product.name}</h1>

          <div className={Styles.productMeta}>
            <div className={Styles.rating}>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`${Styles.star} ${
                      i < Math.floor(product.rating) ? Styles.filled : ""
                    }`}
                    fill={i < Math.floor(product.rating) ? "#FFD700" : "none"}
                  />
                ))}
              <span className={Styles.ratingText}>
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>
            <div className={Styles.stock}>
              <span className={Styles.stockStatus}>
                {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
              <span className={Styles.stockCount}>
                ({product.stock} sản phẩm có sẵn)
              </span>
            </div>
          </div>

          <div className={Styles.productPrice}>
            {product.price.toLocaleString("vi-VN")}₫
          </div>

          <div className={Styles.productDescription}>
            {product.longDescription}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className={Styles.productColors}>
              <h3 className={Styles.optionTitle}>Màu sắc:</h3>
              <div className={Styles.colorOptions}>
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`${Styles.colorOption} ${
                      index === 0 ? Styles.activeColor : ""
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={Styles.productActions}>
            <div className={Styles.quantitySelector}>
              <button
                className={Styles.quantityButton}
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={Styles.quantityValue}>{quantity}</span>
              <button
                className={Styles.quantityButton}
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              className={Styles.addToCartButton}
              onClick={handleAddToCart}
            >
              <ShoppingCart className={Styles.actionIcon} />
              Thêm vào giỏ hàng
            </button>

            <button
              className={`${Styles.wishlistButton} ${
                isWishlist ? Styles.active : ""
              }`}
              onClick={toggleWishlist}
            >
              <Heart
                className={Styles.actionIcon}
                fill={isWishlist ? "#ef4444" : "none"}
              />
            </button>
          </div>

          <div className={Styles.productFeatures}>
            <h3 className={Styles.featuresTitle}>Tính năng nổi bật:</h3>
            <ul className={Styles.featuresList}>
              {product.features.map((feature, index) => (
                <li key={index} className={Styles.featureItem}>
                  <Check className={Styles.checkIcon} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className={Styles.productPolicies}>
            <div className={Styles.policy}>
              <div className={Styles.policyIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <path d="m9 10 2 2 4-4" />
                </svg>
              </div>
              <div className={Styles.policyContent}>
                <h4>Bảo hành chính hãng</h4>
                <p>{product.warranty}</p>
              </div>
            </div>
            <div className={Styles.policy}>
              <div className={Styles.policyIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <div className={Styles.policyContent}>
                <h4>Đổi trả miễn phí</h4>
                <p>30 ngày đầu tiên</p>
              </div>
            </div>
            <div className={Styles.policy}>
              <div className={Styles.policyIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <div className={Styles.policyContent}>
                <h4>Sản phẩm chính hãng</h4>
                <p>100% hàng chính hãng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.productDetails}>
        <div className={Styles.detailsTabs}>
          <button
            className={`${Styles.tabButton} ${
              activeTab === "specifications" ? Styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            Thông số kỹ thuật
          </button>
          <button
            className={`${Styles.tabButton} ${
              activeTab === "reviews" ? Styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá ({product.reviewsList?.length || 0})
          </button>
        </div>

        <div className={Styles.tabContent}>
          {activeTab === "specifications" && (
            <div className={Styles.specificationTable}>
              <h3 className={Styles.specTitle}>
                Thông số kỹ thuật {product.name}
              </h3>
              <table className={Styles.specTable}>
                <tbody>
                  {product.specs.map((spec, index) => {
                    const [key, value] = spec.split(": ");
                    return (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? Styles.evenRow : Styles.oddRow
                        }
                      >
                        <td className={Styles.specName}>{key}</td>
                        <td className={Styles.specValue}>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={Styles.reviewsSection}>
              <div className={Styles.reviewsSummary}>
                <div className={Styles.reviewsOverall}>
                  <div className={Styles.overallRating}>{product.rating}</div>
                  <div className={Styles.overallStars}>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`${Styles.star} ${
                            i < Math.floor(product.rating) ? Styles.filled : ""
                          }`}
                          fill={
                            i < Math.floor(product.rating) ? "#FFD700" : "none"
                          }
                        />
                      ))}
                  </div>
                  <div className={Styles.reviewsCount}>
                    {product.reviews} đánh giá
                  </div>
                </div>

                <div className={Styles.reviewForm}>
                  <h3 className={Styles.reviewFormTitle}>
                    Viết đánh giá của bạn
                  </h3>
                  <form onSubmit={handleReviewSubmit}>
                    <div className={Styles.ratingSelector}>
                      <span>Đánh giá của bạn:</span>
                      <div className={Styles.ratingStars}>
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`${Styles.star} ${
                                Styles.selectableStar
                              } ${i < reviewForm.rating ? Styles.filled : ""}`}
                              fill={i < reviewForm.rating ? "#FFD700" : "none"}
                              onClick={() => handleRatingChange(i + 1)}
                            />
                          ))}
                      </div>
                    </div>

                    <div className={Styles.reviewCommentField}>
                      <textarea
                        placeholder="Nhập nhận xét của bạn về sản phẩm..."
                        value={reviewForm.comment}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            comment: e.target.value,
                          })
                        }
                        required
                        className={Styles.reviewTextarea}
                      />
                    </div>

                    <button type="submit" className={Styles.submitReviewButton}>
                      Gửi đánh giá
                    </button>
                  </form>
                </div>
              </div>

              <div className={Styles.reviewsList}>
                <h3 className={Styles.reviewsListTitle}>
                  Đánh giá từ khách hàng
                </h3>

                {product.reviewsList && product.reviewsList.length > 0 ? (
                  <div className={Styles.reviews}>
                    {product.reviewsList.map((review) => (
                      <div key={review.id} className={Styles.reviewItem}>
                        <div className={Styles.reviewHeader}>
                          <div className={Styles.reviewUser}>
                            <div className={Styles.reviewUserIcon}>
                              <User size={20} />
                            </div>
                            <span className={Styles.reviewUserName}>
                              {review.user}
                            </span>
                          </div>

                          <div className={Styles.reviewRating}>
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={`${Styles.star} ${
                                    i < review.rating ? Styles.filled : ""
                                  }`}
                                  fill={i < review.rating ? "#FFD700" : "none"}
                                />
                              ))}
                          </div>
                        </div>

                        <div className={Styles.reviewDate}>
                          <Calendar
                            size={14}
                            className={Styles.reviewDateIcon}
                          />
                          <span>{review.date}</span>
                        </div>

                        <div className={Styles.reviewComment}>
                          <MessageCircle
                            size={14}
                            className={Styles.reviewCommentIcon}
                          />
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={Styles.noReviews}>
                    <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className={Styles.similarProducts}>
          <div className={Styles.similarHeader}>
            <h2 className={Styles.similarTitle}>Sản phẩm tương tự</h2>
            <div className={Styles.carouselControls}>
              <button
                className={Styles.carouselButton}
                onClick={() => {
                  const newPage = Math.max(0, currentSimilarPage - 1);
                  goToSimilarPage(newPage);
                }}
                disabled={currentSimilarPage === 0}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className={Styles.carouselButton}
                onClick={() => {
                  const newPage = Math.min(
                    totalSimilarPages - 1,
                    currentSimilarPage + 1
                  );
                  goToSimilarPage(newPage);
                }}
                disabled={currentSimilarPage === totalSimilarPages - 1}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className={Styles.similarProductsWrapper}>
            <div
              className={Styles.similarProductsCarousel}
              ref={similarProductsRef}
            >
              {similarProducts.map((product) => (
                <div key={product.id} className={Styles.carouselItem}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {totalSimilarPages > 1 && (
            <div className={Styles.carouselPagination}>
              {Array.from({ length: totalSimilarPages }).map((_, index) => (
                <button
                  key={index}
                  className={`${Styles.paginationDot} ${
                    currentSimilarPage === index ? Styles.activeDot : ""
                  }`}
                  onClick={() => goToSimilarPage(index)}
                  aria-label={`Page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
