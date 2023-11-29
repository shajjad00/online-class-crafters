import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";

const ClassDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["singleApprovedClass"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allApprovedClass/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <>
      <div className=" max-w-md mx-auto rounded-md">
        <div className=" space-y-2 w-full bg-gray-100  shadow-lg rounded-md pb-3">
          <img
            className=" h-[300px] w-full rounded-md "
            src={data?.photo}
            alt=""
          />
          <p className=" text-3xl text-gray-900 font-bold">${data?.price}</p>
          <Link to={`/class/payment/${data?._id}`}>
            {" "}
            <button className=" px-10 mt-2 py-3 w-full text-white text-xl font-semibold rounded-md bg-green-500">
              Pay Now
            </button>
          </Link>
          <h2 className=" text-xl font-bold mt-2">{data?.title}</h2>
          <p className=" text-sm text-gray-500 font-semibold">
            <span className=" border-b-2 border-gray-600 ">Teacher</span> :{" "}
            {data?.name}
          </p>
          <p>{data?.description}</p>
        </div>
      </div>
    </>
  );
};

export default ClassDetails;
