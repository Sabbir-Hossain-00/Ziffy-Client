// src/pages/ForbiddenPage.jsx

import { Link } from "react-router";
import { Ban } from "lucide-react";

export const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <Ban size={80} className="text-red-500 mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-amber-400 text-white font-semibold rounded-xl hover:bg-amber-500 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

