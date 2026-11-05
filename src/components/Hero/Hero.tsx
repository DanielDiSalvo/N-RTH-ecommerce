import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>NUEVA COLECCIÓN / 2026</span>

        <h1>
          SIN
          <br />
          LÍMITES<span>.</span>
        </h1>

        <p>
          Diseñado para moverte.
          <br />
          Creado para destacar.
        </p>

        <a href="#products" className={styles.cta}>
          EXPLORAR COLECCIÓN
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.image}>
        <img src="/images/hero.png" alt="Colección urbana NØRTH" />
      </div>
    </section>
  );
};

export default Hero;
