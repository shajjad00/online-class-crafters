import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyEnrollClass = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["userEnrolledClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}`);
      return res.data;
    },
  });

  console.log(user, loading);
  console.log(data);
  return <div>MyEnrollClass</div>;
};

export default MyEnrollClass;
