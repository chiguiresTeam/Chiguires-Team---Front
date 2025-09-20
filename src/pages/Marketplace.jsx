import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductDetailModal } from './ProductDetails.jsx';
import useAuth from '../context/AuthContext';
import { ShoppingBag, PlusCircle } from 'lucide-react';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { auth } = useAuth();
  const [modalCompany, setModalCompany] = useState(null);
  const timerRef = useRef(null);

  const formalDot = "w-3 h-3 rounded-full inline-block mr-2 border-2 border-white shadow-sm";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://144.202.38.22:8080/api/v1/products');
        const data = await response.json();
        setProducts(data.content || []);
        setDisplayProducts(data.content || []);
      } catch (err) {
        setError("No se pudieron cargar los productos. Por favor, inténtalo más tarde.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedProducts = [...products];
    if (sortOrder === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setDisplayProducts(sortedProducts);
  }, [sortOrder, products]);

  const handleMouseEnter = (company) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setModalCompany(company);
    }, 1500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setModalCompany(null);
  };

  const getFormalizationColor = (level) => {
    switch (level) {
      case 'Completo': return 'bg-green-500';
      case 'En Proceso': return 'bg-yellow-400';
      case 'Informal': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center col-span-full py-20">Cargando productos...</div>;
    }

    if (error) {
      return <div className="text-center col-span-full text-red-500 py-20">{error}</div>;
    }

    if (displayProducts.length === 0) {
      return (
        <div className="col-span-full bg-white p-12 rounded-2xl shadow-lg text-center flex flex-col items-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">Aún no hay productos</h3>
          <p className="text-gray-500 mt-2 max-w-md">
            Parece que nuestro marketplace está vacío. ¡Vuelve pronto o sé el primero en agregar un producto!
          </p>
          {auth.user && (auth.user.role === 'Vendedor' || auth.user.role === 'ADMIN') && (
            <Link to="/up-products" className="mt-6 inline-flex items-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 shadow-md">
              <PlusCircle className="w-5 h-5" />
              Agregar tu primer producto
            </Link>
          )}
        </div>
      );
    }

    return displayProducts.map(product => {
      const companyForModal = product.company ? {
        ...product.company,
        formalizacion: {
          'Completo': 'Verde',
          'En Proceso': 'Amarillo',
          'Informal': 'Rojo',
        }[product.company.formalizacion] || 'gray',
      } : {};

      return (
        <div
          key={product.id}
          onMouseEnter={() => handleMouseEnter(companyForModal)}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/product/${product.id}`} state={{ product }} className="block h-full">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition duration-300 h-full flex flex-col">
              <div className="relative">
                <img src={product.images[0] || 'https://placehold.co/400x300/CCCCCC/FFFFFF?text=Sin+Imagen'} alt={product.name} className="w-full h-48 object-contain object-center" />
                {product.company && (
                  <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
                    <span className={`${formalDot} ${getFormalizationColor(product.company.formalizacion)}`} />
                  </div>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h4 className="text-lg font-bold text-green-800 truncate">{product.name}</h4>
                <p className="text-sm text-gray-500 mb-2 truncate">{product.company ? product.company.name : 'Sin empresa'}</p>
                <p className="text-xl font-bold text-orange-500 mt-auto">{`$${product.price.toLocaleString()}`}</p>
              </div>
            </article>
          </Link>
        </div>
      );
    });
  };

  return (
    <section id="marketplace" className="py-20 bg-gray-50 relative overflow-hidden">

      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 text-orange-100/50 z-0 pointer-events-none select-none">
        <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M49.8,-57.9C62,-44.9,67.6,-26.3,69.2,-6.9C70.8,12.5,68.4,32.7,57.7,46.4C47,60.1,28.1,67.2,8.1,69.5C-11.8,71.8,-31.8,69.2,-47.4,59.3C-63,49.4,-74.2,32.2,-77.3,13.2C-80.4,-5.8,-75.4,-26.6,-63.9,-40.4C-52.4,-54.2,-34.4,-61,-17.7,-63.1C-1,-65.2,14.5,-62.7,27.1,-63.3C39.7,-63.9,49.8,-57.9,49.8,-57.9Z" transform="translate(100 100)" /></svg>
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-green-100/50 z-0 pointer-events-none select-none">
        <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M49.8,-57.9C62,-44.9,67.6,-26.3,69.2,-6.9C70.8,12.5,68.4,32.7,57.7,46.4C47,60.1,28.1,67.2,8.1,69.5C-11.8,71.8,-31.8,69.2,-47.4,59.3C-63,49.4,-74.2,32.2,-77.3,13.2C-80.4,-5.8,-75.4,-26.6,-63.9,-40.4C-52.4,-54.2,-34.4,-61,-17.7,-63.1C-1,-65.2,14.5,-62.7,27.1,-63.3C39.7,-63.9,49.8,-57.9,49.8,-57.9Z" transform="translate(100 100) scale(1.2)" /></svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-4">Marketplace Local</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Explora la riqueza de productos y servicios que Villavicencio tiene para ofrecer.</p>


        <div className="flex justify-start mb-8">
          <select 
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="default">Ordenar por defecto</option>
            <option value="price-desc">Precio: Mayor a menor</option>
            <option value="price-asc">Precio: Menor a mayor</option>
          </select>
        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {renderContent()}
        </div>
      </div>


      <ProductDetailModal 
        open={!!modalCompany}
        onClose={() => setModalCompany(null)}
        company={modalCompany}
      />
    </section>
  );
}
