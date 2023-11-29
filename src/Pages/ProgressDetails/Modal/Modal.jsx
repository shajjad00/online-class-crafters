import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";

const Modal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();

  console.log(user);

  const onSubmit = (data) => {
    const assignmentData = {
      ...data,
      assignmentId: id,
      email: user?.email,
    };
    console.log(assignmentData);
    axiosSecure.post(`/assignment`, assignmentData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        toast.success("assignment create successful");
      }
    });
  };

  return (
    <div className=" max-w-screen-sm mx-auto ">
      <button
        onClick={() => setOpen(true)}
        className=" mt-5 text-xl font-semibold bg-[#05c0a7] justify-center items-center px-6 py-2 gap-2 rounded-md flex text-white"
      >
        <FaPlus />
        Create
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
                    <input
                      className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Title"
                      name="name"
                      {...register("title", { required: true })}
                    />
                    {errors.name && (
                      <span className=" text-red-600 font-bold">
                        title is required
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      className="w-full mb-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="date"
                      placeholder="Deadline"
                      {...register("deadline", { required: true })}
                    />
                    {errors.name && (
                      <span className=" text-red-600 font-bold">
                        Deadline is required
                      </span>
                    )}
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
                      Create
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

Modal.propTypes = {
  food: PropTypes.object,
};

export default Modal;
