import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import useQueryData from "../../../Hooks/useQueryData";
import LottieAnimation from "../../../Component/LottieAnimation/LottieAnimation";

const Banner = () => {
  const { data, isLoading } = useQueryData(
    "foods",
    "https://food-sharing-community-server-three.vercel.app/foods"
  );
  if (isLoading) {
    return <LottieAnimation></LottieAnimation>;
  }
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectCreative]}
      effect="creative"
      spaceBetween={50}
      slidesPerView={1}
      navigation
      onSlideChange={() => console.log("slide changed")}
      onSwiper={() => console.log(Swiper)}
    >
      {data?.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="relative w-full">
            <img
              src={item?.foodImageURL}
              className="w-full object-cover h-[500px] "
            />
            <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 1)]">
              <div className="text-white space-y-7 pl-14 w-1/2">
                <h2 className="text-6xl font-bold capitalize">
                  {item.foodName}
                </h2>
                <p className=" max-w-4xl">
                  What You Give Today Will Help Prevent Child Hunger In The
                  Lives Of Many Tomorrow. Experience How Rescuing Food Is
                  Changing Lives around the World.
                </p>
                <div>
                  <button className="btn text-white border-none bg-[#EE343F] mr-5">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
