import { Link } from 'react-router-dom';
import brandIcon from '../assets/sellaper-logo.svg';
import githubIcon from '../assets/github.svg';
import whatsappIcon from '../assets/whatsapp.svg';
import linkedinIcon from '../assets/linkedin.svg';
import arrowIcon from '../assets/flecha-pequena-derecha.svg';
import heartIcon from '../assets/corazon lleno.svg';
import '../styles/header.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
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

          <div className="footer-column">
            <h4>Enlaces</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/tecnologia">Tecnología</Link></li>
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

          <div className="footer-column social-column">
            <h4>Síguenos</h4>
            <div className="social-links" aria-label="Redes sociales">
              <a href="https://github.com/yoelvishernandez86-droid/sellaper" target="_blank" rel="noreferrer" aria-label="GitHub">
                <img src={githubIcon} alt="" aria-hidden="true" />
              </a>
              <a href="https://wa.me/622842725" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <img src={whatsappIcon} alt="" aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/yoel-vishernandez-86-droid/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="footer-column newsletter-column">
            <h4>Suscríbete</h4>
            <p className="newsletter-description">Recibe novedades y ofertas</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Tu correo electrónico" aria-label="Tu correo electrónico" />
              <button type="button" aria-label="Suscribirse">
                <img src={arrowIcon} alt="" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Sellaper. Todos los derechos reservados.</p>
          <p className="footer-credit">
            Un proyecto creado con pasión
            <img src={heartIcon} alt="" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
