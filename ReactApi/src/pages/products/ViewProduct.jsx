import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../../services/ProductService";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  DollarSign, 
  FileText, 
  Edit, 
  Trash2, 
  Loader2,
  Image as ImageIcon,
  Calendar,
  Tag
} from "lucide-react";
import AdminLayout from "../../admin/components/AdminLayout";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch {
        alert("Failed to load product. Please try again.");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);
    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      navigate("/admin/products");
    } catch {
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        {/* Product Details Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 shadow-lg">
                {product.photo_url ? (
                  <img
                    src={product.photo_url}
                    alt={product.name}
                    className="w-full h-[400px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No image available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Info Badge */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">
                <ImageIcon className="w-4 h-4" />
                <span>
                  {product.photo_url ? "Product Image" : "No image uploaded"}
                </span>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Package className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wide">Product Name</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wide">Price</span>
                </div>
                <p className="text-5xl font-bold text-blue-900">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wide">Description</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 rounded-xl p-6 border border-gray-200">
                  {product.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Created</span>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {new Date(product.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Tag className="w-4 h-4" />
                    <span className="font-medium">Product ID</span>
                  </div>
                  <p className="text-gray-900 font-semibold">#{product.id}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Link
                  to={`/admin/products/${product.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Edit className="w-5 h-5" />
                  Edit Product
                </Link>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">
                Status
              </h3>
              <p className="text-2xl font-bold text-blue-900">Active</p>
            </div>

            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
                Last Updated
              </h3>
              <p className="text-lg font-bold text-green-900">
                {new Date(product.updated_at).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wide mb-2">
                Category
              </h3>
              <p className="text-2xl font-bold text-purple-900">General</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
