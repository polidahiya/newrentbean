import Navbar from "../_components/Navbar/Navbar";
import Footer from "../_components/footer/Footer";
import Mobilenav from "../_components/Navbar/bottomnav/Mobilenav";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";
import LenisWrapper from "../_components/Lensiscroll";

export default async function RootLayout({ children, params }) {
  const device = await DeviceDetector();
  return (
    <div>
      {device == "desktop" && <LenisWrapper />}
      <Navbar params={params} />
      {children}
      <Footer />
      <Mobilenav params={params} />
    </div>
  );
}
