import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

export default function Rating({ rating }) {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="font-semibold text-[12px] md:text-[16px]">Rating:</span>
      <RatingStars rating={rating} />
      <span className="flex gap-[2px] md:px-[10px] md:bg-green-600 md:text-white md:rounded-[5px] font-semibold text-[12px] md:text-[16px] whitespace-nowrap">
        <span>{rating}</span>
        <span>/</span>
        <span>{5}</span>
      </span>
    </div>
  );
}

export const RatingStars = ({ rating }) => {
  const numberrating = Number(rating);
  const fullStars = Math.floor(numberrating);
  const halfStar = numberrating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center">
      <span className="flex">
        {fullStars > 0 &&
          [...Array(fullStars)].map((_, i) => (
            <IoMdStar
              key={i}
              className="text-[14px] md:text-[20px] text-[#FFC95E]"
            />
          ))}
      </span>
      {halfStar && (
        <IoMdStarHalf className="text-[14px] md:text-[20px] text-[#FFC95E]" />
      )}
      <span className="flex">
        {emptyStars > 0 &&
          [...Array(emptyStars)].map((_, i) => (
            <IoMdStarOutline
              key={i}
              className="text-[14px] md:text-[20px] text-[#d2d2d2]"
            />
          ))}
      </span>
    </div>
  );
};
