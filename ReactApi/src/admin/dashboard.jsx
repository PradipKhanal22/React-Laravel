import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Menu, X, Search, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const recentOrders = [
  { id: '#12345', customer: 'John Doe', product: 'Wireless Headphones', amount: 299.99, status: 'Delivered', date: '2025-11-30' },
  { id: '#12344', customer: 'Jane Smith', product: 'Smart Watch Pro', amount: 449.00, status: 'Processing', date: '2025-11-29' },
  { id: '#12343', customer: 'Mike Johnson', product: 'Laptop Stand', amount: 79.99, status: 'Shipped', date: '2025-11-29' },
  { id: '#12342', customer: 'Sarah Williams', product: 'USB-C Hub', amount: 129.99, status: 'Delivered', date: '2025-11-28' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 245, revenue: '$73,255' },
  { name: 'Smart Watch Pro', sales: 189, revenue: '$84,711' },
  { name: 'Mechanical Keyboard', sales: 156, revenue: '$31,200' },
  { name: '4K Webcam', sales: 134, revenue: '$26,800' },
];

export default function EcommerceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin on component mount
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Additional check for admin role
    if (user.email !== 'dev@bits.com' && user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const stats = [
    { title: 'Total Revenue', value: '$54,239', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Total Orders', value: '1,429', change: '+8.2%', icon: ShoppingCart, color: 'bg-blue-500' },
    { title: 'Total Customers', value: '8,549', change: '+23.1%', icon: Users, color: 'bg-purple-500' },
    { title: 'Total Products', value: '342', change: '+4.1%', icon: Package, color: 'bg-orange-500' },
  ];

  // Show loading if user data is not available yet
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
          <div className="flex items-center justify-between p-6">
            <h1 className={`font-bold text-2xl text-gray-800 ${!sidebarOpen && 'hidden'}`}>ShopHub</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <nav className="mt-8">
            {['Dashboard', 'Products', 'Orders', 'Customers', 'Analytics', 'Marketing'].map((item) => (
              <a
                key={item}
                href="#"
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                  item === 'Dashboard' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                }`}
              >
                <div className="w-6 h-6 mr-4">
                  {item === 'Dashboard' && <TrendingUp className="w-6 h-6" />}
                  {item === 'Products' && <Package className="w-6 h-6" />}
                  {item === 'Orders' && <ShoppingCart className="w-6 h-6" />}
                  {item === 'Customers' && <Users className="w-6 h-6" />}
                </div>
                <span className={`${!sidebarOpen && 'hidden'}`}>{item}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-8 py-4">
              <div className="flex items-center flex-1">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders, products..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                {/* User Info with Logout */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{user.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
              <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-2 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`${stat.color} p-4 rounded-lg`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sales Chart Placeholder */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Sales & Revenue Overview</h3>
                <div className="h-96 bg-linear-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Sales Analytics</h4>
                    <p className="text-gray-500">Chart visualization would appear here</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-blue-100 p-3 rounded">
                        <div className="text-blue-700 font-bold">Sales Trend</div>
                        <div className="text-blue-600">↗ 15% increase</div>
                      </div>
                      <div className="bg-green-100 p-3 rounded">
                        <div className="text-green-700 font-bold">Revenue</div>
                        <div className="text-green-600">$54,239 total</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Top Products</h3>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} units sold</p>
                      </div>
                      <p className="text-lg font-semibold text-green-600">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-8 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">${order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}