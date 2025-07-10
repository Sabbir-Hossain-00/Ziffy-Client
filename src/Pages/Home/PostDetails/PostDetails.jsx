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
  return (
    <section className="pt-20">
      <div>
        <div className="flex items-center gap-3">
          <img className="w-10 h-10  rounded-full" src={authorImage} alt="" />
          <div>
            <h1 className="font-medium text">{authorName}</h1>
            <p className="text-xs"> jul 8</p>
          </div>
        </div>
        <div className="ml-11 mb-10">
          <h1 className="text-4xl font-medium">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <button onClick={() => handleVote(_id, "up")} className="btn mr-2">
              Up Vote
            </button>
            <p>{totalVote}</p>
            <button
              onClick={() => handleVote(_id, "down")}
              className="btn mr-2"
            >
              Down Vote
            </button>
          </div>
          <div>
            <button onClick={() => setIsOpen(true)} className="btn">
              Comment
            </button>
          </div>
          <CommentModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            postId={_id}
            refetch={refetch}
          />
          <div>
            <button className="btn">
                <FacebookShareButton
               url={`${import.meta.env.VITE_BASE_URL}/${_id}`}
              quote={`Check out this post: ${title}`}
              hashtag={tag}
            >
              Share
            </FacebookShareButton>
            </button>
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
