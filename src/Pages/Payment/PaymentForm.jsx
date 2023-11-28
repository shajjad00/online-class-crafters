import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: 100 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirmError", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        toast.success("transaction succeeded");
        setIsSuccess(paymentIntent.status);
      }
    }
  };

  return (
    <>
      <form
        className=" max-w-screen-xl mx-auto p-4"
        onSubmit={handlePayment}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <button
          disabled={!stripe || !clientSecret || isSuccess === "succeeded"}
          type="submit"
          className="btn btn-outline mt-4"
        >
          Pay
        </button>
        <div>
          <p className=" text-red-600 text-center">{error}</p>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;

// 4242424242424242
