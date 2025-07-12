import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loader } from "../../Loader/Loader";
import { CommentModal } from "../../../Components/Modal/CommentModal";
import { use, useState } from "react";
import { Comment } from "../../../Components/Comment/Comment";
import { AuthContext } from "../../../Context/AuthContext";
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

export const PostDetails = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
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

  const { data: comments, refetch } = useQuery({
    queryKey: ["comment", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post-comment?id=${id}`);
      console.log(data);
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
  return (
    <section className="pt-20 container mx-auto px-3 md:px-6 lg:px-8 xl:px-24">
      <div>
        <div className="flex items-center gap-3">
          <img className="w-10 h-10  rounded-full" src={authorImage} alt="" />
          <div>
            <h1 className="font-medium text">{authorName}</h1>
            <p className="text-xs">{postDate}</p>
          </div>
        </div>
        <div className="ml-11 mb-10">
          <h1 className="text-4xl font-medium">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 bg-gray-200 w-fit  rounded-full">
            <button onClick={()=>handleVote(_id , "up")} className="hover:bg-gray-300 py-3 px-3 rounded-full cursor-pointer">
              <PiArrowFatUp />
            </button>
            <p>{totalVote ? totalVote : "0"}</p>
            <button onClick={()=>handleVote(_id , "down")} className="hover:bg-gray-300 p-3 rounded-full cursor-pointer">
              <PiArrowFatDown/>
            </button>
          </div>
          <div>
            <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-gray-200 w-fit px-3.5 py-2 hover:bg-gray-300 rounded-full cursor-pointer">
              <BiMessageRounded size={20} />
              {comments.length}
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
                url={`${import.meta.env.VITE_BASE_URL}/${_id}`}
                quote={`Check out this post: ${title}`}
                hashtag={tag}
                className="flex items-center gap-2"
              >
                <PiShareFat /> <span>share</span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div>
          {comments?.map((comment) => {
            return <Comment key={comment?._id} comment={comment} />;
          })}
        </div>
      </div>
    </section>
  );
};
