import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, loading } = useAuth();
  // const { photoUrl } = user;
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["singleUser"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <p>loading...</p>;
  }
  const { name, email, role, img } = userData;
  return (
    <>
      <div className=" max-w-3xl mx-auto flex justify-center mt-5 border w-full">
        <div className=" px-4 py-1 w-full border gap-5 items-center flex rounded   text-gray-500">
          <img
            className="w-32 h-32 rounded-full"
            src={img}
            alt=""
          />
          <div className="text-xl mt-5 space-y-2 capitalize">
            <p className="font-medium  text-gray-900  transition duration-500 ease-in-out">
              {name}
            </p>
            <p>
              <span className="font-medium  text-gray-900">Email:</span> {email}
            </p>
            <p>
              <span className="font-medium  text-gray-900">Role:</span>{" "}
              {role || "Student"}
            </p>
            <p>
              <span className="font-medium  text-gray-900">phone:</span>{" "}
              +00999888777
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
