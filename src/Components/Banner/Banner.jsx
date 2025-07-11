import { MdSearch } from "react-icons/md";
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
    <section className="py-10 container mx-auto px-3 md:px-6 lg:px-8 xl:px-14 ">
      <div className="relative md:py-30 py-14 mt-10 flex flex-col justify-center items-center bg-white rounded-2xl px-3">
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/NgmFDTmv/image.png')] bg-cover bg-center z-0 rounded-2xl" />
        <div className="absolute rounded-2xl inset-0 bg-black/60 z-10" />

        <form
          onSubmit={handleSearch}
          className="w-full flex justify-center items-center gap-0  z-20 "
        >
          <input
            type="text"
            className="bg-white border border-gray-300 p-2 md:pl-4 pl-3 md:w-1/3 w-3/4 py-3 rounded-l-full"
            placeholder="Search ziffy"
            value={searchResult}
            onChange={(e) => setSearchResult(e.target.value)}
          />
          <button className="btn border-l-none py-6 rounded-r-full px-7">Search</button>
        </form>
        <div className="z-20 flex items-center flex-wrap gap-4 mt-6">
          <p className="font-medium text-lg text-white">Popular topics :</p>
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
