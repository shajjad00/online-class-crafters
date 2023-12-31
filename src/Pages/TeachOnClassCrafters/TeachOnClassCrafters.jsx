import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";

const TeachOnClassCrafters = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const courseData = { ...data, email: user?.email, status: "pending" };
    axiosSecure.post("/user/teacher/Request", courseData).then((data) => {
      if (data.data.insertedId) {
        toast.success("Request Successful");
        reset();
      }
    });
  };
  return (
    <div className=" max-w-screen-xl mx-auto p-4">
      <Helmet>
        <title>Class Crafters | Teach On Class Crafters</title>
      </Helmet>
      <Title text={"Teachers Request Form"}></Title>
      <p className=" text-lg text-center italic text-gray-400 ">
        Fill up this form to teaches on class crafters
      </p>
      <div className="divider divider-primary  max-w-xs mx-auto"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" flex justify-center items-center flex-col">
            <input
              className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              placeholder="Name"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className=" text-red-600 text-sm italic">
                name is required
              </span>
            )}
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
              type="url"
              defaultValue={user?.photoURL}
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
          <div className=" flex justify-center items-center flex-col">
            <select
              {...register("experience", { required: true })}
              name="experience"
              defaultValue="Select experience"
              className="w-full mb-5 px-8 py-4 rounded-lg font-semibold bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            >
              <option
                disabled
                value="Select experience"
              >
                Select experience
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && (
              <span className=" text-red-600 text-sm">
                experience is required
              </span>
            )}
          </div>
          {/* select option */}
          <div className=" flex justify-center items-center flex-col">
            <select
              className="w-full mb-5 px-8 py-4 rounded-lg font-semibold bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              defaultValue="Select a Category"
              {...register("category", { required: true })}
            >
              <option
                disabled
                value="Select a Category"
              >
                Select a Category
              </option>
              <option value="web development">web development</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Photography">Photography</option>
              <option value="Data Science">Data Science</option>
              <option value="digital marketing">Digital marketing</option>
            </select>
            {errors.category && (
              <span className=" text-red-600 text-sm italic">
                Category is required
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 max-w-md mx-auto font-semibold bg-[#346B8D] text-gray-100 w-full py-4 rounded-lg hover:bg-[#044268] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <span className="ml-3 capitalize">Submit for review</span>
        </button>
      </form>
    </div>
  );
};

export default TeachOnClassCrafters;
