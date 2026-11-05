import { Search, ShoppingBag, UserRound } from "lucide-react";
import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          NØRTH<span>.</span>
        </Link>

        <nav className={styles.navigation}>
          <NavLink to="/" end>
            Inicio
          </NavLink>

          <NavLink to="/category/zapatillas">Zapatillas</NavLink>

          <NavLink to="/category/remeras">Remeras</NavLink>

          <NavLink to="/category/camperas">Camperas</NavLink>

          <NavLink to="/category/buzos">Buzos</NavLink>
        </nav>

        <div className={styles.actions}>
          <button aria-label="Buscar">
            <Search size={21} />
          </button>
          <button aria-label="Mi cuenta">
            <UserRound size={21} />
          </button>
          <button aria-label="Carrito">
            <ShoppingBag size={21} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
