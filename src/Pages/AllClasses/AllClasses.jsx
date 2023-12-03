import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";

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
    <>
      <Title text={"All Classes"}></Title>
      <div className=" max-w-screen-xl p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Helmet>
          <title>Class Crafters | All Classes</title>
        </Helmet>

        {classes?.map((classItem) => {
          const { _id, title, name, photo, price, description } = classItem;
          return (
            <div
              className=""
              key={_id}
            >
              <div className="min-h-[650px] bg-gray-100  shadow-lg rounded-md pb-3 flex justify-between flex-col">
                <div>
                  <img
                    className=" h-[300px] w-full  border-4 border-[#70A9A1]"
                    src={photo}
                    alt=""
                  />
                  <div className=" pl-2 space-y-2">
                    <p className=" text-3xl mt-2 text-gray-900 font-bold">
                      Price : ${price}
                    </p>
                    <h2 className=" text-xl font-bold mt-2">{title}</h2>
                    <p className=" text-sm text-gray-500 font-semibold">
                      <span className=" border-b-2 border-gray-600 ">
                        Author
                      </span>{" "}
                      : {name}
                    </p>
                    <p>{description}</p>
                  </div>
                </div>
                <div className=" w-full">
                  <Link to={`/classDetails/${_id}`}>
                    <button className=" w-full  font-bold text-[#70A9A1]  border-[#70A9A1] border-2 rounded-md hover:bg-[#70A9A1] hover:text-white transition-all ease-in-out duration-500 px-10 py-2 mt-2">
                      Enroll
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllClasses;
