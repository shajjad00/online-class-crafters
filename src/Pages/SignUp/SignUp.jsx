import { FaGoogle } from "react-icons/fa";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { FiUserPlus } from "react-icons/fi";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  // const axiosPublic = useAxiosPublic();

  const { createUser, userUpdateProfile } = useAuth();

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;
    console.log(name, email, password);
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user) {
          userUpdateProfile(name, photo)
            .then(() => {
              // const userInfo = {
              //   name: name,
              //   email: email,
              // };
              // axiosPublic.post("/users", userInfo).then((data) => {
              //   console.log(data.data.insertedId);
              //   if (data.data.insertedId) {
              //     navigate("/");
              //     toast.success("user created successfully");
              //     reset();
              //   }
              // });
            })
            .catch((error) => {
              console.log(error);
            });
          toast.success("user created successfully");
          navigate("/");
          reset();
        }
      })
      .catch((err) => console.log(err.code));
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div>
        <div className="bg-gray-100  flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center ">
            <div className="md:w-1/2 p-6 sm:p-12">
              <div className=" mb-5 flex justify-center">
                <img
                  src="https://i.ibb.co/KNGzV2N/Food-AND-Beverage-1.png"
                  className="w-mx-auto min-w-[320px]"
                />
              </div>
              <div className=" flex flex-col items-center">
                <div className="w-full flex-1">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Name"
                      name="name"
                      {...register("name", { required: true, maxLength: 20 })}
                    />
                    {errors.name && (
                      <span className=" text-red-600 font-bold">
                        name is required
                      </span>
                    )}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      name="email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className=" text-red-600 font-bold">
                        email is required
                      </span>
                    )}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      name="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /(?=.*[A-Za-z])(?=.*[@$!%*#?&])/,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p
                        className=" text-red-800"
                        role="alert"
                      >
                        Password is required
                      </p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p
                        className=" text-red-800"
                        role="alert"
                      >
                        Password Must be 6 character
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p
                        className=" text-red-800"
                        role="alert"
                      >
                        Password Must contain one special character ,one
                        Uppercase letter
                      </p>
                    )}
                    <input
                      type="url"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      placeholder="Photo Url"
                      {...register("photo")}
                    />
                    <button
                      type="submit"
                      className="mt-5  font-semibold bg-[#D1A054B2] text-gray-100 w-full py-4 rounded-lg hover:bg-[#D1A05492] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <FiUserPlus></FiUserPlus>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </form>
                  <div className="divider divider-neutral max-w-xs font-bold mx-auto">
                    Or
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100  flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                      <div className="bg-white text-[#346B8D] p-2 rounded-full">
                        <FaGoogle></FaGoogle>
                      </div>
                      <span className="ml-4">Sign In with Google</span>
                    </button>
                  </div>

                  <p className="mt-6  text-xs italic  text-center">
                    Already have an account?{" "}
                    <Link to="/login">
                      <span className="bg-gray-400 text-white underline text-base ">
                        Login here
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-green-100 text-center hidden md:flex"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
