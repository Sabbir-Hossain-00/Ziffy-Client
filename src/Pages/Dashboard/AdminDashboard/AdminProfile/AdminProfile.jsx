import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useContext, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthContext";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";
import { FileText, MessageCircle, Users } from "lucide-react";

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
    <div className=" max-w-5xl mx-auto space-y-8">
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
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.displayName}
          </h2>
        </div>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
          
          <div className="grid md:grid-rows-2 gap-6 md:max-w-5xl w-full mx-auto">
            {/* Row 1: Full width card */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <FileText className="w-10 h-10 text-rose-500 mb-2" />
              <div className="flex items-center gap-2 text-xs lg:text-base xl:text-lg font-medium text-gray-800">
                <span>Total Posts:</span>
                <span className="font-bold">{stats?.postCount || 0}</span>
              </div>
            </div>

            {/* Row 2: Two half-width cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <MessageCircle className="w-10 h-10 text-rose-500 mb-2" />
                <div className="flex items-center gap-2 text-xs lg:text-sm xl:text-lg font-medium text-gray-800">
                  <span>Total Comments:</span>
                  <span className="font-bold">{stats?.commentCount || 0}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <Users className="w-10 h-10 text-rose-500 mb-2" />
                <div className="flex items-center gap-2 text-xs lg:text-base xl:text-lg font-medium text-gray-800">
                  <span>Total Users:</span>
                  <span className="font-bold">{stats?.userCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        <div className="bg-white md:p-4 flex  justify-center rounded-xl shadow ">
          <PieChart width={275} height={250}>
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

      <div className="bg-white md:p-6 p-3 rounded-xl shadow ">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center ">
          Add New Tag
        </h3>
        <form
          onSubmit={handleAddTag}
          className="flex  items-center md:gap-6 gap-1 justify-center"
        >
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name"
            className="w-3/4 px-4 py-2 shadow rounded-md focus:outline-none focus:ring focus:ring-rose-400 text-xs md:text-base"
          />
          <button
            type="submit"
            className="md:px-5 px-2 py-2 bg-rose-400 text-white rounded hover:bg-rose-500 transition text-xs md:text-base w-fit"
          >
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};
