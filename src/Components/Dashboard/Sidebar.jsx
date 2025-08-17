import { use, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { AiOutlineBars } from "react-icons/ai";

import { Link } from "react-router";
import MenuItem from "./MenuItem";
import { AuthContext } from "../../Context/AuthContext";
import { UserMenu } from "./UserMenu";
import { AdminMenu } from "./AdminMenu";
import { useRoleSecure } from "../../Hooks/useRoleSecure";
import { Loader } from "../../Pages/Loader/Loader";
import { LogoZiffy } from "../Logo/LogoZiffy";
import { Moon, Sun } from "lucide-react";
export const Sidebar = () => {
  const { signOutUser, user } = use(AuthContext);
  const [isActive, setActive] = useState(false);
  const { isDark , setIsDark   } = use(AuthContext);
  const { userData, userLoading } = useRoleSecure();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    localStorage.setItem("ziffyTheme", JSON.stringify(!isDark));
  };
  if (userLoading) {
    return <Loader />;
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div
        className={` text-gray-800 flex justify-between md:hidden ${
          isDark ? "bg-gray-600" : "bg-gray-100"
        }`}
      >
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">Ziffy</Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden  ${
          isDark ? "bg-gray-600" : "bg-gray-100"
        } w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="text-center">
            <LogoZiffy />
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <MenuItem icon={CgProfile} label="Profile" address="/dashboard" />
              {/*  Menu Items */}
              {userData?.role === "user" && <UserMenu />}
              {userData?.role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <div
            onClick={toggleTheme}
            className={` mt-4 ml-3 cursor-pointer w-12 h-7 sm:w-14 sm:h-8 flex items-center rounded-full p-1 transition duration-300 ${
              isDark ? "bg-[#006d77]" : "bg-[#e4c1f9]"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                isDark ? "translate-x-5 sm:translate-x-6" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 m-auto md:mt-1 mt-0.5 text-black" />
              ) : (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 m-auto md:mt-1 mt-0.5 text-[#e4c1f9]" />
              )}
            </div>
          </div>
          <button
            onClick={signOutUser}
            className={`flex w-full items-center px-4 py-2 mt-5 transition-colors duration-300 transform ${
              isDark
                ? "text-gray-900 hover:bg-gray-300   hover:text-gray-700"
                : "text-gray-600 hover:bg-gray-300   hover:text-gray-700"
            }`}
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};
