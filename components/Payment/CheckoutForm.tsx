import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    // create the paymentintent
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: 58,
      }),
    });
    const secretKey = await res.json();
    // console.log("secretKey", secretKey);
    const error = await stripe?.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button
          className="w-full bg-yellow-500 p-2 rounded-lg mt-2"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </form>
    </div>
  );
}
