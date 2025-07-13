import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loader } from "../../Loader/Loader";
import { AllPost } from "../AllPost/AllPost";
import { Banner } from "../../../Components/Banner/Banner";
import { useEffect, useState } from "react";
import { useRoleSecure } from "../../../Hooks/useRoleSecure";

export const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [searchResult, setSearchResult] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 5;

  const {
    data: postsData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-post");
      return data;
    },
  });
  const { data: tags, isPending: isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-tags");
      return data;
    },
  });
  useEffect(() => {
    setPosts(postsData);
  }, [postsData]);

  const fetchPosts = async () => {
    try {
      const { data } = await axiosSecure.get(
        `/pagination-post?page=${page}&limit=${postsPerPage}`
      );
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axiosSecure.get(`/search-post?tag=${searchResult}`);
    setPosts(data);
  };

  const handldeSort = async () => {
    const { data } = await axiosSecure.get("/popular-post");
    setPosts(data);
  };

  if (isPending) {
    return <Loader />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40">
      <Banner
        handleSearch={handleSearch}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        postsData={postsData}
        tags={tags}
        setPosts={setPosts}
      />
      <AllPost posts={posts} handldeSort={handldeSort} handlePrevious={handlePrevious} handleNext={handleNext} page={page} totalPages={totalPages}  />
    </main>
  );
};
