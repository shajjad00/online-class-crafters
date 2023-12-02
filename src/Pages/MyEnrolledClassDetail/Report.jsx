import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import toast from "react-hot-toast";

const Report = () => {
  const [open, setOpen] = useState(false);
  const [ratingNo, setRatingNo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRatingNo(newRating);
  };

  const onSubmit = (data) => {
    console.log(data);
    const feedbackData = { ...data, rating: ratingNo };
    axiosSecure.post(`/feedback`, feedbackData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        toast.success("assignment create successful");
      }
    });
  };
  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className=" px-12 py-2 rounded-md bg-[#508981] text-white font-semibold mt-6 mb-2"
      >
        TER
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle
          id="dialog-title "
          className="text-center text-3xl font-bold italic text-gray-400"
        >
          Submit the Request
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            <div className="flex items-center justify-center">
              <div className="mx-auto w-full max-w-[570px] bg-gray-200 p-6 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                    ,
                  </div>
                  <div>
                    <textarea
                      className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Description"
                      {...register("description", { required: true })}
                    />
                    {errors.name && (
                      <span className=" text-red-600 font-bold">
                        Description is required
                      </span>
                    )}
                  </div>
                  <div>
                    <button className="hover:shadow-form mt-4 hover:bg-white hover:text-[#05c0a7] border hover:border-[#05c0a7] w-full rounded-md bg-[#05c0a7] py-2 px-8 lg:px-20 text-center text-base font-semibold text-white outline-none">
                      Send
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="hover:shadow-form mt-4 hover:bg-white hover:text-[#05c0a7] border hover:border-[#05c0a7] w-full rounded-md bg-[#05c0a7] py-2 px-8 lg:px-20 text-center text-base font-semibold text-white outline-none"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default Report;
