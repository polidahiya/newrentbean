import { getordershistory } from "@/app/_serveractions/Getordershistory";
import Publicpage from "./Publicpage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  let token = cookies().get("token");
  if (!token) redirect("/loginlogout");

  const res = await getordershistory();

  return (
    <div>
      <h2 className="text-center font-bold text-[25px] md:text-[30px]  font-recline mt-[20px]">
        Orders Details
      </h2>
      <Publicpage res={res} />
    </div>
  );
}

export default page;
