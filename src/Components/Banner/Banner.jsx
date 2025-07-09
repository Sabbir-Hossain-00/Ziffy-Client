import axios from "axios";
import { useState } from "react";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

export const Banner = ({setSearchResult , searchResult , handleSearch}) => {
    
  return (
    <section className="py-10">
      <div className="py-20 mt-10 flex flex-col justify-center items-center bg-white rounded-2xl">
        <form onSubmit={handleSearch} className="w-full flex justify-center items-center gap-0">
          <input
            type="text"
            className="bg-white border border-gray-300 p-2 w-1/3 rounded"
            value={searchResult}
            onChange={(e)=>setSearchResult(e.target.value)}
          />
          <button className="btn">Search</button>
        </form>
      </div>
    </section>
  );
};
