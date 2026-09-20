import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="branding">
        <img src="/logo.svg" alt="Logo de Sellaper" />
        <h2>sellaper</h2>
        <p>Tu tienda online</p>
      </div>

      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/tecnologia">Tecnologia</Link>
          </li>
          <li>
            <Link to="/ropa">Ropa</Link>
          </li>
          <li>
            <Link to="/lifestyle">Lifestyle</Link>
          </li>
          <li>
            <Link to="/ofertas">Ofertas</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
