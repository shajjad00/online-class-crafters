import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";

const Classes = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allClass, refetch } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allClasses`);
      return res.data;
    },
  });

  const handleApprove = (id) => {
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
        axiosSecure.patch(`/allClasses/approve/${id}`).then((res) => {
          console.log(res.data);
          toast.success("successfully approved");
          refetch();
        });
      }
    });
  };
  const handleReject = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/allClasses/reject/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            toast.success("successfully Rejected");
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Class Crafters | Clsses</title>
      </Helmet>
      <Title text={"All Clsses"}></Title>
      <table className="table text-[#737373]">
        <thead>
          <tr className=" bg-[#508981] text-white">
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Short Desc</th>
            <th>Action</th>
            <th>See progress</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allClass?.map((item, idx) => {
            const { _id, status, title, photo, description } = item;
            const isDisabled = status?.toLowerCase() === "accepted";
            return (
              <tr
                key={_id}
                className=" border-b-2"
              >
                <td>{idx + 1}</td>
                <td>
                  <img
                    className=" w-16 h-16"
                    src={photo}
                    alt=""
                  />
                </td>
                <td>{title}</td>

                <td>{description.slice(0, 100)}</td>
                <td className="">
                  <button
                    disabled={isDisabled}
                    onClick={() => handleApprove(_id)}
                    className=" btn text-white hover:bg-[#225951] bg-[#508981] btn-xs"
                  >
                    Approved
                  </button>

                  <button
                    onClick={() => handleReject(_id)}
                    disabled={isDisabled}
                    className=" m-1 btn btn-xs hover:bg-[#b82518] text-white bg-[#FF6F61]"
                  >
                    Reject
                  </button>
                </td>
                <td className="">
                  <Link to={`feedback/${_id}`}>
                    <button
                      disabled={!isDisabled}
                      className="btn hover:bg-[#253343] text-white bg-[#566270]"
                    >
                      See progress
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Classes;
