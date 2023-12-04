import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loadingAnimation.json";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
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
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
