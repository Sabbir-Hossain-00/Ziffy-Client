import { useState } from "react";
import { MembershipModal } from "../../Components/Modal/MembershipModal";
import { BiSolidBadgeCheck } from "react-icons/bi";

export const Membership = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultPlan, setDefaultPlan] = useState("monthly");

  const handleOpenModal = (plan) => {
    setDefaultPlan(plan);
    setIsOpen(true);
  };

  return (
    <section className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-pink-700 w-full text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h1 className="text-5xl font-bold mb-4">Ziffy Membership</h1>
            <p className="text-lg font-medium mb-6">
              Going ads-free is awesome, but Premium offers so much more! Access
              exclusive benefits and post 5+ times with one membership.
            </p>
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
          </div>
          <img
            className="w-[300px] rounded-xl shadow-2xl"
            src="https://i.ibb.co/hxMxZ6xC/image.png"
            alt="premium"
          />
        </div>
      </div>

      {/* Premium Features */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl text-center font-bold mb-12">
          Premium Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Golden Badge",
            "Ads Free Experience",
            "Priority Support",
            "Post Limit Upgrade",
            "Early Access to Features",
            "Exclusive Community Access",
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow transition hover:shadow-lg"
            >
              <BiSolidBadgeCheck size={32} className="text-pink-600 mb-2" />
              <h3 className="font-semibold text-lg mb-1">{feature}</h3>
              <p className="text-gray-500 text-sm text-center">
                Enjoy the {feature.toLowerCase()} as a premium member.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <MembershipModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultPlan={defaultPlan}
      />
    </section>
  );
};
