import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  ShoppingCart,
  Star,
  Zap,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Loader2,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 6));
      } catch {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/60 to-purple-900/60 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-14 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-white/50 px-5 py-3 rounded-full text-sm font-semibold text-blue-700 shadow-lg">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                The Modern Product Management Platform
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                Manage Products
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400">
                  Like a Pro
                </span>
              </h1>

              <p className="text-xl text-white leading-relaxed max-w-2xl drop-shadow-lg">
                Beautiful, fast, and intuitive. Add, edit, and showcase your products with a platform built for the modern era.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/add">
                  <button className="group flex items-center gap-3 bg-linear-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    Add Your First Product
                  </button>
                </Link>

                <Link to="/products">
                  <button className="flex items-center gap-3 bg-white/80 backdrop-blur-lg border-2 border-gray-300 text-gray-800 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                    Explore Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-10">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{products.length}+</div>
                  <div className="text-white">Active Products</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 flex items-center justify-center gap-1">
                    <CheckCircle className="w-8 h-8" /> 100%
                  </div>
                  <div className="text-white">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">
                    <Zap className="w-10 h-10 mx-auto" />
                  </div>
                  <div className="text-white">Lightning Fast</div>
                </div>
              </div>
            </div>

            {/* Right - Floating Cards */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative space-y-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
                      <Package className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Wireless Pro</h3>
                      <p className="text-3xl font-bold text-blue-600">Rs. 4,999</p>
                    </div>
                  </div>
                  <p className="text-gray-600">Premium noise-cancelling headphones with 30hr battery</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl -rotate-3 hover:rotate-0 transition-all duration-500 ml-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
                      <Star className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Smart Watch X</h3>
                      <p className="text-3xl font-bold text-purple-600">Rs. 12,999</p>
                    </div>
                  </div>
                  <p className="text-gray-600">Advanced health tracking • AMOLED display</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Thousands Trust Us
            </h2>
            <p className="text-xl text-gray-600">Everything you need in one beautiful platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Blazing Fast", desc: "Built with React & optimized for speed", color: "from-yellow-400 to-orange-500" },
              { icon: Shield, title: "Bank-Level Security", desc: "Your data is encrypted and protected", color: "from-green-400 to-emerald-600" },
              { icon: Clock, title: "Real-Time Sync", desc: "Changes appear instantly everywhere", color: "from-blue-400 to-blue-600" },
              { icon: Award, title: "Award-Winning UI", desc: "Designed for delight and productivity", color: "from-purple-400 to-pink-600" },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              >
                <div className={`w-16 h-16 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-linear-to-t from-blue-50/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600">Hand-picked just for you</p>
            </div>
            <Link to="/products">
              <button className="flex items-center gap-3 text-blue-600 font-bold text-lg hover:gap-4 transition-all">
                View All Products
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-8 space-y-4">
                    <div className="h-8 bg-gray-300 rounded-xl w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-white/60 backdrop-blur-lg rounded-3xl border border-gray-200">
              <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No products yet</h3>
              <p className="text-gray-600 mb-8 text-lg">Be the first to add something amazing!</p>
              <Link to="/add">
                <button className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  <Plus className="w-6 h-6" />
                  Add Your First Product
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500"
                >
                  <div className="relative h-64 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                    <Package className="w-32 h-32 text-blue-600/20 group-hover:scale-125 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-lg text-blue-600 shadow-lg">
                      Rs. {product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-6">
                      {product.description || "A premium product with exceptional quality."}
                    </p>
                    <Link to="/products">
                      <button className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <ShoppingCart className="w-5 h-5" />
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

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-16 shadow-2xl">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Start Managing Like a Pro Today
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of happy users who trust our platform every day.
            </p>
            <Link to="/add">
              <button className="inline-flex items-center gap-4 bg-white text-blue-600 px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-2xl hover:scale-110 transform transition-all duration-300">
                <Plus className="w-8 h-8" />
                Add Your First Product — It's Free!
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Package className="w-10 h-10 text-blue-500" />
            <span className="text-3xl font-bold text-white">ProductFlow</span>
          </div>
          <p className="text-lg mb-4">The future of product management is here.</p>
          <p className="text-sm">© 2025 ProductFlow. Crafted with love & React.</p>
        </div>
      </footer>
    </div>
  );
}