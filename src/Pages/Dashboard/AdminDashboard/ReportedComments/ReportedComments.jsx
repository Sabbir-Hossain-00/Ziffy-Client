import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";
import Swal from "sweetalert2";
import { Link } from "react-router";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const {
    data: reports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/reported-comments");
      return data;
    },
  });

  const handleDismiss = async (reportId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to dismiss this report.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, dismiss it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(
            `/dismiss-report/${reportId}`
          );
          if (data.deletedCount) {
            Swal.fire(
              "Dismissed!",
              "The report has been dismissed.",
              "success"
            );
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Could not dismiss the report.", "error");
          console.error(error);
        }
      }
    });
  };

  const handleDelete = (commentId, reportId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove the comment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/comments/${commentId}`);
        if (data.deletedCount) {
          await axiosSecure.delete(`/dismiss-report/${reportId}`);
          refetch();
        }
      }
    });
  };

  // Pagination Logic
  const offset = currentPage * itemsPerPage;
  const currentItems = reports.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(reports.length / itemsPerPage);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2 className="md:text-3xl text-2xl font-bold text-gray-800 mb-6">
        Reported Comments
      </h2>
      <div className="overflow-x-auto md:w-[700px] xl:w-full mx-auto shadow rounded-lg border border-gray-200">
        <table className="w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Feedback</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3">Reported By</th>
              <th className="px-6 py-3">View Post</th>
              <th className="px-6 py-3">Delete Comment</th>
              <th className="px-6 py-3">Dismiss Report</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((report) => (
                <tr
                  key={report._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-700 truncate max-w-[200px]">
                    {report.comment}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{report.feedback}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {report.userEmail}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {report.reportedEmail}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <Link
                      to={`/post-details/${report?.postId}`}
                      className="btn"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <button
                      onClick={() => handleDelete(report.commentId, report._id)}
                      className="px-3 py-1 btn bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <button
                      onClick={() => handleDismiss(report._id)}
                      className="px-3 py-1 btn bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No reported comments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        pageCount={Math.max(1, pageCount)}
        forcePage={currentPage}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="flex justify-center mt-6 space-x-2"
        pageClassName="px-3 py-1 border rounded bg-white text-sm cursor-pointer"
        pageLinkClassName="inline-block w-full h-full"
        activeClassName="hover:bg-rose-600 text-black"
        previousClassName={`px-3 py-1 border rounded bg-white text-sm ${
          pageCount === 1 || currentPage === 0
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        nextClassName={`px-3 py-1 border rounded bg-white text-sm ${
          pageCount === 1 || currentPage === pageCount - 1
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        disabledClassName="cursor-not-allowed opacity-50"
      />
    </div>
  );
};
