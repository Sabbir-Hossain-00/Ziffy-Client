import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { useParams } from "react-router";
import { Loader } from "../../../Loader/Loader";
import { use, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AuthContext } from "../../../../Context/AuthContext";

const feedbackOptions = [
  "Inappropriate content",
  "Spam or misleading",
  "Off-topic or irrelevant",
];

export const MyComment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const{user} =use(AuthContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState({});
  const { data: comments, isPending } = useQuery({
    queryKey: ["comment", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post-comment?id=${id}`);
      return data;
    },
  });

  const handleReport = async(commentId , comment , reportedEmail) => {
    console.log(commentId , feedbacks[commentId]);
    const reportData = {
        commentId,
        feedback:feedbacks[commentId],
        comment,
        reportedEmail,
        userEmail:user?.email,
    }
    const {data} = await axiosSecure.post("/report",reportData)
    if(data.insertedId){
        setFeedbacks((prev)=>({
        ...prev,
        [commentId]:"",
    }))
    }
  };

  if (isPending) return <Loader />;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Comments</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Feedback</th>
              <th className="px-6 py-3 text-center">Report</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment) => {
              const isLong = comment.comment.length > 20;
              const shortComment = isLong
                ? comment.comment.slice(0, 20) + "..."
                : comment.comment;

              return (
                <tr
                  key={comment._id}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 text-gray-800">
                    {comment.userEmail}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {shortComment}{" "}
                    {isLong && (
                      <button
                        onClick={() => {
                          //   setSelectedComment(comment.comment);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-500 hover:underline text-sm"
                      >
                        Read More
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={feedbacks[comment._id] || ""}
                      onChange={(e) =>
                        setFeedbacks((prev) => ({
                          ...prev,
                          [comment._id]: e.target.value,
                        }))
                      }
                      className="border border-gray-300 px-2 py-1 rounded bg-white text-gray-700 text-sm"
                    >
                      <option value="">Select Feedback</option>
                      {feedbackOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      disabled={!feedbacks[comment._id]}
                      onClick={() => handleReport(comment._id, comment.comment , comment.userEmail)}
                      className={`px-4 py-1 rounded-full btn text-sm transition ${
                        !feedbacks[comment._id] ? "cursor-[not-allowed] " : "cursor-pointer"
                      }`}
                    >
                      Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Read More Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <DialogPanel className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <DialogTitle className="text-xl font-semibold mb-4 text-gray-800">
              Full Comment
            </DialogTitle>
            <p className="text-gray-700 whitespace-pre-wrap">
              {comments?.comment}
            </p>
            <div className="text-right mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
