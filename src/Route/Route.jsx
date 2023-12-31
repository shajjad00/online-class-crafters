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
import TeachOnClassCrafters from "../Pages/TeachOnClassCrafters/TeachOnClassCrafters";
import PrivateRoute from "../Route/PrivateRoute";
import TeacherRoute from "./TeacherRoute";
import TeacherClassDetails from "../Pages/TeacherClassDetails/TeacherClassDetails";
import UpdateTeacherClass from "../Pages/UpdateTeacherClass/UpdateTeacherClass";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import ProgressDetails from "../Pages/ProgressDetails/ProgressDetails";
import Payment from "../Pages/Payment/Payment";
import MyEnrolledClassDetail from "../Pages/MyEnrolledClassDetail/MyEnrolledClassDetail";
import MyAdminRoute from "./MyAdminRoute";
import StudentFeedback from "../Pages/StudentFeedback/StudentFeedback";

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
      {
        path: "class/Payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/teachOnClassCrafters",
        element: (
          <PrivateRoute>
            <TeachOnClassCrafters></TeachOnClassCrafters>,
          </PrivateRoute>
        ),
      },
      {
        path: "/classDetails/:id",
        element: (
          <PrivateRoute>
            <ClassDetails></ClassDetails>
          </PrivateRoute>
        ),
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
        element: (
          <TeacherRoute>
            <AddClass></AddClass>
          </TeacherRoute>
        ),
      },
      {
        path: "myClass",
        element: (
          <TeacherRoute>
            <MyClass></MyClass>
          </TeacherRoute>
        ),
      },
      {
        path: "myClass/:id",
        element: (
          <TeacherRoute>
            <TeacherClassDetails></TeacherClassDetails>
          </TeacherRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <TeacherRoute>
            <UpdateTeacherClass></UpdateTeacherClass>
          </TeacherRoute>
        ),
      },
      //shared
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      //admin route
      {
        path: "teacherRequest",
        element: (
          <MyAdminRoute>
            <TeacherRequest></TeacherRequest>
          </MyAdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <MyAdminRoute>
            <Users></Users>
          </MyAdminRoute>
        ),
      },
      {
        path: "classes",
        element: (
          <MyAdminRoute>
            <Classes></Classes>
          </MyAdminRoute>
        ),
      },
      {
        path: "classes/feedback/:id",
        element: (
          <MyAdminRoute>
            <StudentFeedback></StudentFeedback>
          </MyAdminRoute>
        ),
      },
      {
        path: "classes/:id",
        element: (
          <TeacherRoute>
            <ProgressDetails></ProgressDetails>
          </TeacherRoute>
        ),
      },
      //student
      {
        path: "myEnrollClass",
        element: (
          <PrivateRoute>
            <MyEnrollClass></MyEnrollClass>
          </PrivateRoute>
        ),
      },
      {
        path: "myEnrollClass/:id",
        element: (
          <PrivateRoute>
            <MyEnrolledClassDetail></MyEnrolledClassDetail>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Route;
