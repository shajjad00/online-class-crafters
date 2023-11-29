import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyEnrollClass = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myClass } = useQuery({
    queryKey: ["userEnrolledClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}`);
      return res.data;
    },
  });

  console.log(user, loading);

  return (
    <div className=" grid grid-cols-1 gap-6 md:grid-cols-2">
      {myClass?.map((item) => {
        const { _id, photo, author, title } = item;
        return (
          <div
            className=" max-w-xs border-2 rounded-md"
            key={_id}
          >
            <img
              className=" w-full rounded-t-md h-[250px]"
              src={photo}
              alt=""
            />
            <h5 className=" pl-2 capitalize text-gray-400 text-sm font-medium mt-2">
              <span className=" text-gray-800 border-b-2 font-semibold">
                Author
              </span>{" "}
              : {author || ""}
            </h5>
            <h2 className=" pl-2 text-xl font-semibold mb-2">{title}</h2>
            <button className=" px-3 py-2  w-full text-green-500 border-t-2 font-medium">
              Continue
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MyEnrollClass;
