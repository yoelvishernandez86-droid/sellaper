import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <div className="brand-mark">
          <img
            src="../assets/caja-abierta.svg"
            alt="Logo de la marca Sellaper con un icono de caja abierta"
          />
        </div>
        <div className="brand-text">
          <span className="brand-name">sellaper</span>
          <span className="brand-subtitle">Tu tienda online</span>
        </div>
      </div>

      <nav className="main-nav" aria-label="Navegación principal">
        <Link className="nav-link active" to="/">Inicio</Link>
        <Link className="nav-link" to="/tecnologia">Tecnologia</Link>
        <Link className="nav-link" to="/ropa">Ropa</Link>
        <Link className="nav-link" to="/lifestyle">Lifestyle</Link>
        <Link className="nav-link" to="/ofertas">Ofertas</Link>
      </nav>

      <div className="header-actions">
        <label className="search-box" aria-label="Buscar productos">
          <img src="../assets/busqueda.svg" alt="Icono de búsqueda" />
          <input type="text" placeholder="Buscar productos..." />
        </label>

        <div className="icon-actions">
          <Link to="/perfil" className="icon-button" aria-label="Perfil de usuario">
            <img src="../assets/usuario.svg" alt="Icono de perfil" />
          </Link>
          <Link to="/favoritos" className="icon-button" aria-label="Favoritos">
            <img src="../assets/corazon.svg" alt="Icono de favoritos" />
          </Link>
          <Link to="/carrito" className="icon-button cart-button" aria-label="Carrito">
            <img src="../assets/carrito-de-compras.svg" alt="Icono del carrito de compras" />
            <span className="cart-badge">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
