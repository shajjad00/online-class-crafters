import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import "./style/style.css";
import { useNavigate } from "react-router-dom";
import useEnrollClass from "../../Hooks/useEnrollClass";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/loadingAnimation.json";

const PaymentForm = ({ enrolledClass, isLoading, id }) => {
  const { refetch } = useEnrollClass();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const enrolledClassData = {
    name: enrolledClass?.name,
    title: enrolledClass?.title,
    photo: enrolledClass?.photo,
    description: enrolledClass?.description,
    email: user?.email,
    author: enrolledClass?.name,
    enrolledClassId: enrolledClass?._id,
  };
  const itemPrice = parseInt(enrolledClass?.price);
  console.log(itemPrice);
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { id: id }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [id, axiosSecure]);

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
        console.log(paymentIntent.status);
        toast.success("transaction succeeded");
        //send enrolled class data to db

        axiosSecure.post("/enrolledClass", enrolledClassData).then((res) => {
          console.log(res.data);
        });
        //update enroll count
        axiosSecure
          .patch(`/updateEnrollCount/${enrolledClass?._id}`)
          .then((res) => {
            console.log(res.data);
            setIsSuccess(paymentIntent.status);
            refetch();
            navigate("/dashboard/myEnrollClass");
          });
      }
    }
  };

  if (isLoading) {
    return (
      <div className=" max-w-screen-lg mx-auto">
        {" "}
        <Lottie
          className=" w-[400px] mx-auto"
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );
  }

  return (
    <>
      <form
        className=" max-w-sm mx-auto p-4 bg-gray-100 rounded-md"
        onSubmit={handlePayment}
      >
        <p className=" text-center capitalize font-semibold text-xl mb-4  ">
          enter card details
        </p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                fontWeight: "bold",
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
          className="btn bg-green-500 w-full text-white text-xl font-bold mt-4"
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
