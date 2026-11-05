import { Search, ShoppingBag, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useCart } from "../../hooks/useCart";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { totalItems } = useCart();

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
          <button type="button" aria-label="Buscar">
            <Search size={21} />
          </button>

          <button type="button" aria-label="Mi cuenta">
            <UserRound size={21} />
          </button>

          <Link
            to="/cart"
            className={styles.cartLink}
            aria-label={`Ver carrito, ${totalItems} productos`}
          >
            <ShoppingBag size={21} />

            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
