import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Chart from "./Chart";

const Description = () => {
  const axiosSecure = useAxiosSecure();

  const { data: usersCount } = useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersCount`);
      return res.data;
    },
  });
  const { data: classesCount } = useQuery({
    queryKey: ["classesCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classesCount`);
      return res.data;
    },
  });
  const { data: allEnrolledClass } = useQuery({
    queryKey: ["allEnrolledClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass`);
      return res.data;
    },
  });

  const totalEnroll = allEnrolledClass?.reduce(
    (total, item) => total + item.count,
    0
  );

  return (
    <>
      {" "}
      <h2 className=" text-4xl text-center font-bold mt-6 border-b-2 border-gray-700 px-2 pb-4 w-fit mx-auto shadow-md">
        About Our Statistics
      </h2>
      <div className="bg-gradient-to-r my-10 from-[#ddd] via-[#888] to-[#346B8D] flex justify-center items-center">
        <div>
          {" "}
          <Chart
            totalEnroll={totalEnroll}
            usersCount={usersCount}
            classesCount={classesCount}
          ></Chart>
        </div>
        <img
          className=" w-full h-full"
          src="https://i.ibb.co/ZXpsd0z/stat.png"
          alt=""
        />
      </div>
    </>
  );
};

export default Description;
