import { use, useState } from "react";
import { MembershipModal } from "../../Components/Modal/MembershipModal";
import {
  BiSolidBadgeCheck,
  BiSupport,
  BiSolidRocket,
  BiSolidLockAlt,
  BiSolidGroup,
} from "react-icons/bi";
import { MdOutlineAdsClick } from "react-icons/md";

import { useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

export const Membership = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultPlan, setDefaultPlan] = useState("monthly");
  const location = useLocation();
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userData, isPending } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user?email=${user?.email}`);
      return data;
    },
  });

  const handleOpenModal = (plan) => {
    setDefaultPlan(plan);
    setIsOpen(true);
  };

  if (isPending) return;
  const isPremium = userData?.badge === "gold";
  return (
    <section className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-pink-700 w-full text-white">
        <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h1 className="text-5xl font-bold mb-4">Ziffy Membership</h1>
            <p className="text-lg font-medium mb-6">
              Going ads-free is awesome, but Premium offers so much more! Access
              exclusive benefits and post 5+ times with one membership.
            </p>
            {isPremium ? (
              <p className=" font-medium">
                You are now{" "}
                <span className="bg-black px-3 pb-2 pt-1 rounded-full">
                  {userData?.plan} premium
                </span>{" "}
                Member of Ziffy{" "}
              </p>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={() => handleOpenModal("monthly")}
                  className="btn bg-white text-pink-700 hover:bg-gray-100 transition px-6 py-2 rounded-lg font-semibold"
                >
                  $4.99 / Month
                </button>
                <button
                  onClick={() => handleOpenModal("yearly")}
                  className="btn bg-white text-pink-700 hover:bg-gray-100 transition px-6 py-2 rounded-lg font-semibold"
                >
                  $44.99 / Year <span className="text-xs ml-1">(Save 25%)</span>
                </button>
              </div>
            )}
          </div>
          <img
            className="w-[300px] rounded-xl shadow-2xl"
            src="https://i.ibb.co/hxMxZ6xC/image.png"
            alt="premium"
          />
        </div>
      </div>

      {/* Premium Features */}
      <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 py-16">
        <h2 className="text-4xl text-center font-bold mb-12">
          Premium Features
        </h2>

        {/* First Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col justify-center items-center bg-white py-14 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <BiSolidRocket size={40} className="text-pink-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Post Limit Upgrade</h3>
            <p className="text-gray-500 text-sm text-center">
              Post as many times as you want — no daily or monthly limits.
            </p>
          </div>
          
          <div className="flex flex-col justify-center items-center bg-white py-14 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <MdOutlineAdsClick size={40} className="text-pink-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Ads Free Experience</h3>
            <p className="text-gray-500 text-sm text-center">
              Enjoy uninterrupted usage with a completely ad-free interface.
            </p>
          </div>
        </div>

        {/* Second Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col justify-center items-center bg-white py-14 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <BiSupport size={40} className="text-pink-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Priority Support</h3>
            <p className="text-gray-500 text-sm text-center">
              Get faster responses and dedicated support from our team.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white py-14 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <BiSolidBadgeCheck size={40} className="text-pink-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Golden Badge</h3>
            <p className="text-gray-500 text-sm text-center">
              Stand out with an exclusive golden badge beside your profile.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white py-14 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <BiSolidGroup size={40} className="text-pink-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">
              Exclusive Community Access
            </h3>
            <p className="text-gray-500 text-sm text-center">
              Join a premium-only community for deeper connections.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <MembershipModal
        state={location.state}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultPlan={defaultPlan}
      />
    </section>
  );
};
