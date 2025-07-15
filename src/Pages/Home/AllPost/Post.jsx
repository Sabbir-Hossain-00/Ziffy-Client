import moment from "moment/moment";
import { Link } from "react-router";
import { BiMessageRounded } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { FaArrowDown } from "react-icons/fa6";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loader } from "../../Loader/Loader";
import { use, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
// import { AuthContext } from "../../../Context/AuthContext";

export const Post = ({ post }) => {
  const axiosSecure = useAxiosSecure();
  const {user} = use(AuthContext);
  const {
    _id,
    authorName,
    authorEmail,
    authorImage,
    title,
    description,
    tag,
    upVote,
    downVote,
    created_at,
  } = post;
  const postDate = moment(created_at).fromNow();

  const { data: postSummary, isPending } = useQuery({
    queryKey: ["post-summary", _id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post-summary/${_id}`);
      return data;
    },
  });

  // const handleVote = async (postId, type) => {
  //   try {
  //     const { data } = await axiosSecure.patch(`/vote/${postId}`, {
  //       email: user?.email,
  //       vote: type, // "up" or "down"
  //     });
  //     if (data?.updateResult?.modifiedCount === 1) {
  //       postRefetch();
  //     }
  //   } catch (err) {
  //     console.error("Voting error:", err);
  //   }
  // };

  if (isPending) {
    return <Loader />;
  }
  return (
    <Link to={`/post-details/${_id}`}>
      <div className="bg-white shadow-2xl p-10 rounded-2xl space-y-2">
        <div className="flex items-center gap-3">
          <img className="w-10 h-10  rounded-full" src={authorImage} alt="" />
          <div>
            <h1 className="font-medium text">{authorName}</h1>
            <p className="text-xs">{postDate}</p>
          </div>
        </div>
        <div className="ml-11">
          <h1 className="text-2xl font-medium">{title}</h1>
        </div>
        <div className="ml-11">
          <p>#{tag}</p>
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex items-center gap-2 bg-gray-200 w-fit  rounded-full">
            <button  className=" py-3 px-3 rounded-full">
              <FaArrowUp />
            </button>
            <p>{postSummary?.totalVote ? postSummary?.totalVote : "0"}</p>
            <button  className=" p-3 rounded-full">
              <FaArrowDown />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-200 w-fit px-3.5 py-2 rounded-full">
            <BiMessageRounded size={20} />
            {postSummary?.commentsCount}
          </div>
        </div>
      </div>
    </Link>
  );
};
