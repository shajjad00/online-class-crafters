import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../../Hooks/useButton";

const AllClasses = () => {
  const { data: classes } = useQuery({
    queryKey: ["all classes"],
    queryFn: async () => {
      const res = await axios("data.json");
      return res.data;
    },
  });
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {classes?.map((classItem) => {
        const {
          Course_Title,
          Instructor_Name,
          Course_Image,
          Course_Price,
          Brief_Description,
        } = classItem;
        return (
          <div
            className=" flex justify-center items-center"
            key={classItem}
          >
            <div className=" space-y-2 bg-gray-100  shadow-lg rounded-md pb-3">
              <img
                className=" h-[300px] w-[400px] border-4 border-[#8C6A88]"
                src={Course_Image}
                alt=""
              />
              <h2 className=" text-xl font-bold mt-2">{Course_Title}</h2>
              <p className=" text-sm text-gray-500 font-semibold">
                <span className=" border-b-2 border-gray-600 ">Author</span> :{" "}
                {Instructor_Name}
              </p>
              <p>{Brief_Description}</p>
              <p className=" font-bold">${Course_Price}</p>
              <Button text={"Enroll"}></Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllClasses;
