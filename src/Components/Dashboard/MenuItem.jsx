/* eslint-disable no-unused-vars */
import { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const MenuItem = ({ label, address, icon: Icon }) => {
  const{isDark} = use(AuthContext)
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 ${isDark ? "text-gray-900": ""}  hover:text-gray-700 ${
          isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
