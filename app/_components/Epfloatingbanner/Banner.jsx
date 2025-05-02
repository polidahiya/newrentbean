import React from "react";
import Link from "next/link";
import Wrapper from "./Wrapper";
import Nextimage from "../Nextimage";

function Banner() {
  return (
    <Wrapper>
      <Link
        href="/eventplanners"
        className="relative flex items-stretch shadow-md rounded overflow-hidden bg-white"
      >
        <Nextimage
          src="/eventplanners/logopink.png"
          alt="eventplanners-logo"
          className="absolute bottom-1 left-1 h-5 z-10"
          height={20}
          width={62}
          loading="lazy"
        />
        {/* Fading background image on the left */}
        <div
          className="flex-1 bg-[url('https://blog.shaadi.com/wp-content/uploads/2024/07/03_Why-is-Marriage-Important_-12-Powerful-Reasons-Why-You-Should-Get-Married.jpg')] bg-cover bg-center"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, black 60%, transparent)",
            maskImage: "linear-gradient(to right, black 60%, transparent)",
          }}
        ></div>

        {/* Text content on the right */}
        <div className="flex-1 p-3 relative z-10">
          <p className="font-semibold text-[10px] lg:text-sm text-eventtheme">
            Turn Moments into Memories
          </p>
          <p className="text-[8px] lg:text-[10px] opacity-75">
            From grand weddings to intimate gatherings, bring your vision to
            life with creativity, precision, and passion.
          </p>
          <button className="text-[8px] lg:text-[12px] text-blue-400 underline">
            Visit
          </button>
        </div>
      </Link>
    </Wrapper>
  );
}

export default Banner;
