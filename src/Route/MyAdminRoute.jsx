import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loadingAnimation.json";

const MyAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data, isLoading } = useAdmin();
  const isAdmin = data?.role?.toLowerCase() === "admin";

  if (loading || isLoading) {
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
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default MyAdminRoute;
