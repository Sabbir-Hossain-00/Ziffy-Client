import { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

export const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const [open, setOpen] = useState(false);
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-pink-700" : "")}
        >
          Home
        </NavLink>
      </li>
    </>
  );
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("sign Out successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
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
        <a className=" text-xl">Ziffy</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end relative">
        {user ? (
          <div>
            <img
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full cursor-pointer"
              src={user?.photoURL}
              alt="User"
              title={user.displayName}
            />

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold text-sm">{user.displayName}</p>
                </div>
                <ul className="text-sm text-gray-700">
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
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
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn">
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};
