 // src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader />

        <main className="flex-1 p-6 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
