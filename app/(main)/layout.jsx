import Navbar from "../_components/Navbar/Navbar";
import { Cachedproducts } from "../_serveractions/Getcachedata";
import { cookies } from "next/headers";
import Footer from "../_components/footer/Footer";
import Mobilenav from "../_components/Navbar/_comps/Mobilenav";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";

export default async function RootLayout({ children, params }) {
  const Device = await DeviceDetector();
  const allparams = await params;
  const products = await Cachedproducts();
  const productsname = products.map((item) => item.name);

  // cookies
  const allcookies = await cookies();
  const token = allcookies?.get("token")?.value;
  const userdata = allcookies?.get("userdata")?.value;

  return (
    <div>
      <Navbar
        params={allparams}
        productsname={productsname}
        token={token}
        userdata={userdata}
        Device={Device}
      />
      {children}
      <Footer />
      {(Device === "mobile" || Device === "tablet") && <Mobilenav />}
    </div>
  );
}
