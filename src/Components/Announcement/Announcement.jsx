import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export const Announcement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], refetch } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/announcments");
      return data;
    },
  });

  return (
    <section className="py-20 mt-10 container mx-auto px-3 md:px-8 xl:px-16">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper rounded-3xl"
      >
        {announcements?.map((announcement) => {
          return (
            <SwiperSlide className="rounded-3xl overflow-hidden">
              <div className="flex flex-col items-center justify-center gap-2 bg-rose-50 py-20">
                 <h1 className="text-3xl font-semibold">{announcement?.title}</h1>
                 <p className="font-medium">{announcement?.description}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
