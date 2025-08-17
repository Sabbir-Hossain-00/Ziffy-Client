import { Outlet } from "react-router";
import { Sidebar } from "../../Components/Dashboard/Sidebar";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

export const DashboardLayout = () => {
  const {isDark} = use(AuthContext)
  return (
    <div className={`relative min-h-screen md:flex ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1  md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
