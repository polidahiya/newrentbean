import Mobile from "./Mobile";
import Desktop from "./Desktop";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";

async function Customerreviews() {
  const Device = await DeviceDetector();

  return (
    <div className="relative lg:bg-bg1">
      <h2 className="text-center font-bold text-2xl md:text-4xl  font-recline pt-10">
        Customer Reviews
      </h2>
      {Device === "mobile" || Device === "tablet" ? (
        <Mobile />
      ) : (
        <Desktop />
      )}
    </div>
  );
}

export default Customerreviews;
