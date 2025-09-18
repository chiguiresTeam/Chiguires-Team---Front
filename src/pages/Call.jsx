import { NavLink } from "react-router-dom";

export default function Call() {
  return (
    <section id="convocatorias" className="py-20 bg-white">
      <div className="container mx-auto px-6">

        <div
          className="relative bg-cover bg-center py-20 mb-12 rounded-lg shadow-lg"
          style={{ backgroundImage: "url('https://via.placeholder.com/1500x400/008080/FFFFFF?text=Oportunidades+y+Convocatorias')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="relative container mx-auto px-6 text-white text-center">
            <h2 className="text-5xl font-bold mb-4">Oportunidades y Convocatorias</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Mantente al día con las últimas convocatorias, ferias y programas de
              apoyo para emprendedores en Villavicencio.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6">

          <div className="space-y-8 max-w-4xl mx-auto">
            
            {/* Convocatoria Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center border border-gray-200">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-orange-100 rounded-xl flex flex-col items-center justify-center border-2 border-orange-300">
                  <span className="text-4xl font-extrabold text-orange-600">25</span>
                  <span className="font-semibold text-orange-500 -mt-1">OCT</span>
                </div>
              </div>
              <div className="flex-grow">
                <span className="text-sm font-bold text-orange-600 uppercase">FONDO EMPRENDER</span>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">
                  Capital Semilla para Emprendimientos Innovadores
                </h3>
                <p className="text-gray-700 text-base mt-3">
                  Recursos no reembolsables para financiar iniciativas empresariales de
                  aprendices, egresados, y más.
                </p>
              </div>
              <div className="flex-shrink-0">

                <NavLink to="/call-details" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out">Ver detalles</NavLink>
              </div>
            </div>

            {/* Convocatoria Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center border border-gray-200">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-green-100 rounded-xl flex flex-col items-center justify-center border-2 border-green-300">
                  <span className="text-4xl font-extrabold text-green-700">10</span>
                  <span className="font-semibold text-green-700 -mt-1">NOV</span>
                </div>
              </div>
              <div className="flex-grow">
                <span className="text-sm font-bold text-green-700 uppercase">
                  ALCALDÍA DE VILLAVICENCIO
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">
                  Feria Artesanal "Villavo Muestra"
                </h3>
                <p className="text-gray-700 text-base mt-3">
                  Inscripciones abiertas para artesanos locales que deseen participar
                  en la feria anual en el Parque Los Fundadores.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out"
                >
                  Inscribirse
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
  );
}
