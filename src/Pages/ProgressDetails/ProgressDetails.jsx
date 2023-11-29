import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ProgressDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();

  const { data: count } = useQuery({
    queryKey: ["enrollCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollCount/${id}`);
      return res.data;
    },
  });

  return (
    <div>
      <div>
        <div className=" rounded-lg p-4 text-gray-100 max-w-xs flex justify-center items-center bg-gradient-to-r from-[#00F5D4] to-blue-500">
          <div className=" text-5xl text-center">
            <p>{count?.count}</p>
            <p>Enrolled</p>
          </div>
        </div>
      </div>
      <div>add assignment</div>
    </div>
  );
};

export default ProgressDetails;

// linear-gradient(90deg, #D3A256 0%, #FDE8C0 100%)
