import Navbar from "../_components/Navbar/Navbar";
import { Cachedproducts } from "../_serveractions/Getcachedata";
import { cookies } from "next/headers";
import Footer from "../_components/Footer";
import Mobilenav from "../_components/Navbar/_comps/Mobilenav";

export const metadata = {
  title: "Rentbean",
  description: "Get solid wood furniture in Delhi and NCR",
};

export default async function RootLayout({ children, params }) {
  const products = await Cachedproducts();
  const productsname = products?.map((item) => item.name);

  // cookies
  const token = cookies()?.get("token")?.value;
  const userdata = cookies()?.get("userdata")?.value;

  return (
    <div>
      <div className="print:hidden">
        <Navbar
          params={params}
          productsname={productsname}
          token={token}
          userdata={userdata}
        />
        {children}
        <Footer />
        <Mobilenav />
      </div>
      <div className="h-[100svh] w-full items-center justify-center hidden print:flex">
        <img
          src="/logo&ui/funpart.jpg"
          alt="wtf"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
