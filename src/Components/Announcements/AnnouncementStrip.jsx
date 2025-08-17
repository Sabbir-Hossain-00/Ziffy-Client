import { useQuery } from "@tanstack/react-query";

import { MdCampaign } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { use, useState } from "react";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";

export const AnnouncementStrip = () => {
  const axiosSecure = useAxiosSecure();
  const {isDark} = use(AuthContext)

  const { data: announcements = [] , refetch , } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/announcments");
      return data;
    },
  });

  const handleDelete = async(id)=>{
    // console.log(id)
    const {data} = await axiosSecure.delete(`/delete-announcement/${id}`)
    if(data.deletedCount){
        refetch()
    }
  }

  if (announcements.length === 0) return null;
  // console.log(announcements);

  return (
    <div className="mt-4">
      <div className="flex flex-col justify-end items-end">
        {announcements.map((a) => (
          <div
            key={a._id}
            className={`w-full py-14   relative bg-gradient-to-r   px-8 overflow-hidden  mt-3 rounded-2xl border  space-y-3 ${isDark ? "from-blue-950 to-gray-900 border-blue-950" : "from-pink-100 to-gray-100 border-rose-100"}`}
          >
            <h2 className="md:text-4xl text-2xl font-medium ">{a?.title}</h2>
            <p className="font-medium">{a?.description}</p>
            {/* <div
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => handleDelete (a?._id)}
            >
              <IoClose size={20} />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
