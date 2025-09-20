import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, MapPin, Phone, ArrowLeftCircle, ShoppingCart, Star } from "lucide-react";
import api from "../axios/axios";

// --- Modal Component (Named Export) ---
export function ProductDetailModal({ open = false, onClose = () => {}, company }) {
  const {
    name = "Nombre de la Empresa",
    formalizacion = "gray",
    description = "Descripción de la empresa y sus productos.",
    address = "Dirección de la empresa",
    phone = "Número de teléfono",
  } = company || {};

  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;

  const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const panel = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

  const formalBg = {
    Verde: "bg-green-500",
    Amarillo: "bg-yellow-400",
    Rojo: "bg-red-500",
    gray: "bg-gray-400",
  }[formalizacion] || "bg-gray-400";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/60" onClick={(e) => { e.stopPropagation(); onClose(); }} />
          <motion.div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full m-4 z-10" variants={panel}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-20" aria-label="Cerrar">
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl font-bold text-green-800 leading-tight">{name}</h2>
              <span className={`w-4 h-4 rounded-full inline-block mt-1 border-2 border-white shadow-sm ${formalBg}`}></span>
            </div>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Dirección</h4>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Teléfono</h4>
                  <p className="text-gray-600">{phone}</p>
                </div>
              </div>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Product Detail Page (Default Export) ---
export default function ProductDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(!state?.product); // Set loading true if product not in state
  const [error, setError] = useState(null);

  const [otherProducts, setOtherProducts] = useState([]);
  const [activePhoto, setActivePhoto] = useState(0);

  // Fetch main product if not available from location state
  useEffect(() => {
    if (!product) {
      const fetchProductById = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/products/${productId}`);
          setProduct(response.data);
        } catch (err) {
          setError("No se pudo cargar el producto. Inténtalo de nuevo más tarde.");
          console.error("Error fetching product by ID:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProductById();
    }
  }, [productId, product]); // Depend on productId and product (to avoid re-fetching if already set)

  // Fetch other products
  useEffect(() => {
    if (product) { // Only fetch other products if main product is loaded
      const fetchOtherProducts = async () => {
        try {
          const response = await api.get("/products");
          const filtered = (response.data.content || []).filter(p => p.id !== product.id).slice(0, 4);
          setOtherProducts(filtered);
        } catch (err) {
          console.error("Error fetching other products:", err);
        }
      };
      fetchOtherProducts();
    }
  }, [product]);

  // Reset active photo when product changes
  useEffect(() => {
    setActivePhoto(0);
  }, [product]);

  if (loading) {
    return <div className="text-center py-20">Cargando producto...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Producto no encontrado.</div>;
  }

  const photos = product.images && product.images.length > 0 ? product.images : ['https://placehold.co/800x800/CCCCCC/FFFFFF?text=Sin+Imagen'];
  const whatsappUrl = product.company?.phone ? `https://wa.me/${product.company.phone.replace(/[^0-9]/g, "")}?text=Hola, vi tu producto \"${product.name}\" en el Marketplace Local.` : null;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-green-800 font-semibold cursor-pointer hover:underline"
          >
            <ArrowLeftCircle className="w-5 h-5" />
            Volver
          </button>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 ">
            {/* Image Gallery */}
            <div>
              <div className="w-full aspect-square rounded-lg overflow-hidden shadow-md mb-4">
                <img
                  src={photos[activePhoto]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {photos.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {photos.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      className={`relative rounded-md overflow-hidden border-2 ${activePhoto === idx ? "border-orange-500" : "border-transparent hover:border-gray-300"}`}>
                      <img src={src} alt={`Miniatura ${idx + 1}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block text-sm font-semibold bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                {product.company?.sector || "General"}
              </span>

              <h1 className="text-4xl font-bold text-green-800 my-3">{product.name}</h1>

              <p className="text-4xl font-bold text-green-800 mb-4">
                {`$${product.price.toLocaleString("es-CO")}`}
              </p>

              <div className="border-y border-gray-200 py-4 my-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Descripción</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {product.description || "Sin descripción proporcionada."}
                </p>
              </div>

              {product.stock !== null && (
                <div className="mb-6">
                  <span className="text-lg font-semibold text-green-600">
                    {`${product.stock} disponibles`}
                  </span>
                </div>
              )}

              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Información del vendedor</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={product.company?.logo || "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"} // Assuming company has a logo field
                    alt={product.company?.name || "Vendedor"}
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-400/60"
                  />
                  <div>
                    <p className="font-bold text-green-800">
                      {product.company?.name || "Usuario desconocido"}
                    </p>
                    <p className="text-sm text-gray-500">Vendedor verificado</p>
                  </div>
                </div>
              </div>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white text-lg font-semibold bg-green-600 hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar por WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 bg-gray-300 text-gray-600 text-lg font-semibold cursor-not-allowed"
                  title="El vendedor no tiene WhatsApp configurado"
                >
                  WhatsApp no disponible
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Other Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Proximamente</h2>
          <h2 className="text-3xl font-bold text-green-600 mb-6">mas funcionalidades...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProducts.map((item) => (
              <Link to={`/product/${item.id}`} state={{ product: item }} key={item.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={item.images?.[0] || 'https://placehold.co/400x300/CCCCCC/FFFFFF?text=Sin+Imagen'}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base text-gray-800 line-clamp-2">{item.name}</h3>
                    <p className="text-green-800 font-bold text-lg mt-1">
                      {`$${item.price.toLocaleString("es-CO")}`}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}