import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useContext, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthContext";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";

const COLORS = ["#4ade80", "#60a5fa", "#facc15"];

export const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [newTag, setNewTag] = useState("");

  const { data: stats, isPending } = useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/site-stats");
      return data;
    },
  });

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag) return;
    try {
      await axiosSecure.post("/add-tag", {
        value: newTag,
        label: newTag,
      });
      Swal.fire("Success", "Tag added successfully", "success");
      setNewTag("");
    } catch {
      Swal.fire("Error", "Failed to add tag", "error");
    }
  };

  if (isPending) return <Loader />;

  const chartData = [
    { name: "Posts", value: stats?.postCount || 0 },
    { name: "Comments", value: stats?.commentCount || 0 },
    { name: "Users", value: stats?.userCount || 0 },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="bg-indigo-100 rounded-b-2xl py-16 relative">
        {/* Profile Picture (centered and overlapping) */}
        <div className="flex justify-center">
          <div className="absolute -bottom-12">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* User Info Content */}
      <div className="mt-16 text-center px-6">
        <div className="flex justify-center items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">{user?.displayName}</h2>
        </div>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Site Overview
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Total Posts: {stats?.postCount}</li>
            <li>💬 Total Comments: {stats?.commentCount}</li>
            <li>👥 Total Users: {stats?.userCount}</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border">
          <PieChart width={300} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center ">
          Add New Tag
        </h3>
        <form
          onSubmit={handleAddTag}
          className="flex gap-4 items-center justify-center"
        >
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="w-3/4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-amber-400"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-amber-400 text-white rounded hover:bg-amber-500 transition"
          >
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};
