import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Title from "../../../Components/Title/Title";
import useEnrollClass from "../../../Hooks/useEnrollClass";

const MyEnrollClass = () => {
  const { myClass } = useEnrollClass();
  return (
    <>
      <Helmet>
        <title>Class Crafters | Enrolled Classes</title>
      </Helmet>
      <Title text={"My Enrolled Classes"}></Title>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {myClass?.map((item) => {
          const { _id, photo, author, title, enrolledClassId } = item;
          return (
            <div
              className=" w-[400px] mx-auto md:max-w-xs border-2 rounded-md"
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
              <Link to={`/dashboard/myEnrollClass/${enrolledClassId}`}>
                <button className=" px-3 py-2  w-full text-green-500 border-t-2 font-medium">
                  Continue
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyEnrollClass;
