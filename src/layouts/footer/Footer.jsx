// import Link from "next/link";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>VietMobile</h3>
            <p className={styles.description}>
              Cửa hàng điện tử chính hãng với đa dạng sản phẩm công nghệ.
            </p>
            <div className={styles.socialLinks}>
              <Link to="#" className={styles.socialLink}>
                <Facebook className={styles.socialIcon} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className={styles.socialLink}>
                <Instagram className={styles.socialIcon} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className={styles.socialLink}>
                <Twitter className={styles.socialIcon} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Danh mục</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/category/phones" className={styles.link}>
                  Điện thoại
                </Link>
              </li>
              <li>
                <Link to="/category/tablets" className={styles.link}>
                  Tablet
                </Link>
              </li>
              <li>
                <Link to="/category/headphones" className={styles.link}>
                  Tai nghe
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className={styles.link}>
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Thông tin</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/about" className={styles.link}>
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/blog" className={styles.link}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className={styles.link}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Liên hệ</h3>
            <address className={styles.address}>
              <p>123 Đường Công Nghệ</p>
              <p>HaNoi</p>
              <p className={styles.contactInfo}>Email: info@VietMobile.com</p>
              <p className={styles.contactInfo}>Hotline: 1900 1234</p>
            </address>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} VietMobile. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
