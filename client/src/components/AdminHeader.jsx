import { Bell, User } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AdminHeader() {
  const  { user} =   useSelector((state) => state.auth)


  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
          <p className="text-sm text-gray-500">Manage your car rental business</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
