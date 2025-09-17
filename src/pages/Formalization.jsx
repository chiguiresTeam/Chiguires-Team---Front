
export default function Formalization() {
  return (
    <section id="formalizacion" className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Tu Camino hacia la Formalización
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Te guiamos paso a paso para que tu negocio cumpla con todos los requisitos legales. Es más fácil de lo que crees. ¡Empecemos!
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6 border-b pb-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-orange-500 text-white text-3xl font-bold flex items-center justify-center rounded-full">
                1
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Autodiagnóstico Inicial
              </h3>
              <p className="text-gray-600 mb-4">
                Responde unas preguntas sencillas para identificar tu estado actual y los documentos que ya tienes.
              </p>
              <button className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition">
                Comenzar Diagnóstico
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6 border-b pb-8 mb-8 opacity-50">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-300 text-white text-3xl font-bold flex items-center justify-center rounded-full">
                2
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Ruta de Formalización Personalizada
              </h3>
              <p className="text-gray-600">
                Basado en tu diagnóstico, te mostraremos una lista de chequeo clara con los pasos y documentos que necesitas.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Registro en Cámara de Comercio.</li>
                <li>Inscripción en el RUT.</li>
                <li>Certificado de Bomberos.</li>
                <li>Curso de manipulación de alimentos (si aplica).</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6 opacity-50">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-300 text-white text-3xl font-bold flex items-center justify-center rounded-full">
                3
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Recursos y Acompañamiento
              </h3>
              <p className="text-gray-600">
                Te proporcionamos enlaces directos, guías descargables y contactos de entidades de apoyo en Villavicencio para que no te sientas solo en el proceso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
