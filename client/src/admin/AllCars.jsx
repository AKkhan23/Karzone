// import { useEffect, useState } from "react";
// import {
//   Search,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Car,
//   Filter,
//   TrendingUp,
//   Shield,
//   Zap,
//   Fuel,
//   Settings,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllCars,
//   removeCar,
//   setEditCar,
// } from "../feature/adim/adminSlice";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AllCars() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [isLoading, setIsLoading] = useState(false);

//   const { cars, isError, message } = useSelector((state) => state.admin);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchAllCars());
//   }, [dispatch]);

//   // Stats calculation
//   const stats = {
//     total: cars?.length || 0,
//     available: cars?.filter((car) => car.isAvailable).length || 0,
//     rented: cars?.filter((car) => !car.isAvailable).length || 0,
//     premium: cars?.filter((car) => car.category === "Premium").length || 0,
//   };

//   // Search Filter
//   const filteredCars = Array.isArray(cars)
//     ? cars.filter((car) => {
//         const matchesSearch =
//           car?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           car?.brand?.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus =
//           filterStatus === "All" ||
//           (filterStatus === "Available" && car.isAvailable) ||
//           (filterStatus === "Rented" && !car.isAvailable);
//         return matchesSearch && matchesStatus;
//       })
//     : [];

//   // Delete
//   const handleDelete = async (id) => {
//     setIsLoading(true);
//     await dispatch(removeCar(id));
//     toast.success("Car deleted successfully");
//     setIsLoading(false);
//   };

//   // Edit
//   const handleEdit = (car) => {
//     dispatch(setEditCar(car));
//     navigate("/admin/add-car");
//   };

//   // View Details
//   const handleView = (car) => {
//     setSelectedCar(car);
//     setIsModalOpen(true);
//   };

//   // Error toast
//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//   }, [isError, message]);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col md:flex-row md:items-center justify-between gap-4"
//       >
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
//             Fleet Management
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Manage and monitor your vehicle inventory
//           </p>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <Car className="h-4 w-4" />
//           <span>Total Vehicles: {stats.total}</span>
//         </div>
//       </motion.div>

//       {/* Stats Cards */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//       >
        // <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        //   <div className="flex items-center justify-between">
        //     <div>
        //       <p className="text-sm text-gray-500">Total Cars</p>
        //       <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
        //     </div>
        //     <div className="p-3 bg-blue-50 rounded-lg">
        //       <Car className="h-6 w-6 text-blue-600" />
        //     </div>
        //   </div>
        // </div>

//         <div className="bg-white rounded-xl border border-emerald-100 p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Available</p>
//               <p className="text-3xl font-bold text-emerald-900">
//                 {stats.available}
//               </p>
//             </div>
//             <div className="p-3 bg-emerald-50 rounded-lg">
//               <CheckCircle className="h-6 w-6 text-emerald-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-amber-100 p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Rented Out</p>
//               <p className="text-3xl font-bold text-amber-900">
//                 {stats.rented}
//               </p>
//             </div>
//             <div className="p-3 bg-amber-50 rounded-lg">
//               <TrendingUp className="h-6 w-6 text-amber-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-purple-100 p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Premium</p>
//               <p className="text-3xl font-bold text-purple-900">
//                 {stats.premium}
//               </p>
//             </div>
//             <div className="p-3 bg-purple-50 rounded-lg">
//               <Shield className="h-6 w-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Filters and Search */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="text-sm font-medium text-gray-700 mb-2 block">
//               Search Cars
//             </label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name or brand..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700 mb-2 block">
//               Filter by Status
//             </label>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
//               >
//                 <option value="All">All Status</option>
//                 <option value="Available">Available</option>
//                 <option value="Rented">Rented</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-x-auto rounded-lg border border-gray-200">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Vehicle
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Details
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Fuel
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <AnimatePresence>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredCars.map((car, index) => (
//                   <motion.tr
//                     key={car._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-4">
//                         <div className="relative">
//                           <img
//                             src={car.imageUrl}
//                             className="h-14 w-20 rounded-lg object-cover shadow-sm"
//                             alt={car.name}
//                           />
//                           <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-900">
//                             {car.name}
//                           </p>
//                           <p className="text-sm text-gray-500">{car.brand}</p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <div className="p-1 bg-blue-50 rounded">
//                             <Settings className="h-3 w-3 text-blue-600" />
//                           </div>
//                           <span className="text-sm text-gray-600">
//                             {car.category}
//                           </span>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {car.category}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <Fuel className="h-4 w-4 text-gray-400" />
//                         <span className="text-sm font-medium text-gray-700">
//                           {car.fuelType}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-baseline gap-1">
//                         <span className="text-lg font-bold text-blue-600">
//                           ₹{car.price}
//                         </span>
//                         <span className="text-xs text-gray-500">/day</span>
//                       </div>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         {car.isAvailable ? (
//                           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
//                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//                             <span className="text-xs font-semibold text-emerald-700">
//                               Available
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200">
//                             <XCircle className="h-3 w-3 text-red-500" />
//                             <span className="text-xs font-semibold text-red-700">
//                               Rented
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleEdit(car)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </motion.button>

//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleView(car)}
//                           className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
//                           title="View Details"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </motion.button>

//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleDelete(car._id)}
//                           disabled={isLoading}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
//                           title="Delete"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </motion.button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </AnimatePresence>
//           </table>

//           {filteredCars.length === 0 && (
//             <div className="text-center py-12">
//               <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
//                 <Car className="h-8 w-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 No Cars Found
//               </h3>
//               <p className="text-gray-600">
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {filteredCars.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-6 pt-6 border-t border-gray-200"
//           >
//             <div className="flex items-center justify-between text-sm text-gray-600">
//               <span>
//                 Showing {filteredCars.length} of {cars?.length} vehicles
//               </span>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
//                   <span>Available: {stats.available}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                   <span>Rented: {stats.rented}</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Car Details Modal */}
//       <AnimatePresence>
//         {isModalOpen && selectedCar && (
//           <div className="fixed inset-0 z-50">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//               onClick={() => setIsModalOpen(false)}
//             />

//             {/* Modal Content */}
//             <div className="fixed inset-0 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Header */}
//                 <div className="relative h-48 overflow-hidden group">
//                   <img
//                     src={selectedCar.imageUrl}
//                     alt={selectedCar.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//                   >
//                     <span className="text-white text-xl">×</span>
//                   </button>

//                   <div className="absolute bottom-4 left-4 right-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h2 className="text-2xl font-bold text-white">
//                           {selectedCar.name}
//                         </h2>
//                         <p className="text-white/90">
//                           {selectedCar.brand} • {selectedCar.category}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-3xl font-bold text-white">
//                           ₹{selectedCar.price}
//                           <span className="text-sm font-normal">/day</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 overflow-y-auto p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     {/* Specifications */}
//                     <div className="bg-gray-50 rounded-xl p-5">
//                       <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                         <Zap className="h-5 w-5 text-blue-600" />
//                         Specifications
//                       </h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between py-2 border-b border-gray-200">
//                           <span className="text-gray-600">Category</span>
//                           <span className="font-semibold text-gray-800">
//                             {selectedCar.category}
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between py-2 border-b border-gray-200">
//                           <span className="text-gray-600">Fuel Type</span>
//                           <div className="flex items-center gap-2">
//                             <Fuel className="h-4 w-4 text-gray-400" />
//                             <span className="font-semibold text-gray-800">
//                               {selectedCar.fuelType}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between py-2">
//                           <span className="text-gray-600">Availability</span>
//                           <span
//                             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${selectedCar.isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
//                           >
//                             {selectedCar.isAvailable
//                               ? "Available Now"
//                               : "Currently Rented"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Owner Info */}
//                     <div className="bg-gray-50 rounded-xl p-5">
//                       <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                         <Shield className="h-5 w-5 text-emerald-600" />
//                         Owner Information
//                       </h3>
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
//                             <span className="text-blue-600 font-semibold text-lg">
//                               {selectedCar.carOwnerName.charAt(0)}
//                             </span>
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-800">
//                               {selectedCar.carOwnerName}
//                             </p>
//                             <p className="text-sm text-gray-500">Car Owner</p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                               <span className="text-blue-600">📞</span>
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-800">
//                                 {selectedCar.phone}
//                               </p>
//                               <p className="text-sm text-gray-500">Contact</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-2">
//                             <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mt-1">
//                               <span className="text-emerald-600">📍</span>
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-800">
//                                 {selectedCar.shopeAdress}
//                               </p>
//                               <p className="text-sm text-gray-500">
//                                 Shop Address
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="mb-6">
//                     <h3 className="font-bold text-gray-800 mb-3">
//                       Description
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
//                       {selectedCar.description ||
//                         "No description available for this vehicle."}
//                     </p>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <button
//                       onClick={() =>
//                         window.open(
//                           `https://wa.me/91${selectedCar.phone}`,
//                           "_blank",
//                         )
//                       }
//                       className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
//                     >
//                       <span>💬</span>
//                       WhatsApp
//                     </button>
//                     <button
//                       onClick={() =>
//                         (window.location.href = `tel:${selectedCar.phone}`)
//                       }
//                       className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
//                     >
//                       <span>📞</span>
//                       Call Now
//                     </button>
//                   </div>

//                   <p className="text-center text-gray-400 text-sm mt-4">
//                     Listed on{" "}
//                     {new Date(selectedCar.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Search, Edit, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCars,
  removeCar,
  setEditCar,
} from "../feature/adim/adminSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AllCars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cars, isError, message } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  // Search Filter
  const filteredCars = Array.isArray(cars)
    ? cars.filter(
        (car) =>
          car?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car?.brand?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  // Delete
  const handelDelete = (id) => {
    dispatch(removeCar(id));
    toast.success("Car deleted successfully");
  };

  // Edit
  const handleEdit = (car) => {
    dispatch(setEditCar(car));
    navigate("/admin/add-car");
  };

  // View Details
  const handleView = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Error toast
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Cars</h1>
        <p className="text-gray-600">Manage your vehicle inventory</p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cars by name or brand..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Cars Grid - Mobile First */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            {/* Car Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={car.imageUrl}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                alt={car.name}
              />
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                {car.isAvailable ? (
                  <span className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <CheckCircle size={12} /> Available
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <XCircle size={12} /> Rented
                  </span>
                )}
              </div>
            </div>

            {/* Car Details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                  <p className="text-gray-600 text-sm">{car.brand}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">₹{car.price}</div>
                  <div className="text-gray-500 text-sm">per day</div>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Category</div>
                  <div className="font-medium text-gray-800">{car.category}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Fuel Type</div>
                  <div className="font-medium text-gray-800">{car.fuelType}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(car)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleView(car)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-900 transition-colors font-medium"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => handelDelete(car._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCars.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cars Found</h3>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>
      )}

      {/* View Details Modal */}
      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
            >
              <span className="text-xl">×</span>
            </button>

            {/* Car Image */}
            <div className="relative h-64">
              <img
                src={selectedCar.imageUrl}
                alt={selectedCar.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h2 className="text-2xl font-bold text-white mb-1">{selectedCar.name}</h2>
                <p className="text-white/90">{selectedCar.brand}</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              {/* Price and Status */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">₹{selectedCar.price}</div>
                  <div className="text-gray-500">per day</div>
                </div>
                <div>
                  {selectedCar.isAvailable ? (
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                      <CheckCircle size={16} />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
                      <XCircle size={16} />
                      Rented
                    </span>
                  )}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Category</div>
                  <div className="font-semibold text-gray-800">{selectedCar.category}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Fuel Type</div>
                  <div className="font-semibold text-gray-800">{selectedCar.fuelType}</div>
                </div>
              </div>

              {/* Description */}
              {selectedCar.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedCar.description}
                  </p>
                </div>
              )}

              {/* Owner Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Owner Information</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Owner Name</div>
                    <div className="font-semibold text-gray-800">{selectedCar.carOwnerName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone Number</div>
                    <div className="font-semibold text-gray-800">{selectedCar.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Shop Address</div>
                    <div className="font-semibold text-gray-800">{selectedCar.shopeAdress}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.open(`https://wa.me/91${selectedCar.phone}`, "_blank")}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => window.location.href = `tel:${selectedCar.phone}`}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
