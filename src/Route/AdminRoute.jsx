import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data, isLoading } = useAdmin();
  const isAdmin = data?.role?.toLowerCase() === "admin";

  console.log("admin", isAdmin);
  console.log("user", user);
  if (loading || isLoading) {
    return <p>loading...</p>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default AdminRoute;
