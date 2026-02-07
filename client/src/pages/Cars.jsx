import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  Car,
  Sliders,
  Zap,
  Shield,
  Fuel,
  Star,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import CarCard from "../components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars } from "../feature/adim/adminSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Cars() {
  const { cars } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedFuelType, setSelectedFuelType] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", ...new Set(cars?.map((car) => car.category))];
  const brands = ["All", ...new Set(cars?.map((car) => car.brand))];
  const fuelTypes = ["All", ...new Set(cars?.map((car) => car.fuelType))];

  const filteredCars =
    cars?.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || car.category === selectedCategory;
      const matchesBrand =
        selectedBrand === "All" || car.brand === selectedBrand;
      const matchesFuelType =
        selectedFuelType === "All" || car.fuelType === selectedFuelType;

      let matchesPrice = true;
      if (priceRange === "0-100") matchesPrice = car.price <= 100;
      else if (priceRange === "100-150")
        matchesPrice = car.price > 100 && car.price <= 150;
      else if (priceRange === "150+") matchesPrice = car.price > 150;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesFuelType &&
        matchesPrice
      );
    }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* REMOVED EXTRA TOP PADDING - Hero starts immediately */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/30"
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-cyan-400/5 bg-[length:200%_200%]"
        />

        {/* Reduced top padding here */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-200/50 mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-2"
              >
                <Sparkles className="h-5 w-5 text-blue-500" />
              </motion.div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Premium Curated Collection
              </span>
            </motion.div>

            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto] block"
                >
                  Discover Your
                </motion.span>
                <motion.span
                  animate={{
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] block mt-2"
                >
                  Perfect Vehicle
                </motion.span>
              </h1>
            </motion.div>

            {/* Animated Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-800/70 mb-8 max-w-2xl mx-auto font-light"
            >
              Browse through our exclusive selection of premium vehicles,
              meticulously curated for every journey and experience.
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                {
                  icon: Car,
                  label: "Total Vehicles",
                  value: cars?.length || 0,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Star,
                  label: "Premium Rated",
                  value: "4.9/5",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  icon: Shield,
                  label: "Certified",
                  value: "100%",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  icon: Zap,
                  label: "Available Now",
                  value: filteredCars.length,
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
                    className={`p-2 bg-gradient-to-r ₹ {stat.color} rounded-lg w-fit mb-3`}
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
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Animated Filter Toggle */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="lg:hidden flex items-center justify-between w-full mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg"
        >
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: showFilters ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-2 bg-white/20 rounded-lg mr-3"
            >
              <Sliders className="h-5 w-5" />
            </motion.div>
            <div className="text-left">
              <div className="font-medium">Smart Filters</div>
              <div className="text-sm font-normal text-blue-200">
                {showFilters ? "Hide filters" : "Show filters"}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: showFilters ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.div>
        </motion.button>

        {/* Animated Filter Section */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl shadow-xl border border-blue-100/50 mb-8 overflow-hidden"
            >
              <div className="p-6">
                {/* Animated Header */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between mb-6"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md"
                    >
                      <Filter className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <motion.h2
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="text-2xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto]"
                      >
                        Refine Your Search
                      </motion.h2>
                    </div>
                  </div>
                </motion.div>

                {/* Animated Filters Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Animated Search */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-12"
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Search className="h-4 w-4 text-blue-500" />
                        </motion.div>
                        Search Vehicles
                      </span>
                    </label>
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search by model, brand, or features..."
                          className="w-full pl-12 pr-5 py-3 bg-blue-50/50 border-2 border-blue-200/50 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 outline-none transition-all duration-300 text-blue-900 placeholder-blue-400/60 shadow-inner"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Category Filter */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-3"
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <span className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-blue-500" />
                        Vehicle Type
                      </span>
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-50/50 border-2 border-blue-200/50 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 outline-none appearance-none transition-all duration-300 text-blue-900 font-medium"
                      >
                        {categories?.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      >
                        <ChevronRight className="h-4 w-4 text-blue-400 -rotate-90" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Brand Filter */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-3"
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      Brand
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-50/50 border-2 border-blue-200/50 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 outline-none appearance-none transition-all duration-300 text-blue-900 font-medium"
                      >
                        {brands?.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      >
                        <ChevronRight className="h-4 w-4 text-blue-400 -rotate-90" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Fuel Type Filter */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-3"
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <span className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-blue-500" />
                        Fuel Type
                      </span>
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <select
                        value={selectedFuelType}
                        onChange={(e) => setSelectedFuelType(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-50/50 border-2 border-blue-200/50 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 outline-none appearance-none transition-all duration-300 text-blue-900 font-medium"
                      >
                        {fuelTypes?.map((fuelType) => (
                          <option key={fuelType} value={fuelType}>
                            {fuelType}
                          </option>
                        ))}
                      </select>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      >
                        <ChevronRight className="h-4 w-4 text-blue-400 -rotate-90" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Price Range Filter */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-3"
                  >
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      Price Range
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative"
                    >
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-50/50 border-2 border-blue-200/50 rounded-xl focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 outline-none appearance-none transition-all duration-300 text-blue-900 font-medium"
                      >
                        {["All", "0-100", "100-150", "150+"].map((range) => (
                          <option key={range} value={range}>
                            {range === "All" ? "All Prices" : `₹ ₹ {range} / day`}
                          </option>
                        ))}
                      </select>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      >
                        <ChevronRight className="h-4 w-4 text-blue-400 -rotate-90" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Active Filters */}
                {(selectedCategory !== "All" ||
                  selectedBrand !== "All" ||
                  selectedFuelType !== "All" ||
                  priceRange !== "All" ||
                  searchTerm) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 pt-6 border-t border-blue-100"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-4 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
                      />
                      <h3 className="font-semibold text-blue-900">
                        Active Filters
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== "All" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium border border-blue-200 text-sm"
                        >
                          <Car className="h-3 w-3" />
                          {selectedCategory}
                        </motion.span>
                      )}
                      {selectedBrand !== "All" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium border border-blue-200 text-sm"
                        >
                          <CheckCircle className="h-3 w-3" />
                          {selectedBrand}
                        </motion.span>
                      )}
                      {selectedFuelType !== "All" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium border border-blue-200 text-sm"
                        >
                          <Fuel className="h-3 w-3" />
                          {selectedFuelType}
                        </motion.span>
                      )}
                      {priceRange !== "All" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium border border-blue-200 text-sm"
                        >
                          <TrendingUp className="h-3 w-3" />₹ {priceRange}/day
                        </motion.span>
                      )}
                      {searchTerm && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium border border-blue-200 text-sm"
                        >
                          <Search className="h-3 w-3" />"{searchTerm}"
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h2
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto] mb-1"
              >
                Available Vehicles
              </motion.h2>
              <div className="flex items-center gap-3">
                <motion.p
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-blue-700/70 text-sm"
                >
                  Showing{" "}
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="font-bold text-blue-600"
                  >
                    {filteredCars.length}
                  </motion.span>{" "}
                  of{" "}
                  <span className="font-bold text-blue-900">
                    {cars?.length || 0}
                  </span>{" "}
                  vehicles
                </motion.p>
              </div>
            </div>
            {filteredCars.length > 0 && (
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="p-1.5 bg-white/20 rounded-lg"
                >
                  <Car className="h-4 w-4 text-white" />
                </motion.div>
                <div>
                  <div className="text-xs font-medium text-blue-200">
                    Available
                  </div>
                  <div className="text-lg font-bold text-white">
                    {filteredCars.length} Vehicles
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Car Cards Grid */}
        <AnimatePresence>
          {filteredCars.length > 0 ? (
            <motion.div
              key="cars-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="group"
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12 bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl border-2 border-dashed border-blue-200/50 shadow-inner"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 mb-6 border border-blue-200"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Car className="h-8 w-8 text-blue-600" />
                  </motion.div>
                </motion.div>
                <motion.h3
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto]"
                >
                  No Matching Vehicles
                </motion.h3>
                <p className="text-blue-700/70 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedBrand("All");
                    setSelectedFuelType("All");
                    setPriceRange("All");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                  Reset Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
