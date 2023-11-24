import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import { Navigate } from "react-router-dom";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data, isLoading } = useAdmin();
  const isAdmin = data?.role?.toLowerCase() === "teacher";

  if (loading || isLoading) {
    return <p>loading...</p>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default TeacherRoute;
