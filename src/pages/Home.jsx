import { NavLink } from "react-router-dom";
import { CheckCircle, AlertCircle, XCircle, Quote } from "lucide-react";
import TestimonialCarousel from "../components/TestimonialCarousel";

export default function Home() {
  
  return (
    <section id="inicio" className="pt-14">

      <div className="bg-gradient-to-tr from-[#FF7E5F] to-[#FEB47B] text-white pt-24 pb-32">
        <div className="container mx-auto px-6 text-center ">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Conecta, Compra y Crece en Villavicencio
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            La plataforma que une el comercio local. Encuentra productos únicos y apoya a los negocios de nuestra tierra.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Busca productos, servicios o negocios..."
              className="w-full py-4 px-6 rounded-full text-gray-800 shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-200/75 p-3 rounded-full hover:bg-green-300/75 transition">
              <img src="https://img.icons8.com/?size=50&id=132&format=png" className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white py-16 -mt-16 rounded-t-3xl shadow-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Impulsando lo Nuestro en 3 Pasos
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-6 rounded-full mb-4">
                <img src="https://img.icons8.com/?size=100&id=UkLBG0sZoWV0&format=png" className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">1. Regístrate Fácil</h3>
              <p className="text-gray-600">
                Crea tu perfil como comprador o vendedor en minutos y únete a la comunidad.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-6 rounded-full mb-4">
                <img src="https://img.icons8.com/?size=50&id=4716&format=png" className="w-12 h-12 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">2. Publica tus Productos</h3>
              <p className="text-gray-600">
                Sube fotos y descripciones de lo que ofreces. ¡Mostrar tu talento nunca fue tan sencillo!
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-6 rounded-full mb-4">
                <img src="https://img.icons8.com/?size=50&id=9671&format=png" className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">3. Vende y Conecta</h3>
              <p className="text-gray-600">
                Gestiona tus ventas, contacta con tus clientes y haz crecer tu negocio localmente.
              </p>
            </div>
          </div>
        </div>
      </div>


      <section className="relative py-24 bg-gradient-to-r from-green-50 to-green-100">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Texto principal */}
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-wide">
              Confianza y Crecimiento
            </span>
            <h2 className="text-5xl font-extrabold text-green-800 leading-tight mt-4 mb-6">
              Te ayudamos a <span className="text-orange-500">Formalizar</span> tu negocio
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Implementamos un sistema que te muestra el nivel de formalización de tu negocio 
              y te guiamos paso a paso hasta llegar al 100%.
            </p>

            {/* Niveles de formalización */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500 w-6 h-6" />
                <span className="text-gray-700">
                  <strong className="text-green-600">Verde:</strong> Negocio 100% formalizado y en regla. ¡Máxima confianza!
                </span>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="text-yellow-500 w-6 h-6" />
                <span className="text-gray-700">
                  <strong className="text-yellow-600">Amarillo:</strong> En proceso de formalización. ¡Ya diste el primer paso!
                </span>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="text-red-500 w-6 h-6" />
                <span className="text-gray-700">
                  <strong className="text-red-600">Rojo:</strong> Negocio informal. ¡Te ayudamos a empezar el camino!
                </span>
              </div>
            </div>

            {/* CTA */}
            <NavLink
              to="/formalization"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block mt-10 px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition"
            >
              Ver formalizaciones
            </NavLink>
          </div>

          {/* Testimonio */}
          <TestimonialCarousel />
        </div>
      </section>
    </section>
  );
}

