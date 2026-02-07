import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  MessageCircle,
  Sparkles,
  Shield,
  Headphones,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const contactInfo = [
    {
      id: 1,
      icon: User,
      title: "Admin Name",
      value: "Moni-Patidar",
      description: "Your dedicated service manager",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
      action: null,
    },
    {
      id: 2,
      icon: Phone,
      title: "Phone Number",
      value: "+91-7879536876",
      description: "24/7 customer support line",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-r from-emerald-500/10 to-green-500/10",
      action: "tel:+917879536876",
    },
    {
      id: 3,
      icon: Mail,
      title: "Email",
      value: "support@carrental.com",
      description: "Response within 2 hours",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-r from-violet-500/10 to-purple-500/10",
      action: "mailto:support@carrental.com",
    },
    {
      id: 4,
      icon: MapPin,
      title: "Office Address",
      value: "Indore, Madhya Pradesh",
      description: "Visit our premium showroom",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
      action: null,
    },
    {
      id: 5,
      icon: Clock,
      title: "Working Hours",
      value: "9:00 AM – 9:00 PM",
      description: "Monday – Sunday, 365 days",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-gradient-to-r from-rose-500/10 to-pink-500/10",
      action: null,
    },
    {
      id: 6,
      icon: Headphones,
      title: "Live Chat",
      value: "Available 24/7",
      description: "Instant online assistance",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-gradient-to-r from-cyan-500/10 to-blue-500/10",
      action: "#chat",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pt-12">
      {/* Animated Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-cyan-400/5 bg-[length:200%_200%]"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-200/50 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2"
            >
              <MessageCircle className="h-5 w-5 text-blue-500" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              24/7 Premium Support
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto] block"
            >
              Connect With Us
            </motion.span>
            <motion.span
              animate={{
                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] block mt-2"
            >
              Your Journey Matters
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-800/70 mb-8 max-w-2xl mx-auto font-light"
          >
            Premium support for premium experiences. Our team is always ready to
            assist you with your car rental needs and ensure a seamless journey.
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                icon: Clock,
                label: "Response Time",
                value: "< 2 min",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                label: "Support Rating",
                value: "4.9/5",
                color: "from-emerald-500 to-green-500",
              },
              {
                icon: Headphones,
                label: "Live Agents",
                value: "24/7",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: CheckCircle,
                label: "Satisfaction",
                value: "98%",
                color: "from-violet-500 to-purple-500",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50 shadow-sm"
              >
                <div
                  className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg w-fit mb-3 mx-auto`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-blue-700/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {contactInfo.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * item.id }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              {/* Animated Background Effect */}
              {hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl blur-xl"
                />
              )}

              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Icon Container */}
                <motion.div
                  animate={{
                    rotate: hoveredItem === item.id ? [0, 5, -5, 0] : 0,
                    scale: hoveredItem === item.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-xl ${item.bgColor} mb-5`}
                >
                  <item.icon
                    className={`h-6 w-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <motion.h3
                    animate={{
                      backgroundPosition:
                        hoveredItem === item.id
                          ? ["0% 50%", "100% 50%", "0% 50%"]
                          : "0% 50%",
                    }}
                    transition={{ duration: hoveredItem === item.id ? 3 : 0 }}
                    className={`text-lg font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent bg-[length:200%_auto]`}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    animate={{ scale: hoveredItem === item.id ? 1.05 : 1 }}
                    className="text-2xl font-bold text-blue-900"
                  >
                    {item.value}
                  </motion.p>

                  <p className="text-sm text-blue-700/60">{item.description}</p>
                </div>

                {/* Action Button */}
                {item.action && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0.7,
                      y: hoveredItem === item.id ? 0 : 5,
                    }}
                    className="mt-6"
                  >
                    <a
                      href={item.action}
                      className={`inline-flex items-center gap-2 w-full justify-center py-3 rounded-xl font-semibold bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transition-all`}
                    >
                      <motion.span
                        animate={{ x: hoveredItem === item.id ? [0, 5, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.title === "Phone Number"
                          ? "Call Now"
                          : item.title === "Email"
                            ? "Send Email"
                            : item.title === "Live Chat"
                              ? "Start Chat"
                              : "Connect"}
                      </motion.span>
                      {hoveredItem === item.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                      )}
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl mb-16"
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto]"
          />

          <div className="relative p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-3 mb-6"
                >
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-blue-100">
                    PREMIUM SUPPORT
                  </span>
                </motion.div>

                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Need Immediate Assistance?
                </h2>
                <p className="text-blue-100/80 text-lg mb-6">
                  Our premium support team is available round-the-clock to
                  resolve any queries and ensure your car rental experience is
                  flawless.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <motion.a
                  href="tel:+917879536876"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Phone className="h-5 w-5" />
                  </motion.div>
                  Call +91-7879536876
                  <Sparkles className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              VISIT OUR SHOWROOM
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Premium Car Showroom
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Indore, Madhya Pradesh
                    </p>
                    <p className="text-sm text-blue-700/60">India - 452001</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <p className="font-medium text-blue-900">
                      9:00 AM – 9:00 PM
                    </p>
                    <p className="text-sm text-blue-700/60">Monday – Sunday</p>
                  </div>
                </div>
              </div>

              <motion.a
                href="https://maps.google.com/?q=Indore,Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </motion.a>
            </div>

            {/* Map Placeholder */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative rounded-xl overflow-hidden border border-blue-200"
            >
              <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-blue-900 font-medium">Indore, MP</p>
                  <p className="text-sm text-blue-700/60">Showroom Location</p>
                </div>
              </div>
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 border-2 border-blue-400/30 rounded-xl pointer-events-none"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
