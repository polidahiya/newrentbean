"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

function Posteradds({ location }) {
  const [activeImage, setActiveImage] = useState(0);
  const imageTimerRef = useRef(null);

  const imageArray = [
    { img: "/images/highlights/ad1.jpg", link: "/Furniture" },
    { img: "/images/highlights/ad2.jpg", link: "/Fitness_and_Gym" },
    { img: "/images/highlights/ad3.jpg", link: "/Furniture" },
    { img: "/images/highlights/ad4.jpg", link: "/Electronics/Laptop" },
  ];

  useEffect(() => {
    startImageTimer();
    return () => clearInterval(imageTimerRef.current);
  }, []);

  const startImageTimer = () => {
    clearInterval(imageTimerRef.current);
    imageTimerRef.current = setInterval(() => {
      setActiveImage((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 5000);
  };

  const handlePrevButtonClick = () => {
    setActiveImage((prevIndex) =>
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
    startImageTimer();
  };

  const handleNextButtonClick = () => {
    setActiveImage((prevIndex) => (prevIndex + 1) % imageArray.length);
    startImageTimer();
  };

  return (
    <div className="flex items-center px-[10px] md:px-[40px] pt-[20px] gap-[20px] overflow-hidden">
      <div className="aspect-[9/16] h-full w-[30%]  hidden lg:block rounded-[10px] overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src="https://polidahiya.github.io/rentbeanimages/portraitad1.png"
        />
      </div>
      <div className="group relative w-full h-full aspect-[16/9] rounded-[10px] overflow-hidden">
        {imageArray.map((item, i) => (
          <Link
            key={i}
            href={"/" + location + item.link}
            className={`absolute min-w-full min-h-full duration-[1s] ${
              i === activeImage
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              className="h-full w-full  object-fill "
              fill
              src={item.img}
              alt={`ads${i}`}
            />
          </Link>
        ))}
        {/* controls */}
        <button
          className="absolute h-[40px] md:h-[60px] aspect-[1/2] bg-white lg:bg-slate-300 rounded-tr-[10px] rounded-br-[10px]  left-0 top-[50%] translate-y-[-50%] duration-300  lg:opacity-0 lg:group-hover:opacity-80 lg:hover:bg-white"
          onClick={handlePrevButtonClick}
        >
          <svg
            className="fill-theme"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M14.29 5.707a1 1 0 00-1.415 0L7.988 10.6a2 2 0 000 2.828l4.89 4.89a1 1 0 001.415-1.414l-4.186-4.185a1 1 0 010-1.415l4.182-4.182a1 1 0 000-1.414z"></path>
          </svg>
        </button>
        <button
          className="absolute h-[40px] md:h-[60px] aspect-[1/2] bg-white lg:bg-slate-300 rounded-tl-[10px] rounded-bl-[10px] right-0 top-[50%] translate-y-[-50%] duration-300  lg:opacity-0 lg:group-hover:opacity-80 lg:hover:bg-white"
          onClick={handleNextButtonClick}
        >
          <svg
            className="fill-theme"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M9.71 18.293a1 1 0 001.415 0l4.887-4.892a2 2 0 000-2.828l-4.89-4.89a1 1 0 00-1.415 1.414l4.186 4.185a1 1 0 010 1.415L9.71 16.879a1 1 0 000 1.414z"></path>
          </svg>
        </button>
        {/* dotts */}
        <div className="absolute bottom-0 md:bottom-[10px] left-[50%] translate-x-[-50%] h-[30px] flex items-center justify-center gap-[10px]">
          {imageArray.map((item, i) => {
            return (
              <button
                key={i}
                className={`h-[5px] rounded-full bg-theme duration-300 ${
                  i === activeImage ? "w-8" : "w-[5px]"
                }`}
                onClick={() => {
                  startImageTimer();
                  setActiveImage(i);
                }}
              ></button>
            );
          })}
        </div>
      </div>
      <div className="aspect-[9/16] h-full w-[30%]  hidden lg:block  rounded-[10px] overflow-hidden">
        <video
          className="h-full w-full object-cover "
          src="https://polidahiya.github.io/rentbeanimages/portraitad2.mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>
    </div>
  );
}

export default Posteradds;
