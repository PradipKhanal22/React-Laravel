import { useState } from "react";
import { createCategory } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FolderOpen, Loader2, CheckCircle } from "lucide-react";
import AdminLayout from "../../admin/components/AdminLayout";

export default function AddCategory() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", priority: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Category name is required";
    if (!form.priority || isNaN(form.priority) || Number(form.priority) <= 0)
      newErrors.priority = "Enter a valid priority number (1-10)";
    if (Number(form.priority) > 10) 
      newErrors.priority = "Priority must be between 1-10";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await createCategory({
        name: form.name.trim(),
        priority: Number(form.priority)
      });
      setSuccess(true);
      setTimeout(() => navigate("/admin/categories"), 2000);
    } catch (error) {
      console.error("Failed to create category:", error);
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

  const getPriorityDescription = (priority) => {
    const num = Number(priority);
    if (num <= 3) return "High Priority - Most Important";
    if (num <= 6) return "Medium Priority - Moderately Important";
    if (num <= 10) return "Low Priority - Less Important";
    return "";
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/categories")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Categories
        </button>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FolderOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Add New Category</h1>
                <p className="text-blue-100 mt-2">Create a new category for your products</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="p-6 bg-green-50 border-b border-green-200">
              <div className="flex items-center gap-3 text-green-800">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Category Created Successfully!</h3>
                  <p className="text-sm text-green-600">Redirecting to categories list...</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.name 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-300 hover:border-blue-300 focus:border-blue-500"
                  }`}
                  placeholder="Enter category name (e.g., Electronics, Clothing)"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">!</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Priority (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.priority}
                  onChange={handleChange("priority")}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.priority 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-300 hover:border-blue-300 focus:border-blue-500"
                  }`}
                  placeholder="Enter priority number (1 = highest priority)"
                />
                {form.priority && !errors.priority && (
                  <p className="mt-2 text-sm text-blue-600">
                    {getPriorityDescription(form.priority)}
                  </p>
                )}
                {errors.priority && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">!</span>
                    {errors.priority}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Lower numbers = higher priority (1-3: High, 4-6: Medium, 7-10: Low)
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Creating Category...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Category Created!
                  </>
                ) : (
                  <>
                    <FolderOpen className="w-6 h-6" />
                    Create Category
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {success && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">
              Redirecting to category list...
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
