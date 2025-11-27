import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl">
                <Package className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ProductHub</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              The modern platform for managing your product inventory efficiently and beautifully.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-blue-400 transition-all inline-block hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Product Management",
                "Inventory Tracking",
                "Analytics Dashboard",
                "API Integration",
                "24/7 Support",
              ].map((service) => (
                <li key={service}>
                  <span className="hover:text-blue-400 transition-colors">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span>123 Business Street, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <a href="tel:+977-1234567890" className="hover:text-blue-400 transition-colors">
                  +977-123-4567890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a href="mailto:info@producthub.com" className="hover:text-blue-400 transition-colors">
                  info@producthub.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 ProductHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
