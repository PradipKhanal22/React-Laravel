import { Users, Target, Award, Heart, Zap, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/60 to-purple-900/60" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            About <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400">ProductHub</span>
          </h1>
          <p className="text-xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            We're on a mission to revolutionize how businesses manage their products. Simple, powerful, and beautiful.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Founded in 2025, ProductHub was born from a simple idea: product management shouldn't be complicated. 
                We've built a platform that combines powerful features with an intuitive interface that anyone can use.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Today, we serve thousands of businesses worldwide, helping them streamline their inventory management 
                and focus on what really matters—growing their business.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-12 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600 mb-2">5K+</div>
                    <div className="text-gray-600 font-semibold">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-600 mb-2">50K+</div>
                    <div className="text-gray-600 font-semibold">Products Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">99.9%</div>
                    <div className="text-gray-600 font-semibold">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-600 mb-2">24/7</div>
                    <div className="text-gray-600 font-semibold">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Mission Driven",
                desc: "Every feature we build is designed to solve real problems for real businesses.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Heart,
                title: "Customer First",
                desc: "Your success is our success. We're here to support you every step of the way.",
                color: "from-red-500 to-pink-600"
              },
              {
                icon: Zap,
                title: "Innovation",
                desc: "We're constantly pushing boundaries to bring you the latest technology.",
                color: "from-yellow-500 to-orange-600"
              },
              {
                icon: Shield,
                title: "Trust & Security",
                desc: "Your data is sacred. We use industry-leading security measures.",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "We're committed to delivering the highest quality in everything we do.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Users,
                title: "Community",
                desc: "Building a thriving ecosystem where everyone succeeds together.",
                color: "from-indigo-500 to-blue-600"
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-linear-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 mb-12">
            Passionate individuals working together to build something amazing
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", img: "SJ" },
              { name: "Michael Chen", role: "CTO", img: "MC" },
              { name: "Emily Davis", role: "Head of Design", img: "ED" },
            ].map((member, i) => (
              <div
                key={i}
                className="group bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {member.img}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
