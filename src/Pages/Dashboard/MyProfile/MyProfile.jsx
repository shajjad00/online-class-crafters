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
      <div className=" flex justify-center">
        <div className="p-5 border rounded bg-gray-200 text-center text-gray-500 max-w-sm">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src={img}
            alt=""
          />
          <div className="text-sm mt-5 capitalize">
            <p className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
              {name}
            </p>
            <p>{email}</p>
            <p>Role: {role || "Student"}</p>
            <p>phone: +00999888777</p>
          </div>
          <p className="mt-2 text-sm text-gray-900">
            A user is someone who employs or uses a particular thing, like a
            user of nicotine or a user of an internet site.
          </p>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
