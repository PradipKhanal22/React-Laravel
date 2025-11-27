import { useState } from "react";
import { createProduct } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Loader2, CheckCircle, Upload, X } from "lucide-react";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "", description: "", photo: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

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

    setLoading(true);
    try {
      await createProduct({
        ...form,
        price: Number(form.price),
      });
      setSuccess(true);
      setTimeout(() => navigate("/products"), 1500);
    } catch {
      alert("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
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

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-blue-100 mt-1">Fill in the details below</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Field */}
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
                    : "border-gray-200 focus:border-blue-500 focus:bg-blue-50/30"
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Price Field */}
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
                      : "border-gray-200 focus:border-blue-500 focus:bg-blue-50/30"
                    } focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400`}
                />
              </div>
              {errors.price && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={5}
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Describe your product features, specs, and benefits..."
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-200 resize-none
                  ${errors.description 
                    ? "border-red-400 focus:border-red-500 bg-red-50" 
                    : "border-gray-200 focus:border-blue-500 focus:bg-blue-50/30"
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400`}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Photo Upload Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Photo
              </label>
              
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all">
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
                    src={preview}
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
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || success}
                className={`w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3
                  ${loading || success
                    ? "bg-green-500 hover:bg-green-600 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  } text-white`}
              >
                {success ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Product Added Successfully!
                  </>
                ) : loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Creating Product...
                  </>
                ) : (
                  "Create Product"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">
              Redirecting to product list...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}