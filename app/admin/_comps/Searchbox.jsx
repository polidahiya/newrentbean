"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

function Searchbox() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const options = [
    "Order id",
    "Transection ID",
    "User Name",
    "User Email",
    "User Phone",
    "User Address",
  ];

  const searchlink = `/admin?search=${searchTerm.trim()}&filter=${selectedOption}`;

  return (
    <div className="h-[40px] mt-3">
      <div className="flex items-center h-full border border-slate-300 rounded-[5px] p-1">
        <select
          id="options"
          name="options"
          className="px-2 outline-none"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {options.map((item, i) => (
            <option key={i} value={i}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="h-full w-full px-5 outline-none"
          placeholder="Search orders here"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              router.push(searchlink);
            }
          }}
        />

        <Link
          href={searchlink}
          className="flex items-center gap-2 px-5 h-full bg-theme text-white border border-slate-300 rounded-[5px] ml-auto"
        >
          <IoSearchOutline />
         <span className="hidden md:inline-block">Search</span>
        </Link>
      </div>
    </div>
  );
}

export default Searchbox;
