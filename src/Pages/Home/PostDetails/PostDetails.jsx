import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loader } from "../../Loader/Loader";
import { CommentModal } from "../../../Components/Modal/CommentModal";
import { use, useState } from "react";
import { Comment } from "../../../Components/Comment/Comment";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
} from "react-share";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUp } from "react-icons/pi";
import moment from "moment";
import { PiShareFat } from "react-icons/pi";
import { BiMessageRounded } from "react-icons/bi";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

export const PostDetails = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const {
    data: postDetails,
    isPending,
    refetch: postRefetch,
  } = useQuery({
    queryKey: ["postDetials", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post-details/${id}`);
      return data;
    },
  });

  const {
    data: comments,
    isPending: commentPending,
    refetch,
  } = useQuery({
    queryKey: ["comment", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post-comment?id=${id}`);
      return data;
    },
  });

  const handleVote = async (postId, type) => {
    try {
      const { data } = await axiosSecure.patch(`/vote/${postId}`, {
        email: user?.email,
        vote: type, // "up" or "down"
      });
      if (data?.updateResult?.modifiedCount === 1) {
        postRefetch();
      }
    } catch (err) {
      console.error("Voting error:", err);
    }
  };
  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();

    const commentData = {
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      comment: commentText,
      postId,
    };

    if (commentText === "") {
      toast.error("Write something");
      return;
    }
    const { data } = await axiosSecure.post("/comment", commentData);
    if (data.insertedId) {
      refetch();
      toast.success("Successfully Comment Done ")
      setCommentText("");
    }
  };

  if (isPending) {
    return <Loader />;
  }
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
    totalVote,
  } = postDetails;

  const postDate = moment(created_at).fromNow();
  if (commentPending) {
    return <Loader />;
  }
  // console.log({ upVote, downVote, totalVote });
  return (
    <section className="py-20 mt-10 container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 ">
      <div className="bg-white md:p-10 p-3 rounded-2xl">
        <div className="flex items-center gap-3">
          <img className="w-10 h-10  rounded-full" src={authorImage} alt="" />
          <div>
            <h1 className="font-medium text">{authorName}</h1>
            <p className="text-xs">{postDate}</p>
          </div>
        </div>
        <div className="ml-11 mt-3 mb-10 space-y-3">
          <h1 className="md:text-4xl text-2xl font-medium">{title}</h1>
          <p>{description}</p>
          <p className="font-medium">#{tag}</p>
        </div>
        <div className="flex justify-between text-xs md:text-base">
          <div className="flex items-center gap-2 bg-gray-200 w-fit  rounded-full">
            <button
              onClick={() => handleVote(_id, "up")}
              className="hover:bg-gray-300 py-3 px-3 rounded-full cursor-pointer"
            >
              <PiArrowFatUp />
            </button>
            <p>
              <span className="pr-2 border-r border-r-gray-400">{upVote}</span>{" "}
              <span className="pl-1.5">{downVote}</span>
            </p>
            <button
              onClick={() => handleVote(_id, "down")}
              className="hover:bg-gray-300 p-3 rounded-full cursor-pointer"
            >
              <PiArrowFatDown />
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-gray-200 w-fit px-3.5 py-2 hover:bg-gray-300 rounded-full cursor-pointer"
            >
              <BiMessageRounded size={20} />
              {comments?.length}
            </button>
          </div>
          <CommentModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            postId={_id}
            refetch={refetch}
          />
          <div>
            <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 w-fit px-3.5 py-2 rounded-full cursor-pointer">
              <FacebookShareButton
                url={`https://ziffy-00.web.app/${_id}`}
                quote={`Check out this post: ${title}`}
                hashtag={title}
                className="flex items-center gap-2"
              >
                <PiShareFat /> <span>share</span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={(e)=>handleCommentSubmit(e , _id)} className=" relative">
            <textarea
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              className="border border-gray-400 rounded-lg p-2 w-full mt-8 pl-4 pr-30"
              placeholder="Join the conversation"
            />
            <button className="bg-rose-500  text-white btn  rounded-lg border-none shadow-none mt-2 absolute right-2 top-22">
              Comment
            </button>
          </form>
        </div>
        <div className=" mt-8 border-t border-gray-200 pt-6 space-y-6">
          {comments?.map((comment) => {
            return <Comment key={comment?._id} comment={comment} />;
          })}
        </div>
      </div>
    </section>
  );
};
