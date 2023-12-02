import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import ReactStars from "react-rating-stars-component";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedback } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    },
  });
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        {" "}
        {feedback?.map((item) => {
          return (
            <div
              className=" max-w-md  rounded-lg mx-auto p-5 border indicator"
              key={item._id}
            >
              <div>
                <p className=" mb-4">{item?.description} </p>
                <ReactStars
                  count={5}
                  value={parseInt(item?.rating)}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
                <p className=" text-gray-800">Shajjad Hossan</p>
                <p className=" text-gray-400">
                  Teaching Assistant, Brac University
                </p>
              </div>
              <span className="indicator-item indicator-top indicator-center badge font-bold bg-gray-400">
                Feedback
              </span>
            </div>
          );
        })}
      </SwiperSlide>
    </Swiper>
  );
};

export default Feedback;
