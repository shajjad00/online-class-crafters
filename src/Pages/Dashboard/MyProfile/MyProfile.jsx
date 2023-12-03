import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Title from "../../../Components/Title/Title";

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
      <Helmet>
        <title>Class Crafters | User Profile</title>
      </Helmet>
      <Title text={"User Profile"}></Title>
      <div className=" w-[450px] md:w-[700px] lg:w-[800px] mx-auto flex justify-center mt-5 border bg-gray-100">
        <div className=" px-4 py-1 w-full gap-5 items-center flex rounded text-gray-500">
          <img
            className="w-32 h-32 rounded-full"
            src={img}
            alt=""
          />
          <div className="text-xl space-y-2 capitalize">
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
