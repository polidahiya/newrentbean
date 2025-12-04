import Navbar from "@/app/_components/Navbar/Navbar";
import Footer from "@/app/_components/footer/Footer";
import Mobilenav from "@/app/_components/Navbar/bottomnav/Mobilenav";
import Googleads from "@/app/_components/_ads/Googleads";

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
      <Navbar params={params} />
      {children}
      <div className="flex items-center justify-center">
        <Googleads type={2} />
      </div>
      <Footer />
      <Mobilenav params={params} />
    </div>
  );
}
