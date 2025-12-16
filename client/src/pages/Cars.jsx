import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import CarCard from '../components/CarCard';
// import  cars  from '../data/dummyData';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllCars } from '../feature/adim/adminSlice';

export default function Cars() {

const {cars} = useSelector(state =>state.admin)
console.log(cars);

const dispatch = useDispatch()

useEffect(()=>{
  dispatch(fetchAllCars())
},[])
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedFuelType, setSelectedFuelType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  const categories = ['All', ...new Set(cars.map(car => car.category))];
  const brands = ['All', ...new Set(cars.map(car => car.brand))];
  const fuelTypes = ['All', ...new Set(cars.map(car => car.fuelType))];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    const matchesFuelType = selectedFuelType === 'All' || car.fuelType === selectedFuelType;

    let matchesPrice = true;
    if (priceRange === '0-100') matchesPrice = car.price <= 100;
    else if (priceRange === '100-150') matchesPrice = car.price > 100 && car.price <= 150;
    else if (priceRange === '150+') matchesPrice = car.price > 150;

    return matchesSearch && matchesCategory && matchesBrand && matchesFuelType && matchesPrice;
  });

  return (
    <div className="py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Cars
          </h1>
          <p className="text-lg text-gray-600">
            Browse our wide selection of premium vehicles
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Cars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fuelTypes.map(fuelType => (
                  <option key={fuelType} value={fuelType}>{fuelType}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Prices</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-150">$100 - $150</option>
                <option value="150+">$150+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredCars.length}</span> of{' '}
            <span className="font-semibold">{cars.length}</span> cars
          </p>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No cars found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
