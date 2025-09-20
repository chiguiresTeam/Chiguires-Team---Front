import React from "react";
import { PlusCircle, FilePenLine, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const semaforization = localStorage.getItem("formalizationChecklist")
export default function AdminPanelBusiness() {
  const navigate = useNavigate();

  return (
    <section id="dashboard" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-green-800">Panel de Control</h2>
            <p className="text-gray-600 mt-1">Gestiona tus productos y servicios de forma centralizada.</p>
          </div>

          <button
            onClick={() => navigate("/up-products")}

            type="button"
            className="bg-green-700 text-white font-bold py-3 px-6 flex items-center gap-2 w-full sm:w-auto rounded-full hover:bg-green-800 transition shadow-md"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Agregar Producto</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-green-800 uppercase bg-green-50/70">
                <tr>
                  <th scope="col" className="px-6 py-4">Imagen</th>
                  <th scope="col" className="px-6 py-4">Nombre del Producto</th>
                  <th scope="col" className="px-6 py-4">Precio</th>
                  <th scope="col" className="px-6 py-4">Estado</th>
                  <th scope="col" className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>

                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src="https://placehold.co/80x80/FF7E5F/FFFFFF?text=Prod+1" alt="Prod 1" className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">Carne a la Llanera</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">$35.000</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">Publicado</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button type="button" className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition" title="Editar">
                      <FilePenLine className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 rounded-full hover:bg-red-100 text-red-600 transition" title="Eliminar">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>


                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src="https://placehold.co/80x80/FEB47B/FFFFFF?text=Prod+2" alt="Prod 2" className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">Picada para 2 Personas</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">$50.000</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">Publicado</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button type="button" className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition" title="Editar">
                      <FilePenLine className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 rounded-full hover:bg-red-100 text-red-600 transition" title="Eliminar">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>


                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src="https://placehold.co/80x80/9CA3AF/FFFFFF?text=Servicio" alt="Servicio" className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">Servicio de Domicilio</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">A convenir</td>
                  <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">Borrador</span></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button type="button" className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition" title="Editar">
                      <FilePenLine className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 rounded-full hover:bg-red-100 text-red-600 transition" title="Eliminar">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
