import type { Category } from "../../types/category";
import styles from "./CategoryCard.module.scss";
import { Link } from "react-router";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.id}`} className={styles.card}>
      <div className={styles.image}>
        <img src={category.image} alt={category.name} />
      </div>

      <div className={styles.overlay}>
        <h3>{category.name}</h3>
        <span aria-hidden="true">↗</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
