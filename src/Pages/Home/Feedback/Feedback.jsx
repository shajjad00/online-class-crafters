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
    <>
      <h2 className=" text-4xl text-center font-bold mt-6 border-b-2 border-gray-700 px-2 pb-4 w-fit mx-auto shadow-md">
        Students Feedback
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          425: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        <div className="">
          {feedback?.map((item) => {
            console.log(item);
            return (
              <SwiperSlide key={item._id}>
                <div className="border shadow-lg relative max-w-md md:min-h-[330px] rounded-lg mx-auto p-5">
                  <div>
                    <p></p>
                    <p className="">{item?.description} </p>
                    <ReactStars
                      count={5}
                      value={parseInt(item?.rating)}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <div>
                      <p className=" text-gray-800">
                        {item?.name || "Shajjad Hossan"}
                      </p>
                      <img
                        src={item?.img}
                        alt=""
                      />
                    </div>
                  </div>
                  <span className="indicator-item absolute -top-2 left-[175px] md:left-[70px] lg:left-1/3 indicator-top indicator-center badge font-bold bg-gray-400">
                    Feedback
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
};

export default Feedback;
