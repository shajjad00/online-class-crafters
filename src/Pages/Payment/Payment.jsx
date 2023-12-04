import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";
import loadingAnimation from "../../../public/loadingAnimation.json";
import Lottie from "lottie-react";

const stripePromise = loadStripe(
  "pk_test_51OEEZQFkdQ49k70pAjzTTNETVgeOZFB5KM4vGbNWsrwNXVq7QSSLMEPDzKK4JLFBQ0EJpgsMJoidIHPbhFSsH0VR003BWjFlg1"
);

const Payment = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: enrolledClass, isLoading } = useQuery({
    queryKey: ["enrolledClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allApprovedClass/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    <div className=" max-w-screen-lg mx-auto">
      {" "}
      <Lottie
        className=" w-[400px] mx-auto"
        animationData={loadingAnimation}
        loop={true}
      />
    </div>;
  }
  return (
    <Elements stripe={stripePromise}>
      <Helmet>
        <title>Class Crafters | Payment</title>
      </Helmet>
      <div className=" min-h-[50vh]">
        <Title text={"Pay Here to Enroll Class"}></Title>
        <PaymentForm
          enrolledClass={enrolledClass}
          isLoading={isLoading}
          id={id}
        ></PaymentForm>
      </div>
    </Elements>
  );
};

export default Payment;
