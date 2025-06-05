"use client";
import React, { useEffect, useRef, useState } from "react";
import Nextimage from "@/app/_components/Nextimage";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { likeproduct, isliked } from "@/app/_serveractions/Likedproducts";
import { AppContextfn } from "@/app/Context";
import copytoclipboard from "@/app/_components/_helperfunctions/copytoclipboard";
import { IoLinkOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

function ImagesComp({ filteredproducts, token }) {
  const { setmessagefn } = AppContextfn();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imagesScrollRef = useRef();
  const [isLiked, setIsLiked] = useState(false);

  // check liked
  useEffect(() => {
    const checkLikedStatus = async () => {
      if (token) {
        const likedStatus = await isliked(filteredproducts._id);
        setIsLiked(likedStatus);
      }
    };
    checkLikedStatus();
  }, [token, filteredproducts._id]);

  const handleImageScroll = (e) => {
    const index = Math.floor(
      (e.target.scrollLeft + e.target.clientWidth / 2) / e.target.clientWidth
    );
    setActiveImageIndex(index);
  };

  const handleSharePage = () => {
    const link = typeof window !== "undefined" ? new URL(location.href) : "";
    copytoclipboard(link, () => {
      setmessagefn("Link copied!");
    });
  };

  const handleLikeToggle = async () => {
    if (!token) {
      setmessagefn("Please login first");
      return;
    }
    const res = await likeproduct(filteredproducts._id, isLiked);
    if (res) {
      setIsLiked(res.message === "Added to favourites");
      setmessagefn(res.message);
    }
  };

  const images = filteredproducts?.images;

  // move using arrow buttons
  useEffect(() => {
    const handleArrowKeyScroll = (e) => {
      if (!imagesScrollRef.current) return;

      const scrollAmount = imagesScrollRef.current.clientWidth;
      if (e.key === "ArrowRight") {
        imagesScrollRef.current.scrollLeft += scrollAmount;
      } else if (e.key === "ArrowLeft") {
        imagesScrollRef.current.scrollLeft -= scrollAmount;
      }
    };

    window.addEventListener("keydown", handleArrowKeyScroll);
    return () => {
      window.removeEventListener("keydown", handleArrowKeyScroll);
    };
  }, []);

  return (
    <div className="relative flex w-full flex-col-reverse lg:flex-row lg:items-center gap-2">
      {/* mini images */}
      <div
        className={`flex  lg:w-[70px] lg:h-full lg:flex-col flex-wrap lg:flex-nowrap gap-2 lg:max-h-[400px] ${
          images.length > 5
            ? "overflow-y-scroll hidescroll justify-center lg:justify-normal"
            : "justify-center"
        }`}
      >
        {images.map((image, index) => (
          <MiniImage
            key={index}
            image={image}
            alt={filteredproducts.name}
            onClick={() => {
              imagesScrollRef.current.scrollLeft =
                imagesScrollRef.current.clientWidth * index;
            }}
            isActive={activeImageIndex === index}
          />
        ))}
      </div>
      {/* main */}
      <div className="relative group/main overflow-hidden  w-full h-full md:h-96">
        <div
          className="h-full w-full flex items-center overflow-x-scroll snap-x snap-mandatory scroll-smooth"
          onScroll={handleImageScroll}
          ref={imagesScrollRef}
        >
          {images.map((image, index) => (
            <MainImage
              key={index}
              image={image}
              name={filteredproducts.name}
              pid={filteredproducts?._id}
              index={index}
            />
          ))}
        </div>
        {/* buttons */}
        <div className="absolute right-[10px] top-[10px] flex gap-2">
          {/* like  */}
          <button
            className="text-2xl bg-white text-red-500 rounded-full border p-1"
            onClick={handleLikeToggle}
            aria-label={isLiked ? "Dislike" : "Like"}
            title={isLiked ? "Dislike" : "Like"}
          >
            {isLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
          {/* link */}
          <button
            className="text-2xl rounded-full bg-white border p-1"
            onClick={handleSharePage}
            aria-label="Copy Link"
            title="Copy Link"
          >
            <IoLinkOutline />
          </button>
        </div>
        {/* dots */}
        <div className="absolute bottom-0 left-0 z-10 w-full">
          <div className="absolute bottom-[5px] left-1/2 flex gap-2 transform -translate-x-1/2">
            {images.map((_, index) => (
              <div
                key={index}
                className="h-[5px] min-w-[5px] bg-theme rounded-full transition-all duration-200"
                style={{ width: activeImageIndex === index ? "30px" : "5px" }}
              />
            ))}
          </div>
        </div>
        {/* left and right buttons */}
        <button
          className={`hidden ${
            activeImageIndex != 0 && "lg:group-hover/main:flex"
          } items-center justify-center absolute top-1/2 -translate-y-1/2 left-0 w-10 aspect-square border rounded-full text-xl bg-white`}
          onClick={() => {
            imagesScrollRef.current.scrollLeft -=
              imagesScrollRef.current.clientWidth;
          }}
          aria-label="Left"
          title="Left"
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          className={`hidden ${
            activeImageIndex != images.length - 1 && "lg:group-hover/main:flex"
          }  items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 w-10 aspect-square border rounded-full text-xl bg-white rotate-180`}
          onClick={() => {
            imagesScrollRef.current.scrollLeft +=
              imagesScrollRef.current.clientWidth;
          }}
          aria-label="Right"
          title="Right"
        >
          <MdKeyboardArrowLeft />
        </button>
      </div>
      {/* note */}
      <p className="absolute top-full left-1/2 -translate-x-1/2 text-[8px] w-full text-center hidden lg:block">
        {'"'} *Please note: Product may vary slightly from images displayed.
        {'"'}
      </p>
    </div>
  );
}

const MainImage = ({ image, name }) => {
  const [loading, setloading] = useState({
    effect: true,
    show: true,
  });

  return (
    <div className="relative  min-w-[100%] h-full w-full p-px snap-start snap-always overflow-hidden">
      <Nextimage
        className="min-w-full w-full h-full object-contain"
        src={image}
        alt={name}
        height={754}
        width={754}
        loading="lazy"
        onLoad={() => {
          setloading((pre) => ({ ...pre, effect: false }));
          setTimeout(() => {
            setloading((pre) => ({ ...pre, show: false }));
          }, 550);
        }}
      />
      {/* loading */}
      {loading.show && (
        <div
          className={`imgloader absolute top-0 left-0  h-full w-full bg-bg1 ${
            !loading.effect && "opacity-0"
          } duration-500`}
        ></div>
      )}
    </div>
  );
};

const MiniImage = ({ image, alt, onClick, isActive }) => {
  const [loading, setloading] = useState({
    effect: true,
    show: true,
  });

  return (
    <div
      className={`relative w-[70px] lg:w-full aspect-square cursor-pointer overflow-hidden ${
        isActive
          ? "border-[2px] border-cyan-500"
          : "border-[2px] border-slate-300"
      }`}
      onClick={onClick}
    >
      <Nextimage
        className={`h-full w-full aspect-square object-cover bg-white`}
        src={image}
        alt={alt}
        height={100}
        width={100}
        quality={50}
        loading="lazy"
        onLoad={() => {
          setloading((pre) => ({ ...pre, effect: false }));
          setTimeout(() => {
            setloading((pre) => ({ ...pre, show: false }));
          }, 550);
        }}
      />
      {/* loading */}
      {loading.show && (
        <div
          className={`imgloader absolute inset-0 bg-bg1 ${
            !loading.effect && "opacity-0"
          } duration-500`}
        ></div>
      )}
    </div>
  );
};

export default ImagesComp;
