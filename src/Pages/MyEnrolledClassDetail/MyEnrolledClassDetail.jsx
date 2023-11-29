const MyEnrolledClassDetail = () => {
  return (
    <>
      <table className="table text-[#737373] capitalize">
        {/* head */}
        <thead>
          <tr className=" bg-[#D1A054] text-white">
            <th></th>
            <th>Title</th>
            <th>Photo</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2">
            <th>1</th>
            <td>Title</td>
            <td>
              <img
                className=" w-16 h-16"
                src=""
                alt=""
              />
            </td>
            <td className="">Description</td>
            <td>Deadline</td>
            <td>Submit</td>

            {/* <td>
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
                  </td> */}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MyEnrolledClassDetail;
