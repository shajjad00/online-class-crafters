import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClass from "../Pages/Dashboard/MyClass/MyClass";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import TeacherRequest from "../Pages/Dashboard/TeacherRequest/TeacherRequest";
import Users from "../Pages/Dashboard/Users/Users";
import Classes from "../Pages/Classes/Classes";
import AllClasses from "../Pages/AllClasses/AllClasses";
import MyEnrollClass from "../Pages/Dashboard/MyEnrollClass/MyEnrollClass";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
    ],
  },
  //dashboard route
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      //teacher route
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myClass",
        element: <MyClass></MyClass>,
      },
      //shared
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      //admin route
      {
        path: "teacherRequest",
        element: <TeacherRequest></TeacherRequest>,
      },
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
      //student
      {
        path: "myEnrollClass",
        element: <MyEnrollClass></MyEnrollClass>,
      },
    ],
  },
]);

export default Route;
