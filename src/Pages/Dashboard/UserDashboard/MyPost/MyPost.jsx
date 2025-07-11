import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";
import { Link } from "react-router";

export const MyPost = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: myPosts, isPending } = useQuery({
    queryKey: ["my-post", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-post?email=${user?.email}`);
      return data;
    },
  });
  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Posts</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Post Title</th>
              <th className="px-6 py-3 text-center">Total Votes</th>
              <th className="px-6 py-3 text-center">Comment</th>
              <th className="px-6 py-3 text-center">Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {myPosts?.map((post) => (
              <tr
                key={post._id}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-center text-indigo-600 font-semibold">
                  {post.totalVote || 0}
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/dashboard/comments/${post?._id}`}
                    className="text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1 rounded-full transition"
                    
                  >
                    Comment
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full transition"
                    onClick={() => console.log("Delete", post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
