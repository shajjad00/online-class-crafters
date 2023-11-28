import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const { data: classes } = useQuery({
    queryKey: ["all classes"],
    queryFn: async () => {
      const res = await axiosPublic("/allApprovedClass");
      return res.data;
    },
  });
  return (
    <div className=" max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {classes?.map((classItem) => {
        const { _id, title, name, photo, price, description } = classItem;
        return (
          <div
            className=" flex justify-center items-center"
            key={classItem}
          >
            <div className=" space-y-2 bg-gray-100  shadow-lg rounded-md pb-3">
              <img
                className=" h-[300px] w-[400px] border-4 border-[#8C6A88]"
                src={photo}
                alt=""
              />
              <h2 className=" text-xl font-bold mt-2">{title}</h2>
              <p className=" text-sm text-gray-500 font-semibold">
                <span className=" border-b-2 border-gray-600 ">Author</span> :{" "}
                {name}
              </p>
              <p>{description}</p>
              <p className=" font-bold">${price}</p>

              <Link to={`/classDetails/${_id}`}>
                <button className=" font-semibold text-[#8C6A88] border-[#8C6A88] border-b-4 rounded-md bg-[#E8E8E8] px-10 py-2">
                  Enroll
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllClasses;
