import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(
  "pk_test_51OEEZQFkdQ49k70pAjzTTNETVgeOZFB5KM4vGbNWsrwNXVq7QSSLMEPDzKK4JLFBQ0EJpgsMJoidIHPbhFSsH0VR003BWjFlg1"
);

const Payment = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: enrolledClass } = useQuery({
    queryKey: ["enrolledClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allApprovedClass/${id}`);
      return res.data;
    },
  });
  console.log(enrolledClass);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm enrolledClass={enrolledClass}></PaymentForm>
    </Elements>
  );
};

export default Payment;
