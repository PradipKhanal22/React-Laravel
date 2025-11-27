import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  ShoppingCart,
  Star,
  TrendingUp,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 6)); // Show only first 6 products
      } catch {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                Premium Product Management
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Manage Your
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400">
                  Products Effortlessly
                </span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed">
                The modern platform for managing your product inventory. Add,
                edit, and showcase your products with our intuitive interface.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/add">
                  <button className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <Plus className="w-5 h-5" />
                    Add Product
                  </button>
                </Link>

                <Link to="/products">
                  <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                    View All Products
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-4xl font-bold">{products.length}+</div>
                  <div className="text-blue-200 text-sm">Products</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">100%</div>
                  <div className="text-blue-200 text-sm">Secure</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">24/7</div>
                  <div className="text-blue-200 text-sm">Available</div>
                </div>
              </div>
            </div>

            {/* Right Content - Decorative */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Package className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="h-4 bg-white/30 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="h-32 bg-white/20 rounded-2xl"></div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-white/30 rounded-xl"></div>
                      <div className="flex-1 h-10 bg-white/30 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technology to give you the best experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Easy to Use
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface designed for seamless product management
                with zero learning curve.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is protected with industry-standard security measures
                and encryption.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Real-time Updates
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Instant synchronization ensures your product data is always
                up-to-date.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built with React and Laravel for a robust, scalable solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Discover our latest additions
              </p>
            </div>

            <Link to="/products">
              <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                View All
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="h-8 bg-gray-400 rounded w-32"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                No products yet
              </h3>
              <p className="text-gray-500 mb-8">
                Start by adding your first product!
              </p>
              <Link to="/add">
                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Product Image */}
                  <div className="relative h-64 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                    <Package className="w-24 h-24 text-blue-600/30 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                      Rs. {product.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {product.description || "No description available."}
                    </p>

                    <Link to={`/products`}>
                      <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-all">
                        <ShoppingCart className="w-4 h-4" />
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-linear-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of users managing their products efficiently
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/add">
              <button className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <Plus className="w-5 h-5" />
                Add Your First Product
              </button>
            </Link>
            <Link to="/products">
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">
              Product Manager
            </span>
          </div>
          <p className="mb-4">
            Built with React & Laravel | Modern Product Management Platform
          </p>
          <p className="text-sm">© 2025 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
