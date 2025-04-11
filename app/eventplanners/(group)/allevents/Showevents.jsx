import React from "react";
import { categories } from "@/app/eventplanners/commondata";
import Link from "next/link";

function Showevents() {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-0">
      {Object.entries(categories).map(([categoryname, category], i) => (
        <div
          key={i}
          className="w-full opacity-0 translate-y-10"
          style={{
            animation: `littlemoveupanimation 0.6s ${
              0.2 * i
            }s ease-in-out forwards`,
          }}
        >
          <h2 className="text-xl font-semibold mb-2">
            <Linkeffect
              title={categoryname.replace(/-/g, " ")}
              linkto={`/eventplanners/${categoryname}`}
            />
          </h2>

          <div className="space-y-3 ml-2 text-sm">
            {Object.entries(category.subcat).map(([subcatname, subcat], j) => (
              <div
                key={j}
                className="opacity-0 translate-y-10"
                style={{
                  animation: `littlemoveupanimation 0.6s ${
                    0.1 * j + 0.2 * i
                  }s ease-in-out forwards`,
                }}
              >
                <h3>
                  <Linkeffect
                    title={subcatname.replace(/-/g, " ")}
                    linkto={`/eventplanners/${categoryname}/${subcatname}`}
                  />
                </h3>

                {subcat.subcat && (
                  <div className="pl-3 border-l border-gray-300 ml-1 mt-1 space-y-1">
                    {Object.entries(subcat.subcat).map(
                      ([supersubcatname, _], k) => (
                        <div key={k} className="opacity-80">
                          <Linkeffect
                            title={supersubcatname.replace(/-/g, " ")}
                            linkto={`/eventplanners/${categoryname}/${subcatname}/${supersubcatname}`}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const Linkeffect = ({ title, linkto }) => {
  return (
    <Link href={linkto} className="relative block group w-fit">
      {title}
      <span className="block absolute top-full left-0 h-0.5 w-0 lg:group-hover:w-full bg-eventtheme duration-300"></span>
    </Link>
  );
};

export default Showevents;
