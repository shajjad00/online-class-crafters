import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const MyAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data, isLoading } = useAdmin();
  const isAdmin = data?.role?.toLowerCase() === "admin";

  if (loading || isLoading) {
    return <p>loading...</p>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default MyAdminRoute;
