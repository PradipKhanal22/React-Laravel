import { useEffect, useState, useMemo } from "react";
import { getCategories, deleteCategory } from "../../services/CategoryService";
import { Link } from "react-router-dom";
import {
  FolderOpen,
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
  X,
} from "lucide-react";
import AdminLayout from "../../admin/components/AdminLayout";

export default function CategoryListTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "priority", direction: "asc" });

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const itemsPerPage = 10;

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      const sorted = data.sort((a, b) => a.priority - b.priority);
      setCategories(sorted);
    } catch {
      console.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
    setDeletingId(null);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    setDeletingId(categoryToDelete.id);
    try {
      await deleteCategory(categoryToDelete.id);
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      closeDeleteModal();
    } catch {
      alert("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  const getPriorityBadge = (priority) => {
    if (priority <= 3)
      return { bg: "bg-red-100", text: "text-red-800", label: "High" };
    if (priority <= 6)
      return { bg: "bg-yellow-100", text: "text-yellow-800", label: "Medium" };
    return { bg: "bg-green-100", text: "text-green-800", label: "Low" };
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories;
    if (searchTerm) {
      filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [categories, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedCategories.length / itemsPerPage);
  const paginatedCategories = filteredAndSortedCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortableHeader = ({ children, sortKey }) => (
    <th
      onClick={() => requestSort(sortKey)}
      className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-50 px-6 py-4 transition"
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown
          className={`w-4 h-4 transition-transform ${
            sortConfig.key === sortKey ? "text-blue-600" : "text-gray-400"
          } ${sortConfig.direction === "desc" ? "rotate-180" : ""}`}
        />
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
              <FolderOpen className="w-10 h-10 text-blue-600" />
              All Categories
            </h1>
            <p className="text-gray-600 mt-2">Manage your category structure and display priority</p>
          </div>

          <Link to="/admin/categories/add">
            <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200">
              <Plus className="w-5 h-5" />
              Add New Category
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Loading & Empty States */}
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
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
            <FolderOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">No categories found</h3>
            <p className="text-gray-500 mt-2">Start by adding your first category!</p>
          </div>
        ) : (
          <>
            {/* DataTable */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <SortableHeader sortKey="name">Category Name</SortableHeader>
                      <SortableHeader sortKey="priority">Priority</SortableHeader>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Products Count
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedCategories.map((category) => {
                      const priority = getPriorityBadge(category.priority);
                      return (
                        <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-linear-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                <FolderOpen className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                <div className="text-xs text-gray-500">ID: {category.id}</div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${priority.bg} ${priority.text}`}>
                              {priority.label} (#{category.priority})
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span className="text-sm text-gray-700">
                              {category.products_count || category.product_count || 0} products
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <Link to={`/admin/categories/${category.id}`}>
                                <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                                  <Eye className="w-5 h-5" />
                                </button>
                              </Link>

                              <Link to={`/admin/categories/${category.id}/edit`}>
                                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition">
                                  <Edit className="w-5 h-5" />
                                </button>
                              </Link>

                              <button
                                onClick={() => openDeleteModal(category)}
                                className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredAndSortedCategories.length)} of{" "}
                    {filteredAndSortedCategories.length} categories
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition">
                      <ChevronsLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 transition">
                      <ChevronsRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Delete Category?</h2>
                <button
                  onClick={closeDeleteModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8">
                <p className="text-gray-600">
                  Are you sure you want to delete the category
                  <span className="font-semibold text-gray-900"> "{categoryToDelete?.name}"</span>?
                </p>
                <p className="text-sm text-red-600 mt-3">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deletingId !== null}
                  className="px-6 py-3 rounded-xl font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  {deletingId ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Category"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}