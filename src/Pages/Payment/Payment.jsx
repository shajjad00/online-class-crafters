import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51OEEZQFkdQ49k70pAjzTTNETVgeOZFB5KM4vGbNWsrwNXVq7QSSLMEPDzKK4JLFBQ0EJpgsMJoidIHPbhFSsH0VR003BWjFlg1"
);

const Payment = () => {
  //   const options = {
  //     clientSecret: "{{CLIENT_SECRET}}",
  //   };

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default Payment;
