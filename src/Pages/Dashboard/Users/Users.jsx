import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Title from "../../../Components/Title/Title";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/loadingAnimation.json";
const Users = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Successful",
              text: "User now Admin",
              icon: "success",
            });
          }
        });
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
    <div>
      <Helmet>
        <title>Class Crafters | All Users</title>
      </Helmet>
      <Title text={"All users"}></Title>
      <table className="table text-[#737373]">
        {/* head */}
        <thead>
          <tr className=" bg-[#346B8D] text-white">
            <th></th>
            <th>User</th>
            <th>Name</th>
            <th>EMAIL</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users?.map((item, idx) => {
            const { _id, email, name } = item;
            return (
              <tr
                key={_id}
                className=" border-b-2"
              >
                <th>{idx + 1}</th>
                <td className=" mx-auto">
                  <img
                    className=" w-12 h-12 rounded-full"
                    src={item?.img}
                    alt=""
                  />
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td className="">
                  {item?.role === "admin" ? (
                    <button
                      disabled
                      className="text-white btn text-sm btn-sm bg-[#346B8D]"
                    >
                      Admin
                    </button>
                  ) : item?.role === "teacher" ? (
                    <>
                      <div
                        className="tooltip"
                        data-tip="Click to make admin"
                      >
                        <button
                          onClick={() => handleMakeAdmin(_id)}
                          className="btn hover:bg-white hover:text-[#346B8D] text-white text-sm btn-sm bg-[#346B8D]"
                        >
                          Teacher
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="tooltip"
                        data-tip="Click to make admin"
                      >
                        <button
                          onClick={() => handleMakeAdmin(_id)}
                          className="btn hover:bg-white hover:text-[#346B8D] text-white text-sm btn-sm bg-[#346B8D]"
                        >
                          Student
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
