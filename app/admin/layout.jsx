import Link from "next/link";
import Image from "next/image";
import { FaDollyFlatbed } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const userdata = allcookies.get("userdata")?.value;

  if (!userdata) notFound();

  try {
    const parseduserdata = JSON.parse(userdata);
    if (parseduserdata?.usertype !== "admin") notFound();
  } catch (error) {
    notFound();
  }
  
  return (
    <div>
      <Adminnavbar />
      {children}
    </div>
  );
}

const Adminnavbar = () => {
  const navLinks = [
    { href: "/admin/", label: "Orders", logo: <FaDollyFlatbed /> },
    { href: "/admin/Blogs", label: "Add Blogs", logo: <RiBloggerFill /> },
    { href: "/admin/addproducts", label: "Add Products", logo: <IoBagAdd /> },
    {
      href: "/admin/contactmessages",
      label: "Messages",
      logo: <AiFillMessage />,
    },
    { href: "/admin/settings", label: "Settings", logo: <IoSettingsSharp /> },
  ];

  return (
    <nav className="sticky top-0 flex items-center gap-[5px] md:gap-[10px] h-[50px] shadow-md p-[7px] px-[10px] lg:px-[40px] z-20 bg-bg1">
      <Link href="/">
        <Image src="/logo&ui/3dlogo.png" alt="logo" height={40} width={150} />
      </Link>
      {navLinks.map(({ href, label, logo }, index) => (
        <NavLink key={href} href={href} isFirst={index === 0}>
          {logo}
          <span className="hidden md:block">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

const NavLink = ({ href, children, isFirst }) => (
  <Link
    className={`flex items-center gap-[10px] h-full rounded-[5px] px-[10px] bg-white ${
      isFirst && "ml-auto"
    }`}
    href={href}
  >
    {children}
  </Link>
);
