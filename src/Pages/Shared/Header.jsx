import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { BiMenu } from "react-icons/bi";

const Header = () => {
  const { user, userSignOut } = useAuth();
  const navigate = useNavigate();
  const elements = (
    <>
      <li className=" border border-[#346B8D] italic text-[#346B8D] px-5 py-2 rounded">
        <Link to="/">Home</Link>
      </li>
      <li className=" border border-[#346B8D] italic text-[#346B8D] px-5 py-2 rounded">
        <Link to="/allClasses">All Classes</Link>
      </li>
      <li className=" border border-[#346B8D] italic text-[#346B8D] px-5 py-2 rounded">
        <Link to="/teachOnClassCrafters">Teach on Class Crafters</Link>
      </li>
    </>
  );

  //sign out

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        navigate("/login");
        toast.success("Sign Out Successful");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {" "}
      <div className="navbar  dark:bg-slate-700 shadow-lg mb-5">
        <div className="navbar-start">
          <div className="dropdown ">
            <label
              tabIndex={0}
              className="text-2xl text-[#346B8D] lg:hidden"
            >
              <BiMenu className="mx-3 cursor-pointer"></BiMenu>
            </label>
            <ul
              tabIndex={0}
              className=" dark:hover:text-white menu-sm dropdown-content mt-3 z-10 p-2 shadow rounded-box w-52 bg-white space-y-1 text-white"
            >
              {elements}
            </ul>
          </div>
          <Link
            to="/"
            className="hidden md:block text-xl font-semibold border  rounded-sm"
          >
            <img
              className="h-14 w-60"
              src="https://i.ibb.co/KNGzV2N/Food-AND-Beverage-1.png"
              alt="CLass crafter Logo"
            />
          </Link>
        </div>
        <div className="navbar-center ml-8 hidden lg:flex">
          <ul className="px-1 flex gap-5 text-white dark:hover:text-white text-lg">
            {elements}
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    {user?.displayName}
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/dashboard/myProfile"
                    className="hover:border-2  mt-3 hover:border-[#346B8D] bg-[#346B8D] text-white  rounded-md pl-16 py-2 hover:bg-white hover:text-[#346B8D] font-semibold"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleSignOut}
                    className="hover:border-2 mt-3 hover:border-[#346B8D] bg-[#346B8D] text-white  rounded-md pl-16 py-2 hover:bg-white hover:text-[#346B8D] font-semibold"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="hover:border-2 mr-2 dark:bg-slate-800 hover:border-[#346B8D] bg-[#346B8D] text-white  rounded-md px-12  py-2 hover:bg-white hover:text-[#346B8D] font-semibold border dark:hover:text-white dark:hover:border-white border-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
