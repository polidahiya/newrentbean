import React from "react";
import { navLinks } from "./_comps/Navlinks";
import Link from "next/link";
import Nextimage from "../_components/Nextimage";
import { Motiondiv } from "../_components/Motion/Motionelements";

function Page() {
  const rotatevalue = 360 / navLinks.length;
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-80 aspect-square rounded-full border border-dashed border-gray-300">
          {navLinks.map((link, i) => (
            <Motiondiv
              key={i}
              className="absolute top-0 left-0 h-full w-full pointer-events-none"
              initial={{ rotate: 0 }}
              animate={[
                {
                  rotate: i * rotatevalue,
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                  },
                },
              ]}
            >
              <div className="flex justify-center -translate-y-1/2">
                <Motiondiv
                  className="flex items-center justify-center  aspect-square rounded-full shadow bg-white pointer-events-auto text-gray-300 hover:text-theme"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -i * rotatevalue }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={link.href}
                    className="h-full w-full flex items-center justify-center text-3xl p-3"
                  >
                    {link.logo}
                    {/* label */}
                  </Link>
                </Motiondiv>
              </div>
            </Motiondiv>
          ))}

          <Nextimage
            src="/logo&ui/minlogo.png"
            alt="logo"
            height={96}
            width={96}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
