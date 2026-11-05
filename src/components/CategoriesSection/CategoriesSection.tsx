import CategoryCard from "../CategoryCard/CategoryCard";
import { categories } from "../../data/categories";
import styles from "./CategoriesSection.module.scss";

const CategoriesSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>ENCONTRÁ TU ESTILO</span>
            <h2>EXPLORÁ POR CATEGORÍA</h2>
          </div>

          <p>Descubrí nuestra colección de indumentaria y calzado urbano.</p>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
