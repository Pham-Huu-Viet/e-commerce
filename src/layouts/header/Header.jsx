import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  Search,
  User,
  X,
  Phone,
  Tablet,
  Headphones,
  Package,
  LogOut,
} from "lucide-react";
import Styles from "./Header.module.css";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchValue("");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClose = () => {
    if (searchValue === "") {
      toggleSearch();
    } else {
      setSearchValue("");
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
  };

  console.log("isLoggedIn:", isLoggedIn);

  return (
    <header className={Styles.header}>
      <div className={Styles.container}>
        {/* Logo */}
        <Link to="/" className={Styles.logo}>
          <span>VietMobile</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={Styles.desktopNav}>
          <Link to="/category/phones" className={Styles.navLink}>
            Điện thoại
          </Link>
          <Link to="/category/tablets" className={Styles.navLink}>
            Tablet
          </Link>
          <Link to="/category/headphones" className={Styles.navLink}>
            Tai nghe
          </Link>
          <Link to="/category/accessories" className={Styles.navLink}>
            Phụ kiện
          </Link>
        </nav>

        {/* Search and Cart */}
        <div className={Styles.actions}>
          {isSearchOpen ? (
            <div className={Styles.searchContainer}>
              <div className={Styles.searchInputWrapper}>
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className={Styles.searchInput}
                  value={searchValue}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <button
                  className={Styles.searchCloseButton}
                  onClick={handleSearchClose}
                >
                  <X className={Styles.icon} />
                </button>
              </div>
            </div>
          ) : (
            <button
              className={`${Styles.iconButton} ${Styles.desktopOnly}`}
              onClick={toggleSearch}
            >
              <Search className={Styles.icon} />
              <span className="sr-only">Tìm kiếm</span>
            </button>
          )}

          <Link to="/cart" className={Styles.cartButton}>
            <ShoppingCart className={Styles.icon} />
            <span className={Styles.cartBadge}>3</span>
            <span className="sr-only">Giỏ hàng</span>
          </Link>

          <div className={`${Styles.userMenuContainer} ${Styles.desktopOnly}`}>
            <button className={Styles.iconButton} onClick={toggleUserMenu}>
              <User className={Styles.icon} />
              <span className="sr-only">Tài khoản</span>
            </button>

            {isUserMenuOpen && (
              <div className={Styles.userMenu}>
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/account"
                      className={Styles.userMenuItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Tài khoản của tôi
                    </Link>
                    <Link
                      to="/orders"
                      className={Styles.userMenuItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đơn hàng
                    </Link>
                    <button
                      className={Styles.userMenuItem}
                      onClick={handleLogout}
                    >
                      <LogOut className={Styles.userMenuItemIcon} />
                      Đăng xuất
                    </button>
                    <Link
                      to="/login"
                      className={Styles.userMenuItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đăng nhập tài khoản khác
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={Styles.userMenuItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className={Styles.userMenuItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
