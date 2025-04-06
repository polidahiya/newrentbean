"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, Controller } from "swiper/modules";
import Effecttext from "./_comps/Effecttext";
import "swiper/css";
import Image from "next/image";

const eventsdata = [
  {
    link: "/eventplanner/",
    title: "Birthday Celebration",
    desc: [
      `
              🎉 Celebrate in Style: A Birthday Bash to Remember! 🎂
              `,
      `
              Join us for an unforgettable birthday extravaganza! Whether
              you're turning sweet sixteen or fabulous forty, our expert team
              of event planners will craft a day filled with joy and excitement.
              `,
      `
              Expect picture-perfect decorations, mouthwatering treats, and
              entertainment tailored to your tastes. From signature cocktails
              to your favorite tunes, we’ll ensure you and your guests have a
              blast.
              `,
      `
              Mark your calendar for a celebration that reflects your personality
              and creates memories to last a lifetime. Let’s toast to another year
              of happiness and possibilities!
              `,
    ],
    image: "/eventplanners/images/birthday.jpg",
    alt: "Birthday party event manager",
  },
  {
    link: "/eventplanner/",
    title: "Wedding Celebration",
    desc: [
      `
              ✨ Experience the magic of love at our wedding celebrations! 💖
              `,
      `
              Two hearts unite in a day filled with elegance, romance, and personal
              touches. Our team crafts every detail to reflect your unique love story.
              `,
      `
              From the ethereal ceremony to the joyous reception, we’ll create an
              enchanting ambiance with stunning decor and heartfelt moments.
              `,
      `
              Let us bring your dreams to life, ensuring a day of laughter, love,
              and cherished memories that last forever. 🥂✨
              `,
    ],
    image: "/eventplanners/images/wedding.jpg",
    alt: "wedding celebration party event manager",
  },
  {
    link: "/eventplanner/",
    title: "Corporate Celebration",
    desc: [
      `
              🎉 Celebrate success with our expertly crafted corporate events! ✨
              `,
      `
              Whether it’s a milestone or a team-building event, we tailor every
              detail to reflect your company’s unique culture and goals.
              `,
      `
              From elegant soirées to dynamic activities, we create unforgettable
              experiences that inspire and unite your team.
              `,
      `
              Elevate your corporate culture with our seamless planning and
              sophisticated services. Let’s honor your achievements in style! 🥂
              `,
    ],
    image: "/eventplanners/images/corporate.jpg",
    alt: "corporate party event manager",
  },
  {
    link: "/eventplanner/",
    title: "Private Party",
    desc: [
      `
              🎉 Enjoy an exclusive private party tailored just for you! 🌟
              `,
      `
              Whether it’s an intimate gathering or a lavish affair, our planners
              ensure every detail is perfect and personalized.
              `,
      `
              From elegant decor to delicious cuisine and seamless entertainment,
              we bring your vision to life with sophistication.
              `,
      `
              Create lasting memories with a celebration that’s uniquely yours.
              Let’s make it unforgettable! 🥂✨
              `,
    ],
    image: "/eventplanners/images/privateparty.jpg",
    alt: "private party event manager",
  },
  {
    link: "/eventplanner/",
    title: "New Year Eve",
    desc: [
      `
              🎉 Ring in the New Year with a spectacular celebration! 🎇
              `,
      `
              Join us for an evening of glamour, live music, and gourmet cuisine
              that’ll leave you dazzled.
              `,
      `
              Dance the night away and toast to new beginnings as dazzling fireworks
              light up the sky at midnight.
              `,
      `
              Don’t miss the most extraordinary way to welcome the new year in style!
              🥂✨
              `,
    ],
    image: "/eventplanners/images/new year eve party.jpeg",
    alt: "new year eve party event manager",
  },
  {
    link: "/eventplanner/",
    title: "School Event",
    desc: [
      `
              🎉 Join us for an unforgettable school event! 🎉
              `,
      `
              Students, parents, and faculty—get ready for a day of fun, laughter,
              and community spirit.
              `,
      `
              Enjoy captivating performances, thrilling activities, and something
              for everyone to love.
              `,
      `
              Celebrate our school’s diversity and talent with magical moments
              that bring us together!
              `,
    ],
    image: "/eventplanners/images/school events.jpg",
    alt: "school events party event manager",
  },
];

export default function DireactSearchListSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  // Sync controllers after both swipers are initialized
  useEffect(() => {
    if (textSwiperRef.current && imageSwiperRef.current) {
      textSwiperRef.current.controller.control = imageSwiperRef.current;
      imageSwiperRef.current.controller.control = textSwiperRef.current;
    }
  }, []);

  return (
    <div className="relative w-full flex flex-col lg:flex-row bg-white">
      <Swiper
        onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
        modules={[Navigation, Autoplay, Parallax, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={1600}
        parallax={true}
        className="relative w-full lg:w-1/2"
      >
        {eventsdata.map((item, index) => (
          <SwiperSlide key={index} className="aspect-[4/3] md:aspect-video">
            <Image
              src={item?.image}
              alt={item?.alt}
              className={`object-cover w-full h-full`}
              loading="lazy"
              width={638}
              height={358}
              // style={{
              //   maskImage:
              //     "url('/eventplanners/party-svgrepo-com.png')",
              //   maskSize: "cover",
              //   maskRepeat: "no-repeat",
              // }}
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
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
        className="w-full lg:w-1/2"
      >
        {eventsdata.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-10">
              <h3
                className="text-3xl font-semibold mt-4 mb-6 flex justify-center text-theme"
                data-swiper-parallax="-150"
              >
                <Effecttext text={item?.title} />
                {/* ｡･:*˚:✧｡ {item?.title} ｡･:*˚:✧｡ */}
              </h3>
              {item?.desc.map((itemj, j) => {
                return (
                  <p
                    className="py-2"
                    data-swiper-parallax={-((j + 1) * 150 + 150)}
                    key={j}
                  >
                    {itemj}
                  </p>
                );
              })}
              <div
                className="mt-10 flex justify-center gap-2"
                data-swiper-parallax="-900"
              >
                <button
                  onClick={() => textSwiperRef.current?.slidePrev()}
                  className=" text-theme lg:border border-theme w-10 aspect-square grid place-content-center rounded-full hover:bg-theme hover:text-white"
                >
                  ❮
                </button>
                <button
                  onClick={() => textSwiperRef.current?.slideNext()}
                  className=" text-theme lg:border border-theme w-10 aspect-square grid place-content-center rounded-full hover:bg-theme hover:text-white"
                >
                  ❯
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* custom pagination */}
      <div className="absolute top-full lg:bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
        {eventsdata.map((_, i) => (
          <button
            key={i}
            className={`relative group flex items-center justify-center p-1`}
            onClick={() => {
              if (textSwiperRef.current) {
                textSwiperRef.current.slideTo(i);
              }
            }}
          >
            <span
              className={`block h-1 rounded-full bg-gray-400 duration-150 ${
                i === activeIndex ? "bg-theme w-8" : "w-1"
              }`}
            ></span>
            <span className="hidden lg:group-hover:block absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 aspect-square w-20 border bg-white rounded-md overflow-hidden">
              <Image
                src={_?.image}
                alt={_?.alt}
                className="h-full w-full object-contain"
                loading="lazy"
                width={80}
                height={80}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
