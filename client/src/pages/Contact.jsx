import { Phone, Mail, MapPin, Clock, User } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">
            Feel free to reach out to us anytime. We’re always happy to help.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Admin Name
                  </h3>
                  <p className="text-gray-600">Moni-Patidar</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Phone Number
                  </h3>
                  <p className="text-gray-600">+91-7879536876</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Email
                  </h3>
                  <p className="text-gray-600">support@carrental.com</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Office Address
                  </h3>
                  <p className="text-gray-600">
                    Indore, Madhya Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Working Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday – Sunday: 9:00 AM – 9:00 PM
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8">
                <a
                  href="tel:8817173011"
                  className="inline-block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Call Now
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
