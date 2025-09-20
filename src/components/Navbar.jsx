import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../context/AuthContext";

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cerrar menú al cambiar de ruta o con tecla ESC
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkBase =
    "text-gray-700 font-medium hover:text-orange-500 transition-colors";
  const linkActive = "text-orange-500";

  return (
    <header className="bg-white/75 backdrop-blur-lg shadow-md w-full fixed top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-800">
            Impulso<span className="text-orange-500">Llanero</span>
          </span>
        </NavLink>

        {/* Navegación desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/formalization"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Formalízate
          </NavLink>
          <NavLink
            to="/call"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Convocatorias
          </NavLink>

          {auth.user && (
            <>
              <NavLink
                to="/profile-business"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                Perfil
              </NavLink>
              <NavLink
                to="/panel"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                Panel
              </NavLink>
            </>
          )}
        </div>

        {/* Acciones auth desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {auth.user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">
                Hola, {auth.user?.fullName?.split(" ")[0] ?? "Usuario"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold py-2 px-5 rounded-full hover:bg-red-600 transition shadow"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={onLoginClick}
                className="text-green-800 font-semibold hover:text-orange-500 transition"
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={onRegisterClick}
                className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition shadow"
              >
                Regístrate
              </button>
            </>
          )}
        </div>

        {/* Botón hamburguesa (mobile) */}
        <div className="md:hidden">
          <button
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="button"
          >
            {/* Ícono hamburguesa / cerrar */}
            <svg
              className={`h-6 w-6 ${mobileOpen ? "hidden" : "block"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              className={`h-6 w-6 ${mobileOpen ? "block" : "hidden"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`md:hidden origin-top overflow-hidden transition-all duration-200 ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-4 pt-2 border-t bg-white/95 backdrop-blur">
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-gray-700 hover:text-orange-500"
          >
            Inicio
          </NavLink>
          <NavLink
            to="/marketplace"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-gray-700 hover:text-orange-500"
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/formalization"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-gray-700 hover:text-orange-500"
          >
            Formalízate
          </NavLink>
          <NavLink
            to="/call"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-gray-700 hover:text-orange-500"
          >
            Convocatorias
          </NavLink>

          {auth.user && (
            <>
              <NavLink
                to="/profile-business"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-gray-700 hover:text-orange-500"
              >
                Perfil
              </NavLink>
              <NavLink
                to="/panel"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-gray-700 hover:text-orange-500"
              >
                Panel
              </NavLink>
            </>
          )}

          <div className="mt-4 border-t pt-4 space-y-2">
            {auth.user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition shadow"
              >
                Cerrar Sesión
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onLoginClick?.();
                  }}
                  className="w-full text-left text-green-800 font-semibold hover:text-orange-500 transition"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onRegisterClick?.();
                  }}
                  className="w-full text-left bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition shadow"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
