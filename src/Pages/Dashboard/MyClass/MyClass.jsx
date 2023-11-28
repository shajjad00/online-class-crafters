import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const MyClass = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: classes, refetch } = useQuery({
    queryKey: ["teacherClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/teacher/classes/${user?.email}`);
      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/teacher/classes/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            toast.success("delete successful");
            refetch();
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Class Crafters | My Class</title>
      </Helmet>
      <div className=" grid grid-cols-1 md:grid-cols-2  gap-5">
        {classes?.map((classItem) => {
          const { _id, name, email, status, title, price, photo, description } =
            classItem;
          const isDisabled = status?.toLowerCase() === "pending";
          return (
            <div
              className="bg-gray-100  shadow-lg rounded-md pb-3 flex flex-1 flex-col justify-between"
              key={_id}
            >
              <div className=" space-y-2  relative">
                <img
                  className=" h-[300px] w-full border-4 border-[#8C6A88]"
                  src={photo}
                  alt=""
                />
                <h2 className=" text-xl font-bold mt-2">{title}</h2>
                <p className=" text-sm text-gray-500 font-semibold">
                  <span className=" border-b-2 border-gray-600 ">Author</span> :{" "}
                  {name}
                </p>
                <p className=" text-sm text-gray-500 font-semibold">
                  <span className=" border-b-2 border-gray-600 ">Email</span> :{" "}
                  {email}
                </p>
                <p className=" text-gray-500">{description}</p>
                <p className=" text-gray-500 bg-white px-3 py-2 font-bold absolute top-2 right-2">
                  <span className=" border-b-2 border-gray-600 ">Price</span>
                  :$
                  {price}
                </p>
                <p className=" text-gray-500 capitalize  font-bold ">
                  <span className=" border-b-2 border-gray-600 ">Status</span> :
                  {status}
                </p>
              </div>

              <div className=" mt-3 flex justify-center items-center gap-5 mx-3">
                <Link to={`/dashboard/update/${_id}`}>
                  <button className=" btn text-white hover:bg-[#225951] bg-[#508981] btn-sm">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  className=" m-1 btn btn-sm hover:bg-[#b82518] text-white bg-[#FF6F61]"
                >
                  Delete
                </button>
                <Link to={`/dashboard/classes/${_id}`}>
                  <button
                    disabled={isDisabled}
                    // onClick={() => handleApprove(email)}
                    className=" btn text-white hover:bg-[#225951] bg-[#70A9A1] btn-sm"
                  >
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyClass;
