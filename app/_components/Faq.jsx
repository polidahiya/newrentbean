"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function FAQSection({ faqlist }) {
  return (
    <div className="py-2 px-5 md:px-10">
      <h2 className="font-tenor text-4xl md:text-4xl text-center">
        Frequently asked Questions
      </h2>
      <div className="mt-10">
        {faqlist.map((item, i) => (
          <Faq key={i} faq={item} />
        ))}
      </div>
    </div>
  );
}

const Faq = ({ faq }) => {
  const [open, setopen] = useState(false);
  return (
    <div
      className={`pt-5 cursor-pointer border-b first:border-t border-theme `}
      onClick={() => {
        setopen((pre) => !pre);
      }}
    >
      <p className="flex items-start">
        <span className="font-tenor text-base md:text-2xl">{faq.question}</span>
        <MdKeyboardArrowDown
          className={`min-w-10 ml-auto duration-300 text-2xl ${
            open && "rotate-180"
          }`}
        />
      </p>
      <div
        className={`font-tenor mt-5 ${
          open ? "max-h-screen duration-1000" : "max-h-0 duration-500"
        }  overflow-hidden`}
      >
        {faq?.answer.map((item, i) => {
          return (
            <li
              key={i}
              className="pb-2 text-sm  last:pb-4 pl-5 list-disc"
              dangerouslySetInnerHTML={{ __html: item }}
            ></li>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
