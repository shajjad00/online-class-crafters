import { FaBook, FaBookReader, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { AiOutlineProfile } from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import Sidebar from "./Sidebar/Sidebar";

const DashBoard = () => {
  const { data } = useAdmin();

  const isTeacher = data?.role?.toLowerCase() === "teacher";
  const isAdmin = data?.role?.toLowerCase() === "admin";

  return (
    <>
      {" "}
      <div className=" flex md:hidden">
        <Sidebar
          isTeacher={isTeacher}
          isAdmin={isAdmin}
        ></Sidebar>
      </div>
      <div className=" grid grid-cols-12 gap-6">
        <div className=" hidden md:flex md:col-span-3 bg-[#508981] min-h-screen">
          <ul className="menu font-semibold">
            {isAdmin ? (
              <div>
                <li>
                  <NavLink
                    to="/dashboard/teacherRequest"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <VscGitPullRequestGoToChanges />
                    Teacher Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/classes"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <GrAddCircle />
                    All classes
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/myProfile"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <FaUser />
                    Profile
                  </NavLink>
                </li>
              </div>
            ) : isTeacher ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/addClass"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <GrAddCircle />
                    Add class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myClass"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <FaBookReader />
                    My class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myProfile"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <AiOutlineProfile></AiOutlineProfile>
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard/myEnrollClass"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <FaBook></FaBook>
                    My enrolled class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myProfile"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        backgroundColor: isActive ? "transparent" : "",
                      };
                    }}
                  >
                    <FaUser></FaUser>Profile
                  </NavLink>
                </li>
              </>
            )}
            {/* shared nav link */}
            <div className="divider text-white px-5"></div>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "white" : "black",
                    backgroundColor: isActive ? "transparent" : "",
                  };
                }}
              >
                <FaHome />
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className=" w-full col-span-full md:col-span-9">
          <Outlet></Outlet>
          <div>
            <Toaster />
          </div>
        </div>
        <div>
          <Toaster />
        </div>
        <div className=" flex md:hidden"></div>
      </div>
    </>
  );
};

export default DashBoard;
