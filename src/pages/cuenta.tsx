import { useContext } from "react";
import { CuentaContext} from "../context/cuentaProvider";
import { Link } from "react-router";

const Cuenta = () => {
  const userContext = useContext(CuentaContext);
  if (userContext && userContext.usuario) {
    return (
      <section className="cuenta">
        <article className="cuenta__info">
          <img src={userContext.usuario.image} alt="Imagen de perfil" />
          <h2>Bienvenido, {userContext.usuario.firstName}</h2>
          <p>Nombre de usuario: {userContext.usuario.username}</p>
          <p>Email: {userContext.usuario.email}</p>
        </article>
        <article className="cuenta__acciones">
          <Link to="favoritos">Mis Favoritos</Link>
          <Link to="/carrito">Mi Carrito</Link>
          <button onClick={userContext.cerrarSesion}>Cerrar sesión</button>
        </article>
      </section>
    );
  }
};

export default Cuenta;
