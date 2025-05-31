import Deliverysvg from "@/app/_svgs/Deliverysvg";
import Paymentsvg from "@/app/_svgs/Paymentsvg";
import Qualitysvg from "@/app/_svgs/Qualitysvg";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import DeviceDetector from "@/app/_components/_helperfunctions/Devicedetector";

async function Promices() {
  const Device = await DeviceDetector();
  const services = [
    {
      image: <Paymentsvg styles="h-12 w-12 md:h-20 md:w-20 fill-theme" />,
      heading: "Flexible Payment Options",
      para: "Choose from a variety of payment methods including credit cards, digital wallets, and bank transfers. Our secure payment gateway ensures a smooth and reliable transaction experience.",
    },
    {
      image: <Deliverysvg styles="h-12 w-12 md:h-20 md:w-20 fill-theme" />,
      heading: "Hassle-Free Delivery",
      para: "Experience prompt and efficient delivery services. We offer flexible delivery options such as same-day and next-day delivery. Track your orders easily with our intuitive tracking system.",
    },
    {
      image: <Qualitysvg styles="h-12 w-12 md:h-20 md:w-20 fill-theme" />,
      heading: "Quality Assured",
      para: "We guarantee top-notch quality in every product we deliver. Our quality assurance process includes stringent checks to ensure you receive only the best products.",
    },
  ];

  return (
    <section className="overflow-hidden">
      {Device === "mobile" || Device === "tablet" ? (
        <Mobile services={services} />
      ) : (
        <Desktop services={services} />
      )}
    </section>
  );
}

export default Promices;
