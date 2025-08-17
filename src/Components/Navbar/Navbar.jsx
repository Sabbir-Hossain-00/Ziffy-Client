import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../Context/AuthContext";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../Pages/Loader/Loader";
import { LogoZiffy } from "../Logo/LogoZiffy";
import { Moon, Sun } from "lucide-react";

export const Navbar = () => {
  const { user, signOutUser, isDark, setIsDark } = use(AuthContext);
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data: announcements, isPending } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/announcments");
      return data;
    },
  });
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-rose-700 font-medium" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/popular"
          className={({ isActive }) =>
            isActive ? "text-rose-700 font-medium" : "font-medium"
          }
        >
          Popular
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-rose-700 font-medium" : "font-medium"
          }
        >
          About
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/career"
              className={({ isActive }) =>
                isActive ? "text-rose-700 font-medium" : "font-medium"
              }
            >
              Career
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/membership"
              className={({ isActive }) =>
                isActive ? "text-rose-700 font-medium" : "font-medium"
              }
            >
              Membership
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    localStorage.setItem("ziffyTheme", JSON.stringify(!isDark));
  };
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("sign Out successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className={`shadow fixed w-full top-0 z-100 ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}>
      <div className="navbar  container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <LogoZiffy />
        </div>
        <div className="navbar-end ">
          <ul className="gap-4 px-1 hidden lg:flex">{links}</ul>
          <div className="relative flex items-center gap-4">
            <div className="relative w-fit ml-3">
              <IoNotificationsOutline size={24} className={`${isDark ? "": "text-gray-700"}`} />
              {announcements?.length !== 0 ? (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-[6px] py-[1px] rounded-full shadow">
                  {announcements?.length}
                </span>
              ) : (
                ""
              )}
            </div>

            {user ? (
              <div>
                <img
                  onClick={() => setOpen(!open)}
                  className="w-9 min-w-fit h-9 rounded-full cursor-pointer"
                  src={user?.photoURL}
                  alt="User"
                  title={user.displayName}
                />

                {open && (
                  <div className={`absolute right-0 mt-2 w-48 shadow-lg border rounded-lg z-50 ${isDark ? "bg-gray-800 text-white" : "bg-white "}`}>
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-sm">
                        {user.displayName}
                      </p>
                    </div>
                    <ul className={`text-sm ${isDark  ?"text-gray-200" : "text-gray-700"}`}>
                      <li>
                        <Link
                          to="/dashboard"
                          className={`block px-4 py-2 ${isDark ? "hover:bg-gray-600": "hover:bg-gray-100"}`}
                          onClick={() => setOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 ${isDark ? "hover:bg-gray-600": "hover:bg-gray-100"}`}
                        >
                          Logout
                        </button>
                      </li>
                      <li className="px-4 py-2">
                        <div
                          onClick={toggleTheme}
                          className={` cursor-pointer w-12 h-7 sm:w-14 sm:h-8 flex items-center rounded-full p-1 transition duration-300 ${
                            isDark ? "bg-[#006d77]" : "bg-[#e4c1f9]"
                          }`}
                        >
                          <div
                            className={`bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                              isDark
                                ? "translate-x-5 sm:translate-x-6"
                                : "translate-x-0"
                            }`}
                          >
                            {isDark ? (
                              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 m-auto md:mt-1 mt-0.5 text-black" />
                            ) : (
                              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 m-auto md:mt-1 mt-0.5 text-[#e4c1f9]" />
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn border-none shadow-none  bg-rose-500 text-white"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
