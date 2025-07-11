import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";

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

  if (isPending) return <Loader/>;

  const { user: userInfo, posts } = data;

  const badge =
    userInfo?.badge === "gold"
      ? { label: "Gold Badge", color: "bg-yellow-400", emoji: "🏅" }
      : { label: "Bronze Badge", color: "bg-amber-500", emoji: "🥉" };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6 p-6 rounded-xl shadow bg-white mb-8">
        <img
          src={userInfo?.image}
          alt="User"
          className="w-20 h-20 rounded-full border-4 border-indigo-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{userInfo?.name}</h2>
          <p className="text-gray-500">{userInfo?.email}</p>
          <div
            className={`inline-block mt-2 px-3 py-1 text-sm text-white font-medium rounded-full ${badge.color}`}
          >
            {badge.emoji} {badge.label}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Posts
        </h3>
        <div className="grid gap-4">
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
                <span>Tag: #{post.tag}</span>
                <span>Total Vote: {post.totalVote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
