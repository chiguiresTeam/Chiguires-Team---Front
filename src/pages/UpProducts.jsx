import { useState } from "react";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import api from "../axios/axios";

export default function UpProducts() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        images: [""], // Start with one empty string for a single image URL input
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        // For now, we only handle one image URL
        setProductData(prev => ({ ...prev, images: [e.target.value] }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("1. handleSubmit function called.");

        if (!auth.user) {
            alert("Debes iniciar sesión para crear un producto.");
            return;
        }
        console.log("2. User is authenticated:", auth.user);

        const companyId = auth.user?.personId;
        console.log("3. Company ID (from personId):", companyId);

        if (!companyId) {
            alert("Error: No se pudo encontrar el ID de la compañía del usuario.");
            return;
        }

        const dataToSend = {
            ...productData,
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock, 10),
            companyId: companyId,
        };
        console.log("4. Data to be sent to API:", dataToSend);

        setIsSubmitting(true);
        try {
            await api.post("/products", dataToSend);
            console.log("5. API call successful!");
            alert("¡Producto creado con éxito!");
            navigate("/panel"); // O a la página del marketplace/panel
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Hubo un error al crear el producto. Revisa los datos e inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="subir-producto" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-4xl font-bold text-green-800">Agregar Nuevo Producto</h2>
                    <button className="nav-link bg-white text-gray-700 font-bold py-2 px-5 rounded-full hover:bg-gray-100 transition shadow-sm flex items-center gap-2"
                        type="button"
                        onClick={() => navigate("/panel")}>
                        <ArrowLeft className="w-4 h-4" />
                        <span>Volver al Panel</span>
                    </button>
                </div>

                <form className="bg-white p-8 rounded-2xl shadow-lg grid lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
                    {/* Columna Izquierda: Detalles del producto */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto/Servicio</label>
                            <input id="name" name="name" type="text" value={productData.name} onChange={handleChange} placeholder="Ej: Carne a la Llanera" className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea id="description" name="description" rows={5} value={productData.description} onChange={handleChange} placeholder="Describe tu producto, sus características, ingredientes, etc." className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                    <input id="price" name="price" type="number" value={productData.price} onChange={handleChange} placeholder="25000" className="pl-7 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Cantidad (Stock)</label>
                                <input id="stock" name="stock" type="number" value={productData.stock} onChange={handleChange} placeholder="100" className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Imágenes y Publicación */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen Principal</label>
                            <input id="images" name="images" type="text" value={productData.images[0]} onChange={handleImageChange} placeholder="https://ejemplo.com/imagen.jpg" className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                            <p className="text-xs text-gray-500 mt-1">Pega aquí la URL de la imagen de tu producto.</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-dashed text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="text-sm text-gray-600 mt-2">La subida de archivos no está implementada. Por favor, usa una URL.</p>
                        </div>

                        <div className="pt-4 border-t">
                            <button type="submit" disabled={isSubmitting} className="w-full bg-green-700 text-white font-bold py-3 rounded-full hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}