import { useEffect, useState, useMemo } from "react";
import { getProducts, deleteProduct } from "../../services/ProductService";
import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
} from "lucide-react";
import AdminLayout from "../../admin/components/AdminLayout";

export default function ProductListTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const itemsPerPage = 10;

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
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

  // Sorting function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Search & Filter + Sort + Pagination
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [products, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortableHeader = ({ children, sortKey }) => (
    <th
      onClick={() => requestSort(sortKey)}
      className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 px-6 py-4 transition"
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={`w-4 h-4 transition-transform ${
          sortConfig.key === sortKey ? "text-blue-600" : "text-gray-400"
        } ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
      </div>
    </th>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="w-10 h-10 text-blue-600" />
              All Products
            </h1>
            <p className="text-gray-600 mt-2">Manage and monitor your product inventory</p>
          </div>

          <Link to="/admin/products/add">
            <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200">
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="px-6 py-5 border-b border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
                </div>
              ))}
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500 mt-2">Start by adding your first product!</p>
          </div>
        ) : (
          <>
            {/* DataTable */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <SortableHeader sortKey="name">Product Name</SortableHeader>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Image
                      </th>
                      <SortableHeader sortKey="price">Price</SortableHeader>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              ID: {product.id}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                            {product.photo_url ? (
                              <img
                                src={product.photo_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-lg font-bold text-gray-900">
                            Rs. {product.price?.toLocaleString() || "N/A"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-sm text-gray-700">
                            {product.category || "Uncategorized"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock || 0} in stock
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <Link to={`/admin/products/${product.id}`}>
                              <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                                <Eye className="w-5 h-5" />
                              </button>
                            </Link>

                            <Link to={`/admin/products/${product.id}/edit`}>
                              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition">
                                <Edit className="w-5 h-5" />
                              </button>
                            </Link>

                            <button
                              onClick={() => handleDelete(product.id)}
                              disabled={deletingId === product.id}
                              className="p-2 rounded-lg hover:bg-red-100 text-red-600 disabled:opacity-50 transition"
                            >
                              {deletingId === product.id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of{" "}
                    {filteredAndSortedProducts.length} products
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition"
                    >
                      <ChevronsLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="px-4 py-2 bg-white rounded-lg text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition"
                    >
                      <ChevronsRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}