import { useEffect, useState } from "react";
import { Post } from "./Post";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { Loader } from "../../Loader/Loader";

export const AllPost = ({ handldeSort , handleNext , handlePrevious , page , totalPages , posts}) => {
  
  
  console.log(posts)

  if (!posts.length) return <p className="text-3xl font-medium text-center py-20">There is no post available</p>;

  return (
    <section className="py-20">
      <div className="flex items-center gap-2 mb-6">
        <p>Sort by:</p>
        <button onClick={handldeSort} className="btn">
          Popularity
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-10 flex justify-center items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="btn disabled:opacity-50 "
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="btn disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};
