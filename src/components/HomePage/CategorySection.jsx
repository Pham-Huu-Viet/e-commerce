// import Link from "next/link";
import { Link } from "react-router-dom";
// import Image from "next/image";
import styles from "./CategorySection.module.css";

export default function CategorySection({ category }) {
  return (
    <Link to={`/category/${category.id}`} className={styles.category}>
      <div className={styles.imageWrapper}>
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.overlay}>
        <h3 className={styles.title}>{category.name}</h3>
        <p className={styles.count}>{category.count} sản phẩm</p>
      </div>
    </Link>
  );
}
