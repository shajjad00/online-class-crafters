import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEnrollClass = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myClass, refetch } = useQuery({
    queryKey: ["userEnrolledClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}`);
      return res.data;
    },
  });
  return { myClass, refetch };
};

export default useEnrollClass;
