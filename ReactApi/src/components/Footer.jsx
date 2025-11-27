import { Link } from "react-router-dom";
import { 
  Package, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowRight,
  Sparkles,
  Heart,
  Zap
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/add", label: "Add Product" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const services = [
    "Product Management",
    "Real-time Inventory",
    "Analytics Dashboard",
    "RESTful API",
    "Priority Support",
  ];

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-linear-to-t from-black via-gray-950 to-gray-900 text-gray-300 overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Newsletter */}
        <div
          className="mb-20 bg-linear-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with ProductHub
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get tips, updates, and exclusive offers directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
            />
            <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div
            className="space-y-8"
          >
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative p-3 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Package className="w-8 h-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ProductHub
                </h1>
                <p className="text-sm text-blue-400 font-medium">Next-Gen Management</p>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-xs">
              The most beautiful and powerful platform to manage, showcase, and grow your product inventory.
            </p>

            {/* Social Icons with Hover Glow */}
            <div className="flex gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="relative p-3 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl hover:border-blue-500 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="space-y-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all" />
                    <span className="group-hover:translate-x-3 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className="space-y-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-500" />
              Our Services
            </h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
                  <span className="text-gray-400 hover:text-white transition-colors">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500" />
              Get In Touch
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 leading-relaxed">
                    Kathmandu, Bagmati Province<br />
                    Nepal
                  </p>
                </div>
              </div>

              <a href="tel:+9771234567890" className="flex items-center gap-4 group">
                <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <span className="group-hover:text-white transition-colors">
                  +977 123-456-7890
                </span>
              </a>

              <a href="mailto:hello@producthub.com" className="flex items-center gap-4 group">
                <div className="p-3 bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <span className="group-hover:text-white transition-colors break-all">
                  hello@producthub.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-gray-500">
              © {currentYear} <span className="text-white font-semibold">ProductHub</span>. 
              Designed by <a href="https://pradipkhanal25.com.np" target="_blank" rel="noopener noreferrer"><span className="text-white font-semibold">Pradip Khanal</span></a>
            </p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((policy) => (
                <Link
                  key={policy}
                  to="#"
                  className="text-gray-500 hover:text-blue-400 transition-colors hover:-translate-y-0.5 inline-block"
                >
                  {policy}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}