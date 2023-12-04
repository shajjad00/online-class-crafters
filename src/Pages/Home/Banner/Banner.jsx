import { Swiper, SwiperSlide } from "swiper/react";
import loadingAnimation from "../../../../public/loadingAnimation.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./banner.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Lottie from "lottie-react";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["carouselSlide"],
    queryFn: async () => {
      const res = await axiosPublic("/allApprovedClass");
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className=" max-w-screen-lg mx-auto">
        {" "}
        <Lottie
          className=" w-[400px] mx-auto"
          animationData={loadingAnimation}
          loop={true}
        />
      </div>
    );
  }
  return (
    <>
      <div className="relative py-3 bg-[url('https://i.ibb.co/k4PpZGr/pexels-christina-morillo-1181595.jpg')] ">
        <div className="absolute inset-0 bg-black opacity-90 rounded-md">
          <h2 className=" text-center text-white text-2xl mt-3">
            Popular Classes
          </h2>
        </div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {data?.map((item) => (
            <SwiperSlide
              className="banner-slide"
              key={item?._id}
            >
              <div className="relative w-full">
                <img
                  src={item?.photo}
                  className="w-full rounded-md object-cover h-[500px] "
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-xl font-bold">
                    {item?.title}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
