import { useQuery } from "@tanstack/react-query";

import { MdCampaign } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

export const AnnouncementStrip = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [] , refetch , } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/announcments");
      return data;
    },
  });

  const handleDelete = async(id)=>{
    console.log(id)
    const {data} = await axiosSecure.delete(`/delete-announcement/${id}`)
    if(data.deletedCount){
        refetch()
    }
  }

  if (announcements.length === 0) return null;
  console.log(announcements);

  return (
    <div className=" sticky top-17">
      <div className="flex flex-col justify-end items-end">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="w-fit pr-14  relative bg-gradient-to-r from-pink-500 to-amber-400 text-white px-4 py-3 overflow-hidden shadow-md mt-3 rounded-2xl"
          >
            📢 <span className="font-medium">{a.title}</span>: {a.description}
            <div
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => handleDelete (a?._id)}
            >
              <IoClose size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
