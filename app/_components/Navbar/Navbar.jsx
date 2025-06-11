import Navclient from "./Navclient";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";
import { Cachedproductsname } from "@/app/_serveractions/Getcachedata";
import Logo from "@/app/_components/Navbar/_comps/Logo";
import Searchbar from "@/app/_components/Navbar/_comps/Searchbar";
import Switchstore from "@/app/_components/Navbar/_comps/Switchstore";
import Cart from "@/app/_components/Navbar/_comps/Cart";
import Logedinusermenu from "@/app/_components/Navbar/_comps/Logedinusermenu";
import Blackscreen from "@/app/_components/Navbar/_comps/Blackscreen";
import Navcategories from "@/app/_components/Navbar/Navcategories";
import Backbutton from "@/app/_components/Navbar/_comps/Backbutton";
import Locationbutton from "@/app/_components/Navbar/_comps/Locationbutton";
import { cookies } from "next/headers";

async function Navbar({ params }) {
  const Device = await DeviceDetector();
  const productsname = await Cachedproductsname();
  const allparams = await params;
  const slug = allparams?.Category;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;

  // cookies
  const allcookies = await cookies();
  const token = allcookies?.get("token")?.value;
  const userdata = allcookies?.get("userdata")?.value;

  return (
    <Navclient>
      <div className="relative flex h-14 items-center justify-between py-2 ">
        <div className="flex items-center gap-0 md:gap-2 w-full h-full">
          <Logo />
          {Device == "desktop" && <Locationbutton />}
        </div>
        <Searchbar productsname={productsname} />
        <div className="w-full h-full flex items-center justify-end gap-1 md:gap-2">
          {Device == "desktop" && (
            <div className="hidden lg:block">
              <Switchstore />
            </div>
          )}
          {Device == "desktop" && <Cart />}
          <Logedinusermenu userdata={userdata} token={token} />
        </div>
        {(Device == "mobile" || Device == "tablet") && <Blackscreen />}
      </div>
      {Device == "desktop" && <Navcategories category={category} />}
      <Backbutton />
    </Navclient>
  );
}

export default Navbar;
