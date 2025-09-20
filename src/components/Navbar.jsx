import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../context/AuthContext"; // Importar el hook de autenticación

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const { auth, logout } = useAuth(); // Obtener el estado de autenticación y la función de logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirigir al inicio después de cerrar sesión
  };

  return (
    <header className="bg-white/75 backdrop-blur-lg shadow-md w-full fixed top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-800">
            Impulso<span className="text-orange-500">Llanero</span>
          </span>
        </NavLink>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="text-gray-700 hover:text-orange-500 font-medium">Inicio</NavLink>
          <NavLink to="/marketplace" className="text-gray-700 hover:text-orange-500 font-medium">Marketplace</NavLink>
          <NavLink to="/formalization" className="text-gray-700 hover:text-orange-500 font-medium">Formalízate</NavLink>
          <NavLink to="/call" className="text-gray-700 hover:text-orange-500 font-medium">Convocatorias</NavLink>

          {auth.user && (
            <>
              <NavLink to="/profile-business" className="text-gray-700 hover:text-orange-500 font-medium">Perfil </NavLink>
              {/* <NavLink to="/formalization-wizard" className="text-gray-700 hover:text-orange-500 font-medium">Formalización</NavLink> */}
              <NavLink to="/panel" className="text-gray-700 hover:text-orange-500 font-medium">Panel</NavLink>
            </>
          )}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {auth.user ? (
            // Si el usuario está autenticado
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Hola, {auth.user.fullName.split(' ')[0]}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold py-2 px-5 rounded-full hover:bg-red-600 transition duration-300 shadow"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            // Si el usuario NO está autenticado
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
                className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition duration-300 shadow"
              >
                Registrate
              </button>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <button aria-label="Abrir menú">
            {/* Aquí podrías tener un ícono de menú (hamburguesa) */}
          </button>
        </div>
      </nav>

      {/* Menú Móvil (también necesita la lógica condicional) */}
      <div id="mobile-menu" className="hidden lg:hidden px-6 pb-4">
        <NavLink to="/" className="block py-2 text-gray-700 hover:text-orange-500">Inicio</NavLink>
        <NavLink to="/marketplace" className="block py-2 text-gray-700 hover:text-orange-500">Marketplace</NavLink>
        <NavLink to="/formalization" className="block py-2 text-gray-700 hover:text-orange-500">Formalízate</NavLink>
        <NavLink to="/call" className="block py-2 text-gray-700 hover:text-orange-500">Convocatorias</NavLink>

        <div className="mt-4 border-t pt-4 space-y-2">
          {auth.user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 shadow"
            >
              Cerrar Sesión
            </button>
          ) : (
            <>
              <button onClick={onLoginClick} className="w-full text-left text-green-800 font-semibold hover:text-orange-500 transition">Iniciar Sesión</button>
              <button onClick={onRegisterClick} className="w-full text-left bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300 shadow">Registrarse</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}