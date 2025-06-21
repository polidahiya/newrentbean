import Navbar from "@/app/_components/Navbar/Navbar";
import Footer from "@/app/_components/footer/Footer";
import Mobilenav from "@/app/_components/Navbar/bottomnav/Mobilenav";

export const metadata = {
  title: "Rentbean - Great for flexible rental options.",
  description:
    "Rent premium products at the best prices! From treadmills, gym bikes, cycles, laptops, and iPhones to gaming consoles (PS4, PS5), home appliances, party essentials, hookahs, baby gear, camping equipment, and more—get everything you need on rent with flexible plans. Hassle-free booking, doorstep delivery & affordable rates. Rent now!",
  keywords:
    "rent treadmill, rent cycle, rent gym bike, rent laptop, rent phone, rent iPhone, rent gaming console, rent PS4, rent PS5, rent home appliances, rent party items, rent hookah, rent baby car seat, rent beer tower, rent tent, rent camping gear, rent baby carrier, rent electronics, rent fitness equipment, rent gadgets, rent event items, rent furniture, online rental store, affordable rentals, flexible rental plans, rent near me.",
};

export default async function RootLayout({ children, params }) {
  return (
    <div>
      <div className="print:hidden">
        <Navbar params={params} />
        {children}
        <Footer />
        <Mobilenav params={params} />
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
