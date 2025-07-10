
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { use, useState } from "react";
import { Loader } from "../Loader/Loader";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../../Context/AuthContext";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const {user} = use(AuthContext)
  // const [loading , setLoading] = useState(false);

  const handleSubmit = async(event)=>{
    event.preventDefault();

    if(!stripe || !elements){
        return;
    }
  
    const card = elements.getElement(CardElement);
    if(!card){
      console.error("cardElement not found")
        return;
    }
    // setLoading(true)

    const {error , paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card,
    })

    if(error){
        console.log(error)
    }else{
        
        const {data} = await axiosSecure.post("/create-payment-intent",{
        amount : 100 ,
        })
        const clientSecret = data?.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret , {
        payment_method:{
          card,
          billing_details: {
            name : "sabbir"
          }
        }
       });

       if(result?.error){
        console.log(result?.error)
        return 
       }
       if(result?.paymentIntent?.status === "succeeded"){
        console.log("Payment successfull")
        const transactionId = result?.paymentIntent?.id ;
        const paymentData = {
          transactionId,
          authorName : user?.displayName,
          authorEmail : user?.email,
          authorImage: user?.photoURL,
        }
        const {data} = await axiosSecure.post("/payments",paymentData)
        if(data?.insertedId){
          const {data} = await axiosSecure.patch(`/set-badge?email=${user?.email}`)
          if(data.modifiedCount){
            console.log("now you are verified")
          }
        }
       }
    }

  }

  // if(loading){
  //   return <Loader/>
  // }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Payment Information
      </h2>

      <div className="mb-6 px-3 py-4 bg-gray-50 border rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1f2937", // Gray-800
                fontFamily: "Inter, sans-serif",
                "::placeholder": {
                  color: "#9ca3af", // Gray-400
                },
              },
              invalid: {
                color: "#dc2626", // Red-600
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className={`w-full py-3 rounded-lg text-white text-lg font-medium transition duration-300 ${
          !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        Pay Now
      </button>
    </form>
  );
};
