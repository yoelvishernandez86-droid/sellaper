import { useContext } from "react";
import { Link } from "react-router-dom";
import { CuentaContext } from "../context/cuentaProvider";
import usuarioIcono from "../assets/usuario.svg";
import favoritosIcono from "../assets/corazon vacio.svg";
import carritoIcono from "../assets/carrito-de-compras.svg";
import flechaIcono from "../assets/flecha-pequena-derecha.svg";
import mascotaEspejo from "../assets/Sellaper mirándose en un espejo ovalado.png";
import "../styles/cuenta.css";

function Cuenta() {
  const contexto = useContext(CuentaContext);

  if (!contexto || contexto.cargando) {
    return (
      <main className="cuenta">
        <div className="cuenta__contenedor">
          <section className="cuenta__estado" aria-labelledby="cuenta-estado">
            <p className="cuenta__etiqueta">Tu espacio en Sellaper</p>
            <h1 id="cuenta-estado">Mi cuenta</h1>
            {contexto ? (
              <p className="cuenta__descripcion" role="status">
                Cargando tu cuenta…
              </p>
            ) : (
              <>
                <p className="cuenta__descripcion" role="alert">
                  No se ha podido cargar tu cuenta. Vuelve a intentarlo más tarde.
                </p>
                <Link className="cuenta__boton" to="/">
                  Volver a la tienda
                </Link>
              </>
            )}
          </section>
        </div>
      </main>
    );
  }

  const { usuario, esVisitante, cerrarSesion } = contexto;
  const nombreCompleto = [usuario?.firstName, usuario?.lastName]
    .map((nombre) => nombre?.trim())
    .filter(Boolean)
    .join(" ");
  const nombreSaludo = usuario?.firstName?.trim() || usuario?.username?.trim();
  const datos = [
    { etiqueta: "Nombre", valor: nombreCompleto },
    { etiqueta: "Nombre de usuario", valor: usuario?.username?.trim() },
    { etiqueta: "Correo electrónico", valor: usuario?.email?.trim() },
  ].filter((dato) => dato.valor);

  return (
    <main className="cuenta">
      <div className="cuenta__contenedor">
        <header className="cuenta__cabecera">
          <span className="cuenta__emblema" aria-hidden="true">
            <img src={usuarioIcono} alt="" />
          </span>
          <div>
            <p className="cuenta__etiqueta">Tu espacio en Sellaper</p>
            <h1>Mi cuenta</h1>
            <p className="cuenta__descripcion">
              {usuario
                ? "Tus datos y lo que te gusta, en un mismo lugar."
                : "Sigue descubriendo todo lo que te gusta."}
            </p>
          </div>
        </header>

        <div className="cuenta__panel">
          <section className="cuenta__perfil" aria-labelledby="cuenta-saludo">
            <div className="cuenta__presentacion">
              <div className="cuenta__avatar">
                <img
                  className={usuario?.image ? undefined : "cuenta__avatar-icono"}
                  src={usuario?.image || usuarioIcono}
                  alt={usuario?.image ? "Tu foto de perfil" : ""}
                  width="88"
                  height="88"
                />
              </div>
              <div>
                <p className="cuenta__etiqueta">
                  {usuario ? "Qué bien verte de nuevo" : "A tu ritmo"}
                </p>
                <h2 id="cuenta-saludo">
                  {usuario
                    ? nombreSaludo
                      ? `Hola, ${nombreSaludo}`
                      : "Te damos la bienvenida"
                    : esVisitante
                      ? "Hola, visitante"
                      : "Te damos la bienvenida"}
                </h2>
                <p className="cuenta__descripcion">
                  {usuario
                    ? "Este es tu rincón en Sellaper."
                    : esVisitante
                      ? "Estás explorando Sellaper como invitado."
                      : "Inicia sesión para acceder a tu cuenta."}
                </p>
              </div>
            </div>

            {usuario ? (
              <section className="cuenta__datos" aria-labelledby="cuenta-datos">
                <h3 id="cuenta-datos">Tus datos</h3>
                {datos.length > 0 ? (
                  <dl>
                    {datos.map(({ etiqueta, valor }) => (
                      <div key={etiqueta}>
                        <dt>{etiqueta}</dt>
                        <dd>{valor}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="cuenta__descripcion">
                    No hay datos de perfil disponibles.
                  </p>
                )}
              </section>
            ) : (
              <div className="cuenta__invitacion">
                <h3>Tu cuenta te espera</h3>
                <p className="cuenta__descripcion">
                  Inicia sesión para ver tu perfil y los datos de tu cuenta.
                  Puedes seguir visitando tus favoritos y tu carrito mientras
                  exploras la tienda.
                </p>
                <Link className="cuenta__boton" to="/iniciar-sesion">
                  Iniciar sesión
                  <img src={flechaIcono} alt="" aria-hidden="true" />
                </Link>
              </div>
            )}
          </section>

          <div className="cuenta__ilustracion" aria-hidden="true">
            <img
              src={mascotaEspejo}
              alt=""
              width="1402"
              height="1122"
            />
          </div>
        </div>

        <section className="cuenta__accesos" aria-labelledby="cuenta-accesos">
          <div className="cuenta__accesos-cabecera">
            <h2 id="cuenta-accesos">Sigue donde lo dejaste</h2>
            {(usuario || esVisitante) && (
              <button
                className="cuenta__cerrar-sesion"
                type="button"
                onClick={cerrarSesion}
              >
                {usuario ? "Cerrar sesión" : "Salir del modo invitado"}
              </button>
            )}
          </div>
          <nav className="cuenta__enlaces" aria-label="Accesos de tu cuenta">
            <Link className="cuenta__acceso" to="/favoritos">
              <span className="cuenta__acceso-icono" aria-hidden="true">
                <img src={favoritosIcono} alt="" />
              </span>
              <span>
                <strong>Mis favoritos</strong>
                <span>Vuelve a los productos que te gustan.</span>
              </span>
              <img
                className="cuenta__flecha"
                src={flechaIcono}
                alt=""
                aria-hidden="true"
              />
            </Link>
            <Link className="cuenta__acceso" to="/carrito">
              <span className="cuenta__acceso-icono" aria-hidden="true">
                <img src={carritoIcono} alt="" />
              </span>
              <span>
                <strong>Mi carrito</strong>
                <span>Revisa los productos de tu próxima compra.</span>
              </span>
              <img
                className="cuenta__flecha"
                src={flechaIcono}
                alt=""
                aria-hidden="true"
              />
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}

export default Cuenta;
