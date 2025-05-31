import Navclient from "./Navclient";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";
import { Cachedproductsname } from "@/app/_serveractions/Getcachedata";

async function Navbar({ params, token, userdata }) {
  const Device = await DeviceDetector();
  const productsname = await Cachedproductsname();

  return (
    <Navclient
      params={params}
      productsname={productsname}
      token={token}
      userdata={userdata}
      Device={Device}
    />
  );
}

export default Navbar;
