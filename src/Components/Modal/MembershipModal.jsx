import { Dialog, DialogPanel } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { CheckoutForm } from "../../Pages/Membership/CheckoutForm";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);

export const MembershipModal = ({ isOpen, setIsOpen, defaultPlan ,state , refetch}) => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(defaultPlan); // set when modal is opened
    }
  }, [isOpen, defaultPlan]);

  const close = () => setIsOpen(false);

  const getPrice = selectedPlan === "yearly" ? 44.99 : 4.99;

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <DialogPanel className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              onClick={() => setSelectedPlan("monthly")}
              className={`p-4 rounded-lg cursor-pointer text-center transition border-2 ${
                selectedPlan === "monthly"
                  ? "border-pink-500 bg-pink-100"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-lg font-semibold">$4.99</h3>
              <p className="text-sm">Monthly</p>
            </div>
            <div
              onClick={() => setSelectedPlan("yearly")}
              className={`p-4 rounded-lg cursor-pointer text-center transition border-2 ${
                selectedPlan === "yearly"
                  ? "border-pink-500 bg-pink-100"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-lg font-semibold">$44.99</h3>
              <p className="text-sm">
                Yearly{" "}
                <span className="text-xs bg-pink-600 text-white px-2 rounded-full">
                  Save 25%
                </span>
              </p>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm price={getPrice} plan={selectedPlan} state={state} setIsOpen={setIsOpen} refetch={refetch} />
          </Elements>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
