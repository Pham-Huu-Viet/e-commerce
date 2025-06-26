"use client";

import { useState, useEffect, useRef } from "react";
// import { notFound } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import ProductCard from "../components/CategoryPage/ProductCard";
import Styles from "./Category.module.css";
import { useParams } from "react-router-dom";

// Mock data - in a real app, this would come from an API or database
const categories = {
  phones: {
    id: "phones",
    name: "Điện thoại",
    description:
      "Khám phá các mẫu điện thoại thông minh mới nhất với công nghệ tiên tiến.",
    brands: ["Apple", "Samsung", "Xiaomi", "Google", "OPPO", "Vivo"],
  },
  tablets: {
    id: "tablets",
    name: "Tablet",
    description: "Các loại máy tính bảng phù hợp cho công việc và giải trí.",
    brands: ["Apple", "Samsung", "Xiaomi", "Lenovo"],
  },
  headphones: {
    id: "headphones",
    name: "Tai nghe",
    description: "Tai nghe chất lượng cao cho trải nghiệm âm thanh tuyệt vời.",
    brands: ["Apple", "Sony", "Bose", "Samsung", "JBL"],
  },
  accessories: {
    id: "accessories",
    name: "Phụ kiện",
    description: "Phụ kiện đa dạng cho các thiết bị điện tử của bạn.",
    brands: ["Anker", "Belkin", "Spigen", "Mophie", "Native Union"],
  },
};

// Mock products - in a real app, this would come from an API or database
const allProducts = {
  phones: [
    {
      id: "p1",
      name: "iPhone 15 Pro",
      price: 27990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      brand: "Apple",
    },
    {
      id: "p2",
      name: "Samsung Galaxy S24",
      price: 22990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Samsung",
    },
    {
      id: "p3",
      name: "Xiaomi 14",
      price: 18990000,
      image: "/images/phones/xiaomi14.png",
      category: "phones",
      brand: "Xiaomi",
    },
    {
      id: "p4",
      name: "Google Pixel 8",
      price: 19990000,
      image: "/images/phones/pixel8.png",
      category: "phones",
      brand: "Google",
    },
    {
      id: "p5",
      name: "OPPO Find X7",
      price: 21990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      brand: "OPPO",
    },
    {
      id: "p6",
      name: "Vivo X100 Pro",
      price: 23990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Vivo",
    },
    {
      id: "p7",
      name: "iPhone 14 Pro",
      price: 23990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      brand: "Apple",
    },
    {
      id: "p8",
      name: "Samsung Galaxy S23",
      price: 18990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Samsung",
    },
    {
      id: "p9",
      name: "Xiaomi 13T Pro",
      price: 15990000,
      image: "/images/phones/xiaomi14.png",
      category: "phones",
      brand: "Xiaomi",
    },
    {
      id: "p10",
      name: "Google Pixel 7",
      price: 15990000,
      image: "/images/phones/pixel8.png",
      category: "phones",
      brand: "Google",
    },
    {
      id: "p11",
      name: "OPPO Reno 10 Pro",
      price: 14990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      brand: "OPPO",
    },
    {
      id: "p12",
      name: "Vivo V29",
      price: 12990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Vivo",
    },
    {
      id: "p13",
      name: "iPhone SE",
      price: 11990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      brand: "Apple",
    },
    {
      id: "p14",
      name: "Samsung Galaxy A54",
      price: 9990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Samsung",
    },
    {
      id: "p15",
      name: "Xiaomi Redmi Note 12",
      price: 4990000,
      image: "/images/phones/xiaomi14.png",
      category: "phones",
      brand: "Xiaomi",
    },
    {
      id: "p16",
      name: "OPPO A78",
      price: 5990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      brand: "OPPO",
    },
    {
      id: "p17",
      name: "Vivo Y35",
      price: 4490000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Vivo",
    },
    {
      id: "p18",
      name: "Samsung Galaxy A14",
      price: 3990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Samsung",
    },
    {
      id: "p19",
      name: "Xiaomi Redmi 12C",
      price: 2790000,
      image: "/images/phones/xiaomi14.png",
      category: "phones",
      brand: "Xiaomi",
    },
    {
      id: "p20",
      name: "OPPO A17",
      price: 2990000,
      image: "/images/phones/iphone15pro.png",
      category: "phones",
      brand: "OPPO",
    },
    {
      id: "p21",
      name: "Vivo Y02s",
      price: 1990000,
      image: "/images/phones/samsung-s24.png",
      category: "phones",
      brand: "Vivo",
    },
    {
      id: "p22",
      name: "Xiaomi Redmi A1",
      price: 1790000,
      image: "/images/phones/xiaomi14.png",
      category: "phones",
      brand: "Xiaomi",
    },
  ],
  tablets: [
    {
      id: "t1",
      name: "iPad Pro M2",
      price: 23990000,
      image: "/images/tablets/ipad-pro.png",
      category: "tablets",
      brand: "Apple",
    },
    {
      id: "t2",
      name: "Samsung Galaxy Tab S9",
      price: 19990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Samsung",
    },
    {
      id: "t3",
      name: "Xiaomi Pad 6",
      price: 8990000,
      image: "/images/tablets/ipad-pro.png",
      category: "tablets",
      brand: "Xiaomi",
    },
    {
      id: "t4",
      name: "Lenovo Tab P12 Pro",
      price: 14990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Lenovo",
    },
    {
      id: "t5",
      name: "iPad Air",
      price: 16990000,
      image: "/images/tablets/ipad-pro.png",
      category: "tablets",
      brand: "Apple",
    },
    {
      id: "t6",
      name: "Samsung Galaxy Tab S8",
      price: 15990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Samsung",
    },
    {
      id: "t7",
      name: "Xiaomi Pad 5",
      price: 7990000,
      image: "/images/tablets/ipad-pro.png",
      category: "tablets",
      brand: "Xiaomi",
    },
    {
      id: "t8",
      name: "Lenovo Tab P11 Pro",
      price: 11990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Lenovo",
    },
    {
      id: "t9",
      name: "iPad 10th Gen",
      price: 11990000,
      image: "/images/tablets/ipad-pro.png",
      category: "tablets",
      brand: "Apple",
    },
    {
      id: "t10",
      name: "Samsung Galaxy Tab A8",
      price: 6990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Samsung",
    },
    {
      id: "t11",
      name: "Lenovo Tab M10",
      price: 4990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Lenovo",
    },
    {
      id: "t12",
      name: "iPad Mini",
      price: 13990000,
      image: "/images/tablets/ipad-pro.png",
      category: "tablets",
      brand: "Apple",
    },
    {
      id: "t13",
      name: "Samsung Galaxy Tab A7 Lite",
      price: 3990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Samsung",
    },
    {
      id: "t14",
      name: "Xiaomi Redmi Pad",
      price: 5990000,
      image: "/images/tablets/ipad-pro.png",
      category: "tablets",
      brand: "Xiaomi",
    },
    {
      id: "t15",
      name: "Lenovo Tab M8",
      price: 2990000,
      image: "/images/tablets/galaxy-tab.png",
      category: "tablets",
      brand: "Lenovo",
    },
  ],
  headphones: [
    {
      id: "h1",
      name: "AirPods Pro 2",
      price: 5990000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "Apple",
    },
    {
      id: "h2",
      name: "Sony WH-1000XM5",
      price: 8490000,
      image: "/images/headphones/sony-wh1000xm5.png",
      category: "headphones",
      brand: "Sony",
    },
    {
      id: "h3",
      name: "Bose QuietComfort Ultra",
      price: 9990000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "Bose",
    },
    {
      id: "h4",
      name: "Samsung Galaxy Buds 3 Pro",
      price: 4990000,
      image: "/images/headphones/sony-wh1000xm5.png",
      category: "headphones",
      brand: "Samsung",
    },
    {
      id: "h5",
      name: "JBL Live Pro 2",
      price: 3490000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "JBL",
    },
    {
      id: "h6",
      name: "AirPods Max",
      price: 12990000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "Apple",
    },
    {
      id: "h7",
      name: "Sony WF-1000XM5",
      price: 6490000,
      image: "/images/headphones/sony-wh1000xm5.png",
      category: "headphones",
      brand: "Sony",
    },
    {
      id: "h8",
      name: "Bose QuietComfort Earbuds II",
      price: 7990000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "Bose",
    },
    {
      id: "h9",
      name: "AirPods 3",
      price: 4490000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "Apple",
    },
    {
      id: "h10",
      name: "Sony WH-CH720N",
      price: 2990000,
      image: "/images/headphones/sony-wh1000xm5.png",
      category: "headphones",
      brand: "Sony",
    },
    {
      id: "h11",
      name: "JBL Tune 510BT",
      price: 1290000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "JBL",
    },
    {
      id: "h12",
      name: "Samsung Galaxy Buds 2",
      price: 2990000,
      image: "/images/headphones/sony-wh1000xm5.png",
      category: "headphones",
      brand: "Samsung",
    },
    {
      id: "h13",
      name: "Bose SoundSport",
      price: 1990000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "Bose",
    },
    {
      id: "h14",
      name: "JBL Tune 230NC",
      price: 1890000,
      image: "/images/headphones/airpods-pro.png",
      category: "headphones",
      brand: "JBL",
    },
    {
      id: "h15",
      name: "Sony WF-C500",
      price: 1490000,
      image: "/images/headphones/sony-wh1000xm5.png",
      category: "headphones",
      brand: "Sony",
    },
  ],
  accessories: [
    {
      id: "a1",
      name: "Sạc dự phòng 20000mAh",
      price: 990000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Anker",
    },
    {
      id: "a2",
      name: "Ốp lưng iPhone 15 Pro",
      price: 490000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Spigen",
    },
    {
      id: "a3",
      name: "Cáp sạc USB-C 100W",
      price: 390000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Belkin",
    },
    {
      id: "a4",
      name: "Bộ sạc nhanh 65W",
      price: 790000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Anker",
    },
    {
      id: "a5",
      name: "Giá đỡ điện thoại",
      price: 250000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Native Union",
    },
    {
      id: "a6",
      name: "Miếng dán cường lực",
      price: 290000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Spigen",
    },
    {
      id: "a7",
      name: "Sạc không dây MagSafe",
      price: 890000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Belkin",
    },
    {
      id: "a8",
      name: "Bao da iPad Pro",
      price: 1290000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Native Union",
    },
    {
      id: "a9",
      name: "Bút cảm ứng cho iPad",
      price: 1990000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Mophie",
    },
    {
      id: "a10",
      name: "Cáp sạc Lightning",
      price: 290000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Anker",
    },
    {
      id: "a11",
      name: "Tai nghe có dây",
      price: 190000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Belkin",
    },
    {
      id: "a12",
      name: "Ốp lưng Samsung S24",
      price: 390000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Spigen",
    },
    {
      id: "a13",
      name: "Đế sạc không dây",
      price: 590000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Mophie",
    },
    {
      id: "a14",
      name: "Túi đựng laptop",
      price: 690000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Native Union",
    },
    {
      id: "a15",
      name: "Bàn phím Bluetooth",
      price: 1490000,
      image: "/images/accessories/powerbank.png",
      category: "accessories",
      brand: "Anker",
    },
  ],
};

// Price range options
const priceRangeOptions = [
  { id: "all", label: "Tất cả giá", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "under-2m", label: "Dưới 2 triệu", min: 0, max: 2000000 },
  { id: "2m-7m", label: "Từ 2 - 7 triệu", min: 2000000, max: 7000000 },
  {
    id: "over-7m",
    label: "Trên 7 triệu",
    min: 7000000,
    max: Number.POSITIVE_INFINITY,
  },
];

// Products per page options
const perPageOptions = [
  { value: 9, label: "9 sản phẩm" },
  { value: 12, label: "12 sản phẩm" },
  { value: 15, label: "15 sản phẩm" },
  { value: 24, label: "24 sản phẩm" },
];

// Sort options
const sortOptions = [
  { value: "popularity", label: "Phổ biến" },
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "name-asc", label: "Tên A-Z" },
  { value: "name-desc", label: "Tên Z-A" },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories[slug];

  const products = allProducts[slug] || [];

  //   if (!category) {
  //     notFound();
  //   }

  // State for filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPriceRangeDropdown, setShowPriceRangeDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState(null);

  // Refs for dropdowns
  const perPageRef = useRef(null);
  const sortRef = useRef(null);
  const priceRangeRef = useRef(null);

  // Get min and max price for the category
  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));

  // Initialize price range on component mount
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [slug, minPrice, maxPrice]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (perPageRef.current && !perPageRef.current.contains(event.target)) {
        setShowPerPageDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      if (
        priceRangeRef.current &&
        !priceRangeRef.current.contains(event.target)
      ) {
        setShowPriceRangeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply filters
  useEffect(() => {
    let result = products;

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'popularity' - keep original order
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedBrands, priceRange, products, sortOption]);

  // Toggle brand selection
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Handle price range option selection
  const handlePriceRangeOptionChange = (option) => {
    setSelectedPriceRange(option.id);
    // Cập nhật giá trị min và max của khoảng giá
    const newMin = option.min;
    const newMax =
      option.max === Number.POSITIVE_INFINITY ? maxPrice : option.max;
    setPriceRange([newMin, newMax]);
    setShowPriceRangeDropdown(false);
  };

  // Handle min price slider change
  const handleMinPriceChange = (e) => {
    const newMinPrice = Number.parseInt(e.target.value);
    if (newMinPrice <= priceRange[1]) {
      setPriceRange([newMinPrice, priceRange[1]]);
    }
  };

  // Handle max price slider change
  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Number.parseInt(e.target.value);
    if (newMaxPrice >= priceRange[0]) {
      setPriceRange([priceRange[0], newMaxPrice]);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRange("all");
    setPriceRange([minPrice, maxPrice]);
    setSortOption("popularity");
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      if (currentPage <= 3) {
        // Near the start
        pageNumbers.push(2, 3);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Somewhere in the middle
        pageNumbers.push("ellipsis");
        pageNumbers.push(currentPage);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Format price for display
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "₫";
  };

  // Get current price range option label
  const getCurrentPriceRangeLabel = () => {
    const option = priceRangeOptions.find(
      (opt) => opt.id === selectedPriceRange
    );
    return option ? option.label : "Tất cả giá";
  };

  // Get current sort option label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortOption);
    return option ? option.label : "Phổ biến";
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1 className={Styles.title}>{category.name}</h1>
        <p className={Styles.description}>{category.description}</p>
      </div>

      <div className={Styles.content}>
        <aside className={Styles.sidebar}>
          <div className={Styles.filterHeader}>
            <h2 className={Styles.filterTitle}>Bộ lọc</h2>
            <button
              className={Styles.toggleFiltersButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>

          {showFilters && (
            <>
              <div className={Styles.filterSection}>
                <h3 className={Styles.filterSectionTitle}>Thương hiệu</h3>
                <div className={Styles.brandList}>
                  {category.brands.map((brand) => (
                    <label key={brand} className={Styles.brandItem}>
                      <div className={Styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className={Styles.checkboxInput}
                        />
                        <div className={Styles.checkboxCustom}>
                          {selectedBrands.includes(brand) && (
                            <Check size={12} />
                          )}
                        </div>
                      </div>
                      <span className={Styles.brandName}>{brand}</span>
                      <span className={Styles.brandCount}>
                        ({products.filter((p) => p.brand === brand).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={Styles.filterSection}>
                <h3 className={Styles.filterSectionTitle}>Khoảng giá</h3>
                <div className={Styles.priceRangeSelector} ref={priceRangeRef}>
                  <button
                    className={Styles.dropdownButton}
                    onClick={() =>
                      setShowPriceRangeDropdown(!showPriceRangeDropdown)
                    }
                  >
                    <span>{getCurrentPriceRangeLabel()}</span>
                    <ChevronDown size={16} className={Styles.dropdownIcon} />
                  </button>

                  {showPriceRangeDropdown && (
                    <div className={Styles.dropdown}>
                      {priceRangeOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`${Styles.dropdownItem} ${
                            selectedPriceRange === option.id
                              ? Styles.activeDropdownItem
                              : ""
                          }`}
                          onClick={() => handlePriceRangeOptionChange(option)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={Styles.priceRangeContainer}>
                  <div className={Styles.priceValues}>
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                  <div className={Styles.sliderContainer}>
                    <div className={Styles.sliderTrack}>
                      <div
                        className={Styles.sliderFill}
                        style={{
                          left: `${
                            ((priceRange[0] - minPrice) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                          width: `${
                            ((priceRange[1] - priceRange[0]) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>

                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={handleMinPriceChange}
                      onMouseDown={() => {
                        setIsDragging(true);
                        setActiveThumb("min");
                      }}
                      onMouseUp={() => {
                        setIsDragging(false);
                        setActiveThumb(null);
                      }}
                      onTouchStart={() => {
                        setIsDragging(true);
                        setActiveThumb("min");
                      }}
                      onTouchEnd={() => {
                        setIsDragging(false);
                        setActiveThumb(null);
                      }}
                      className={`${Styles.slider} ${Styles.sliderMin}`}
                    />

                    {isDragging && activeThumb === "min" && (
                      <div
                        className={Styles.thumbValue}
                        style={{
                          left: `${
                            ((priceRange[0] - minPrice) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                        }}
                      >
                        {formatPrice(priceRange[0])}
                      </div>
                    )}

                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={handleMaxPriceChange}
                      onMouseDown={() => {
                        setIsDragging(true);
                        setActiveThumb("max");
                      }}
                      onMouseUp={() => {
                        setIsDragging(false);
                        setActiveThumb(null);
                      }}
                      onTouchStart={() => {
                        setIsDragging(true);
                        setActiveThumb("max");
                      }}
                      onTouchEnd={() => {
                        setIsDragging(false);
                        setActiveThumb(null);
                      }}
                      className={`${Styles.slider} ${Styles.sliderMax}`}
                    />

                    {isDragging && activeThumb === "max" && (
                      <div
                        className={Styles.thumbValue}
                        style={{
                          left: `${
                            ((priceRange[1] - minPrice) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                        }}
                      >
                        {formatPrice(priceRange[1])}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                className={Styles.resetFiltersButton}
                onClick={resetFilters}
              >
                Xóa bộ lọc
              </button>
            </>
          )}
        </aside>

        <div className={Styles.productSection}>
          <div className={Styles.productHeader}>
            <div className={Styles.productCount}>
              Hiển thị {currentProducts.length} / {filteredProducts.length} sản
              phẩm
            </div>

            <div className={Styles.productControls}>
              <div className={Styles.perPageSelector} ref={perPageRef}>
                <button
                  className={Styles.dropdownButton}
                  onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
                >
                  <span>{productsPerPage} sản phẩm</span>
                  <ChevronDown size={16} className={Styles.dropdownIcon} />
                </button>

                {showPerPageDropdown && (
                  <div className={Styles.dropdown}>
                    {perPageOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`${Styles.dropdownItem} ${
                          productsPerPage === option.value
                            ? Styles.activeDropdownItem
                            : ""
                        }`}
                        onClick={() => {
                          setProductsPerPage(option.value);
                          setShowPerPageDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={Styles.sortSelector} ref={sortRef}>
                <button
                  className={Styles.dropdownButton}
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <span>Sắp xếp: {getCurrentSortLabel()}</span>
                  <ChevronDown size={16} className={Styles.dropdownIcon} />
                </button>

                {showSortDropdown && (
                  <div className={Styles.dropdown}>
                    {sortOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`${Styles.dropdownItem} ${
                          sortOption === option.value
                            ? Styles.activeDropdownItem
                            : ""
                        }`}
                        onClick={() => {
                          setSortOption(option.value);
                          setShowSortDropdown(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className={Styles.noProducts}>
              <div className={Styles.noProductsIcon}>
                <Search size={48} />
              </div>
              <h3 className={Styles.noProductsTitle}>
                Không tìm thấy sản phẩm
              </h3>
              <p className={Styles.noProductsText}>
                Không có sản phẩm nào phù hợp với bộ lọc của bạn. Vui lòng thử
                lại với các tiêu chí khác.
              </p>
            </div>
          ) : (
            <>
              <div className={Styles.productGrid}>
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className={Styles.pagination}>
                  <button
                    className={`${Styles.paginationButton} ${
                      currentPage === 1 ? Styles.disabled : ""
                    }`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className={Styles.pageNumbers}>
                    {getPageNumbers().map((page, index) =>
                      page === "ellipsis" ? (
                        <span
                          key={`ellipsis-${index}`}
                          className={Styles.ellipsis}
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          className={`${Styles.pageNumber} ${
                            currentPage === page ? Styles.activePage : ""
                          }`}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    className={`${Styles.paginationButton} ${
                      currentPage === totalPages ? Styles.disabled : ""
                    }`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
