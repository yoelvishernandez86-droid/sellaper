import { Link } from 'react-router-dom';
import '../styles/header.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
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

        <div className="footer-column">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/tecnologia">Tecnologia</Link></li>
            <li><Link to="/ropa">Ropa</Link></li>
            <li><Link to="/lifestyle">Lifestyle</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/">Preguntas frecuentes</Link></li>
            <li><Link to="/">Envíos</Link></li>
            <li><Link to="/">Devoluciones</Link></li>
            <li><Link to="/">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-column newsletter-column">
          <h4>Suscríbete</h4>
          <div className="newsletter-box">
            <input type="email" placeholder="Recibe novedades y ofertas" />
            <button type="button" aria-label="Suscribirse">→</button>
          </div>
          <div className="social-links" aria-label="Redes sociales">
            <a href="https://github.com/yoelvishernandez86-droid/sellaper" target="_blank" rel="noreferrer" aria-label="GitHub">
              <img src="../assets/github.svg" alt="GitHub" />
            </a>
            <a href="https://wa.me/622842725" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <img src="../assets/whatsapp.svg" alt="WhatsApp" />
            </a>
            <a href="https://www.linkedin.com/in/yoel-vishernandez-86-droid/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="../assets/linkedin.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Sellaper. Todos los derechos reservados.</p>
        <p>Un proyecto creado con pasión</p>
      </div>
    </footer>
  );
};

export default Footer;
