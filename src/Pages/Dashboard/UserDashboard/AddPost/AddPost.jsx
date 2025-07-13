import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { use, useEffect } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, NavLink, useLocation } from "react-router";

export const AddPost = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const { data: tagOptions, isPending } = useQuery({
    queryKey: ["tag"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tags");
      return data;
    },
  });

  const { data: myPostCount, refetch } = useQuery({
    queryKey: ["postCount", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/myPost-count?email=${user?.email}`
      );
      return data;
    },
  });

  const { data: userData, isPending: userDataPending } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user?email=${user?.email}`);
      return data;
    },
  });

  const onSubmit = async (data) => {
    const post = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      title: data.title,
      description: data.description,
      tag: data.tag.value,
      upVote: 0,
      downVote: 0,
    };

    try {
      const { data } = await axiosSecure.post("/post", post);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      refetch();
    }
  };

  if (isPending || userDataPending) return;

  const isPremium = userData?.badge === "gold";
  const hasReachedLimit = myPostCount >= 5;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create a New Post
      </h2>

      {!isPremium && hasReachedLimit ? (
        <div className="text-center space-y-4">
          <p className="text-lg text-red-600 font-medium">
            You’ve reached your posting limit. Only premium members can post
            more than 5 times.
          </p>
          <Link
            to="/membership"
            state={location.pathname}
            className="btn bg-amber-400 hover:bg-amber-500 text-white rounded-xl px-6 py-2"
          >
            Upgrade to Premium
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Author Image */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Author Image
            </label>
            <input
              type="text"
              value={user?.photoURL}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Author Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Author Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Author Email
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Post Title */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter post title"
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Post Description */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Post Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={5}
              placeholder="Write your post content..."
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Tag (React Select) */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Tag <span className="text-red-500">*</span>
            </label>
            <Controller
              name="tag"
              control={control}
              rules={{ required: "Please select a tag" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={tagOptions}
                  placeholder="Select a tag"
                  className="text-black"
                />
              )}
            />
            {errors.tag && (
              <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-amber-400 hover:bg-amber-500 text-white px-6 py-2 rounded-xl shadow"
            >
              Publish Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
