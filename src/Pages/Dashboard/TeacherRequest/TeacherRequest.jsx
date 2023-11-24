import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/teacher/Request");
      return res.data;
    },
  });

  const handleApprove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/admin/request/${email}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Teacher has been Updated.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <>
      <div className=" mt-6">
        <table className="table text-[#737373] capitalize">
          {/* head */}
          <thead>
            <tr className=" bg-[#D1A054] text-white">
              <th></th>
              <th>Name</th>
              <th>Photo</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((item, idx) => {
              const {
                _id,
                email,
                title,
                name,
                status,
                photo,
                experience,
                category,
              } = item;
              const isAccepted = status === "accepted";
              return (
                <tr
                  key={_id}
                  className="border-b-2"
                >
                  <th>{idx + 1}</th>
                  <td>{name}</td>
                  <td>
                    <img
                      className=" w-16 h-16"
                      src={photo}
                      alt=""
                    />
                  </td>
                  <td className="">{experience}</td>
                  <td>{title}</td>
                  <td>{category}</td>
                  <td
                  // onClick={() => handleDelete(_id)}
                  >
                    {status}
                  </td>

                  <td>
                    <button
                      disabled={isAccepted}
                      onClick={() => handleApprove(email)}
                      className=" btn text-white hover:bg-[#225951] bg-[#70A9A1] btn-xs"
                    >
                      Approve
                    </button>
                    <button
                      disabled={isAccepted}
                      className=" m-1 btn btn-xs hover:bg-[#b82518] text-white bg-[#FF6F61]"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeacherRequest;
