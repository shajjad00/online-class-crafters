import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import Modal from "./Modal/Modal";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ProgressDetails = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: enrollCount } = useQuery({
    queryKey: ["enrollCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollCount/${id}`);
      return res.data;
    },
  });
  const { data: assignmentCount } = useQuery({
    queryKey: ["assignmentCount"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignmentCount/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>Class Crafters | Progress Details</title>
      </Helmet>
      <div className=" mt-3 rounded-lg p-4 text-gray-100 max-w-xs flex justify-center items-center bg-gradient-to-r from-[#00F5D4] to-blue-500">
        <div className=" text-4xl font-semibold text-center">
          <p>Total Enrolled</p>
          <p>{enrollCount?.count}</p>
        </div>
      </div>
      <div className=" mt-3 rounded-lg p-4 text-gray-100 max-w-xs flex justify-center items-center bg-gradient-to-r from-[#6ce174] to-[#17bf22]">
        <div className="font-semibold text-4xl text-center">
          <p>Total Assignment</p>
          <p>{assignmentCount?.assignment}</p>
        </div>
      </div>

      <div>
        <div>
          <Modal id={id}></Modal>
        </div>
      </div>
    </div>
  );
};

export default ProgressDetails;

// linear-gradient(90deg, #D3A256 0%, #FDE8C0 100%)
