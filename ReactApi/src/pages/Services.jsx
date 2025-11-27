import { Package, BarChart3, Shield, Cloud, Headphones, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Comprehensive solutions to manage, track, and grow your product inventory with ease.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Package,
                title: "Product Management",
                desc: "Add, edit, and organize your products with our intuitive interface. Support for images, categories, variants, and more.",
                features: ["Unlimited products", "Bulk operations", "Custom fields", "Product variants"],
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                desc: "Get detailed insights into your inventory with real-time analytics and comprehensive reports.",
                features: ["Real-time dashboard", "Sales analytics", "Inventory tracking", "Custom reports"],
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Cloud,
                title: "Cloud Storage",
                desc: "All your data is securely stored in the cloud with automatic backups and 99.9% uptime guarantee.",
                features: ["Automatic backups", "99.9% uptime", "Data encryption", "Multi-region support"],
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                desc: "Enterprise-grade security with end-to-end encryption and compliance with industry standards.",
                features: ["End-to-end encryption", "GDPR compliant", "2FA authentication", "Role-based access"],
                color: "from-red-500 to-pink-600"
              },
              {
                icon: Zap,
                title: "API Integration",
                desc: "Seamlessly integrate with your existing tools and platforms using our powerful REST API.",
                features: ["RESTful API", "Webhooks", "Third-party integrations", "Developer docs"],
                color: "from-yellow-500 to-orange-600"
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Our dedicated support team is always available to help you succeed with your product management.",
                features: ["24/7 live chat", "Email support", "Phone support", "Knowledge base"],
                color: "from-indigo-500 to-blue-600"
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-20 h-20 bg-linear-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">{service.desc}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                desc: "Perfect for individuals",
                features: ["Up to 50 products", "Basic analytics", "Email support", "1 user"],
                color: "border-gray-300"
              },
              {
                name: "Professional",
                price: "Rs. 2,999/mo",
                desc: "For growing businesses",
                features: ["Unlimited products", "Advanced analytics", "Priority support", "5 users", "API access"],
                color: "border-blue-600 ring-4 ring-blue-100",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "For large organizations",
                features: ["Everything in Pro", "Custom integrations", "24/7 phone support", "Unlimited users", "SLA guarantee"],
                color: "border-purple-600"
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white border-2 ${plan.color} rounded-3xl p-8 hover:shadow-2xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                <p className="text-gray-600 mb-8">{plan.desc}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}>
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-16 shadow-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Start managing your products like a pro today. No credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/add">
                <button className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
