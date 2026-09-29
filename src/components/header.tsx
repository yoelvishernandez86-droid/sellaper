import { Link, NavLink } from "react-router-dom";
import brandIcon from "../assets/sellaper-logo.svg";
import searchIcon from "../assets/busqueda.svg";
import profileIcon from "../assets/usuario.svg";
import favoriteIcon from "../assets/corazon vacio.svg";
import cartIcon from "../assets/carrito-de-compras.svg";
import "../styles/header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-mark">
            <img
              src={brandIcon}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="brand-text">
            <span className="brand-name">sellaper</span>
            <span className="brand-subtitle">Tu tienda online</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink className="nav-link" to="/" end>Inicio</NavLink>
          <NavLink className="nav-link" to="/tecnologia">Tecnología</NavLink>
          <NavLink className="nav-link" to="/ropa">Ropa</NavLink>
          <NavLink className="nav-link" to="/lifestyle">Lifestyle</NavLink>
          <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
        </nav>

        <div className="header-actions">
          <label className="search-box" aria-label="Buscar productos">
            <img src={searchIcon} alt="" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
          </label>

          <div className="icon-actions">
            <Link to="/favoritos" className="icon-button" aria-label="Favoritos">
              <img src={favoriteIcon} alt="" aria-hidden="true" />
            </Link>
            <Link to="/perfil" className="icon-button" aria-label="Perfil de usuario">
              <img src={profileIcon} alt="" aria-hidden="true" />
            </Link>
            <Link to="/carrito" className="icon-button cart-button" aria-label="Carrito">
              <img src={cartIcon} alt="" aria-hidden="true" />
              <span className="cart-badge">0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
