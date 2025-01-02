import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import Cookies from "js-cookie";
import { AppContextfn } from "@/app/Context";

function UserAddress({ userdata }) {
  const { pincoderef } = AppContextfn();
  const [pin, setPin] = useState("");
  const [locationName, setLocationName] = useState("");
  const [pinData, setPinData] = useState(null);
  const [showPinMenu, setShowPinMenu] = useState(false);

  // Load initial pin from cookies
  useEffect(() => {
    const userData = Cookies.get("userdata");
    if (userData) {
      const parsedData = JSON.parse(userData);
      const pincode = parsedData?.pincode?.split("-")[0];
      const locationParts = parsedData?.pincode?.split("-");
      if (pincode) setPin(pincode);
      if (locationParts) setLocationName(`${locationParts[1]}-${locationParts[2]}`);
    }
  }, []);

  // Fetch pin data when the pin changes
  useEffect(() => {
    let isMounted = true; // To prevent setting state on an unmounted component

    const fetchPinData = async () => {
      if (pin.length === 6) {
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
          const jsonData = await response.json();
          if (isMounted) {
            if (jsonData[0]?.Status === "Success") {
              setPinData(jsonData[0]);
            } else {
              setPinData(null);
            }
          }
        } catch (error) {
          console.error("Error fetching pin data:", error);
          if (isMounted) setPinData(null);
        }
      } else {
        setPinData(null);
      }
    };

    fetchPinData();

    return () => {
      isMounted = false; // Clean-up on unmount
    };
  }, [pin]);

  return (
    <div className="bg-white border border-slate-300 p-5 lg:pt-5 ">
      <div className="relative flex items-center gap-2 mt-2">
        <ImLocation2 className="text-theme" /> Pin Code :
        <input
          ref={pincoderef}
          className="h-full w-20 outline-none border border-slate-300 p-1"
          type="text"
          placeholder="Pin code"
          value={pin}
          onFocus={() => setShowPinMenu(true)}
          onBlur={() => setTimeout(() => setShowPinMenu(false), 500)}
          onChange={(e) => setPin(e.target.value.replace(/\D/, ""))} // Allow only numbers
        />
        <span>{locationName}</span>
        {showPinMenu && (
          <FetchedDataComp pinData={pinData} pin={pin} setLocationName={setLocationName} />
        )}
      </div>
      <Link
        href="/updateuserdetails"
        className="h-9 w-full flex items-center justify-between mt-2"
      >
        <span>Address: {userdata?.address}</span>
        <button className="flex items-center justify-center gap-1 h-full rounded bg-theme text-white px-5">
          <MdOutlineEditNote className="text-lg" />
          <span className="hidden md:block">Change</span>
        </button>
      </Link>
    </div>
  );
}

function FetchedDataComp({ pinData, pin, setLocationName }) {
  const setCookie = (name, division) => {
    const userData = Cookies.get("userdata");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.pincode = `${pin}-${name}-${division}`;
      setLocationName(`${name}-${division}`);
      Cookies.set("userdata", JSON.stringify(parsedData));
    }
  };

  if (!pin || pin.length !== 6) return null;

  return (
    <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded min-w-[300px] p-4 border border-slate-300 shadow-lg z-10">
      {pinData?.Status === "Error" ? (
        <div className="text-red-600 font-semibold text-center">
          Invalid Pincode
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-2">
            {pinData?.PostOffice.length} Record(s) found - {pinData?.PostOffice[0]?.State}
          </h2>
          <div className="flex flex-col max-h-72 overflow-y-auto">
            {pinData?.PostOffice.map((item, index) => (
              <button
                key={index}
                className="flex items-center border-b border-slate-200 p-2 hover:bg-slate-100"
                onClick={() => setCookie(item?.Name, item?.Division)}
              >
                <span className="font-semibold">{item?.Name}</span>
                <span className="ml-2 text-gray-600">- {item?.Division}</span>
              </button>
            ))}
            <button
              className="p-2 font-semibold hover:bg-slate-100 text-start"
              onClick={() => setCookie("Not in", "the list")}
            >
              Not in the list
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserAddress;
