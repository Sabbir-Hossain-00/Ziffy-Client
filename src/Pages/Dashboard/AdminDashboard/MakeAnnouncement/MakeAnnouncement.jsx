import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthContext";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";

export const MakeAnnouncement = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const announcementData = {
      ...data,
      created_at: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/announcements", announcementData);
      Swal.fire("Success", "Announcement created successfully!", "success");
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to create announcement", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Make an Announcement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Author Image (read-only) */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Author Image
          </label>
          <input
            type="text"
            readOnly
            value={user?.photoURL}
            {...register("authorImage")}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
          />
        </div>

        {/* Author Name (read-only) */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Author Name
          </label>
          <input
            type="text"
            readOnly
            value={user?.displayName}
            {...register("authorName")}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter announcement title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Write your announcement..."
            className="w-full px-4 py-2 border rounded-md h-40 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Post Announcement
          </button>
        </div>
      </form>
    </div>
  );
};
