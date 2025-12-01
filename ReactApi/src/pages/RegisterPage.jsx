// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const _navigate = useNavigate(); // Prefix with underscore to indicate intentionally unused

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    

    setIsLoading(true);
    setTimeout(() => {
      console.log("Register:", formData);
      setIsLoading(false);
      alert("Account created successfully! (Demo)");
      // navigate("/login");
    }, 1800);
  };

  return (
    <>
      {/* Full-screen Gradient Background */}
      <div className="min-h-screen flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-4xl"> {/* Wider for 2-column */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 md:p-12 border border-white/30">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-5xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600 text-lg">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Row 1: First Name + Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 bg-gray-50/80 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder="Enter Your Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 bg-gray-50/80 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder="Enter Your Address"
                  />
                </div>
              </div>

              {/* Row 2: Phone + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 bg-gray-50/80 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder="Enter Your Phone Number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 bg-gray-50/80 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Row 3: Password + Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength="6"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 bg-gray-50/80 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder="Create strong password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 bg-gray-50/80 text-gray-900 placeholder-gray-400 text-lg"
                    placeholder="Retype password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full max-w-md py-5 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-7 w-7 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-6 text-gray-500 font-medium">or sign up with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full py-4 border-2 border-gray-300 rounded-2xl font-semibold text-gray-800 hover:bg-gray-50 transition flex items-center justify-center gap-3 text-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>

              <button className="w-full py-4 border-2 border-gray-300 rounded-2xl font-semibold text-gray-800 hover:bg-gray-50 transition flex items-center justify-center gap-3 text-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center mt-5 text-gray-700 text-lg">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 transition">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;