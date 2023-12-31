import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const TopClasses = () => {
  const axiosPublic = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["topClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allApprovedClass/highestEnrollment");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className=" text-4xl text-center font-bold mt-6 border-b-2 border-gray-700 px-2 pb-4 w-fit mx-auto shadow-sm text-gray-700">
        Popular Classes
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        effect="fade"
        navigation
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="myTopSwiper"
      >
        {data?.map((item) => (
          <SwiperSlide
            className="myTopSwiperSlide h-[800px]"
            key={item?._id}
          >
            <div className="relative w-full">
              <img
                src={item?.photo}
                className="rounded-md w-full object-cover h-[500px]  object-center "
              />
              <div className="absolute inset-0 bg-gray-900 opacity-60 rounded-md"></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center text-white">
                <h2 className=" text-3xl font-bold">{item?.title}</h2>
                <p className=" max-w-xl mt-4">{item?.description}</p>
                <Link to={`/classDetails/${item?._id}`}>
                  <button className=" px-10 py-2 font-semibold rounded-md bg-orange-500 mt-2">
                    See More
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopClasses;
