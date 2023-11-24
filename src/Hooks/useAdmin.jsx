import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user?.email}`);
      return res.data;
    },
  });

  return { data, isLoading };
};

export default useAdmin;
