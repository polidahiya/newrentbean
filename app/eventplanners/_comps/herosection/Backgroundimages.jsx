"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { RiShareBoxFill } from "react-icons/ri";

const data = [
  {
    heading: "Unforgettable Wedding Moments",
    para: "From dreamy décor to seamless coordination, we specialize in crafting personalized wedding experiences that reflect your unique love story. Let us turn your special day into a beautiful memory that lasts forever.",
    image: "/eventplanners/heroimages/image1.jpg",
  },
  {
    heading: "Epic Parties, Made Effortless",
    para: "Whether you're planning a birthday blowout, an elegant anniversary dinner, or a high-energy eventthemed party, we take care of everything—from concept to execution—so you can focus on making memories with your guests.",
    image: "/eventplanners/heroimages/image2.jpg",
  },
  {
    heading: "School Events with a Spark",
    para: "Bring energy, creativity, and professionalism to every school event—be it annual functions, talent shows, sports days, or cultural festivals. We ensure every student, teacher, and parent walks away with a smile.",
    image: "/eventplanners/heroimages/image3.jpg",
  },
  {
    heading: "Corporate Events, Redefined",
    para: "Impress clients, motivate employees, and build brand presence with our tailored corporate event solutions. From product launches to team-building retreats and formal galas, we execute with precision and flair.",
    image: "/eventplanners/heroimages/image4.jpg",
  },
  {
    heading: "Tailored Themes for Every Occasion",
    para: "No two events should look the same. We bring your imagination to life with bespoke decorations, curated experiences, and eventtheme-based planning — whether you dream of rustic elegance, a Bollywood night, or a fairytale setting.",
    image: "/eventplanners/heroimages/image1.jpg",
  },
  {
    heading: "Stress-Free Event Planning",
    para: "From the first consultation to the final guest leaving, we handle every aspect of event planning. Our team ensures everything runs smoothly — managing venues, vendors, food, music, and everything in between.",
    image: "/eventplanners/heroimages/image2.jpg",
  },
];

function Backgroundimages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full px-20 py-40 flex flex-col z-10 text-white">
        <div>
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
                    className="opacity-60 max-w-xl translate-y-full"
                    style={{ animation: `moveupanimation 1s 3s forwards` }}
                  >
                    {item?.para}
                  </p>
                </div>
                <div className="mt-20 overflow-hidden">
                  <button
                    className="px-5 py-2 border border-white rounded-full translate-y-full flex items-center gap-2"
                    style={{ animation: `moveupanimation 1s 3.6s forwards` }}
                  >
                    View Plans <RiShareBoxFill />
                  </button>
                </div>
              </div>
            );
          })}
          {/* control bittons */}
        </div>
        <div className="flex items-center h-10 mt-auto">
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
          <div className=" flex justify-center gap-2 ml-10">
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
            <Image
              src={item.image}
              alt="Slide Image"
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover h-full w-full inset-0"
              data-swiper-parallax-scale="1.5"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Backgroundimages;
