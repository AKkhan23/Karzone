 import { Search, Shield, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../feature/adim/adminSlice";

export default function AllUsers() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers =
    users?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
            All Users
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage registered users
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 w-full overflow-x-auto">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {isLoading ? (
          <p className="text-center py-12 text-gray-500">Loading users...</p>
        ) : isError ? (
          <p className="text-center py-12 text-red-500">{message}</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center py-12 text-gray-500">No users found</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-[700px] w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 md:px-6">User</th>
                  <th className="px-3 py-3 md:px-6">Email</th>
                  <th className="px-3 py-3 md:px-6">Phone</th>
                  <th className="px-3 py-3 md:px-6">Role</th>
                  <th className="px-3 py-3 md:px-6">Joined</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 md:px-6">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>

                    <td className="px-3 py-4 md:px-6">{user.email}</td>
                    <td className="px-3 py-4 md:px-6">{user.phone}</td>

                    <td className="px-3 py-4 md:px-6">
                      {user.isAdmin ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full flex items-center space-x-1 w-fit">
                          <Shield className="h-3 w-3" />
                          <span>Admin</span>
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full flex items-center space-x-1 w-fit">
                          <User className="h-3 w-3" />
                          <span>User</span>
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-4 md:px-6">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
