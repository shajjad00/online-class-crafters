import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import { Navigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loadingAnimation.json";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data, isLoading } = useAdmin();
  const isAdmin = data?.role?.toLowerCase() === "teacher";

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

export default TeacherRoute;
