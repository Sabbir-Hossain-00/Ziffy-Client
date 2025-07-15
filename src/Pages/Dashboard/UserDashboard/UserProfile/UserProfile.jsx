import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router";


export const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const { data, isPending } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-profile?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) return <Loader />;

  const { user: userInfo, posts } = data;
  console.log(userInfo);
  const badge = userInfo?.badge === "gold"
 console.log(posts)
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-indigo-100 rounded-b-2xl py-16 relative">
        {/* Profile Picture (centered and overlapping) */}
        <div className="flex justify-center">
          <div className="absolute -bottom-12">
            <img
              src={userInfo?.image}
              alt="User"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* User Info Content */}
      <div className="mt-16 text-center px-6">
        <div className="flex justify-center items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">{userInfo?.name}</h2>
          {userInfo?.badge === "gold" ? <MdVerified className="mt-1 text-amber-400"/> : <MdVerified className="mt-1 text-gray-400"/> }
        </div>
        <p className="text-gray-500">{userInfo?.email}</p>
      </div>

      <div className="mt-10">
        
        {posts.length !== 0 ? <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-5 bg-white shadow rounded-lg border border-gray-100"
            >
              <h4 className="text-lg font-semibold text-indigo-700">
                {post.title}
              </h4>
              <p className="text-gray-600 mt-1">
                {post.description.length > 80
                  ? post.description.slice(0, 80) + "..."
                  : post.description}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span> #{post.tag}</span>
                <span>Total Vote: {post.totalVote? post?.totalVote: 0}</span>
              </div>
            </div>
          ))}
        </div> : <div className="flex flex-col items-center gap-2">
          <p className="text-center font-medium ">No Available Post Right Now</p>
          <Link className="btn " to="/dashboard/add-post">Create a Post</Link>
        </div> }
        
      </div>
    </div>
  );
};
