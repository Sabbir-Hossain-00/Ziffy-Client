import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

export const Banner = ({
  setSearchResult,
  searchResult,
  handleSearch,
  tags,
  setPosts,
}) => {
    const axiosSecure = useAxiosSecure();
  const handleTagClick = async (tag) => {
    setSearchResult(tag);
    const { data } = await axiosSecure.get(`/search-post?tag=${tag}`);
    setPosts(data);
  };
  return (
    <section className="py-10">
      <div className="py-20 mt-10 flex flex-col justify-center items-center bg-white rounded-2xl">
        <form
          onSubmit={handleSearch}
          className="w-full flex justify-center items-center gap-0"
        >
          <input
            type="text"
            className="bg-white border border-gray-300 p-2 w-1/3 rounded"
            value={searchResult}
            onChange={(e) => setSearchResult(e.target.value)}
          />
          <button className="btn">Search</button>
        </form>
        <div className="flex gap-4 mt-6">
          {tags?.map((tag) => {
            return (
              <p
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="bg-green-50 px-5 py-1 rounded-full btn border-none"
              >
                #{tag}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};
