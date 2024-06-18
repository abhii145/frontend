import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white lg:w-64 w-16">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
