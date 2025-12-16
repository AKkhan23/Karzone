import { Link } from 'react-router-dom';
import { Fuel, CheckCircle, XCircle } from 'lucide-react';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {car.isAvailable ? (
            <span className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              <CheckCircle className="h-3 w-3" />
              <span>Available</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              <XCircle className="h-3 w-3" />
              <span>Unavailable</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
            <p className="text-sm text-gray-500">{car.brand}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            {car.category}
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Fuel className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-600">{car.fuelType}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-blue-600">₹{car.price}</span>
            <span className="text-sm text-red-500">/day</span>
          </div>
          <Link
            to={`/carsdeatail/${car._id}`}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
