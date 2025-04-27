"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";
import { RiShareBoxFill } from "react-icons/ri";
import Link from "next/link";

const data = [
  {
    heading: "Unforgettable Wedding Moments",
    para: "From dreamy décor to seamless coordination, we specialize in crafting personalized wedding experiences that reflect your unique love story. Let us turn your special day into a beautiful memory that lasts forever.",
    image: [
      "https://i.pinimg.com/736x/63/de/3a/63de3a93ad459acf7e6d9ee0d5102aac.jpg",
      "https://kashmirlife.net/wp-content/uploads/2013/09/Marriage-Anniversary-HD-Wallpaper-9-e1670851440530.jpg",
    ],
    link: "/eventplanners/Wedding-Planning",
  },
  {
    heading: "Epic Parties, Made Effortless",
    para: "Whether you're planning a birthday blowout, an elegant anniversary dinner, or a high-energy eventthemed party, we take care of everything—from concept to execution—so you can focus on making memories with your guests.",
    image: [
      "https://i.pinimg.com/736x/c9/fc/5b/c9fc5b906a994962bbc5d530e1cb9ce6.jpg",
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    ],
    link: "/eventplanners/Birthday-&-Parties",
  },
  {
    heading: "School Events with a Spark",
    para: "Bring energy, creativity, and professionalism to every school event—be it annual functions, talent shows, sports days, or cultural festivals. We ensure every student, teacher, and parent walks away with a smile.",
    image: [
      "https://i.pinimg.com/736x/88/af/1b/88af1be141f3e2742610fddbfa8c5af4.jpg",
      "https://www.hdfoundationschool.com/images/gallery/2019/annual-function-2019-01.jpg",
    ],
    link: "/eventplanners/Social-&-Cultural-Events/Exhibitions-&-Fairs",
  },
  {
    heading: "Corporate Events, Redefined",
    para: "Impress clients, motivate employees, and build brand presence with our tailored corporate event solutions. From product launches to team-building retreats and formal galas, we execute with precision and flair.",
    image: [
      "https://i.pinimg.com/736x/7c/69/92/7c6992a479992ef6f1848286d934a939.jpg",
      "https://www.aashuevents.com/wp-content/uploads/2024/02/Volcanic-Events-Fuerteventura-Cooperated-DMC.jpg",
    ],
    link: "/eventplanners/Corporate-Events",
  },
];

function Backgroundimages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full px-5 lg:px-20 py-40 flex flex-col z-10 text-white pointer-events-none lg:pointer-events-auto">
        <div className="">
          {data.map((item, i) => {
            return (
              <div
                key={i}
                className={`${activeIndex == i ? "block" : "hidden"}`}
              >
                <h2 className="font-semibold text-5xl max-w-96">
                  {item?.heading.split("").map((item, i) => (
                    <span
                      key={i}
                      className="font-recline blur-xl opacity-0 scale-50 translate-y-5"
                      style={{
                        animation: `fadeout 01s ${0.05 * i + 1.6}s forwards`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </h2>
                <div className="overflow-hidden mt-5">
                  <p
                    className="opacity-60 max-w-xl translate-y-full pr-10 "
                    style={{ animation: `moveupanimation 1s 3s forwards` }}
                  >
                    {item?.para}
                  </p>
                </div>
                <div className="mt-20 overflow-hidden">
                  <Link
                    href={item?.link}
                    className="px-5 py-2  border border-white rounded-full translate-y-full inline-flex items-center gap-2 pointer-events-auto"
                    style={{ animation: `moveupanimation 1s 3.6s forwards` }}
                  >
                    View Plans <RiShareBoxFill />
                  </Link>
                </div>
              </div>
            );
          })}
          {/* control bittons */}
        </div>
        <div className="hidden  md:flex items-center md:gap-10 h-10 mt-auto w-fit">
          <div className="h-7 text-xs flex items-center">
            {data.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <div
                    className={`h-full aspect-square rounded-full  border-white  grid place-content-center  duration-1000 ${
                      activeIndex == i
                        ? "opacity-100 border-2 text-white font-black shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                        : "opacity-50 border"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="h-px w-10 bg-white opacity-50 last:hidden"></div>
                </React.Fragment>
              );
            })}
          </div>
          <div className=" flex justify-center gap-2">
            <button
              onClick={() => textSwiperRef.current?.slidePrev()}
              className=" text-white lg:border border-white w-10 aspect-square grid place-content-center rounded-full bg-opacity-50"
            >
              ❮
            </button>
            <button
              onClick={() => textSwiperRef.current?.slideNext()}
              className=" text-white lg:border border-white w-10 aspect-square grid place-content-center rounded-full bg-opacity-50"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => (textSwiperRef.current = swiper)}
        modules={[Navigation, Autoplay, Parallax, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1600}
        parallax={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="h-full w-full overflow-hidden">
            <div
              className="relative h-full w-full"
              data-swiper-parallax-scale="1.5"
            >
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet={item?.image[1] || ""}
                />
                <img
                  src={item?.image[0] || ""}
                  alt="Background"
                  layout="fill"
                  className="h-full w-full object-cover object-center brightness-75"
                  priority="true"
                />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Backgroundimages;
