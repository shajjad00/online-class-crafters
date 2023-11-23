import { Helmet } from "react-helmet-async";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
const Login = () => {
  const { userSignIn } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    userSignIn(email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user) {
          toast.success("Login Successful");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Helmet>
        <title>Class Crafters | Login</title>
      </Helmet>
      <div className="bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" min-w-[320px] mb-5 flex justify-center">
              <img
                src="https://i.ibb.co/KNGzV2N/Food-AND-Beverage-1.png"
                className="w-mx-auto min-w-[320px]"
              />
            </div>
            <div className=" flex flex-col items-center">
              <div className="w-full flex-1">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100  flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white text-[#346B8D] p-2 rounded-full">
                      <FaGoogle></FaGoogle>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </button>
                </div>

                <div className="divider divider-neutral max-w-xs font-bold mx-auto">
                  Or
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto max-w-xs"
                >
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-white border border-[#346B8D] text-[#346B8D] w-full py-4 rounded-lg hover:bg-[#346B8D] hover:text-white transition-all duration-400 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <FiUserPlus />
                    <span className="ml-1">Sign In</span>
                  </button>
                </form>
                <p className="mt-6 text-sm text-gray-600 text-center">
                  don&apos;t have an account?{" "}
                  <Link
                    to="/signUp"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Please Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
