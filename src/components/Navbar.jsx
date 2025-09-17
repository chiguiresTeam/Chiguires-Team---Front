import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <header className="bg-white/75 backdrop-blur-lg shadow-md w-full fixed top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">

        <a href="#" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-800">
            Vibra<span className="text-orange-500">Llano</span>
          </span>
        </a>


        <div className="hidden lg:flex items-center space-x-8">
          <NavLink to="/" className="text-gray-700 hover:text-orange-500 font-medium">Inicio</NavLink>
          <NavLink to="/marketplace" className="text-gray-700 hover:text-orange-500 font-medium">Marketplace</NavLink>
          <NavLink to="/formalization" className="text-gray-700 hover:text-orange-500 font-medium">Formalízate</NavLink>
          <NavLink to="/call" className="text-gray-700 hover:text-orange-500 font-medium">Convocatorias</NavLink>

        </div>


        <div className="hidden lg:flex items-center space-x-4">
          {/* <button className="text-green-800 font-semibold hover:text-orange-500 transition">Iniciar Sesión</button> */}
          <NavLink to="/login" className="text-green-800 font-semibold hover:text-orange-500 transition" onClick={() => setShowLogin(true)}>Iniciar Sesión</NavLink>
          {/* <button className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition duration-300 shadow">Registrarse</button> */}
          <NavLink to="/register" className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition duration-300 shadow">Registrarse</NavLink>
        </div>


        <div className="lg:hidden">
          <button aria-label="Abrir menú">
          </button>
        </div>
      </nav>


      <div id="mobile-menu" className="hidden lg:hidden px-6 pb-4">
        <a href="#inicio" className="block py-2 text-gray-700 hover:text-orange-500">Inicio</a>
        <a href="#marketplace" className="block py-2 text-gray-700 hover:text-orange-500">Marketplace</a>
        <a href="#formalizacion" className="block py-2 text-gray-700 hover:text-orange-500">Formalízate</a>
        <a href="#convocatorias" className="block py-2 text-gray-700 hover:text-orange-500">Convocatorias</a>
        <div className="mt-4 border-t pt-4 space-y-2">
          <button className="w-full text-left text-green-800 font-semibold hover:text-orange-500 transition">Iniciar Sesión</button>
          <button className="w-full text-left bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300 shadow">Registrarse</button>
        </div>
      </div>
    </header>
  );
}
