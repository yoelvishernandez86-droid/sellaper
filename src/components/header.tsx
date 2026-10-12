import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, type FormEvent } from "react";
import brandIcon from "../assets/sellaper-logo.svg";
import searchIcon from "../assets/busqueda.svg";
import profileIcon from "../assets/usuario.svg";
import favoriteIcon from "../assets/corazon vacio.svg";
import cartIcon from "../assets/carrito-de-compras.svg";
import "../styles/header.css";
import { CarritoContext } from "../context/carritoProvider";

function Header() {
  const contexto = useContext(CarritoContext);
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

  function buscar(event: FormEvent) {
    event.preventDefault();

    const busqueda = texto.trim();

    if (!busqueda) return;

    const parametros = new URLSearchParams({ q: busqueda });

    navigate(`/buscar?${parametros.toString()}`);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to={"/"} className="brand">
          <div className="brand">
            <div className="brand-mark">
              <img src={brandIcon} alt="" aria-hidden="true" />
            </div>
            <div className="brand-text">
              <span className="brand-name">sellaper</span>
              <span className="brand-subtitle">Tu tienda online</span>
            </div>
          </div>
        </Link>

        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink className="nav-link" to="/" end>
            Inicio
          </NavLink>
          <NavLink className="nav-link" to="/tecnologia">
            Tecnología
          </NavLink>
          <NavLink className="nav-link" to="/ropa">
            Ropa
          </NavLink>
          <NavLink className="nav-link" to="/lifestyle">
            Lifestyle
          </NavLink>
        </nav>

        <div className="header-actions">
          <form className="search-box" onSubmit={buscar} role="search">
            <img src={searchIcon} alt="" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              value={texto}
              onChange={(event) => setTexto(event.target.value)}
            />
          </form>

          <div className="icon-actions">
            <Link
              to="/favoritos"
              className="icon-button"
              aria-label="Favoritos"
            >
              <img src={favoriteIcon} alt="" aria-hidden="true" />
            </Link>
            <Link
              to="/cuenta"
              className="icon-button"
              aria-label="Perfil de usuario"
            >
              <img src={profileIcon} alt="" aria-hidden="true" />
            </Link>
            <Link
              to="/carrito"
              className="icon-button cart-button"
              aria-label="Carrito"
            >
              <img src={cartIcon} alt="" aria-hidden="true" />
              <span className="cart-badge">{contexto?.cantidadCarrito}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
