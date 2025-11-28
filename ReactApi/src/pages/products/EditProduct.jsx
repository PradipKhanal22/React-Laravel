import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Package, Loader2, CheckCircle, Edit3, Upload, X } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "", description: "", photo: null });
  const [preview, setPreview] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setForm({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          photo: null
        });
        setCurrentPhoto(data.photo_url);
      } catch {
        alert("Failed to load product. Please try again.");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price";
    if (!form.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await updateProduct(id, {
        ...form,
        price: Number(form.price),
      });
      setSuccess(true);
      setTimeout(() => navigate("/products"), 1500);
    } catch {
      alert("Failed to update product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setForm({ ...form, photo: null });
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl p-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded-2xl w-3/4 mb-8"></div>
              <div className="space-y-6">
                <div className="h-14 bg-gray-200 rounded-xl"></div>
                <div className="h-14 bg-gray-200 rounded-xl"></div>
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-14 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-amber-500 to-orange-600 p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Edit3 className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Edit Product</h1>
                  <p className="text-amber-100 mt-1">Update product details</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="e.g., Wireless Headphones"
                  className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-200 
                    ${errors.name 
                      ? "border-red-400 focus:border-red-500 bg-red-50" 
                      : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/30"
                    } focus:outline-none focus:ring-4 focus:ring-amber-500/20 text-gray-900 placeholder-gray-400`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (Rs.)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-500 font-medium">
                    Rs.
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange("price")}
                    placeholder="2999.00"
                    className={`w-full pl-16 pr-5 py-4 rounded-xl border-2 transition-all duration-200 
                      ${errors.price 
                        ? "border-red-400 focus:border-red-500 bg-red-50" 
                        : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/30"
                      } focus:outline-none focus:ring-4 focus:ring-amber-500/20 text-gray-900 placeholder-gray-400`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={handleChange("description")}
                  placeholder="Update the product description..."
                  className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-200 resize-none
                    ${errors.description 
                      ? "border-red-400 focus:border-red-500 bg-red-50" 
                      : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/30"
                    } focus:outline-none focus:ring-4 focus:ring-amber-500/20 text-gray-900 placeholder-gray-400`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Photo Upload Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Photo
                </label>
                
                {!preview && !currentPhoto ? (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-500 hover:bg-amber-50/30 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-600 font-semibold">
                        Click to upload product image
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={preview || currentPhoto}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    {!preview && currentPhoto && (
                      <label className="absolute bottom-2 right-2 p-3 bg-amber-500 text-white rounded-full cursor-pointer hover:bg-amber-600 transition-colors">
                        <Upload className="w-5 h-5" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || success}
                  className={`w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3
                    ${submitting || success
                      ? "bg-green-500 hover:bg-green-600 cursor-not-allowed"
                      : "bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    } text-white`}
                >
                  {success ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Updated Successfully!
                    </>
                  ) : submitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Updating Product...
                    </>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Success Redirect Message */}
        {success && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium text-lg">
              Redirecting to product list...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}