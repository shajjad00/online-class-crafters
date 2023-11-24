import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userRole, isLoading } = useAdmin();
  const isAdmin = userRole?.toLowerCase() === "admin";

  if (loading || isLoading) {
    return <p>loading...</p>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default AdminRoute;
