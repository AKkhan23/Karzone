import {
  Users,
  Target,
  Heart,
  Award,
  Clock,
  Shield,
  Car,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [counters, setCounters] = useState({
    years: 0,
    customers: 0,
    vehicles: 0,
    support: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => ({
        years: Math.min(prev.years + 1, 15),
        customers: Math.min(prev.customers + 100, 5000),
        vehicles: Math.min(prev.vehicles + 10, 200),
        support: 24,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/30"
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-cyan-400/5 bg-[length:200%_200%]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 relative">
          <div className="text-center max-w-4xl mx-auto">
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
                <Award className="h-5 w-5 text-blue-500" />
              </motion.div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Trusted Since 2010
              </span>
            </motion.div>

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
                  Drive Your Journey
                </motion.span>
                <motion.span
                  animate={{
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] block mt-2"
                >
                  With Confidence
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-800/70 mb-12 max-w-2xl mx-auto font-light"
            >
              Redefining mobility with premium vehicles, exceptional service,
              and unforgettable driving experiences for over a decade.
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
                  label: "Years Excellence",
                  value: counters.years,
                  suffix: "+",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Users,
                  label: "Happy Customers",
                  value: counters.customers,
                  suffix: "+",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  icon: Car,
                  label: "Premium Vehicles",
                  value: counters.vehicles,
                  suffix: "+",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  icon: Shield,
                  label: "Support Hours",
                  value: counters.support,
                  suffix: "/7",
                  color: "from-violet-500 to-purple-500",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 shadow-lg"
                >
                  <div
                    className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg w-fit mb-4 mx-auto`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-blue-700/70 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury car fleet"
                  className="w-full h-96 object-cover"
                />
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-2xl pointer-events-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-2xl font-bold">15+ Years</div>
                <div className="text-sm opacity-90">of Trust & Excellence</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  OUR LEGACY
                </span>
              </div>

              <motion.h2
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Pioneering Excellence in Mobility
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg text-blue-800/70 leading-relaxed"
              >
                Since 2010, we've been at the forefront of revolutionizing car
                rentals. What started as a vision to make premium mobility
                accessible has evolved into a legacy of trust, innovation, and
                exceptional service.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-lg text-blue-800/70 leading-relaxed"
              >
                Today, we're more than just a rental service - we're your
                partner in creating memorable journeys. From business trips to
                family vacations, every mile driven with us is backed by our
                commitment to safety, comfort, and reliability.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="pt-6"
              >
                <div className="flex flex-wrap gap-4">
                  {[
                    {
                      icon: CheckCircle,
                      text: "Premium Fleet",
                      color: "text-emerald-500",
                    },
                    {
                      icon: Shield,
                      text: "Fully Insured",
                      color: "text-blue-500",
                    },
                    {
                      icon: Sparkles,
                      text: "24/7 Support",
                      color: "text-amber-500",
                    },
                    {
                      icon: TrendingUp,
                      text: "Best Rates",
                      color: "text-cyan-500",
                    },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200"
                    >
                      <feature.icon className={`h-4 w-4 ${feature.color}`} />
                      <span className="text-sm font-medium text-blue-900">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 mb-4"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mr-2"
              >
                <Star className="h-4 w-4 text-blue-500" />
              </motion.div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                CORE VALUES
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl lg:text-4xl font-bold mb-6"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                The Pillars of Our Excellence
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-blue-800/70"
            >
              Guiding principles that define every interaction and drive our
              commitment to excellence
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl p-8 md:p-12 border border-blue-100/50 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Customer-Centric Excellence",
                  description:
                    "Every journey begins with understanding your needs. We don't just rent cars - we create tailored mobility solutions that exceed expectations.",
                  color: "from-blue-500 to-cyan-500",
                  features: [
                    "Personalized Service",
                    "24/7 Customer Support",
                    "Flexible Solutions",
                  ],
                },
                {
                  icon: Target,
                  title: "Uncompromising Quality",
                  description:
                    "Our fleet undergoes rigorous maintenance checks. Each vehicle is meticulously prepared to ensure safety, comfort, and reliability on every journey.",
                  color: "from-emerald-500 to-green-500",
                  features: [
                    "Premium Fleet",
                    "Regular Maintenance",
                    "Clean & Sanitized",
                  ],
                },
                {
                  icon: Heart,
                  title: "Integrity & Transparency",
                  description:
                    "Clear pricing, honest communication, and ethical practices. We believe in building relationships based on trust and mutual respect.",
                  color: "from-violet-500 to-purple-500",
                  features: ["No Hidden Fees", "Clear Terms", "Fair Pricing"],
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-r ${value.color} mb-6 shadow-lg`}
                  >
                    <value.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-blue-700/70 mb-6 leading-relaxed">
                    {value.description}
                  </p>
                  <div className="space-y-2">
                    {value.features.map((feature, fIdx) => (
                      <motion.div
                        key={fIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + fIdx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium text-blue-900">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Commitment Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-white/10"
          />

          <div className="relative">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6"
              >
                <Award className="h-8 w-8" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-6"
              >
                Our Commitment to You
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-lg text-blue-100 leading-relaxed mb-8"
              >
                We're dedicated to providing more than just vehicles. We deliver
                peace of mind, reliability, and the freedom to explore with
                confidence. Your satisfaction drives our continuous improvement
                and innovation in the mobility space.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Experience Excellence</span>
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
