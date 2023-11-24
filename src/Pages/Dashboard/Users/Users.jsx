import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { FaUsers } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import Swal from "sweetalert2";
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
    return <p>loading....</p>;
  }
  return (
    <div>
      Users {users?.length}
      <table className="table text-[#737373]">
        {/* head */}
        <thead>
          <tr className=" bg-[#D1A054] text-white">
            <th></th>
            <th>Name</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTION</th>
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
                <td>{name}</td>
                <td>{email}</td>
                <td className="">
                  {item?.role === "admin" ? (
                    <button
                      disabled
                      className="text-white btn text-sm btn-sm bg-[#D1A054]"
                    >
                      Admin
                    </button>
                  ) : item?.role === "teacher" ? (
                    <button
                      onClick={() => handleMakeAdmin(_id)}
                      className="text-white text-sm btn-sm bg-[#D1A054]"
                    >
                      Teacher
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(_id)}
                      className="btn text-white text-sm btn-sm bg-[#D1A054]"
                    >
                      Student
                    </button>
                  )}
                </td>
                <td
                  // onClick={() => handleDelete(_id)}
                  className=" text-xl text-red-700 cursor-pointer mx-auto"
                >
                  <BiTrashAlt />
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
