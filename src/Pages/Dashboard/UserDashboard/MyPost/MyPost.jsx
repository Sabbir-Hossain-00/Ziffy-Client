import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, use } from "react";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";
import { Link } from "react-router";
import { AuthContext } from "../../../../context/AuthContext";
import ReactPaginate from "react-paginate";

export const MyPost = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const {
    data: myPosts = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-post", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-post?email=${user?.email}`);
      return data;
    },
  });

  const handleDeletePost = async (id) => {
    const { data } = await axiosSecure.delete(`delete-my-post/${id}`);
    if (data.deletedCount) {
      refetch();
    }
  };

  const offset = currentPage * rowsPerPage;
  const paginatedPosts = myPosts.slice(offset, offset + rowsPerPage);
  const pageCount = Math.ceil((myPosts?.length || 0) / rowsPerPage);

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
            {paginatedPosts.map((post) => (
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
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        pageCount={pageCount || 1}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        forcePage={currentPage}
        containerClassName="flex justify-center mt-6 space-x-2"
        pageClassName="px-3 py-1 border rounded bg-white text-sm cursor-pointer"
        activeClassName="hover:bg-amber-400 text-white"
        previousClassName={`px-3 py-1 border rounded bg-white text-sm ${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        nextClassName={`px-3 py-1 border rounded bg-white text-sm ${
          currentPage === pageCount - 1 || pageCount === 0
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};
