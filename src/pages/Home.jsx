import CategorySection from "../components/HomePage/CategorySection";
import HeroSection from "../components/HomePage/HeroSection";
import ProductCard from "../components/HomePage/ProductCard";
import styles from "./Home.module.css";

export default function Home() {
  // Mock featured products
  const featuredProducts = [
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
    {
      id: "4",
      name: "Sạc dự phòng 20000mAh",
      price: 990000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
    },
  ];

  // Categories
  const categories = [
    {
      id: "phones",
      name: "Điện thoại",
      image: "/images/categories/phones.png",
      count: 24,
    },
    {
      id: "tablets",
      name: "Tablet",
      image: "/images/categories/tablets.png",
      count: 18,
    },
    {
      id: "headphones",
      name: "Tai nghe",
      image: "/images/categories/headphones.png",
      count: 32,
    },
    {
      id: "accessories",
      name: "Phụ kiện khác",
      image: "/images/categories/accessories.png",
      count: 45,
    },
  ];

  return (
    <main className={styles.main}>
      <HeroSection />

      {/* Categories */}
      <section className={styles.categorySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Danh mục sản phẩm</h2>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Sản phẩm nổi bật</h2>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
