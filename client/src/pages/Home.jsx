 import { Link } from "react-router-dom";
import { Search, Award, Shield, Headphones } from "lucide-react";
import CarCard from "../components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCars } from "../feature/adim/adminSlice";

export default function Home() {
  const { cars } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Ride Today
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Choose from our wide selection of premium vehicles. Affordable
              prices, exceptional service.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              <Search className="h-5 w-5" />
              <span>Browse Cars</span>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Top-rated vehicles maintained to the highest standards
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Comprehensive insurance coverage for your peace of mind
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Headphones className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer service whenever you need us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Cars
            </h2>
            <p className="text-lg text-gray-600">
              Explore our most popular vehicles
            </p>
          </div>

          {/* FIXED car.id → car._id */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/cars"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your dream car today and experience the freedom of the open road.
          </p>
          <Link
            to="/cars"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
