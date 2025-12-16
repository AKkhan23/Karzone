import { Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About CarRental
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in premium car rental services since 2010
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/1319839/pexels-photo-1319839.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Car showroom"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2010, CarRental has grown to become one of the most trusted names in the car rental industry. We started with a simple mission: to make quality car rentals accessible to everyone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we serve thousands of satisfied customers annually with our fleet of premium vehicles, exceptional service, and competitive pricing. Our commitment to excellence drives everything we do.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority. We go above and beyond to ensure your experience is exceptional.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Service</h3>
              <p className="text-gray-600">
                We maintain the highest standards in vehicle quality and customer service delivery.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                Transparent pricing, honest communication, and ethical business practices guide our operations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
            <div className="text-gray-600">Vehicles</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
