import { useQueries, useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { Loader } from "../Loader/Loader";
import { Post } from "../Home/AllPost/Post";

export const Popular = () => {
  const axiosSecure = useAxiosSecure();
  const { data: popularPost, isPending } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/popular");
      console.log(data);
      return data;
    },
  });
  if (isPending) {
    return <Loader />;
  }
  return (
    <section className=" container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 py-20">
      <div className="grid grid-cols-1 gap-4">
        {popularPost.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};
