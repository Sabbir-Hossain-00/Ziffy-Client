import { useQuery} from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";
import Swal from "sweetalert2";
import { Link } from "react-router";

export const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
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
    const { data } = await axiosSecure.delete(`/dismiss-report/${reportId}`);
    if (data.deletedCount) {
      refetch();
    }
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
          refetch();
        }

        const { data:dltRepport } = await axiosSecure.delete(
          `/dismiss-report/${reportId}`
        );
        if (dltRepport.deletedCount) {
          refetch();
        }
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Reported Comments
      </h2>
      <div className="overflow-x-auto w-[700px] xl:w-full mx-auto shadow rounded-lg border border-gray-200">
        <table className="w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Feedback</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3">Reported By</th>
              <th className="px-6 py-3">View Post</th>
              <th className="px-6 py-3">Delete Comment</th>
              <th className="px-6 py-3">Dismis Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-700  truncate max-w-[200px]">
                  {report.comment}
                </td>
                <td className="px-6 py-4 text-gray-700">{report.feedback}</td>
                <td className="px-6 py-4 text-gray-700">{report.userEmail}</td>
                <td className="px-6 py-4 text-gray-700">
                  {report.reportedEmail}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <Link to={`/post-details/${report?.postId}`} className="btn">
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
                    className="px-3 btn py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    Dismiss
                  </button>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No reported comments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
