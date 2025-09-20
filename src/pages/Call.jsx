import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../axios/axios";
import bgConvocatorias from "../assets/convocatoria.jpg";


const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
    return { day, month };
  } catch (error) {
    return { day: '??', month: '???' };
  }
};

export default function Call() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get("/events");
        setEvents(response.data.content || []);
      } catch (err) {
        setError("No se pudieron cargar las convocatorias. Inténtalo de nuevo más tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="convocatorias" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div
          className="relative bg-cover bg-center py-20 mb-12 rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${bgConvocatorias})` }}
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
            {loading ? (
              <p className="text-center text-gray-700">Cargando convocatorias...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : events.length > 0 ? (
              events.map((event, index) => {
                const { day, month } = formatDate(event.startDate); 
                const isOrange = index % 2 === 0;

                return (
                  <div key={event.id} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center border border-gray-200">
                    <div className="flex-shrink-0">
                      <div className={`w-24 h-24 rounded-xl flex flex-col items-center justify-center border-2 ${isOrange ? 'bg-orange-100 border-orange-300' : 'bg-green-100 border-green-300'}`}>
                        <span className={`text-4xl font-extrabold ${isOrange ? 'text-orange-600' : 'text-green-700'}`}>{day}</span>
                        <span className={`font-semibold ${isOrange ? 'text-orange-500' : 'text-green-700'} -mt-1`}>{month}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <span className={`text-sm font-bold uppercase ${isOrange ? 'text-orange-600' : 'text-green-700'}`}>{event.category || 'General'}</span>
                      <h3 className="text-2xl font-bold text-gray-800 mt-2">
                        {event.name || 'Título no disponible'}
                      </h3>
                      <p className="text-gray-700 text-base mt-3 line-clamp-2">
                        {event.description || 'Descripción no disponible.'}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-4 md:mt-0">
                      <NavLink to={`/call-details/${event.id}`} state={{ event }} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out">
                        Ver detalles
                      </NavLink>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-700"></p>
            )}
          </div>

          {/* Temp */}
          <div className="container mx-auto px-6">

            <div className="space-y-8 max-w-4xl mx-auto">

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
      </div>
    </section>
  );
}