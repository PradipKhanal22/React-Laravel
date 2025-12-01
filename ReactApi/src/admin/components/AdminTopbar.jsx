// src/admin/components/AdminTopbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const AdminTopbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side – you can put logo / sidebar toggle here if needed */}
          <div className="flex-1 flex items-center">
            {/* Example: you can add a search bar here later */}
            {/* <div className="max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> */}
          </div>

          {/* Right side – all actions aligned to the very end */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase() || "A"}
              </div>

              {/* User Info (hidden on small screens) */}
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              {/* Dropdown indicator */}
              <ChevronDown className="w-5 h-5 text-gray-500 hidden lg:block" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;