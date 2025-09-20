import { NavLink } from "react-router-dom";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import TestimonialCarousel from "../components/TestimonialCarousel";

export default function Home() {
  return (
    <section id="inicio" className="pt-16 sm:pt-18 lg:pt-20">
      {/*  */}
      <div className="bg-gradient-to-tr from-[#FF7E5F] to-[#FEB47B] text-white pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-28 lg:pb-36">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 leading-tight">
            Conecta, Compra y Crece en Villavicencio
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto">
            La plataforma que une el comercio local. Encuentra productos únicos y apoya a los negocios de nuestra tierra.
          </p>
          <div className="max-w-xl mx-auto">
            <NavLink
              to="/marketplace"
              className="inline-block w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-orange-500 font-bold rounded-full shadow-2xl transform hover:scale-[1.02] transition-transform duration-200 ease-in-out text-base sm:text-lg"
            >
              Explorar el Marketplace
            </NavLink>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 sm:py-14 md:py-16 lg:py-20 -mt-6 sm:-mt-10 md:-mt-16 rounded-t-2xl sm:rounded-t-3xl shadow-lg">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8 sm:mb-10 lg:mb-12">
            Impulsando lo Nuestro en 3 Pasos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 text-center">
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm p-6 sm:p-7 lg:p-8">
              <div className="bg-orange-100 p-4 sm:p-5 rounded-full mb-4 sm:mb-5">
                <img
                  src="https://img.icons8.com/?size=100&id=UkLBG0sZoWV0&format=png"
                  alt="Registro sencillo"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">1. Regístrate Fácil</h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-sm">
                Crea tu perfil como comprador o vendedor en minutos y únete a la comunidad.
              </p>
            </div>

            <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm p-6 sm:p-7 lg:p-8">
              <div className="bg-green-100 p-4 sm:p-5 rounded-full mb-4 sm:mb-5">
                <img
                  src="https://img.icons8.com/?size=50&id=4716&format=png"
                  alt="Publica productos"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">2. Publica tus Productos</h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-sm">
                Sube fotos y descripciones de lo que ofreces. ¡Mostrar tu talento nunca fue tan sencillo!
              </p>
            </div>

            <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm p-6 sm:p-7 lg:p-8">
              <div className="bg-yellow-100 p-4 sm:p-5 rounded-full mb-4 sm:mb-5">
                <img
                  src="https://img.icons8.com/?size=50&id=9671&format=png"
                  alt="Vende y conecta"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">3. Vende y Conecta</h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-sm">
                Gestiona tus ventas, contacta con tus clientes y haz crecer tu negocio localmente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-green-50 to-green-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">
          {/* Texto */}
          <div>
            <span className="text-orange-500 font-semibold uppercase tracking-wide text-xs sm:text-sm">
              Confianza y Crecimiento
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 leading-tight mt-3 sm:mt-4 mb-4 sm:mb-6">
              Te ayudamos a <span className="text-orange-500">Formalizar</span> tu negocio
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl">
              Implementamos un sistema que te muestra el nivel de formalización de tu negocio y te guiamos paso a paso hasta llegar al 100%.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6 mt-0.5" />
                <span className="text-gray-700 text-sm sm:text-base">
                  <strong className="text-green-600">Verde:</strong> Negocio 100% formalizado y en regla. ¡Máxima confianza!
                </span>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6 mt-0.5" />
                <span className="text-gray-700 text-sm sm:text-base">
                  <strong className="text-yellow-600">Amarillo:</strong> En proceso de formalización. ¡Ya diste el primer paso!
                </span>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="text-red-500 w-5 h-5 sm:w-6 sm:h-6 mt-0.5" />
                <span className="text-gray-700 text-sm sm:text-base">
                  <strong className="text-red-600">Rojo:</strong> Negocio informal. ¡Te ayudamos a empezar el camino!
                </span>
              </div>
            </div>

            <NavLink
              to="/formalization"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block mt-8 sm:mt-10 px-7 sm:px-8 py-3.5 sm:py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition text-sm sm:text-base"
            >
              Ver formalizaciones
            </NavLink>
          </div>

          <TestimonialCarousel />
        </div>
      </section>
    </section>
  );
}
