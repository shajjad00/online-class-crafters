import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/loadingAnimation.json";

const UpdateTeacherClass = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: teacherClass, isLoading } = useQuery({
    queryKey: ["updateTeacherClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/update/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      price: teacherClass?.price,
      photo: teacherClass?.photo,
      description: teacherClass?.description,
      title: teacherClass?.title,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    axiosSecure.put(`/classes/update/${id}`, data).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("update successful");
        navigate("/dashboard/myClass");
      }
    });
  };
  if (isLoading) {
    return (
      <div className=" max-w-screen-lg mx-auto">
        {" "}
        <Lottie
          className=" w-[400px] mx-auto"
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <div className=" flex justify-center items-center flex-col">
            <input
              className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              placeholder="Name"
              name="name"
              disabled
              {...register("name")}
            />
          </div>
          <div className=" flex justify-center items-center flex-col">
            <input
              className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              placeholder="email"
              disabled
              {...register("email")}
            />
          </div>
          <div className=" flex justify-center items-center flex-col">
            <input
              className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className=" text-red-600 text-sm italic">
                title is required
              </span>
            )}
          </div>
          <div className=" flex justify-center items-center flex-col">
            <input
              className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className=" text-red-600 text-sm italic">
                price is required
              </span>
            )}
          </div>
          <div className=" flex justify-center items-center flex-col">
            <input
              type="url"
              className="w-full mb-5 px-8 py-4 rounded-lg font-semibold bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              placeholder="Photo Url"
              {...register("photo", { required: true })}
            />{" "}
            {errors.photo && (
              <span className=" text-red-600 text-sm italic">
                photo is required
              </span>
            )}
          </div>
        </div>
        <div className=" flex justify-center items-center flex-col">
          <textarea
            className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Write Description..."
            {...register("description")}
          />
          {errors.description && (
            <span className=" text-red-600 text-sm italic">
              description is required
            </span>
          )}
        </div>
        <button
          type="submit"
          className="mt-5 max-w-md mx-auto font-semibold bg-[#346B8D] text-gray-100 w-full py-4 rounded-lg hover:bg-[#044268] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <span className="ml-3 capitalize">Update Class</span>
        </button>
      </form>
    </>
  );
};

export default UpdateTeacherClass;
