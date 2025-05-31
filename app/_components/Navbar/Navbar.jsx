import Navclient from "./Navclient";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";

async function Navbar({ params, productsname, token, userdata }) {
  const Device = await DeviceDetector();

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
