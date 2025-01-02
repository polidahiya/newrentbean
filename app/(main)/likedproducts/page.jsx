import { getLikedProducts } from "@/app/_serveractions/Likedproducts";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Likedproducts from "./Likedproducts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  let token = cookies().get("token");
  if (!token) redirect("/loginlogout");

  const res = await getLikedProducts();
  const allproducts = await Cachedproducts();
  let filtereditems = [];
  if (res?.status == 200) {
    filtereditems = allproducts.filter((item) =>
      res?.result?.includes(item._id)
    );
  }

  return (
    <div>
      <h2 className="text-center font-bold text-[25px] md:text-[30px]  font-recline mt-[20px]">
        Favourites
      </h2>
      <Likedproducts filtereditems={filtereditems} />
    </div>
  );
}
