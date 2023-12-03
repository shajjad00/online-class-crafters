import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Report from "./Report";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";

const MyEnrolledClassDetail = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { data: assignment, isLoading } = useQuery({
    queryKey: ["assignmentData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignment/${id}`);
      return res.data;
    },
  });

  const handleAssignmentSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/assignment/${id}`).then((res) => {
          console.log(res.data);
        });
      }
    });
  };

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="max-w-screen-lg  mx-auto">
      <Helmet>
        <title>Class Crafters | Assignment Details</title>
      </Helmet>
      <Title text={"Assignment Details"}></Title>
      <Report></Report>
      {assignment.length > 0 ? (
        <table className="table  text-[#737373] capitalize">
          <thead className="overflow-x-auto">
            <tr className=" bg-[#508981] rounded-md text-white">
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody>
            {assignment.map((item, idx) => {
              return (
                <tr
                  key={item?._id}
                  className="border-b-2 overflow-x-auto py-4 "
                >
                  <th>{idx + 1}</th>
                  <td>{item?.title}</td>

                  <td className="">{item?.description}</td>
                  <td>{item?.deadline}</td>
                  <td
                    onClick={() => handleAssignmentSubmit(item)}
                    className=" btn glass"
                  >
                    Submit
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className=" text-center font-extrabold text-5xl mt-6">
          There is no assignment
        </p>
      )}
    </div>
  );
};

export default MyEnrolledClassDetail;
