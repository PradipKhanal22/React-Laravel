import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/ProductService";
import { Link } from "react-router-dom";
import { Package, Plus, Edit, Trash2, Loader2, Home, Eye } from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="w-10 h-10 text-blue-600" />
              All Products
            </h1>
            <p className="text-gray-600 mt-2">Manage your product inventory</p>
          </div>

          <Link to="/add">
            <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200">
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-8 bg-gray-400 rounded w-24 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">No products yet</h3>
            <p className="text-gray-500 mt-2">Start by adding your first product!</p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="bg-linear-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center overflow-hidden">
                  {product.photo_url ? (
                    <img 
                      src={product.photo_url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Package className="w-20 h-20 text-blue-600/30" />
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
                    {product.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                    {product.description || "No description available."}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1"
                    >
                      <button className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-600 px-3 py-3 rounded-xl font-medium hover:bg-blue-200 transition">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </Link>

                    <Link
                      to={`/edit/${product.id}`}
                      className="flex-1"
                    >
                      <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-3 py-3 rounded-xl font-medium hover:bg-red-200 disabled:opacity-50 transition"
                    >
                      {deletingId === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}