import { useContext, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CuentaContext } from "../context/cuentaProvider";
import logo from "../assets/sellaper-logo.svg";
import usuarioIcono from "../assets/usuario.svg";
import escudoIcono from "../assets/verificacion-de-escudo.svg";
import flechaIcono from "../assets/flecha-pequena-derecha.svg";
import mascotaUsuario from "../assets/Sellaper señalando el campo de usuario.png";
import mascotaContraseña from "../assets/Ojo curioso entre los dedos.png";
import mascotaBienvenida from "../assets/Sellaper sostiene un cartel de bienvenida.png";
import mascotaInvitado from "../assets/Figura azul sigilosa con fedora.png";
import "../styles/login.css";

const mascotas = {
  usuario: mascotaUsuario,
  contraseña: mascotaContraseña,
  bienvenida: mascotaBienvenida,
  invitado: mascotaInvitado,
} as const;

type EstadoMascota = keyof typeof mascotas;
type MascotaBoton = Extract<EstadoMascota, "bienvenida" | "invitado">;

function Login() {
  const userContext = useContext(CuentaContext);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarioIncorrecto, setUsuarioIncorrecto] = useState(
    () => localStorage.getItem("usuarioIncorrecto") === "true",
  );
  const [enviando, setEnviando] = useState(false);
  const envioEnCurso = useRef(false);
  const [elementoEnfocado, setElementoEnfocado] =
    useState<EstadoMascota | null>(null);
  const [botonSobrevolado, setBotonSobrevolado] = useState<MascotaBoton | null>(
    null,
  );
  const [mascotasListas, setMascotasListas] = useState<
    Partial<Record<EstadoMascota, boolean>>
  >({});
  const navigate = useNavigate();
  const mascotaSolicitada = botonSobrevolado ?? elementoEnfocado ?? "usuario";
  const mascotaVisible = mascotasListas[mascotaSolicitada]
    ? mascotaSolicitada
    : "usuario";

  useEffect(() => {
    localStorage.setItem(
      "usuarioIncorrecto",
      JSON.stringify(usuarioIncorrecto),
    );
  }, [usuarioIncorrecto]);

  useEffect(() => {
    let montado = true;

    // Precarga y decodifica todas las variantes antes de mostrarlas al interactuar.
    for (const [estado, src] of Object.entries(mascotas)) {
      const imagen = new Image();
      imagen.src = src;
      void imagen
        .decode()
        .then(() => {
          if (montado) {
            setMascotasListas((anteriores) => ({
              ...anteriores,
              [estado]: true,
            }));
          }
        })
        .catch(() => {
          // Si una variante no carga, se conserva la ilustración inicial.
        });
    }

    return () => {
      montado = false;
    };
  }, []);

  async function iniciarSesion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userContext || envioEnCurso.current || userContext.cargando) return;

    envioEnCurso.current = true;
    setEnviando(true);
    setUsuarioIncorrecto(false);

    try {
      const inicioCorrecto = await userContext.iniciarSesion(
        usuario,
        contraseña,
      );
      setUsuarioIncorrecto(!inicioCorrecto);
      if (inicioCorrecto) navigate("/");
    } finally {
      envioEnCurso.current = false;
      setEnviando(false);
    }
  }

  function entrarComoInvitado() {
    if (!userContext || envioEnCurso.current || userContext.cargando) return;
    userContext.setEsVisitante(true);
    navigate("/");
  }

  if (!userContext) {
    return (
      <main className="login">
        <div className="login__error-contexto" role="alert">
          <h1>No se pudo cargar el inicio de sesión</h1>
          <p>Intenta iniciar sesión más tarde.</p>
          <Link to="/">Volver a Sellaper</Link>
        </div>
      </main>
    );
  }

  const ocupado = enviando || userContext.cargando;

  return (
    <main
      className={`login${userContext.esVisitante || userContext.usuario ? " login--en-tienda" : ""}`}
    >
      <p>El usuario es emilys y la contraseña emilyspass</p>
      <div className="login__contenedor">
        <div className="login__cabecera">
          <Link className="login__marca" to="/" aria-label="Sellaper, inicio">
            <img src={logo} alt="" aria-hidden="true" />
            <span>
              <strong>sellaper</strong>
              <span>Tu tienda online</span>
            </span>
          </Link>
          <span className="login__lema">
            Un mundo de cosas que van contigo.
          </span>
        </div>

        <section className="login__panel" aria-labelledby="login-titulo">
          <div className="login__contenido">
            <p className="login__etiqueta">Tu espacio Sellaper</p>
            <h1 id="login-titulo">
              Qué bueno
              <br />
              verte por aquí.
            </h1>
            <p className="login__descripcion">
              Inicia sesión y sigue descubriendo lo que te gusta.
            </p>

            <form
              className="login__formulario"
              onSubmit={iniciarSesion}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setElementoEnfocado(null);
                }
              }}
              aria-busy={ocupado}
            >
              <div className="login__campo">
                <label htmlFor="login-usuario">Usuario</label>
                <div className="login__entrada">
                  <img src={usuarioIcono} alt="" aria-hidden="true" />
                  <input
                    id="login-usuario"
                    name="username"
                    type="text"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="Tu nombre de usuario"
                    value={usuario}
                    onChange={(event) => setUsuario(event.target.value)}
                    onFocus={() => setElementoEnfocado("usuario")}
                    aria-invalid={usuarioIncorrecto || undefined}
                    aria-describedby={
                      usuarioIncorrecto ? "login-error" : undefined
                    }
                    disabled={ocupado}
                    required
                  />
                </div>
              </div>

              <div className="login__campo">
                <label htmlFor="login-password">Contraseña</label>
                <div className="login__entrada">
                  <img src={escudoIcono} alt="" aria-hidden="true" />
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
                    value={contraseña}
                    onChange={(event) => setContraseña(event.target.value)}
                    onFocus={() => setElementoEnfocado("contraseña")}
                    aria-invalid={usuarioIncorrecto || undefined}
                    aria-describedby={
                      usuarioIncorrecto ? "login-error" : undefined
                    }
                    disabled={ocupado}
                    required
                  />
                </div>
              </div>

              <div className="login__feedback">
                {usuarioIncorrecto && (
                  <p id="login-error" className="login__error" role="alert">
                    Usuario o contraseña incorrectos.
                  </p>
                )}
                <span className="login__estado" role="status">
                  {ocupado ? "Iniciando sesión…" : ""}
                </span>
              </div>

              <button
                className="login__boton login__boton--principal"
                type="submit"
                disabled={ocupado}
                onFocus={() => setElementoEnfocado("bienvenida")}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch")
                    setBotonSobrevolado("bienvenida");
                }}
                onPointerLeave={() => setBotonSobrevolado(null)}
                onPointerCancel={() => setBotonSobrevolado(null)}
              >
                {ocupado ? "Iniciando sesión…" : "Iniciar sesión"}
                <img src={flechaIcono} alt="" aria-hidden="true" />
              </button>

              <div className="login__separador">
                <span>o sigue a tu ritmo</span>
              </div>

              <button
                className="login__boton login__boton--invitado"
                type="button"
                disabled={ocupado}
                onClick={entrarComoInvitado}
                onFocus={() => setElementoEnfocado("invitado")}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch")
                    setBotonSobrevolado("invitado");
                }}
                onPointerLeave={() => setBotonSobrevolado(null)}
                onPointerCancel={() => setBotonSobrevolado(null)}
              >
                Entrar como invitado
                <img src={flechaIcono} alt="" aria-hidden="true" />
              </button>
              <p className="login__nota">
                Explora la tienda sin iniciar sesión.
              </p>
            </form>
          </div>

          <div className="login__ilustracion" aria-hidden="true">
            <div className="login__escenario">
              {Object.entries(mascotas).map(([estado, src]) => (
                <img
                  key={estado}
                  className={`login__mascota${estado === mascotaVisible ? " login__mascota--visible" : ""}`}
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              ))}
            </div>
            <p className="login__pie-ilustracion">
              Tus gustos. Tus descubrimientos. Tu Sellaper.
            </p>
          </div>
        </section>
        <p className="login__pie">
          Tecnología, ropa y lifestyle. Encuentra tu próximo favorito.
        </p>
      </div>
    </main>
  );
}

export default Login;
