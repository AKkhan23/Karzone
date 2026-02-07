import { Link } from "react-router-dom";
import {
  Search,
  Award,
  Shield,
  Headphones,
  ChevronRight,
  Sparkles,
  Car,
  Clock,
  MapPin,
} from "lucide-react";
import CarCard from "../components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllCars } from "../feature/adim/adminSlice";
import { motion } from "framer-motion";

export default function Home() {
  const { cars } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Top-rated vehicles maintained to the highest standards",
      color: "from-amber-500 to-orange-400",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Comprehensive insurance coverage for your peace of mind",
      color: "from-emerald-500 to-teal-400",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service whenever you need us",
      color: "from-violet-500 to-purple-400",
    },
  ];

  const stats = [
    { value: "500+", label: "Happy Customers", icon: Sparkles },
    { value: "99%", label: "Satisfaction Rate", icon: Award },
    { value: "24/7", label: "Support", icon: Clock },
    { value: "50+", label: "Locations", icon: MapPin },
  ];

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-48 h-48 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)`,
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-amber-50/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-amber-100 text-slate-700 text-sm font-medium mb-6 shadow-sm">
                <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                Premium Car Rental Experience
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight font-serif"
            >
              <motion.span
                className="inline-block text-blue-600"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 0px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Drive
              </motion.span>{" "}
              Your Dream
              <span className="block text-slate-800 mt-2">Car Today</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed"
            >
              Experience luxury, performance, and freedom with our curated fleet
              of premium vehicles.
              <span className="text-blue-600 font-medium"> Book now</span> and
              hit the road in style.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/cars"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
                <span className="relative flex items-center space-x-3">
                  <Search className="h-5 w-5" />
                  <span className="text-lg">Browse Premium Cars</span>
                  <ChevronRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl font-semibold border border-slate-300/50 hover:border-blue-300 hover:text-blue-700 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <span className="relative">Learn More</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 flex items-center justify-center gap-2">
                    <stat.icon className="h-4 w-4" />
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated car icon */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-10 top-1/4 hidden xl:block"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100/50 to-amber-100/50 backdrop-blur-sm border border-white/50 shadow-xl p-6">
            <Car className="w-full h-full text-blue-600" />
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-blue-600 font-medium mb-2 block"
            >
              Why Choose Us
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
              Experience The Difference
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We're not just a car rental service - we're your gateway to
              unforgettable journeys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                ></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg group-hover:shadow-2xl group-hover:border-transparent transition-all duration-500">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="py-20 bg-gradient-to-b from-slate-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-blue-600 font-medium mb-2 block"
            >
              Our Collection
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
              Featured Premium Cars
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our most exclusive and popular vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars?.slice(0, 6).map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -15,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              to="/cars"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center space-x-3">
                <Car className="h-5 w-5" />
                <span className="text-lg">Explore All Vehicles</span>
                <ChevronRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-amber-500/10 to-blue-600/10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 font-serif"
            animate={{
              textShadow: [
                "0 0 0px rgba(59, 130, 246, 0)",
                "0 0 30px rgba(59, 130, 246, 0.2)",
                "0 0 0px rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Ready for Your Next
            <span className="block text-blue-600 mt-2">Adventure?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of satisfied customers who chose the perfect ride for
            their journey. Your dream car is just a click away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/cars"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-2"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative flex items-center space-x-3 text-lg">
                <Search className="h-6 w-6" />
                <span>Book Your Dream Car Now</span>
              </span>
            </Link>

            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-10 py-5 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl font-semibold border border-slate-300/50 hover:border-blue-300 hover:text-blue-700 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <span className="relative">Contact Our Team</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
