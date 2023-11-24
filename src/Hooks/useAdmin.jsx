import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["is user admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user?.email}`);
      return res.data;
    },
  });
  const userRole = data.role;
  console.log(userRole);
  return { userRole, isLoading };
};

export default useAdmin;
