import { getordershistory } from "@/app/_serveractions/Getordershistory";
import Publicpage from "./Publicpage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const allcookies = await cookies();
  let token = allcookies.get("token");
  if (!token) redirect("/loginlogout");

  const res = await getordershistory();

  return (
    <div className="bg-gray-50">
      <h2 className="text-center font-bold text-[25px] md:text-3xl  font-recline  pt-5">
        Orders Details
      </h2>
      <Publicpage res={res} />
    </div>
  );
}

export default page;
