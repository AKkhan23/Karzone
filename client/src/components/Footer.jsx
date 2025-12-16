import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">CarRental</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner for premium car rentals. Experience luxury and comfort with our wide range of vehicles.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-blue-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-sm hover:text-blue-500 transition-colors duration-200">
                  Our Cars
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-blue-500 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>info@carrental.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>123 Main St, City, ST 12345</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CarRental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
