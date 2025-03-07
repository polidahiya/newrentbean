"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

export const rentalItems = [
  {
    name: "Treadmill",
    image: "/directsearchcomp/treadmill.png",
    heading: "Stay Fit, Stay Active",
    subheading:
      "Bring the gym to your home with a high-quality treadmill. Stay on top of your fitness goals with convenient and easy workouts anytime.",
    startingat: "₹ 1,916 / month",
    link: "/Search?query=treadmill",
  },
  {
    name: "Crosstrainer",
    image: "/directsearchcomp/crosstrainer.png",
    heading: "Cardio Made Easy",
    subheading:
      "Enhance your cardio routine with a crosstrainer, designed to provide an effective workout with minimal impact on your joints.",
    startingat: "₹ 1,583 / month",
    link: "/Search?query=cross-trainer",
  },
  {
    name: "Recumbent Bike",
    image: "/directsearchcomp/recumbentbike.png",
    heading: "Low Impact, High Results",
    subheading:
      "Enjoy a comfortable and effective workout with a recumbent bike, perfect for those looking to stay active without straining their body.",
    startingat: "₹ 1,583 / month",
    link: "/Search?query=recumbent-bike",
  },
  {
    name: "Fridge",
    image: "/directsearchcomp/fridge.png",
    heading: "Keep It Fresh",
    subheading:
      "Store your food and beverages with ease. Rent a spacious, energy-efficient fridge to ensure everything stays fresh and cool.",
    startingat: "₹ 650 / month",
    link: "/Search?query=fridge",
  },
  {
    name: "Air Fryer",
    image: "/directsearchcomp/airfryer.png",
    heading: "Healthy Cooking",
    subheading:
      "Enjoy crispy and delicious meals with an air fryer that uses little to no oil, making your favorite dishes healthier and tastier.",
    startingat: "₹ 142 / day",
    link: "/Search?query=air-fryer",
  },
  {
    name: "Laptop",
    image: "/directsearchcomp/laptops.png",
    heading: "Work & Play",
    subheading:
      "Boost your productivity with a high-performance laptop, perfect for work, online classes, or entertainment on the go.",
    startingat: "₹ 1200 / month",
    link: "/Search?query=laptop",
  },
  {
    name: "Hoverboard",
    image: "/directsearchcomp/hoverboard.png",
    heading: "Glide with Style",
    subheading:
      "Experience smooth and effortless rides with a hoverboard that offers speed, balance, and fun for all ages.",
    startingat: "₹ 133 / day",
    link: "/Search?query=hoverboard",
  },
  {
    name: "PS4",
    image: "/directsearchcomp/ps4.png",
    heading: "Game On",
    subheading:
      "Immerse yourself in the world of gaming with a PlayStation 4. Enjoy high-quality graphics, online multiplayer, and endless entertainment.",
    startingat: "₹ 200 / day",
    link: "/Search?query=ps4",
  },
  {
    name: "Washing Machine",
    image: "/directsearchcomp/washingmachine.png",
    heading: "Laundry Made Easy",
    subheading:
      "Say goodbye to laundry hassles! Rent a powerful washing machine that makes washing clothes quick and effortless.",
    startingat: "₹ 600 / month",
    link: "/Search?query=washing-machine",
  },
  {
    name: "Inverter Battery",
    image: "/directsearchcomp/inverter.png",
    heading: "Reliable Power Backup",
    subheading:
      "Ensure an uninterrupted power supply at home or office with a high-capacity inverter battery, keeping your essentials running smoothly.",
    startingat: "₹ 583 / month",
    link: "/Search?query=inverter-battery",
  },
  {
    name: "Hookah",
    image: "/directsearchcomp/hookah.png",
    heading: "Relax & Unwind",
    subheading:
      "Enjoy a premium hookah experience at home or with friends. Rent high-quality hookahs for a smooth and flavorful session.",
    startingat: "₹ 142 / day",
    link: "/Search?query=hookah",
  },
  {
    name: "Baby Stroller",
    image: "/directsearchcomp/babystraller.png",
    heading: "Comfort & Safety for Your Baby",
    subheading:
      "Make outings easier with a sturdy and comfortable baby stroller. Ensure your little one's safety while on the move.",
    startingat: "₹ 60 / day",
    link: "/Search?query=baby-stroller",
  },
  {
    name: "Baby Carrier",
    image: "/directsearchcomp/babycarrier.png",
    heading: "Hands-Free Convenience",
    subheading:
      "Keep your baby close and comfortable while staying hands-free. Rent a baby carrier for ease and comfort on the go.",
    startingat: "₹ 33 / day",
    link: "/Search?query=baby-carrier",
  },
  {
    name: "Baby Car Seat",
    image: "/directsearchcomp/babycarseat.png",
    heading: "Safety First",
    subheading:
      "Ensure your child's safety while traveling. Rent a baby car seat designed for comfort and maximum protection.",
    startingat: "₹ 90 / day",
    link: "/Search?query=baby-car-seat",
  },
];

export default function RentalItemsSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textSwiper, setTextSwiper] = useState(null);
  const [imageSwiper, setImageSwiper] = useState(null);
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full  flex flex-col-reverse lg:flex-row">
      <Swiper
        ref={swiperRef}
        onSwiper={setTextSwiper}
        modules={[Navigation, Autoplay, Parallax, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1600}
        parallax={true}
        controller={{ control: imageSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full lg:w-1/2"
      >
        {rentalItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-5 md:p-10">
              <h3
                className="text-4xl font-semibold mt-4 text-center lg:text-left"
                data-swiper-parallax="-150"
              >
                {item?.heading}
              </h3>
              <p
                className="text-gray-600 mt-2 text-center lg:text-left"
                data-swiper-parallax="-300"
              >
                {item?.subheading}
              </p>
              <p
                className="text-gray-600 mt-2 text-center lg:text-left font-semibold text-lg"
                data-swiper-parallax="-450"
              >
                Starting at just :{" "}
                <span className="text-theme">{item?.startingat}</span>
              </p>
              <div
                className="mt-10 flex justify-center lg:justify-start gap-2"
                data-swiper-parallax="-600"
              >
                <Link
                  href={item?.link}
                  className=" text-theme border border-theme px-5 py-2 rounded-md"
                >
                  Rent Now
                </Link>
                <button
                  onClick={() => textSwiper?.slidePrev()}
                  className=" text-theme border border-theme px-5 py-2 rounded-md hidden lg:block"
                >
                  ❮
                </button>

                <button
                  onClick={() => textSwiper?.slideNext()}
                  className=" text-theme border border-theme px-5 py-2 rounded-md hidden lg:block"
                >
                  ❯
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setImageSwiper}
        modules={[Navigation, Autoplay, Parallax, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={1600}
        parallax={true}
        controller={{ control: textSwiper }}
        className="relative w-full lg:w-1/2"
      >
        {rentalItems.map((item, index) => (
          <SwiperSlide key={index} className="aspect-video">
            <img
              src={item?.image}
              alt={item?.name}
              className="object-contain w-full h-full"
            />
          </SwiperSlide>
        ))}
        <div className="absolute w-full aspect-square top-0 -translate-y-1/2 right-0 translate-x-1/2 bg-theme rounded-full scale-x-125 scale-y-150"></div>
        <div className="absolute w-full aspect-square top-0 -translate-y-1/2 right-0 translate-x-1/2 bg-stone-500 rounded-full"></div>
      </Swiper>
      {/* custom pagination */}
      <div className="absolute top-full lg:bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
        {rentalItems.map((_, i) => (
          <button
            key={i}
            className={`relative group flex items-center justify-center p-1`}
            onClick={() => swiperRef.current.swiper.slideTo(i)}
          >
            <span
              className={`block h-1 rounded-full bg-gray-400 duration-150 ${
                i === activeIndex ? "bg-theme w-8" : "w-1"
              }`}
            ></span>
            <span className="hidden group-hover:block absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 aspect-square w-20 border bg-white rounded-md overflow-hidden">
              <img
                src={_?.image}
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
